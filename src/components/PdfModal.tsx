import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 p-3 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-4xl h-[90vh] bg-[#12141D] border border-[#2B2F40] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col text-white">
        {/* Top Modal Bar */}
        <div className="p-4 border-b border-[#232733] flex items-center justify-between gap-4 bg-[#0E1017]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#D97706]/15 text-[#F59E0B]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {lang === 'ar' ? 'المنيو الرسمي المعتمد PDF - سوشي أوشا' : 'OOSHA SUSHI Official Menu PDF'}
              </h3>
              <p className="text-[11px] text-[#9CA3AF]">
                Shebin El-Kom, Monufia · Hotline: 01098528128
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={RESTAURANT_INFO.pdfMenuUrl}
              download="OOSHA_SUSHI_Official_Menu.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D97706] text-white hover:bg-[#F59E0B] transition-colors text-xs font-bold"
              title="Download Menu PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'تحميل الملف' : 'Download PDF'}</span>
            </a>

            <a
              href={RESTAURANT_INFO.pdfMenuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1A1C26] transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1A1C26] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Embedded Frame */}
        <div className="flex-1 w-full bg-[#181A24] overflow-hidden">
          <iframe
            src={`${RESTAURANT_INFO.pdfMenuUrl}#toolbar=0`}
            className="w-full h-full border-none"
            title="OOSHA SUSHI PDF Menu"
          />
        </div>
      </div>
    </div>
  );
};
