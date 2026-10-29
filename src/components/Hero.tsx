import React from 'react';
import { Phone, MessageCircle, ArrowDown, Sparkles, MapPin, CheckCircle2, FileDown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  lang: 'ar' | 'en';
  onOpenPdf: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenPdf }) => {
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً أوشا سوشي! أود الاستفسار والطلب من المنيو الرسمي 🍣'
      : 'Hello OOSHA SUSHI! I would like to place an order from your menu 🍣'
  )}`;

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-14 md:pt-10 md:pb-20 border-b border-[#20222B]">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-[#EF4444]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Column 1: Editorial & Brand copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Authentic Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D97706]/30 bg-[#1A1813] text-xs font-semibold text-[#F59E0B]">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{lang === 'ar' ? RESTAURANT_INFO.locationAr : RESTAURANT_INFO.location}</span>
              <span className="text-[#6B7280]">·</span>
              <span className="text-white/80">{lang === 'ar' ? 'سوشي طازج عند الطلب' : 'Fresh Upon Order'}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FDE68A] to-[#F59E0B]">
                  OOSHA SUSHI
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#D1D5DB] mt-2">
                  {lang === 'ar' ? 'سوشي أوشا الفاخر في شبين الكوم' : 'Premium Japanese Cuisine'}
                </span>
              </h1>
              <p className="text-sm font-semibold text-[#F59E0B] tracking-wide uppercase">
                {lang === 'ar' ? 'بإشراف وشغف Oosh' : 'Handcrafted by Oosh'}
              </p>
            </div>

            {/* Tagline & Promise */}
            <p className="text-base sm:text-lg text-[#9CA3AF] max-w-xl leading-relaxed">
              {lang === 'ar' ? RESTAURANT_INFO.descriptionAr : RESTAURANT_INFO.descriptionEn}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:brightness-110 transition-all shadow-lg shadow-[#25D366]/20 font-bold text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{lang === 'ar' ? 'طلب فوري عبر واتساب' : 'Order via WhatsApp'}</span>
              </a>

              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#374151] bg-[#161820] text-white hover:border-[#D97706]/60 hover:bg-[#1E212D] transition-all font-semibold text-sm"
              >
                <span>{lang === 'ar' ? 'تصفح الأصناف والأسعار' : 'Explore Menu'}</span>
                <ArrowDown className="w-4 h-4 text-[#F59E0B]" />
              </a>

              <button
                onClick={onOpenPdf}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-[#2D313E] bg-transparent text-[#D1D5DB] hover:text-white hover:border-white/40 transition-colors text-xs font-semibold"
              >
                <FileDown className="w-4 h-4 text-[#D97706]" />
                <span>{lang === 'ar' ? 'المنيو الرسمي PDF' : 'Official Menu PDF'}</span>
              </button>
            </div>

            {/* Hotline Call Strip */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#9CA3AF]">
              <span className="font-medium text-white">{lang === 'ar' ? 'هاتف الطلبات والدليفري:' : 'Delivery & Orders Hotline:'}</span>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="inline-flex items-center gap-1.5 font-bold font-mono text-[#F59E0B] hover:underline tabular-nums text-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{RESTAURANT_INFO.phoneFormatted}</span>
              </a>
              <span className="hidden sm:inline text-[#4B5563]">|</span>
              <span className="hidden sm:inline text-[#9CA3AF]">
                {lang === 'ar' ? RESTAURANT_INFO.workingHoursAr : RESTAURANT_INFO.workingHoursEn}
              </span>
            </div>
          </div>

          {/* Column 2: Logo badge & Food Hero Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Card container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#2A2E3D] bg-[#14161E] shadow-2xl shadow-black/80">
                {/* Hero Dish Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1E212D]">
                  <img
                    src="/src/assets/images/hero_sushi_spread_1793305382770.jpg"
                    alt="Oosha Sushi Fresh Table Feast"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14161E] via-transparent to-black/30 pointer-events-none" />

                  {/* Top-Right Badge: Authentic Japanese */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold text-[#FDE68A] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                    <span>{lang === 'ar' ? 'سوشي طازج 100%' : '100% Fresh Roll'}</span>
                  </div>
                </div>

                {/* Overlapping Brand Avatar / Logo Lockup */}
                <div className="p-5 flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-[#D97706] bg-[#1D1B16] p-0.5 shadow-lg shrink-0">
                    <img
                      src={RESTAURANT_INFO.logoUrl}
                      alt="Oosha Sushi Mascot Logo"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white tracking-wide">OOSHA SUSHI</h2>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#D97706]/20 text-[#F59E0B] border border-[#D97706]/30">
                        by Oosh
                      </span>
                    </div>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      {lang === 'ar'
                        ? 'رولز سيجنتشر ومقلية وكلاسيك بأعلى جودة في المنوفية'
                        : 'Signature, crispy fried & classic rolls crafted fresh'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Point Trust Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-t border-[#22242E] pt-8">
          <div className="p-3.5 rounded-xl border border-[#232733] bg-[#12141C] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">{lang === 'ar' ? 'تحضير طازج فور الطلب' : 'Fresh Upon Order'}</p>
              <p className="text-[11px] text-[#9CA3AF]">{lang === 'ar' ? 'مأكولات بحرية ممتازة' : 'Premium fresh seafood'}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#232733] bg-[#12141C] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#F59E0B] shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">{lang === 'ar' ? 'توصيل شبين الكوم' : 'Shebin El-Kom Delivery'}</p>
              <p className="text-[11px] text-[#9CA3AF]">{lang === 'ar' ? 'سريع ومعبأ باحترافية' : 'Fast & temperature safe'}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#232733] bg-[#12141C] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#3B82F6] shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">{lang === 'ar' ? 'صوصات أوشا السرية' : 'Signature House Sauces'}</p>
              <p className="text-[11px] text-[#9CA3AF]">{lang === 'ar' ? 'ديناميت، ترياكي، سبايسي' : 'Dynamite & Teriyaki'}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#232733] bg-[#12141C] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#EC4899] shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">{lang === 'ar' ? 'بوكسات توفير حصرية' : 'Saver Combos'}</p>
              <p className="text-[11px] text-[#9CA3AF]">{lang === 'ar' ? '١٦ و٣٢ و٥٠ قطعة' : '16, 32 & 50 pieces'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
