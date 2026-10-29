import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ComboSection } from './components/ComboSection';
import { LocationAbout } from './components/LocationAbout';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ItemModal } from './components/ItemModal';
import { PdfModal } from './components/PdfModal';
import { MenuItem, RESTAURANT_INFO } from './data/menuData';
import { ShoppingBag, MessageCircle, Phone } from 'lucide-react';

function MainContent() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return (
    <div className={`min-h-screen bg-[#0D0E12] text-[#F3F4F6] selection:bg-[#F59E0B] selection:text-black flex flex-col ${lang === 'ar' ? 'font-sans' : ''}`}>
      {/* Top Navbar */}
      <Navbar lang={lang} setLang={setLang} onOpenPdf={() => setIsPdfOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero lang={lang} onOpenPdf={() => setIsPdfOpen(true)} />
        <MenuSection lang={lang} onQuickView={(item) => setSelectedItem(item)} />
        <ComboSection lang={lang} />
        <LocationAbout lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} onOpenPdf={() => setIsPdfOpen(true)} />

      {/* Cart Drawer */}
      <CartDrawer lang={lang} />

      {/* Roll Details Quick View Modal */}
      <ItemModal
        item={selectedItem}
        lang={lang}
        onClose={() => setSelectedItem(null)}
      />

      {/* Official PDF Menu Modal */}
      <PdfModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        lang={lang}
      />

      {/* Mobile Sticky Action Bar (stays under 15% viewport height cap) */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-[#141622]/95 backdrop-blur-md border border-[#2A2E40] rounded-2xl p-2.5 shadow-2xl flex items-center justify-between gap-2">
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-2 px-3 rounded-xl bg-[#D97706] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{lang === 'ar' ? 'السلة' : 'Bag'}</span>
          {totalItems > 0 && (
            <span className="bg-black/30 px-1.5 py-0.2 rounded font-mono text-[11px] tabular-nums">
              {totalItems} | {totalPrice} ج.م
            </span>
          )}
        </button>

        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-[#25D366] text-white hover:brightness-110 shrink-0"
          title="WhatsApp Order"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
        </a>

        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="p-2.5 rounded-xl bg-[#1C1F2E] border border-[#32374B] text-[#F59E0B] shrink-0"
          title="Call Hotline"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
