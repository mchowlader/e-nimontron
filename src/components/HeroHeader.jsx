import React, { useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData';
import { Calendar, Clock, MapPin, Sparkles, ChevronDown } from 'lucide-react';

export default function HeroHeader({ lang }) {
  const isBn = lang === 'bn';
  const targetDate = new Date(weddingData.dates.weddingTarget).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Convert English numbers to Bengali numerals if language is Bengali
  const formatNumber = (num) => {
    const padded = String(num).padStart(2, '0');
    if (!isBn) return padded;
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return padded.split('').map(d => bnDigits[parseInt(d, 10)] || d).join('');
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 px-4 text-center overflow-hidden">
      {/* Decorative Traditional Circular Rangoli Background Motif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-600/10 via-yellow-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Divine Ganesha Inscription */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#46060f] border-2 border-vedic-gold shadow-lg shadow-yellow-500/10">
            <span className="text-3xl text-vedic-gold font-serif">ॐ</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-vedic-gold tracking-widest uppercase">
            {isBn ? weddingData.sanskrit.ganesha : weddingData.sanskrit.ganeshaEnglish}
          </h2>

          {/* Sanskrit Sloka Card */}
          <div className="inline-block max-w-xl mx-auto bg-[#38050b]/80 border border-vedic-gold/40 rounded-2xl p-4 sm:p-5 backdrop-blur-sm shadow-xl">
            <p className="text-sm sm:text-base font-serif italic text-amber-100/90 whitespace-pre-line leading-relaxed">
              "{weddingData.sanskrit.mainSloka}"
            </p>
            <p className="text-xs text-amber-200/70 mt-2 font-light">
              {isBn ? weddingData.sanskrit.mainSlokaMeaningBn : weddingData.sanskrit.mainSlokaMeaningEn}
            </p>
          </div>
        </div>

        {/* Sacred Wedding Mandap & Homagni Thematic Artwork */}
        <div className="max-w-md sm:max-w-lg mx-auto space-y-2 pt-1 pb-2">
          <div className="relative rounded-2xl overflow-hidden border-2 border-vedic-gold/60 shadow-2xl bg-white/95 group">
            <img
              src="./images/themes/theme_mandap.jpg"
              alt="শুভ বিবাহ বাসর মণ্ডপ ও হোমাগ্নি"
              className="w-full h-auto max-h-56 sm:max-h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 border border-vedic-gold/20 rounded-2xl pointer-events-none" />
          </div>
          <div className="flex items-center justify-center gap-2 text-vedic-gold">
            <span className="text-xs">🔥</span>
            <span className="text-xs font-serif font-bold text-yellow-300 tracking-wider">
              {isBn ? "॥ পবিত্র বিবাহ বাসর মণ্ডপ ও হোমাগ্নি ॥" : "|| Sacred Wedding Mandap & Homagni ||"}
            </span>
            <span className="text-xs">🔥</span>
          </div>
        </div>

        {/* Sacred Wedding Invitation Opening Statement */}
        <div className="space-y-4">
          {/* Royal Traditional Motif Crest (Zero stock photos) */}
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-vedic-gold" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38050b]/90 border border-vedic-gold/60 shadow-lg">
              <span className="text-sm">🪷</span>
              <span className="text-xs font-serif font-bold text-yellow-300 tracking-widest uppercase">
                {isBn ? "॥ শুভ বিবাহ ॥" : "|| Shubh Vivah ||"}
              </span>
              <span className="text-sm">🪷</span>
            </div>
            <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-vedic-gold" />
          </div>

          <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-200/90">
            {isBn
              ? "উভয় পরিবারের সস্নেহ আশীর্বাদে আমাদের শুভ বিবাহ অনুষ্ঠানে আপনাকে সানন্দ নিমন্ত্রণ"
              : "With the divine blessings of our families, we joyfully invite you to celebrate"}
          </p>

          {/* Couple Names Highlight - Groom First, Bride Second */}
          <div className="py-2 space-y-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-yellow-300 drop-shadow-[0_4px_20px_rgba(250,204,21,0.4)] leading-relaxed pt-3 pb-1 inline-block">
              {isBn ? weddingData.couple.groom.nameBn : weddingData.couple.groom.nameEn}
            </h1>
            <div className="flex items-center justify-center gap-4 my-2 text-vedic-gold">
              <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-vedic-gold to-transparent" />
              <span className="text-2xl sm:text-3xl font-serif font-semibold text-amber-200">
                {isBn ? "ও" : "&"}
              </span>
              <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-vedic-gold to-transparent" />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-yellow-300 drop-shadow-[0_4px_20px_rgba(250,204,21,0.4)] leading-relaxed pt-2 pb-2 inline-block">
              {isBn ? weddingData.couple.bride.nameBn : weddingData.couple.bride.nameEn}
            </h1>
          </div>

          {/* Panjika Paksha, Tithi & Auspicious Lagna Details */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-vedic-maroonDark/90 border border-vedic-gold/60 text-xs sm:text-sm text-yellow-300 font-serif font-semibold shadow-lg">
              <span>🪷</span>
              <span>
                {isBn
                  ? `॥ ${weddingData.dates.panjikaPakshaBn}, ${weddingData.dates.panjikaTithiBn} ॥`
                  : `|| ${weddingData.dates.panjikaPakshaEn}, ${weddingData.dates.panjikaTithiEn} ||`}
              </span>
              <span>🪷</span>
            </div>

            {/* Auspicious Date and Lagna Info */}
            <div>
              <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-[#260307]/80 border border-vedic-gold/40 rounded-full px-6 py-3 text-xs sm:text-sm text-amber-100 shadow-md">
                <div className="flex items-center gap-1.5 text-vedic-gold">
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span className="font-semibold">
                    {isBn ? weddingData.dates.displayDateBn : weddingData.dates.displayDateEn}
                  </span>
                </div>
                <span className="hidden sm:inline text-vedic-gold/50">•</span>
                <div className="flex items-center gap-1.5 text-amber-200">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>{isBn ? weddingData.dates.auspiciousLagnaBn : weddingData.dates.auspiciousLagnaEn}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Auspicious Countdown Timer */}
        <div className="pt-4 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-vedic-gold mb-4 font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>{isBn ? "শুভ মুহূর্ত সমাগত হতে বাকি" : "Auspicious Moment Approaches In"}</span>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </p>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
            {[
              { val: timeLeft.days, labelBn: "দিন", labelEn: "Days" },
              { val: timeLeft.hours, labelBn: "ঘণ্টা", labelEn: "Hours" },
              { val: timeLeft.minutes, labelBn: "মিনিট", labelEn: "Minutes" },
              { val: timeLeft.seconds, labelBn: "সেকেন্ড", labelEn: "Seconds" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#4a070f] to-[#2c0409] border-2 border-vedic-gold/60 rounded-2xl p-3 sm:p-4 shadow-xl transform hover:-translate-y-1 transition duration-300"
              >
                <div className="text-2xl sm:text-4xl font-serif font-bold text-yellow-300 drop-shadow">
                  {formatNumber(item.val)}
                </div>
                <div className="text-[10px] sm:text-xs text-amber-200/80 uppercase font-medium mt-1">
                  {isBn ? item.labelBn : item.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#rsvp"
            className="px-7 py-3 rounded-full text-sm font-bold text-vedic-maroonDark bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 shadow-xl hover:shadow-yellow-400/25 transition-all transform hover:-translate-y-0.5"
          >
            {isBn ? "উপস্থিতি নিশ্চিত করুন (RSVP)" : "RSVP / Confirm Attendance"}
          </a>
          <a
            href="#events"
            className="px-7 py-3 rounded-full text-sm font-semibold text-vedic-gold bg-vedic-maroonDark/90 hover:bg-vedic-maroon border border-vedic-gold/50 shadow-lg hover:border-vedic-gold transition-all"
          >
            {isBn ? "অনুষ্ঠানসূচি ও সময়" : "View Event Schedule"}
          </a>
        </div>

        {/* Scroll Down Indicator */}
        <div className="pt-6">
          <a
            href="#couple"
            className="inline-flex flex-col items-center gap-1 text-vedic-gold/60 hover:text-vedic-gold transition animate-bounce"
          >
            <span className="text-[11px] tracking-wider uppercase">
              {isBn ? "নিচে দেখুন" : "Scroll Down"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

