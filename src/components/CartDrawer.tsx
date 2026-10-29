import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, ShoppingBag, MapPin, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartDrawerProps {
  lang: 'ar' | 'en';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ lang }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
    isCartOpen,
    setIsCartOpen,
    generateWhatsAppMessage,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const encodedMsg = generateWhatsAppMessage(
      {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        notes: customerNotes,
        deliveryType,
      },
      lang
    );

    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMsg}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 rtl:right-auto rtl:left-0 rtl:pr-0 rtl:sm:pr-10">
        <div className="w-screen max-w-md bg-[#11131B] border-l rtl:border-l-0 rtl:border-r border-[#262A38] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#232733] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#D97706]/10 text-[#F59E0B]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  {lang === 'ar' ? 'سلة طلبات سوشي أوشا' : 'Your Oosha Sushi Bag'}
                </h2>
                <p className="text-xs text-[#9CA3AF]">
                  {totalItems} {lang === 'ar' ? 'عنصر في السلة' : 'items'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1C1F2B] transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#181A24] border border-[#2B2F40] flex items-center justify-center mx-auto text-[#6B7280]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">
                    {lang === 'ar' ? 'سلة الطلبات فارغة' : 'Your bag is empty'}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    {lang === 'ar'
                      ? 'اختر من رولز أوشا المميزة أو بوكسات التوفير لتكتمل متعتك!'
                      : 'Add your favorite sushi rolls or saver combos to proceed.'}
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#D97706] text-white text-xs font-bold hover:bg-[#F59E0B] transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'تصفح قائمة الطعام' : 'Browse Menu'}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#1E222E]">
                  <span className="text-xs font-semibold text-[#9CA3AF]">
                    {lang === 'ar' ? 'الطلب الحالي' : 'Current Order'}
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                  >
                    {lang === 'ar' ? 'إفراغ السلة' : 'Clear all'}
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#171923] border border-[#252938] flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {lang === 'ar' ? item.menuItem.nameAr : item.menuItem.nameEn}
                      </h4>
                      <p className="text-[11px] text-[#9CA3AF]">
                        {item.menuItem.piecesOptions
                          ? `${item.selectedPieces} ${lang === 'ar' ? 'قطع' : 'Pcs'}`
                          : item.menuItem.piecesLabel}
                        {' · '}
                        <span className="font-mono tabular-nums text-[#F59E0B]">
                          {item.unitPrice} {lang === 'ar' ? 'ج.م' : 'EGP'}
                        </span>
                      </p>
                      {item.notes && (
                        <p className="text-[10px] text-[#D97706] italic mt-0.5 truncate">
                          {item.notes}
                        </p>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-[#0E1017] p-1 rounded-lg border border-[#262A39]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-[#9CA3AF] hover:text-white rounded hover:bg-[#202331]"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white px-1.5 font-mono tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-[#9CA3AF] hover:text-white rounded hover:bg-[#202331]"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-[#6B7280] hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Customer Details Form */}
                <div className="pt-4 border-t border-[#232733] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {lang === 'ar' ? 'بيانات التوصيل والطلب' : 'Delivery Details'}
                    </span>
                    <span className="text-[11px] text-[#F59E0B]">
                      {lang === 'ar' ? 'توصيل شبين الكوم' : 'Shebin El-Kom'}
                    </span>
                  </div>

                  {/* Delivery / Pickup toggle */}
                  <div className="flex gap-1.5 p-1 bg-[#161822] rounded-xl border border-[#272B3A]">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        deliveryType === 'delivery'
                          ? 'bg-[#D97706] text-white shadow-sm'
                          : 'text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      {lang === 'ar' ? 'توصيل للمنزل' : 'Home Delivery'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        deliveryType === 'pickup'
                          ? 'bg-[#D97706] text-white shadow-sm'
                          : 'text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      {lang === 'ar' ? 'استلام تيك أواي' : 'Takeaway Pickup'}
                    </button>
                  </div>

                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={lang === 'ar' ? 'الاسم الكريم *' : 'Your Name *'}
                    className="w-full bg-[#161822] border border-[#2B2F40] rounded-xl px-3 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#D97706]"
                  />

                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={lang === 'ar' ? 'رقم الهاتف للتواصل *' : 'Phone Number *'}
                    className="w-full bg-[#161822] border border-[#2B2F40] rounded-xl px-3 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#D97706] font-mono"
                  />

                  {deliveryType === 'delivery' && (
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder={lang === 'ar' ? 'العنوان بالتفصيل بشبين الكوم (الشارع، العمارة...) *' : 'Delivery Address in Shebin El-Kom *'}
                      className="w-full bg-[#161822] border border-[#2B2F40] rounded-xl px-3 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#D97706]"
                    />
                  )}

                  <textarea
                    rows={2}
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder={lang === 'ar' ? 'أي ملاحظات خاصة؟ (شوبستيك إضافي، صوص زيادة...)' : 'Order notes or special instructions...'}
                    className="w-full bg-[#161822] border border-[#2B2F40] rounded-xl px-3 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#D97706] resize-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#232733] bg-[#0E1017] space-y-3">
              {/* Total Row */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#9CA3AF] block">
                    {lang === 'ar' ? 'إجمالي الطلب المطلوب' : 'Order Total'}
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
                    {lang === 'ar' ? 'الدفع نقداً أو إنستاباي عند الاستلام' : 'Cash or InstaPay on delivery'}
                  </span>
                </div>
                <div className="text-right rtl:text-left font-mono">
                  <span className="text-2xl font-black text-white tabular-nums">
                    {totalPrice}
                  </span>
                  <span className="text-xs font-bold text-[#F59E0B] ml-1 rtl:ml-0 rtl:mr-1">
                    {lang === 'ar' ? 'جنيه' : 'EGP'}
                  </span>
                </div>
              </div>

              {/* Order on WhatsApp Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:brightness-110 transition-all font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{lang === 'ar' ? 'إرسال الطلب عبر واتساب الآن' : 'Send Order to WhatsApp'}</span>
              </button>

              {/* Or Quick Call */}
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-2.5 px-4 rounded-xl border border-[#2A2E3D] text-[#9CA3AF] hover:text-white hover:border-white/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{lang === 'ar' ? `أو اتصل بالخط الساخن: ${RESTAURANT_INFO.phoneFormatted}` : `Or Call Hotline: ${RESTAURANT_INFO.phoneFormatted}`}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
