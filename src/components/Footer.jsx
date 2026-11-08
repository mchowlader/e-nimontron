import React from 'react';
import { weddingData } from '../data/weddingData';
import { Share2, Heart } from 'lucide-react';

export default function Footer({ lang }) {
  const isBn = lang === 'bn';

  const handleShareWhatsApp = () => {
    const text = isBn
      ? `নমস্কার! মিঠুন চন্দ্র হাওলাদার ও মনস্বিতা হালদার রিংকুর শুভ বিবাহ উপলক্ষে আপনাকে ও আপনার পরিবারকে সানন্দ নিমন্ত্রণ। ডিজিটাল নিমন্ত্রণপত্র দেখতে ক্লিক করুন: ${window.location.href}`
      : `Namaskar! You are cordially invited to the sacred wedding of Mithun Chandra Howlader & Manoswita Halder Rinku. View the digital wedding invitation here: ${window.location.href}`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <footer className="bg-[#190204] border-t-2 border-vedic-gold/40 pt-16 pb-12 px-4 text-center text-amber-100 relative">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Sacred Om and Shanti Mantra */}
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-vedic-maroonDark border border-vedic-gold text-vedic-gold text-xl font-serif shadow-inner">
            ॐ
          </div>
          <p className="text-base sm:text-lg font-serif italic text-vedic-gold tracking-widest">
            ॥ ॐ शान्तिः शान्तिः शान्तिः ॥
          </p>
          <p className="text-xs text-amber-200/70 max-w-md mx-auto">
            {isBn
              ? "সর্বত্র শান্তি, সম্প্রীতি ও ঈশ্বরীয় আশীর্বাদ বর্ষিত হোক।"
              : "May universal peace, harmony, and divine blessings prevail everywhere."}
          </p>
        </div>

        {/* Share on WhatsApp Button */}
        <div className="pt-2">
          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow-xl transition transform hover:scale-105"
          >
            <Share2 className="w-4 h-4" />
            <span>{isBn ? "হোয়াটসঅ্যাপে নিমন্ত্রণপত্র শেয়ার করুন" : "Share Invitation on WhatsApp"}</span>
          </button>
        </div>

        {/* Families Sign-off */}
        <div className="pt-6 border-t border-vedic-gold/20 text-xs sm:text-sm text-amber-200/80 space-y-1">
          <p className="font-semibold text-yellow-200">
            {isBn
              ? "হালদার ও হাওলাদার পরিবারের পক্ষ থেকে সকলকে আন্তরিক ধন্যবাদ ও প্রণাম"
              : "With humble gratitude and heartfelt regards from Halder & Howlader Families"}
          </p>
          <p className="text-[11px] text-amber-200/50">
            {isBn ? "আপনার পদধূলি আমাদের অনুষ্ঠানকে ধন্য করবে।" : "Your blessings and warm presence will grace our celebration."}
          </p>
        </div>

        {/* Platform Attribution */}
        <div className="pt-4 text-[11px] text-amber-200/40 flex items-center justify-center gap-1">
          <span>Hindu Wedding E-Nimontron Platform • Crafted with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          <span>for Lifetime Memories</span>
        </div>
      </div>
    </footer>
  );
}

