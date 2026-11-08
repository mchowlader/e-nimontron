import React, { useState } from 'react';
import { Globe, Mail, Menu, X, Heart, Shield } from 'lucide-react';

export default function Navbar({ lang, setLang, onOpenEnvelope, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isBn = lang === 'bn';

  const navLinks = [
    { href: "#hero", labelBn: "মূলপত্র", labelEn: "Home" },
    { href: "#couple", labelBn: "বর ও কনে", labelEn: "Couple" },
    { href: "#events", labelBn: "অনুষ্ঠানসূচি", labelEn: "Events" },
    { href: "#vows", labelBn: "সপ্তপদী", labelEn: "Vows" },
    { href: "#venue", labelBn: "ভেন্যু ও ম্যাপ", labelEn: "Venue" },
    { href: "#rsvp", labelBn: "RSVP", labelEn: "RSVP" },
    { href: "#wishes", labelBn: "আশীর্বাদ", labelEn: "Wishes" },
    { href: "#gallery", labelBn: "স্মৃতিমালা", labelEn: "Gallery" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#35050b]/90 border-b border-vedic-gold/30 backdrop-blur-md shadow-lg transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-vedic-maroon border border-vedic-gold/80 flex items-center justify-center text-sm shadow group-hover:scale-105 transition-transform">
            🪷
          </span>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
              {isBn ? "শুভ বিবাহ" : "Shubh Vivah"}
            </span>
            <span className="text-[10px] text-amber-200/70 tracking-wider">
              {isBn ? "ই-নিমন্ত্রণপত্র" : "E-Nimontron"}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-amber-100/90">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-vedic-gold transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-vedic-gold after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {isBn ? link.labelBn : link.labelEn}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Re-open Envelope Button */}
          <button
            onClick={onOpenEnvelope}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-vedic-gold bg-vedic-maroonDark/80 hover:bg-vedic-maroon border border-vedic-gold/40 shadow transition"
            title={isBn ? "ডিজিটাল খাম আবার দেখুন" : "View Invitation Envelope Again"}
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isBn ? "খাম দেখুন" : "Envelope"}</span>
          </button>

          {/* Admin Dashboard Trigger */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-amber-200/90 bg-black/40 hover:bg-black/60 border border-vedic-gold/30 shadow transition"
            title={isBn ? "হোস্ট অ্যাডমিন ড্যাশবোর্ড" : "Host Admin Dashboard"}
          >
            <Shield className="w-3.5 h-3.5 text-vedic-gold" />
            <span className="hidden md:inline">{isBn ? "ড্যাশবোর্ড" : "Admin"}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(isBn ? 'en' : 'bn')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-vedic-maroonDark bg-gradient-to-r from-amber-200 to-yellow-400 hover:from-yellow-300 hover:to-amber-200 shadow transition-all transform hover:scale-105"
            title={isBn ? "Switch to English" : "বাংলায় দেখুন"}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isBn ? "English" : "বাংলা"}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-vedic-gold hover:text-white transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2d0409] border-b border-vedic-gold/40 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-vedic-gold/20">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="py-2 px-3 rounded-lg text-sm font-medium text-amber-100 hover:bg-vedic-maroon hover:text-vedic-gold transition"
              >
                {isBn ? link.labelBn : link.labelEn}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                onOpenEnvelope();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-vedic-gold hover:text-yellow-200"
            >
              <Mail className="w-4 h-4" />
              <span>{isBn ? "খাম উন্মোচন দেখুন" : "View Envelope"}</span>
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs text-amber-200 hover:text-white"
            >
              <Shield className="w-4 h-4 text-vedic-gold" />
              <span>{isBn ? "হোস্ট ড্যাশবোর্ড" : "Host Dashboard"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

