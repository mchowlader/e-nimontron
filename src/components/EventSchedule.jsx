import React from 'react';
import { weddingData } from '../data/weddingData';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { Calendar, Clock, MapPin, ExternalLink, Download, Sparkles, Heart } from 'lucide-react';

export default function EventSchedule({ lang }) {
  const isBn = lang === 'bn';
  const events = weddingData.events;

  return (
    <section id="events" className="py-20 px-4 bg-[#2b0409] relative">
      {/* Decorative divider top */}
      <div className="flex items-center justify-center gap-3 mb-12 text-vedic-gold">
        <span className="h-px w-24 bg-gradient-to-r from-transparent to-vedic-gold" />
        <span className="text-xl">📅</span>
        <span className="h-px w-24 bg-gradient-to-l from-transparent to-vedic-gold" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-vedic-gold font-semibold">
            {isBn ? "মাঙ্গলিক দিনপঞ্জি" : "Sacred Itinerary"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-yellow-300 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] leading-relaxed pt-2 pb-1 inline-block">
            {isBn ? "অনুষ্ঠানসূচি ও শুভ লগ্ন" : "Wedding Events & Schedule"}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto">
            {isBn
              ? "গায়ে হলুদ, শুভ বিবাহ এবং বৌভাত সংবর্ধনার বিস্তারিত সময়সূচি ও ভেন্যু"
              : "Mark your calendars and join us for the joyous ceremonies across all three auspicious days"}
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative flex flex-col justify-between bg-gradient-to-b from-[#3a060e] to-[#200306] border-2 border-vedic-gold/50 rounded-3xl p-6 sm:p-7 shadow-2xl hover:border-vedic-gold transition duration-300 group"
            >
              {/* Event Badge */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-vedic-maroonDark border border-vedic-gold/80 flex items-center justify-center p-1.5 shadow-lg group-hover:scale-110 transition-transform">
                    {event.id === 'holud' ? (
                      <img src="./images/assets/biye_kula_sticker.png" alt="বিয়ের কুলা" className="w-full h-full object-contain filter drop-shadow" title="মাঙ্গলিক কুলা ও কলাপাতা" />
                    ) : event.id === 'vivah' ? (
                      <img src="./images/assets/sindoor_bowl_sticker.png" alt="সিঁদুর পাত্র" className="w-full h-full object-contain filter drop-shadow" title="মাঙ্গলিক সিঁদুর পাত্র" />
                    ) : (
                      <span className="text-xl">🪷</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-950/70 text-vedic-gold border border-vedic-gold/30">
                    {event.id === 'vivah' ? (isBn ? 'মূল বিবাহ লগ্ন' : 'Main Wedding') : (isBn ? 'মাঙ্গলিক লগ্ন' : 'Ceremony')}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="text-2xl font-serif font-bold text-yellow-200 group-hover:text-amber-300 transition">
                  {isBn ? event.titleBn : event.titleEn}
                </h3>

                {/* Date, Panjika Tithi & Time */}
                <div className="space-y-2 py-2 border-y border-vedic-gold/20 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 text-amber-100">
                    <Calendar className="w-4 h-4 text-vedic-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">{isBn ? event.dateBn : event.dateEn}</span>
                      {event.panjikaBn && (
                        <p className="text-[11px] font-serif font-semibold text-yellow-300/90 mt-0.5">
                          ॥ {isBn ? event.panjikaBn : event.panjikaEn} ॥
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-amber-200/90">
                    <Clock className="w-4 h-4 text-vedic-gold shrink-0 mt-0.5" />
                    <span>{isBn ? event.timeBn : event.timeEn}</span>
                  </div>
                </div>

                {/* Venue Details */}
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 text-amber-100">
                    <MapPin className="w-4 h-4 text-vedic-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-100">
                        {isBn ? event.venueBn : event.venueEn}
                      </p>
                      <p className="text-[11px] text-amber-200/70 mt-0.5">
                        {isBn ? event.addressBn : event.addressEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Calendar & Map */}
              <div className="pt-6 mt-6 border-t border-vedic-gold/20 space-y-2.5">
                {/* Google Calendar Link */}
                <a
                  href={getGoogleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-vedic-maroonDark bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 shadow-md transition"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isBn ? "গুগল ক্যালেন্ডারে যুক্ত করুন" : "Add to Google Calendar"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {/* Apple / Outlook .ICS Download */}
                <button
                  onClick={() => downloadIcsFile(event)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-amber-100 bg-[#2b0409] hover:bg-vedic-maroon border border-vedic-gold/40 shadow transition"
                >
                  <Download className="w-3.5 h-3.5 text-vedic-gold" />
                  <span>{isBn ? "ক্যালেন্ডার ফাইল (.ics)" : "Apple / Outlook (.ics)"}</span>
                </button>

                {/* Map Link */}
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 pt-1 text-[11px] text-vedic-gold hover:text-yellow-200 transition"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{isBn ? "গুগল ম্যাপে দিকনির্দেশনা দেখুন" : "Open in Google Maps"}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

