import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/menuData';
import { ProductCard } from './ProductCard';

interface MenuSectionProps {
  lang: 'ar' | 'en';
  onQuickView: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ lang, onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchNameEn = item.nameEn.toLowerCase().includes(query);
        const matchNameAr = item.nameAr.toLowerCase().includes(query);
        const matchDescEn = item.descriptionEn.toLowerCase().includes(query);
        const matchDescAr = item.descriptionAr.toLowerCase().includes(query);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));
        return matchNameEn || matchNameAr || matchDescEn || matchDescAr || matchTags;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-14 sm:py-20 border-b border-[#20222B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F59E0B] tracking-wider uppercase">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'القائمة الكاملة والأسعار الرسمية' : 'Full Menu & Official Pricing'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
              {lang === 'ar' ? 'تشكيلة سوشي أوشا الفاخرة' : 'Freshly Rolled Japanese Specialties'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md">
            {lang === 'ar'
              ? 'الأسعار شاملة التحضير الطازج الفوري مع الصوصات والوازابي والزنجبيل'
              : 'All rolls are freshly prepared with authentic wasabi, pickled ginger and dipping sauces.'}
          </p>
        </div>

        {/* Filter Toolbar: Categories & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#12141C] p-3 rounded-2xl border border-[#232733]">
          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D97706] text-white shadow-md shadow-[#D97706]/30'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A1D27]'
                  }`}
                >
                  {lang === 'ar' ? cat.nameAr : cat.nameEn}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن رول أو مكون (سالمون، جمبري، أوناجي...)' : 'Search rolls or ingredients...'}
              className="w-full bg-[#1A1C26] border border-[#2B2F3D] rounded-xl pl-9 pr-9 rtl:pr-9 rtl:pl-9 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#D97706]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 text-[#9CA3AF] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Status & Count */}
        <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
          <span>
            {lang === 'ar'
              ? `عرض ${filteredItems.length} صنف`
              : `Showing ${filteredItems.length} items`}
          </span>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[#F59E0B] hover:underline font-semibold cursor-pointer"
            >
              {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset filters'}
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                lang={lang}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl border border-dashed border-[#282C3A] bg-[#12141C] p-8 space-y-4">
            <p className="text-base font-semibold text-white">
              {lang === 'ar' ? 'لم نجد أي صنف مطابق لبحثك' : 'No items match your search criteria'}
            </p>
            <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
              {lang === 'ar'
                ? 'جرب البحث بكلمات أخرى مثل: سالمون، تمبورا، تونة، كريسبي، أو قم بإلغاء الفلتر.'
                : 'Try searching for another keyword like salmon, tempura, unagi, or reset your filters.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#D97706] text-white text-xs font-bold hover:bg-[#F59E0B] transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'عرض كل الأصناف' : 'View All Items'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
