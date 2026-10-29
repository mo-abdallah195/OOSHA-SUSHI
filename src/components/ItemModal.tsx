import React, { useState, useEffect } from 'react';
import { X, Plus, Check, Sparkles, Flame, ShieldCheck } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface ItemModalProps {
  item: MenuItem | null;
  lang: 'ar' | 'en';
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, lang, onClose }) => {
  const { addToCart } = useCart();
  const [selectedPieces, setSelectedPieces] = useState<number>(4);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (item) {
      setSelectedPieces(item.piecesOptions ? item.piecesOptions[0] : 4);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [item]);

  if (!item) return null;

  const unitPrice = typeof item.prices === 'number'
    ? item.prices
    : item.prices[selectedPieces] || (item.piecesOptions ? item.prices[item.piecesOptions[0]] : 0);

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(item, selectedPieces, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  const displayImage = item.image || (
    item.category === 'signature'
      ? '/src/assets/images/sushi_signature_volcano_1793305384106.jpg'
      : item.category === 'crispy'
      ? '/src/assets/images/sushi_crispy_fried_1793305384057.jpg'
      : item.category === 'classic'
      ? '/src/assets/images/sushi_classic_salmon_1793305384610.jpg'
      : '/src/assets/images/hero_sushi_spread_1793305382770.jpg'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#12141D] border border-[#2B2F40] rounded-3xl overflow-hidden shadow-2xl z-10 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md text-[#9CA3AF] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media */}
        <div className="relative aspect-[16/9] w-full bg-[#181B26] overflow-hidden">
          <img
            src={displayImage}
            alt={item.nameEn}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141D] via-transparent to-transparent" />
          
          {item.tags.includes('Spicy') && (
            <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 px-2.5 py-1 rounded bg-red-950/80 border border-red-500/40 text-xs font-semibold text-red-300 flex items-center gap-1 backdrop-blur-sm">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>{lang === 'ar' ? 'حار وسبايسي' : 'Spicy Flavor'}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#D97706] tracking-wider uppercase">
              {item.category === 'signature'
                ? lang === 'ar' ? 'رولز أوشا المميزة' : "Oosha's Signature"
                : item.category === 'crispy'
                ? lang === 'ar' ? 'رولز مقلية مقرمشة' : 'Crispy Fried Rolls'
                : item.category === 'classic'
                ? lang === 'ar' ? 'كلاسيك ونيء' : 'Raw & Classic Rolls'
                : item.category === 'combo'
                ? lang === 'ar' ? 'بوكسات التوفير' : 'Saver Combos'
                : lang === 'ar' ? 'مقبلات وصوصات' : 'Appetizers & Sides'}
            </span>
            <h3 className="text-2xl font-black text-white">
              {lang === 'ar' ? item.nameAr : item.nameEn}
            </h3>
            <p className="text-xs text-[#9CA3AF] font-medium font-['Plus_Jakarta_Sans']">
              {lang === 'ar' ? item.nameEn : item.nameAr}
            </p>
          </div>

          {/* Description */}
          <div className="p-3.5 rounded-xl bg-[#171A24] border border-[#242838] text-xs text-[#D1D5DB] leading-relaxed">
            {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
          </div>

          {/* Piece options if applicable */}
          {item.piecesOptions && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-white block">
                {lang === 'ar' ? 'اختر عدد القطع:' : 'Select Pieces Count:'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {item.piecesOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedPieces(opt)}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      selectedPieces === opt
                        ? 'border-[#D97706] bg-[#221B13] text-[#F59E0B]'
                        : 'border-[#262A38] bg-[#161822] text-[#9CA3AF] hover:border-[#383E54]'
                    }`}
                  >
                    <span>{opt} {lang === 'ar' ? 'قطع' : 'Pieces'}</span>
                    <span className="font-mono tabular-nums">
                      {typeof item.prices === 'object' ? item.prices[opt] : ''} {lang === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Freshness guarantee guarantee */}
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF] pt-1">
            <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>
              {lang === 'ar'
                ? 'يُحضر طازجاً عند الطلب فوراً باستخدام أرز السوشي الأصلي ونوري ياباني'
                : 'Freshly hand-rolled upon order with premium authentic nori and seasoned sushi rice.'}
            </span>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-[#232733] flex items-center justify-between gap-4">
            <div className="font-mono">
              <span className="text-xs text-[#9CA3AF] block font-sans">
                {lang === 'ar' ? 'الإجمالي' : 'Total'}
              </span>
              <span className="text-2xl font-black text-white tabular-nums">
                {totalPrice}
              </span>
              <span className="text-xs font-bold text-[#F59E0B] ml-1 rtl:ml-0 rtl:mr-1">
                {lang === 'ar' ? 'ج.م' : 'EGP'}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isAdded
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#D97706] hover:bg-[#F59E0B] text-white shadow-lg shadow-[#D97706]/20'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تمت الإضافة!' : 'Added!'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إضافة للطلب' : 'Add to Bag'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
