import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface FooterProps {
  lang: 'ar' | 'en';
  onOpenPdf: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenPdf }) => {
  return (
    <footer className="bg-[#0A0B0F] border-t border-[#1C1E28] pt-12 pb-10 text-xs text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand & Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D97706]/40 bg-[#161822] p-0.5">
              <img
                src={RESTAURANT_INFO.logoUrl}
                alt="Oosha Sushi"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes('WhatsApp_Image')) {
                    target.src = '/assets/aistudio/WhatsApp_Image_2026-10-29_at_11.20.50_PM_04da67ed.jpeg';
                  }
                }}
              />
            </div>
            <div>
              <p className="text-base font-extrabold text-white">OOSHA SUSHI</p>
              <p className="text-xs text-[#6B7280]">
                {lang === 'ar' ? 'سوشي أوشا • شبين الكوم، المنوفية' : 'Premium Japanese Cuisine • Shebin El-Kom'}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#D1D5DB]">
            <a href="#menu" className="hover:text-white transition-colors">
              {lang === 'ar' ? 'قائمة الأصناف' : 'Menu'}
            </a>
            <a href="#combos" className="hover:text-white transition-colors">
              {lang === 'ar' ? 'بوكسات التوفير' : 'Combos'}
            </a>
            <a href="#location" className="hover:text-white transition-colors">
              {lang === 'ar' ? 'الموقع والتوصيل' : 'Location'}
            </a>
            <button
              onClick={onOpenPdf}
              className="hover:text-[#F59E0B] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تحميل المنيو PDF' : 'Download PDF'}</span>
            </button>
          </div>

          {/* Fast Contact */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="p-2 rounded-xl bg-[#171924] border border-[#262A38] text-[#F59E0B] hover:border-[#D97706] transition-colors"
              title="Call Hotline"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#171924] border border-[#262A38] text-[#25D366] hover:border-[#25D366] transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-[#171923] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#6B7280]">
          <p>
            © {new Date().getFullYear()} OOSHA SUSHI by Oosh. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <p>
            {lang === 'ar' ? 'الخط الساخن للطلبات: 01098528128 • شبين الكوم' : 'Order Hotline: 01098528128 • Shebin El-Kom, Monufia'}
          </p>
        </div>
      </div>
    </footer>
  );
};
