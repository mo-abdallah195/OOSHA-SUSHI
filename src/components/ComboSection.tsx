import React, { useState } from 'react';
import { Package, Check, Plus, Sparkles, Gift } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface ComboSectionProps {
  lang: 'ar' | 'en';
}

export const ComboSection: React.FC<ComboSectionProps> = ({ lang }) => {
  const { addToCart } = useCart();
  const [addedBoxId, setAddedBoxId] = useState<string | null>(null);

  // Custom roll selections for Duo combo
  const [duoNotes, setDuoNotes] = useState<string>('');
  const [showDuoCustomizer, setShowDuoCustomizer] = useState(false);

  const combos = MENU_ITEMS.filter((i) => i.category === 'combo');

  const handleAddCombo = (item: MenuItem, notes?: string) => {
    addToCart(item, undefined, 1, notes);
    setAddedBoxId(item.id);
    setTimeout(() => setAddedBoxId(null), 1400);
  };

  return (
    <section id="combos" className="py-14 sm:py-20 bg-[#0A0B0F] border-b border-[#20222B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D97706]/40 bg-[#1F1912] text-xs font-bold text-[#F59E0B]">
            <Gift className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'أفضل قيمة وأعلى توفير' : 'Maximum Value & Savings'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'ar' ? 'عروض وبوكسات التوفير (Saver Combos)' : 'Saver Combos & Party Boxes'}
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            {lang === 'ar'
              ? 'مجموعة بوكسات صُممت لتناسب فرد، فردين، أو التجمعات العائلية بأسعار خاصة جداً'
              : 'Specially curated boxes for solo treat, date night, or full family feasts at unmatched prices.'}
          </p>
        </div>

        {/* Combos 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {combos.map((box) => {
            const isAdded = addedBoxId === box.id;
            const isFamily = box.id === 'family-box';
            const isDuo = box.id === 'duo-combo';
            const price = typeof box.prices === 'number' ? box.prices : 0;

            return (
              <div
                key={box.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 ${
                  isFamily
                    ? 'border-[#D97706] bg-gradient-to-b from-[#1E1911] via-[#151419] to-[#12131A] shadow-xl shadow-[#D97706]/10'
                    : 'border-[#262A37] bg-[#12141C] hover:border-[#3E4357]'
                }`}
              >
                {/* Popular / Best Badge */}
                {isFamily && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'الأكثر طلباً للتجمعات' : 'Ultimate Feast'}</span>
                  </div>
                )}

                <div className="space-y-5">
                  {/* Header info */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-semibold text-[#D97706] block">
                        {box.piecesLabel} · {lang === 'ar' ? box.piecesLabelAr : ''}
                      </span>
                      <h3 className="text-2xl font-black text-white mt-1">
                        {lang === 'ar' ? box.nameAr : box.nameEn}
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#1A1C26] border border-white/5 text-[#F59E0B]">
                      <Package className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                      {price}
                    </span>
                    <span className="text-sm font-bold text-[#F59E0B]">
                      {lang === 'ar' ? 'جنيه' : 'EGP'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    {lang === 'ar' ? box.descriptionAr : box.descriptionEn}
                  </p>

                  {/* Itemized contents */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <p className="text-[11px] font-bold text-[#E5E7EB] tracking-wide uppercase">
                      {lang === 'ar' ? 'محتويات البوكس:' : 'Box Contents:'}
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#D1D5DB]">
                      {(lang === 'ar' ? box.contentsAr : box.contentsEn)?.map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Duo Customizer prompt */}
                  {isDuo && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setShowDuoCustomizer(!showDuoCustomizer)}
                        className="text-xs text-[#F59E0B] hover:underline font-semibold cursor-pointer"
                      >
                        {showDuoCustomizer
                          ? lang === 'ar' ? 'إغلاق تحديد الأصناف' : 'Close Customization'
                          : lang === 'ar' ? '+ كتابة الأصناف المفضلة للـ ٣٢ قطعة' : '+ Specify Your 32 Selected Pieces'}
                      </button>

                      {showDuoCustomizer && (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={duoNotes}
                            onChange={(e) => setDuoNotes(e.target.value)}
                            placeholder={lang === 'ar' ? 'مثال: ٨ كريسبي تمبورا، ٨ فيلادلفيا، ٨ كاليفورنيا...' : 'e.g., 8 Tempura, 8 California, 8 Philadelphia...'}
                            className="w-full bg-[#181A24] border border-[#303548] rounded-xl px-3 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#D97706]"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Buy Button */}
                <div className="pt-6 mt-6 border-t border-white/5">
                  <button
                    onClick={() => handleAddCombo(box, isDuo && duoNotes ? duoNotes : undefined)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#10B981] text-white'
                        : isFamily
                        ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black hover:brightness-110 shadow-lg shadow-[#D97706]/30'
                        : 'bg-[#D97706] text-white hover:bg-[#F59E0B]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'تمت إضافة البوكس للسلة' : 'Box Added to Bag'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>
                          {lang === 'ar'
                            ? `إضافة ${box.nameAr} (${price} ج.م)`
                            : `Add ${box.nameEn} (${price} EGP)`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
