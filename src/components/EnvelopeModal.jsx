import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/weddingData';
import { Sparkles, Heart } from 'lucide-react';

export default function EnvelopeModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  const handleOpenInvitation = () => {
    // 1. Immediately start audio on synchronous user gesture
    window.dispatchEvent(new CustomEvent('wedding-play-audio'));

    // 2. Festive confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { x: 0.5, y: 0.7 },
        startVelocity: 45,
        colors: ['#ffd700', '#f59e0b', '#dc2626', '#ff9900', '#fff3b0']
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }

    // 3. Immediately close envelope and show main invitation page
    onClose();
  };

  const isBn = lang === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-500">
      <div className="relative w-full max-w-lg transition-all duration-500 transform scale-100 opacity-100">
        {/* Background Divine Halo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 rounded-3xl blur-2xl -z-10 animate-pulse" />

        {/* Envelope Container */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-vedic-gold shadow-[0_0_50px_rgba(212,175,55,0.4)] bg-[#3a060d]">
          {/* Top Flap Decorative Triangle */}
          <div className="relative bg-gradient-to-b from-[#5c0b16] to-[#40060e] pt-8 pb-6 px-6 text-center border-b border-vedic-gold/40">
            {/* Sacred Om Symbol */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-vedic-maroonDark border border-vedic-gold/80 shadow-inner mb-3 text-2xl text-vedic-gold font-serif">
              ॐ
            </div>
            <p className="text-sm font-semibold tracking-widest text-vedic-gold uppercase">
              {isBn ? weddingData.sanskrit.ganesha : weddingData.sanskrit.ganeshaEnglish}
            </p>
            <p className="text-xs text-amber-200/80 mt-1 font-serif italic">
              {isBn ? "॥ শুভ বিবাহ নিমন্ত্রণপত্র ॥" : "|| Sacred Wedding Invitation ||"}
            </p>
          </div>

          {/* Envelope Body */}
          <div className="p-6 sm:p-8 text-center space-y-5 bg-gradient-to-b from-[#40060e] via-[#4a070f] to-[#30040a]">
            {/* Corner Ornaments */}
            <div className="text-vedic-gold/40 text-xs flex justify-between px-2">
              <span>❧</span>
              <span className="tracking-widest uppercase text-[10px] text-amber-300/80">
                {isBn ? "পরম মাঙ্গলিক আমন্ত্রণ" : "Auspicious Invitation"}
              </span>
              <span>☙</span>
            </div>

            {/* Couple Names Preview - Groom First, Bride Second */}
            <div className="py-2 space-y-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-yellow-300 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] leading-relaxed pt-2 pb-1 inline-block">
                {isBn ? weddingData.couple.groom.nameBn : weddingData.couple.groom.nameEn}
              </h2>
              <div className="flex items-center justify-center gap-3 my-1.5 text-vedic-gold">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-vedic-gold" />
                <Heart className="w-4 h-4 fill-vedic-gold" />
                <span className="h-px w-12 bg-gradient-l from-transparent to-vedic-gold" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-yellow-300 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] leading-relaxed pt-1 pb-2 inline-block">
                {isBn ? weddingData.couple.bride.nameBn : weddingData.couple.bride.nameEn}
              </h2>
            </div>

            {/* Panjika, Date and Venue Snippet */}
            <div className="bg-[#260307]/70 border border-vedic-gold/30 rounded-2xl py-3 px-4 text-xs text-amber-100/90 space-y-1.5">
              <p className="font-semibold text-yellow-300">
                📅 {isBn ? weddingData.dates.displayDateBn : weddingData.dates.displayDateEn}
              </p>
              <p className="text-[11px] text-amber-200">
                {isBn
                  ? `॥ ${weddingData.dates.panjikaPakshaBn}, ${weddingData.dates.panjikaTithiBn} ॥`
                  : `|| ${weddingData.dates.panjikaPakshaEn}, ${weddingData.dates.panjikaTithiEn} ||`}
              </p>
              <p className="text-amber-200/70 text-[11px]">
                📍 {isBn ? weddingData.events[1].venueBn : weddingData.events[1].venueEn}
              </p>
            </div>

            {/* Wax Seal Action Button */}
            <div className="pt-3">
              <button
                onClick={handleOpenInvitation}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-base font-semibold text-vedic-maroonDark bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 shadow-xl hover:shadow-yellow-400/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {/* Simulated Wax Seal Badge */}
                <span className="w-7 h-7 rounded-full bg-vedic-maroon border border-amber-200/80 flex items-center justify-center text-xs text-vedic-gold font-bold shadow-inner group-hover:scale-110 transition-transform">
                  🪷
                </span>
                <span>
                  {isBn ? "নিমন্ত্রণপত্রটি খুলুন" : "Open Invitation"}
                </span>
                <Sparkles className="w-4 h-4 text-vedic-maroon" />
              </button>
              <p className="text-[11px] text-amber-300/60 mt-3">
                {isBn ? "সিলমোহরে স্পর্শ করে ডিজিটাল নিমন্ত্রণপত্র উন্মোচন করুন" : "Tap the wax seal to unveil the sacred wedding card"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

