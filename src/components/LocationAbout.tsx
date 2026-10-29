import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Heart, Award, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface LocationAboutProps {
  lang: 'ar' | 'en';
}

export const LocationAbout: React.FC<LocationAboutProps> = ({ lang }) => {
  return (
    <section id="location" className="py-14 sm:py-20 border-b border-[#20222B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Brand Story & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D97706]/40 bg-[#1A1813] text-xs font-bold text-[#F59E0B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'قصة الشغف والتميز' : 'Crafted with Passion'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {lang === 'ar'
                ? 'سوشي أوشا: تجربة يابانية أصيلة بأيدي مصرية مبدعة'
                : 'OOSHA SUSHI: Authentic Japanese Spirit in Shebin El-Kom'}
            </h2>

            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              {lang === 'ar'
                ? 'بدأت حكاية OOSHA SUSHI بشغف عميق لتقديم السوشي الحقيقي كما يجب أن يكون. نختار كل قطعة سالمون طازجة بعناية فائقة، ونستخدم أرز السوشي الأصلي المتبل بالخل الياباني الخاص، مع صوصاتنا الحصرية التي نبتكرها بأنفسنا من الترياكي اللامع إلى صوص الديناميت المتفجر.'
                : 'OOSHA SUSHI was born out of a genuine passion for authentic Japanese sushi craft. Every piece of salmon, crispy tempura shrimp, and unagi is selected with uncompromising standards, accompanied by proprietary house-made glazes.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#14161F] border border-[#232733] space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Award className="w-4 h-4 text-[#F59E0B]" />
                  <span>{lang === 'ar' ? 'طازج عند الطلب' : 'Fresh Hand-Rolled'}</span>
                </div>
                <p className="text-xs text-[#9CA3AF]">
                  {lang === 'ar'
                    ? 'لا نقوم بإعداد أي رول مسبقاً، كل قطعة تلف وتطهى خصيصاً بعد وصول طلبك مباشرة.'
                    : 'No pre-made rolls. Every single piece is prepared and rolled fresh immediately upon your order.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#14161F] border border-[#232733] space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Heart className="w-4 h-4 text-[#EF4444]" />
                  <span>{lang === 'ar' ? 'خلطات وصوصات حصرية' : 'House Sauces'}</span>
                </div>
                <p className="text-xs text-[#9CA3AF]">
                  {lang === 'ar'
                    ? 'صوصات ديناميت وترياكي وسبايسي ياباني مصنوعة بحب ومذاق متوازن لا تجده في مكان آخر.'
                    : 'Secret dynamite sauce, authentic eel glaze, and Japanese spicy mayo prepared in-house.'}
                </p>
              </div>
            </div>
          </div>

          {/* Location & Delivery Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#141620] border border-[#2A2E3E] space-y-6 shadow-xl">
              <div>
                <h3 className="text-xl font-black text-white">
                  {lang === 'ar' ? 'معلومات الطلب والتوصيل' : 'Delivery & Location'}
                </h3>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  {lang === 'ar' ? 'خدمة توصيل سريعة وموثوقة لجميع أنحاء شبين الكوم' : 'Fast and careful delivery across Shebin El-Kom'}
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#D1D5DB]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#1E212E] text-[#F59E0B] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">
                      {lang === 'ar' ? 'الموقع الجغرافي:' : 'Location:'}
                    </span>
                    <span className="text-[#9CA3AF]">
                      {lang === 'ar' ? RESTAURANT_INFO.locationAr : RESTAURANT_INFO.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#1E212E] text-[#10B981] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">
                      {lang === 'ar' ? 'هاتف الطلبات والدليفري:' : 'Phone Hotline:'}
                    </span>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="font-mono text-base font-bold text-[#F59E0B] hover:underline"
                    >
                      {RESTAURANT_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#1E212E] text-[#3B82F6] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">
                      {lang === 'ar' ? 'مواعيد العمل:' : 'Working Hours:'}
                    </span>
                    <span className="text-[#9CA3AF]">
                      {lang === 'ar' ? RESTAURANT_INFO.workingHoursAr : RESTAURANT_INFO.workingHoursEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white hover:brightness-110 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'واتساب الدليفري' : 'WhatsApp Us'}</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#1D1B17] border border-[#D97706]/40 text-[#F59E0B] hover:bg-[#D97706]/15 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'اتصال فوري' : 'Call Directly'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
