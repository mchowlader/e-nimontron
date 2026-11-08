import React, { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { Camera, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GallerySection({ lang }) {
  const isBn = lang === 'bn';
  const gallery = weddingData.gallery || [];
  const [selectedImage, setSelectedImage] = useState(null);

  if (gallery.length === 0) return null;

  return (
    <section id="gallery" className="py-20 px-4 bg-[#210206] relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-vedic-gold font-semibold">
            {isBn ? "স্মৃতিমধুর মুহূর্ত" : "Precious Memories"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-yellow-300 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] leading-relaxed pt-2 pb-1 inline-block">
            {isBn ? "প্রাক-বিবাহ মধুর স্মৃতিমালা" : "Our Journey & Gallery"}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto">
            {isBn
              ? "শুভ পরিণয়ের শুভক্ষণে দুই হৃদয়ের একাত্ম হয়ে ওঠার সুন্দর কিছু মুহূর্ত"
              : "Glimpses of love, laughter, and timeless moments leading to the sacred union"}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-vedic-gold/40 bg-[#35050c] shadow-xl hover:border-vedic-gold transition duration-300 transform hover:-translate-y-1.5"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={isBn ? item.captionBn : item.captionEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Hover Overlay with Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                <p className="text-xs sm:text-sm font-serif font-bold text-yellow-200">
                  {isBn ? item.captionBn : item.captionEn}
                </p>
                <span className="text-[10px] text-amber-200/70 mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-vedic-gold" />
                  {isBn ? "বড় করে দেখতে ক্লিক করুন" : "Click to view full photo"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[90vh] bg-[#2a0409] border-2 border-vedic-gold rounded-3xl overflow-hidden shadow-2xl p-2"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 border border-vedic-gold text-vedic-gold hover:text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedImage.image}
              alt={isBn ? selectedImage.captionBn : selectedImage.captionEn}
              className="max-h-[78vh] w-auto mx-auto object-contain rounded-2xl"
            />

            <div className="p-3 text-center">
              <p className="text-base font-serif font-bold text-yellow-200">
                {isBn ? selectedImage.captionBn : selectedImage.captionEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

