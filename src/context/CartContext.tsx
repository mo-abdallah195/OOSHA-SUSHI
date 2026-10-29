import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, RESTAURANT_INFO } from '../data/menuData';

export interface CartItem {
  id: string; // unique item cart key (e.g., "crispy-tempura-8" or "volcano-crunch-4")
  menuItem: MenuItem;
  selectedPieces: number; // 4 or 8 or 16 or 32 or 50 etc.
  unitPrice: number;
  quantity: number;
  notes?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, pieces?: number, quantity?: number, notes?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppMessage: (customer: { name: string; phone: string; address: string; notes?: string; deliveryType: 'delivery' | 'pickup' }, lang: 'ar' | 'en') => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'oosha_sushi_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  const addToCart = (item: MenuItem, pieces?: number, quantity = 1, notes?: string) => {
    // Determine price and piece count
    let pieceCount = pieces;
    let unitPrice = 0;

    if (typeof item.prices === 'number') {
      unitPrice = item.prices;
      pieceCount = pieces || (item.category === 'combo' ? (item.id === 'solo-combo' ? 16 : item.id === 'duo-combo' ? 32 : 50) : 4);
    } else {
      // Record<number, number>
      const defaultPiece = item.piecesOptions ? item.piecesOptions[0] : 4;
      pieceCount = pieces || defaultPiece;
      unitPrice = item.prices[pieceCount] || item.prices[defaultPiece];
    }

    const cartKey = `${item.id}-${pieceCount}${notes ? `-${notes}` : ''}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.id === cartKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: cartKey,
            menuItem: item,
            selectedPieces: pieceCount,
            unitPrice,
            quantity,
            notes,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const generateWhatsAppMessage = (
    customer: { name: string; phone: string; address: string; notes?: string; deliveryType: 'delivery' | 'pickup' },
    lang: 'ar' | 'en'
  ) => {
    if (lang === 'ar') {
      let msg = `🍣 *طلب جديد من منيو سوشي أوشا - OOSHA SUSHI*\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `👤 *العميل:* ${customer.name || 'غير محدد'}\n`;
      msg += `📞 *رقم الهاتف:* ${customer.phone || 'غير محدد'}\n`;
      msg += `📍 *نوع الطلب:* ${customer.deliveryType === 'delivery' ? 'توصيل ديليفري' : 'استلام من المكان (تيك أواي)'}\n`;
      if (customer.deliveryType === 'delivery') {
        msg += `🏠 *العنوان:* ${customer.address || 'شبين الكوم'}\n`;
      }
      if (customer.notes) {
        msg += `📝 *ملاحظات:* ${customer.notes}\n`;
      }
      msg += `\n🍱 *تفاصيل الأصناف:*\n`;

      cart.forEach((item, idx) => {
        const pieceStr = item.menuItem.piecesOptions ? ` (${item.selectedPieces} قطع)` : item.menuItem.piecesLabelAr ? ` (${item.menuItem.piecesLabelAr})` : '';
        msg += `${idx + 1}. *${item.menuItem.nameAr}* - ${item.menuItem.nameEn}${pieceStr}\n`;
        msg += `   الكمية: ${item.quantity} × ${item.unitPrice} ج.م = ${item.quantity * item.unitPrice} ج.م\n`;
      });

      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `💰 *الإجمالي المطلوب:* *${totalPrice} جنيه مصري*\n`;
      msg += `📍 *الموقع:* ${RESTAURANT_INFO.locationAr}\n`;
      msg += `⏰ *وقت الطلب:* ${new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}\n`;
      msg += `شكراً لكم! نرجو تأكيد استلام الطلب والوقت المتوقع للتحضير.`;
      return encodeURIComponent(msg);
    } else {
      let msg = `🍣 *New Order from OOSHA SUSHI Menu*\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `👤 *Customer:* ${customer.name || 'N/A'}\n`;
      msg += `📞 *Phone:* ${customer.phone || 'N/A'}\n`;
      msg += `📍 *Type:* ${customer.deliveryType === 'delivery' ? 'Home Delivery' : 'Pickup / Takeaway'}\n`;
      if (customer.deliveryType === 'delivery') {
        msg += `🏠 *Address:* ${customer.address || 'Shebin El-Kom'}\n`;
      }
      if (customer.notes) {
        msg += `📝 *Notes:* ${customer.notes}\n`;
      }
      msg += `\n🍱 *Order Items:*\n`;

      cart.forEach((item, idx) => {
        const pieceStr = item.menuItem.piecesOptions ? ` (${item.selectedPieces} Pcs)` : item.menuItem.piecesLabel ? ` (${item.menuItem.piecesLabel})` : '';
        msg += `${idx + 1}. *${item.menuItem.nameEn}*${pieceStr}\n`;
        msg += `   Qty: ${item.quantity} × ${item.unitPrice} EGP = ${item.quantity * item.unitPrice} EGP\n`;
      });

      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `💰 *Total Amount:* *${totalPrice} EGP*\n`;
      msg += `📍 *Location:* ${RESTAURANT_INFO.location}\n`;
      msg += `Please confirm receipt of order and estimated preparation time.`;
      return encodeURIComponent(msg);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
