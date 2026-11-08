import React from 'react';
import { weddingData } from '../data/weddingData';
import { Flame, Shield, Heart, Sparkles, Sun, Users, Infinity as InfinityIcon } from 'lucide-react';

export default function VedicVows({ lang }) {
  const isBn = lang === 'bn';
  const vows = weddingData.saptapadi;

  const getVowIcon = (step) => {
    switch (step) {
      case 1: return "🌾";
      case 2: return "🛡️";
      case 3: return "🪙";
      case 4: return "🏡";
      case 5: return "🕊️";
      case 6: return "☀️";
      case 7: return "♾️";
      default: return "🪷";
    }
  };

  return (
    <section id="vows" className="py-20 px-4 bg-[#230307] relative overflow-hidden">
      {/* Decorative fire glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vedic-maroonDark border border-vedic-gold/40 text-xs text-vedic-gold">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{isBn ? "পবিত্র অগ্নি ও সপ্তপদী" : "Sacred Agni & The Seven Vows"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-yellow-300 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] leading-relaxed pt-2 pb-1 inline-block">
            {isBn ? "বৈদিক সাতপাকের সাতটি প্রতিশ্রুতি" : "The Sacred Saptapadi"}
          </h2>

          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto">
            {isBn
              ? "হোমাগ্নিকে সাক্ষী রেখে সাতটি পবিত্র পদক্ষেপে চিরন্তন জীবনসঙ্গী হওয়ার বৈদিক সংকল্প"
              : "Seven sacred circumambulations around the holy fire, binding two souls across lifetimes"}
          </p>
        </div>

        {/* Iconic 'Sat Pake Bandha' (সাতপাকের আইকনিক জ্যামিতিক থিম — পবিত্র হোমাগ্নি ও সাতটি প্রদক্ষিণ) */}
        <div className="relative max-w-lg mx-auto bg-gradient-to-b from-[#3a060e] to-[#250307] border-2 border-vedic-gold/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-vedic-gold text-xs font-semibold uppercase tracking-wider">
            <span>❧</span>
            <span>{isBn ? "সাতপাকের পবিত্র বৈদিক মাঙ্গলিক বন্ধন" : "The Sacred Seven Circumambulations"}</span>
            <span>☙</span>
          </div>

          {/* Iconic Radial Sacred Agni & 7 Circumambulations Diagram */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center my-2">
            {/* 7 Concentric Golden Orbital Rings (সাতপাকের ৭টি বৃত্তাকার প্রদক্ষিণ পরিধি) */}
            <div className="absolute inset-0 rounded-full border border-vedic-gold/20 pointer-events-none" />
            <div className="absolute inset-3 rounded-full border border-dashed border-vedic-gold/30 pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-vedic-gold/20 pointer-events-none" />
            <div className="absolute inset-9 rounded-full border border-dashed border-yellow-400/30 pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-vedic-gold/25 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-dashed border-vedic-gold/35 pointer-events-none" />
            <div className="absolute inset-20 rounded-full border border-vedic-gold/40 pointer-events-none" />

            {/* Glowing Sacred Homakunda at Center */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-950 via-red-950 to-black border-2 border-vedic-gold shadow-[0_0_35px_rgba(245,158,11,0.5)] flex flex-col items-center justify-center">
              <span className="text-3xl animate-bounce">🔥</span>
              <span className="text-[10px] font-bold text-yellow-300 font-serif tracking-wider uppercase mt-1">
                {isBn ? "হোমাগ্নি" : "Sacred Agni"}
              </span>
            </div>

            {/* 7 Auspicious Steps / Paak Badges along the orbit */}
            {[
              { num: "১", labelBn: "অন্ন", angle: -90 },
              { num: "২", labelBn: "শক্তি", angle: -38 },
              { num: "৩", labelBn: "সমৃদ্ধি", angle: 13 },
              { num: "৪", labelBn: "সুখ", angle: 64 },
              { num: "৫", labelBn: "সন্ততি", angle: 115 },
              { num: "৬", labelBn: "শান্তি", angle: 167 },
              { num: "৭", labelBn: "বন্ধুত্ব", angle: 218 },
            ].map((p, idx) => {
              const rad = (p.angle * Math.PI) / 180;
              const r = 114;
              const x = Math.round(r * Math.cos(rad));
              const y = Math.round(r * Math.sin(rad));
              return (
                <div
                  key={idx}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className="absolute w-8 h-8 rounded-full bg-[#35050b] border border-vedic-gold/80 flex flex-col items-center justify-center text-[10px] font-bold text-yellow-300 shadow-lg hover:scale-110 transition-transform cursor-default"
                  title={`${isBn ? 'সাতপাক পদক্ষেপ' : 'Step'} ${p.num}: ${p.labelBn}`}
                >
                  <span>{p.num}</span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-amber-200/90 leading-relaxed italic max-w-sm mx-auto">
            {isBn
              ? "পবিত্র হোমাগ্নিকে সাক্ষী রেখে সপ্তপদীর সাতটি পবিত্র পদক্ষেপে দুই হৃদয়ের আজীবন একাত্মতার বৈদিক সংকল্প।"
              : "Witnessed by the sacred fire, circling seven times to vow eternal companionship across all seasons of life."}
          </p>
        </div>

        {/* Seven Vows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {vows.map((item) => (
            <div
              key={item.step}
              className={`bg-gradient-to-b from-[#35050c] to-[#240307] border border-vedic-gold/40 rounded-2xl p-5 shadow-xl hover:border-vedic-gold transition duration-300 relative group ${
                item.step === 7 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{getVowIcon(item.step)}</span>
                <span className="text-xs font-serif font-bold text-vedic-gold px-2.5 py-0.5 rounded-full bg-vedic-maroonDark border border-vedic-gold/30">
                  {isBn ? `পদ #${item.step}` : `Step #${item.step}`}
                </span>
              </div>
              <p className="text-sm text-amber-100 leading-relaxed font-medium">
                {isBn ? item.vowBn : item.vowEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
