import React from 'react';
import { ShoppingBag, Phone, FileText } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  onOpenPdf: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onOpenPdf }) => {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#262833] bg-[#0D0E12]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark & logo */}
        <a href="#hero" className="flex items-center gap-3 shrink-0 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D97706]/40 bg-[#1A1C24] p-0.5 shadow-md shadow-[#D97706]/10 transition-transform group-hover:scale-105">
            <img
              src={RESTAURANT_INFO.logoUrl}
              alt="Oosha Sushi Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // fallback if needed
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-extrabold tracking-wider text-white font-['Plus_Jakarta_Sans'] leading-tight group-hover:text-[#F59E0B] transition-colors">
              OOSHA SUSHI
            </span>
            <span className="text-xs text-[#9CA3AF] font-medium">
              {lang === 'ar' ? 'سوشي أوشا • شبين الكوم' : 'Premium Japanese Cuisine'}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#9CA3AF]">
          <a
            href="#menu"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'ar' ? 'قائمة الطعام' : 'Menu & Rolls'}
          </a>
          <a
            href="#signature"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'ar' ? 'رولز أوشا المميزة' : 'Signature Rolls'}
          </a>
          <a
            href="#combos"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'ar' ? 'بوكسات التوفير' : 'Saver Combos'}
          </a>
          <a
            href="#location"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'ar' ? 'الموقع والتوصيل' : 'Location & Delivery'}
          </a>
          <button
            onClick={onOpenPdf}
            className="inline-flex items-center gap-1.5 hover:text-[#F59E0B] transition-colors whitespace-nowrap shrink-0 text-xs font-semibold text-[#D1D5DB]"
            title={lang === 'ar' ? 'عرض قائمة المنيو الأصلية PDF' : 'View original PDF menu'}
          >
            <FileText className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{lang === 'ar' ? 'منيو PDF' : 'PDF Menu'}</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Language, Phone Hotline & Cart) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="px-2.5 py-1.5 rounded-lg border border-[#2D313E] bg-[#161820] text-xs font-bold text-[#E5E7EB] hover:border-[#D97706]/60 hover:text-[#F59E0B] transition-all whitespace-nowrap shrink-0"
            title="تبديل اللغة / Switch Language"
          >
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>

          {/* Hotline Quick Call (Desktop & Mobile) */}
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#D97706]/40 bg-[#1D1712] text-[#F59E0B] hover:bg-[#D97706]/20 transition-colors text-xs font-bold whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="font-mono tabular-nums">{RESTAURANT_INFO.phone}</span>
          </a>

          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D97706] to-[#B45309] text-white hover:from-[#F59E0B] hover:to-[#D97706] transition-all shadow-lg shadow-[#D97706]/20 font-semibold text-xs whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">
              {lang === 'ar' ? 'السلة' : 'Bag'}
            </span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center bg-black/40 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] tabular-nums">
                {totalItems}
              </span>
            )}
            {totalPrice > 0 && (
              <span className="hidden md:inline text-white/90 font-mono text-[11px] border-l border-white/20 pl-2 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-2 tabular-nums">
                {totalPrice} {lang === 'ar' ? 'ج.م' : 'EGP'}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
