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

        {/* Traditional 'Sat Pake Bandha' (গাঁটছড়া ও হোমাগ্নি) Conceptual Centerpiece */}
        <div className="relative max-w-md mx-auto bg-gradient-to-b from-[#3a060e] to-[#250307] border-2 border-vedic-gold/60 rounded-3xl p-6 shadow-2xl text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-vedic-gold text-xs font-semibold uppercase tracking-wider">
            <span>❧</span>
            <span>{isBn ? "গাঁটছড়া ও সাতপাকে বাঁধা" : "The Sacred Knot of Togetherness"}</span>
            <span>☙</span>
          </div>

          {/* User's uploaded Gathbandhan illustration */}
          <div className="relative p-2 rounded-2xl bg-[#1f0306]/80 border border-vedic-gold/30">
            <img
              src="./images/assets/satpake_bandha.png"
              alt="Sat Pake Bandha Gathbandhan"
              className="w-full h-52 sm:h-60 object-contain mx-auto"
            />
          </div>

          <p className="text-xs text-amber-200/90 leading-relaxed italic">
            {isBn
              ? "পবিত্র হোমাগ্নির সম্মুখে উত্তরীয় ও শাড়ির আঁচলের চিরন্তন গ্রন্থিবন্ধনে দুই হৃদয়ের অনন্ত মিলন।"
              : "United by the sacred knot, circling the holy agni to walk together through every joy and trial."}
          </p>

          {/* Saptapadi Seven Footsteps Illustration Divider */}
          <div className="pt-2 border-t border-vedic-gold/20 flex flex-col items-center">
            <img
              src="./images/assets/saptapadi_steps.png"
              alt="Saptapadi Steps"
              className="h-10 sm:h-12 w-auto object-contain opacity-90 filter drop-shadow"
            />
            <span className="text-[10px] text-vedic-gold tracking-widest mt-1 uppercase">
              {isBn ? "সপ্তপদীর পবিত্র পদচিহ্ন" : "Sacred Footsteps of Saptapadi"}
            </span>
          </div>
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
