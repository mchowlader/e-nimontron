import React, { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { MapPin, Navigation, Car, Landmark } from 'lucide-react';

export default function VenueMap({ lang }) {
  const isBn = lang === 'bn';
  const [selectedEventIndex, setSelectedEventIndex] = useState(1); // Default to Vivah (Jhalokathi Sadar)
  const currentEvent = weddingData.events[selectedEventIndex];

  // Google Maps Embed URLs for Jhalokathi Sadar & Patharghata, Barguna
  const embedUrls = {
    holud: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58941.17122119102!2d90.17006855!3d22.6417436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5542a2253816c5%3A0xf6732f50c058c4aa!2sJhalokathi%20Sadar%20Upazila!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
    vivah: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58941.17122119102!2d90.17006855!3d22.6417436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5542a2253816c5%3A0xf6732f50c058c4aa!2sJhalokathi%20Sadar%20Upazila!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
    boubhat: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118237.53239854448!2d89.9238356!3d22.0461875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54a01c40b8a1c7%3A0x9d266e9270e51bb4!2sPatharghata%20Upazila!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
  };

  return (
    <section id="venue" className="py-20 px-4 bg-[#230307] relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-vedic-gold font-semibold">
            {isBn ? "ভেন্যু ও দিকনির্দেশনা" : "Venue & Directions"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-yellow-300 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] leading-relaxed pt-2 pb-1 inline-block">
            {isBn ? "গুগল ম্যাপে ভেন্যু অবস্থান" : "Interactive Location Map"}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto">
            {isBn
              ? "বিবাহ (ঝালকাঠি) ও বৌভাত (পাথরঘাটা) ভেন্যুর গুগল ম্যাপ অবস্থান ও ড্রাইভিং দিকনির্দেশনা"
              : "Switch between ceremony locations below to view the map and get driving directions"}
          </p>
        </div>

        {/* Venue Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {weddingData.events.map((ev, idx) => (
            <button
              key={ev.id}
              onClick={() => setSelectedEventIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedEventIndex === idx
                  ? 'bg-gradient-to-r from-amber-200 to-yellow-400 text-vedic-maroonDark shadow-lg shadow-yellow-500/20'
                  : 'bg-[#35050b] text-amber-100/80 hover:text-white border border-vedic-gold/30 hover:border-vedic-gold'
              }`}
            >
              <span>{ev.id === 'holud' ? '🌼' : ev.id === 'vivah' ? '🔥' : '🪷'}</span>
              <span>{isBn ? ev.titleBn : ev.titleEn}</span>
            </button>
          ))}
        </div>

        {/* Map and Details Card */}
        <div className="bg-gradient-to-b from-[#35050c] to-[#1d0205] border-2 border-vedic-gold/50 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Info Panel */}
            <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-vedic-gold/30">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vedic-maroonDark border border-vedic-gold/40 text-xs font-semibold text-vedic-gold">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>{isBn ? "ভেন্যু বিবরণী" : "Venue Details"}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-yellow-200">
                  {isBn ? currentEvent.venueBn : currentEvent.venueEn}
                </h3>

                <p className="text-sm text-amber-100/90 leading-relaxed">
                  {isBn ? currentEvent.addressBn : currentEvent.addressEn}
                </p>

                <div className="pt-2 border-t border-vedic-gold/20 space-y-2 text-xs text-amber-200/80">
                  <p className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-vedic-gold shrink-0" />
                    <span>{isBn ? "যানবাহন ও পার্কিং ব্যবস্থা উপলব্ধ।" : "Parking space available near venue."}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-vedic-gold shrink-0" />
                    <span>{isBn ? "সরাসরি গুগল ম্যাপে রুট নির্দেশনার জন্য নিচে ক্লিক করুন।" : "Use GPS navigation for live route."}</span>
                  </p>
                </div>
              </div>

              {/* Direct Open in Google Maps Button */}
              <div className="pt-4">
                <a
                  href={currentEvent.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-vedic-maroonDark bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 shadow-xl transition transform hover:-translate-y-0.5"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{isBn ? "গুগল ম্যাপে লাইভ রুট দেখুন" : "Get Driving Directions"}</span>
                </a>
              </div>
            </div>

            {/* Right Map Iframe */}
            <div className="lg:col-span-2 min-h-[350px] sm:min-h-[420px] relative bg-neutral-900">
              <iframe
                title={currentEvent.venueEn}
                src={embedUrls[currentEvent.id] || embedUrls.vivah}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-150 contrast-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
