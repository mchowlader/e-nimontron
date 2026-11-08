import React from 'react';
import { weddingData } from '../data/weddingData';
import { Heart, Sparkles } from 'lucide-react';

export default function CoupleSection({ lang }) {
  const isBn = lang === 'bn';
  const { groom, bride } = weddingData.couple;

  return (
    <section id="couple" className="py-20 px-4 relative bg-[#2a0409]">
      {/* Subtle ornate separator top */}
      <div className="flex items-center justify-center gap-3 mb-12 text-vedic-gold">
        <span className="h-px w-24 bg-gradient-to-r from-transparent to-vedic-gold" />
        <span className="text-xl">🪷</span>
        <span className="h-px w-24 bg-gradient-to-l from-transparent to-vedic-gold" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-vedic-gold font-semibold">
            {isBn ? "পবিত্র বন্ধন" : "The Auspicious Union"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-yellow-300 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] leading-relaxed pt-2 pb-1 inline-block">
            {isBn ? "বর ও কনে পরিচিতি" : "Meet The Bride & Groom"}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto">
            {isBn
              ? "উভয় পরিবারের পিতা-মাতার সশ্রদ্ধ আশীর্বাদে দুই হৃদয়ের শুভ মিলন"
              : "With the loving grace and blessings of both families, two souls unite in lifelong harmony"}
          </p>
        </div>

        {/* Sacred Vivah Sloka Divider */}
        <div className="max-w-2xl mx-auto bg-[#38050b]/90 border border-vedic-gold/40 rounded-2xl p-4 text-center shadow-lg">
          <p className="text-sm font-serif italic text-amber-100/95 leading-relaxed">
            "{weddingData.sanskrit.vivahMantra}"
          </p>
          <p className="text-xs text-amber-200/70 mt-1.5">
            {isBn ? weddingData.sanskrit.vivahMantraMeaningBn : weddingData.sanskrit.vivahMantraMeaningEn}
          </p>
        </div>

        {/* Groom & Bride Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Groom Card */}
          <div className="relative group bg-gradient-to-b from-[#3a060e] to-[#240307] border-2 border-vedic-gold/50 rounded-3xl p-6 sm:p-8 shadow-2xl hover:border-vedic-gold transition duration-300">
            {/* Top Badge */}
            <div className="inline-block px-4 py-1 rounded-full bg-vedic-maroonDark border border-vedic-gold/50 text-xs font-semibold text-vedic-gold mb-6 shadow">
              {isBn ? groom.titleBn : groom.titleEn}
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              {/* Photo Frame */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 shadow-2xl">
                <img
                  src={groom.image}
                  alt={groom.nameEn}
                  className="w-full h-full object-cover rounded-full border-2 border-[#240307]"
                />
                <span className="absolute bottom-1 right-2 w-9 h-9 rounded-full bg-vedic-maroonDark border border-vedic-gold flex items-center justify-center text-sm shadow">
                  👔
                </span>
              </div>

              {/* Groom Name & Bio */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-yellow-200">
                  {isBn ? groom.nameBn : groom.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-xs">
                  {isBn ? groom.bioBn : groom.bioEn}
                </p>
              </div>

              {/* Parents' Section & Blessings */}
              <div className="w-full mt-4 pt-5 border-t border-vedic-gold/30 text-left space-y-3 bg-[#1d0205]/60 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-vedic-gold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isBn ? "বরের পিতা-মাতা ও পরিবার" : "Groom's Parents"}</span>
                </div>
                
                <div className="space-y-1 text-sm text-amber-100">
                  <p>
                    <span className="text-amber-200/60 text-xs">{isBn ? "পিতা: " : "Father: "}</span>
                    <strong className="text-yellow-200">{isBn ? groom.parents.fatherBn : groom.parents.fatherEn}</strong>
                  </p>
                  <p>
                    <span className="text-amber-200/60 text-xs">{isBn ? "মাতা: " : "Mother: "}</span>
                    <strong className="text-yellow-200">{isBn ? groom.parents.motherBn : groom.parents.motherEn}</strong>
                  </p>
                </div>

                <div className="pt-2 border-t border-vedic-gold/20">
                  <p className="text-xs italic text-amber-200/80 leading-relaxed">
                    "{isBn ? groom.parents.blessingBn : groom.parents.blessingEn}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bride Card */}
          <div className="relative group bg-gradient-to-b from-[#3a060e] to-[#240307] border-2 border-vedic-gold/50 rounded-3xl p-6 sm:p-8 shadow-2xl hover:border-vedic-gold transition duration-300">
            {/* Top Badge */}
            <div className="inline-block px-4 py-1 rounded-full bg-vedic-maroonDark border border-vedic-gold/50 text-xs font-semibold text-vedic-gold mb-6 shadow">
              {isBn ? bride.titleBn : bride.titleEn}
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              {/* Photo Frame */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 shadow-2xl">
                <img
                  src={bride.image}
                  alt={bride.nameEn}
                  className="w-full h-full object-cover rounded-full border-2 border-[#240307]"
                />
                <span className="absolute bottom-1 right-2 w-9 h-9 rounded-full bg-vedic-maroonDark border border-vedic-gold flex items-center justify-center text-sm shadow">
                  👑
                </span>
              </div>

              {/* Bride Name & Bio */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-yellow-200">
                  {isBn ? bride.nameBn : bride.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-xs">
                  {isBn ? bride.bioBn : bride.bioEn}
                </p>
              </div>

              {/* Parents' Section & Blessings */}
              <div className="w-full mt-4 pt-5 border-t border-vedic-gold/30 text-left space-y-3 bg-[#1d0205]/60 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-vedic-gold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isBn ? "কনের পিতা-মাতা ও পরিবার" : "Bride's Parents"}</span>
                </div>
                
                <div className="space-y-1 text-sm text-amber-100">
                  <p>
                    <span className="text-amber-200/60 text-xs">{isBn ? "পিতা: " : "Father: "}</span>
                    <strong className="text-yellow-200">{isBn ? bride.parents.fatherBn : bride.parents.fatherEn}</strong>
                  </p>
                  <p>
                    <span className="text-amber-200/60 text-xs">{isBn ? "মাতা: " : "Mother: "}</span>
                    <strong className="text-yellow-200">{isBn ? bride.parents.motherBn : bride.parents.motherEn}</strong>
                  </p>
                </div>

                <div className="pt-2 border-t border-vedic-gold/20">
                  <p className="text-xs italic text-amber-200/80 leading-relaxed">
                    "{isBn ? bride.parents.blessingBn : bride.parents.blessingEn}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

