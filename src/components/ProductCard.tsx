import React, { useState } from 'react';
import { Plus, Check, Eye, Flame } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  item: MenuItem;
  lang: 'ar' | 'en';
  onQuickView: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, lang, onQuickView }) => {
  const { addToCart } = useCart();
  const [selectedPieces, setSelectedPieces] = useState<number>(() => {
    return item.piecesOptions ? item.piecesOptions[0] : 4;
  });
  const [justAdded, setJustAdded] = useState(false);

  // Compute price
  const price = typeof item.prices === 'number'
    ? item.prices
    : item.prices[selectedPieces] || (item.piecesOptions ? item.prices[item.piecesOptions[0]] : 0);

  const handleAdd = () => {
    addToCart(item, selectedPieces, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Determine fallback image or category illustration
  const displayImage = item.image || (
    item.category === 'signature'
      ? '/images/sushi_signature_volcano.jpg'
      : item.category === 'crispy'
      ? '/images/sushi_crispy_fried.jpg'
      : item.category === 'classic'
      ? '/images/sushi_classic_salmon.jpg'
      : '/images/hero_sushi_spread.jpg'
  );

  return (
    <div className="group rounded-2xl border border-[#232632] bg-[#13151D] hover:border-[#D97706]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/40 hover:shadow-[#D97706]/5">
      {/* Top Media Area */}
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1B1E28]">
          <img
            src={displayImage}
            alt={item.nameEn}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (!target.src.endsWith('/images/hero_sushi_spread.jpg')) {
                target.src = '/images/hero_sushi_spread.jpg';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13151D] via-transparent to-black/20" />

          {/* Quick View Button overlay */}
          <button
            onClick={() => onQuickView(item)}
            className="absolute top-3 left-3 p-2 rounded-lg bg-black/60 backdrop-blur-md text-white hover:text-[#F59E0B] hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            title={lang === 'ar' ? 'عرض التفاصيل' : 'Quick View'}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Spicy / Special tag if relevant */}
          {item.tags.includes('Spicy') && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-[11px] font-semibold text-red-400 flex items-center gap-1 backdrop-blur-sm">
              <Flame className="w-3 h-3 text-red-400" />
              <span>{lang === 'ar' ? 'سبايسي' : 'Spicy'}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Metadata: Category & Piece Tag (No static pills, per §1.A zero-pill rule) */}
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <span className="font-medium text-[#F59E0B]">
              {item.category === 'signature'
                ? lang === 'ar' ? "رولز أوشا المميزة" : "Oosha Signature"
                : item.category === 'crispy'
                ? lang === 'ar' ? "مقلي مقرمش" : "Crispy Fried"
                : item.category === 'classic'
                ? lang === 'ar' ? "كلاسيك ونيء" : "Raw & Classic"
                : item.category === 'combo'
                ? lang === 'ar' ? "بوكس توفير" : "Saver Box"
                : lang === 'ar' ? "مقبلات وصوصات" : "Appetizer & Sauce"}
            </span>
            <span aria-hidden="true" className="text-[#4B5563]">·</span>
            <span>
              {item.piecesOptions
                ? `${selectedPieces} ${lang === 'ar' ? 'قطع' : 'Pcs'}`
                : lang === 'ar' ? (item.piecesLabelAr || item.piecesLabel) : item.piecesLabel}
            </span>
          </div>

          {/* Item Titles */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#F59E0B] transition-colors leading-snug">
              {lang === 'ar' ? item.nameAr : item.nameEn}
            </h3>
            <p className="text-xs font-medium text-[#9CA3AF] tracking-wide mt-0.5 font-['Plus_Jakarta_Sans']">
              {lang === 'ar' ? item.nameEn : item.nameAr}
            </p>
          </div>

          {/* Ingredients Description */}
          <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
            {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
          </p>

          {/* Piece Selector (Interactive Segmented Control allowed per §1.A) */}
          {item.piecesOptions && item.piecesOptions.length > 1 && (
            <div className="pt-1">
              <div className="flex items-center gap-1 p-1 bg-[#1A1C26] rounded-lg border border-[#2D3140] w-full">
                {item.piecesOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedPieces(opt)}
                    className={`flex-1 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      selectedPieces === opt
                        ? 'bg-[#D97706] text-white shadow-sm'
                        : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {opt} {lang === 'ar' ? 'قطع' : 'Pcs'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Price & Add Button */}
      <div className="p-4 sm:p-5 pt-0 mt-2 border-t border-[#1F222D] flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] text-[#9CA3AF] font-medium">
            {lang === 'ar' ? 'السعر' : 'Price'}
          </span>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-xl font-extrabold text-white tabular-nums tracking-tight">
              {price}
            </span>
            <span className="text-xs font-semibold text-[#F59E0B]">
              {lang === 'ar' ? 'ج.م' : 'EGP'}
            </span>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            justAdded
              ? 'bg-[#10B981] text-white'
              : 'bg-[#D97706] hover:bg-[#F59E0B] text-white shadow-md shadow-[#D97706]/20'
          }`}
          aria-label={`Add ${item.nameEn} to bag`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تمت الإضافة' : 'Added'}</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'إضافة للسلة' : 'Add to Bag'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
