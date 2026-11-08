import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/weddingData';
import { Send, CheckCircle2, Users, Phone, MessageSquare, Heart } from 'lucide-react';

export default function RsvpSection({ lang, onRsvpAdded }) {
  const isBn = lang === 'bn';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    side: 'groom', // 'groom' (বর পক্ষ), 'bride' (কনে পক্ষ), 'both' (উভয় পক্ষ)
    attending: 'yes', // 'yes' or 'no'
    guestCount: 2,
    eventChoice: 'both', // 'vivah' (বিবাহ), 'boubhat' (বৌভাত), 'both' (উভয় অনুষ্ঠান)
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSubmitting(true);

    const newRsvp = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      side: formData.side, // 'groom', 'bride', 'both'
      attending: formData.attending,
      guestCount: formData.attending === 'yes' ? parseInt(formData.guestCount, 10) : 0,
      eventChoice: formData.eventChoice, // 'vivah', 'boubhat', 'both'
      message: formData.message.trim(),
      timestamp: new Date().toISOString()
    };

    // Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('nimontron_rsvps') || '[]');
      const updated = [newRsvp, ...existing];
      localStorage.setItem('nimontron_rsvps', JSON.stringify(updated));
      if (onRsvpAdded) onRsvpAdded(updated);

      // Sync to cloud storage for host access across devices
      if (weddingData.cloudStorage?.rsvpsUrl) {
        fetch(weddingData.cloudStorage.rsvpsUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: "Mithun_Manoswita_Wedding_RSVP",
            data: { rsvps: updated }
          })
        }).catch(err => console.log("Cloud RSVP sync error:", err));
      }
    } catch (err) {
      console.error("Failed to save RSVP in local storage", err);
    }

    // Confetti burst if attending
    if (formData.attending === 'yes') {
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#d4af37', '#ffd700', '#f59e0b', '#dc2626']
        });
      } catch (e) {}
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  // Generate WhatsApp confirmation message link
  const generateWhatsAppLink = () => {
    const sideText = formData.side === 'bride'
      ? (isBn ? 'কনে পক্ষ' : "Bride's Side")
      : formData.side === 'groom'
      ? (isBn ? 'বর পক্ষ' : "Groom's Side")
      : (isBn ? 'উভয় পক্ষ' : 'Both Families');

    const eventText = formData.eventChoice === 'vivah'
      ? (isBn ? 'শুভ বিবাহ (২৪ ফেব্রুয়ারি, ঝালকাঠি)' : 'Wedding Ceremony (Feb 24, Jhalokathi)')
      : formData.eventChoice === 'boubhat'
      ? (isBn ? 'শুভ বৌভাত (২৬ ফেব্রুয়ারি, পাথরঘাটা)' : 'Boubhat Reception (Feb 26, Patharghata)')
      : (isBn ? 'উভয় অনুষ্ঠান (বিবাহ ও বৌভাত)' : 'Both Events (Wedding & Boubhat)');

    const text = isBn
      ? `নমস্কার! আমি ${formData.name} (${sideText})। মিঠুন ও মনস্বিতার শুভ বিবাহ উপলক্ষে আমি ${
          formData.attending === 'yes'
            ? `আনন্দসহকারে "${eventText}"-এ উপস্থিত থাকব (মোট অতিথি: ${formData.guestCount} জন)`
            : 'অনিবার্য কারণে উপস্থিত হতে পারছি না'
        }। ${formData.message ? `বার্তা: "${formData.message}"` : ''}`
      : `Namaskar! I am ${formData.name} (${sideText}). Regarding the wedding of Mithun & Manoswita: I will ${
          formData.attending === 'yes'
            ? `joyfully attend "${eventText}" with ${formData.guestCount} guest(s)`
            : 'sadly be unable to attend'
        }. ${formData.message ? `Note: "${formData.message}"` : ''}`;

    const num = weddingData.contact.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-[#2b0409] relative">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-vedic-gold font-semibold">
            {isBn ? "উপস্থিতি নিশ্চিতকরণ" : "Répondez S'il Vous Plaît"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-yellow-300 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] leading-relaxed pt-2 pb-1 inline-block">
            {isBn ? "আপনি কি উপস্থিত থাকবেন?" : "Will You Celebrate With Us?"}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-lg mx-auto">
            {isBn
              ? "আপনার সপরিবারে আগমন আমাদের অনুষ্ঠানকে আনন্দময় ও সার্থক করে তুলবে। অনুগ্রহ করে নিচের ফর্মটি পূরণ করুন।"
              : "Your presence and blessings mean the world to us. Please let us know if you can join our celebration."}
          </p>
        </div>

        {/* RSVP Card */}
        <div className="bg-gradient-to-b from-[#3a060e] to-[#200306] border-2 border-vedic-gold/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {submitted ? (
            /* Success State */
            <div className="text-center py-8 space-y-5 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-vedic-gold/20 border-2 border-vedic-gold mx-auto flex items-center justify-center text-3xl">
                ✨
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-yellow-200">
                {isBn ? "ধন্যবাদ! আপনার উত্তর গ্রহণ করা হয়েছে" : "Thank You! Your Response is Saved"}
              </h3>

              <div className="bg-[#1f0306] border border-vedic-gold/30 rounded-2xl p-5 max-w-md mx-auto text-left text-sm text-amber-100/90 space-y-2.5">
                <p>
                  <span className="text-amber-200/60 text-xs">{isBn ? "নাম: " : "Name: "}</span>
                  <strong className="text-yellow-200">{formData.name}</strong>
                </p>
                <p>
                  <span className="text-amber-200/60 text-xs">{isBn ? "পক্ষ: " : "Side: "}</span>
                  <span className="text-yellow-300 font-semibold">
                    {formData.side === 'bride'
                      ? (isBn ? "👑 কনে পক্ষ (মনস্বিতার পক্ষ)" : "Bride's Side")
                      : formData.side === 'groom'
                      ? (isBn ? "👔 বর পক্ষ (মিঠুনের পক্ষ)" : "Groom's Side")
                      : (isBn ? "🤝 উভয় পক্ষ" : "Both Families")}
                  </span>
                </p>
                <p>
                  <span className="text-amber-200/60 text-xs">{isBn ? "স্ট্যাটাস: " : "Status: "}</span>
                  <span className={formData.attending === 'yes' ? 'text-green-400 font-semibold' : 'text-amber-300'}>
                    {formData.attending === 'yes'
                      ? (isBn ? `উপস্থিত থাকবেন (মোট ${formData.guestCount} জন)` : `Attending (${formData.guestCount} Guests)`)
                      : (isBn ? "উপস্থিত হতে পারছেন না" : "Cannot Attend")}
                  </span>
                </p>
                {formData.attending === 'yes' && (
                  <p>
                    <span className="text-amber-200/60 text-xs">{isBn ? "আমন্ত্রিত অনুষ্ঠান: " : "Attending Event: "}</span>
                    <span className="text-amber-200 font-medium">
                      {formData.eventChoice === 'vivah'
                        ? (isBn ? "🪷 শুভ বিবাহ (ঝালকাঠি)" : "Wedding Only")
                        : formData.eventChoice === 'boubhat'
                        ? (isBn ? "🍽️ শুভ বৌভাত (পাথরঘাটা)" : "Boubhat Only")
                        : (isBn ? "🎊 উভয় অনুষ্ঠান (বিবাহ ও বৌভাত)" : "Both Events")}
                    </span>
                  </p>
                )}
                {formData.phone && (
                  <p>
                    <span className="text-amber-200/60 text-xs">{isBn ? "যোগাযোগ: " : "Contact: "}</span>
                    <span>{formData.phone}</span>
                  </p>
                )}
              </div>

              {/* Instant WhatsApp Share to Host */}
              <div className="pt-3 max-w-md mx-auto space-y-3">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isBn ? "বর ও কনের পরিবারকে হোয়াটসঅ্যাপে কনফার্ম করুন" : "Send Confirmation to Host on WhatsApp"}</span>
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-vedic-gold hover:underline"
                >
                  {isBn ? "নতুন আরেকটি এন্ট্রি দিন" : "Submit another response"}
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-2">
                  {isBn ? "আপনার পুরো নাম *" : "Your Full Name *"}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={isBn ? "যেমন: অমিত চক্রবর্তী ও পরিবার" : "e.g. Amit Chakraborty & Family"}
                  className="w-full bg-[#250307] border border-vedic-gold/40 rounded-xl px-4 py-3 text-amber-100 text-sm focus:outline-none focus:border-vedic-gold placeholder-amber-200/30"
                />
              </div>

              {/* Phone or WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-2">
                  {isBn ? "ফোন / হোয়াটসঅ্যাপ নম্বর" : "Phone or WhatsApp Number"}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={isBn ? "যেমন: 01700-000000" : "e.g. +880 1700-000000"}
                  className="w-full bg-[#250307] border border-vedic-gold/40 rounded-xl px-4 py-3 text-amber-100 text-sm focus:outline-none focus:border-vedic-gold placeholder-amber-200/30"
                />
              </div>

              {/* Guest Side Selection (বর পক্ষ নাকি কনে পক্ষ) */}
              <div>
                <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-2">
                  {isBn ? "আপনি কোন পক্ষের সম্মানিত অতিথি? *" : "Whose Guest Are You? *"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, side: 'groom' }))}
                    className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                      formData.side === 'groom'
                        ? 'bg-amber-500/20 border-yellow-400 text-yellow-200 font-semibold shadow-lg shadow-yellow-500/10'
                        : 'bg-[#250307] border-vedic-gold/30 text-amber-100/70 hover:border-vedic-gold/60'
                    }`}
                  >
                    <span className="text-xl">👔</span>
                    <div>
                      <p className="font-bold text-sm text-yellow-200">{isBn ? "বর পক্ষ" : "Groom's Side"}</p>
                      <p className="text-[11px] text-amber-200/70">{isBn ? "মিঠুনের সুহৃদ ও পরিবার" : "Mithun's Side"}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, side: 'bride' }))}
                    className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                      formData.side === 'bride'
                        ? 'bg-amber-500/20 border-yellow-400 text-yellow-200 font-semibold shadow-lg shadow-yellow-500/10'
                        : 'bg-[#250307] border-vedic-gold/30 text-amber-100/70 hover:border-vedic-gold/60'
                    }`}
                  >
                    <span className="text-xl">👑</span>
                    <div>
                      <p className="font-bold text-sm text-yellow-200">{isBn ? "কনে পক্ষ" : "Bride's Side"}</p>
                      <p className="text-[11px] text-amber-200/70">{isBn ? "মনস্বিতার সুহৃদ ও পরিবার" : "Manoswita's Side"}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, side: 'both' }))}
                    className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                      formData.side === 'both'
                        ? 'bg-amber-500/20 border-yellow-400 text-yellow-200 font-semibold shadow-lg shadow-yellow-500/10'
                        : 'bg-[#250307] border-vedic-gold/30 text-amber-100/70 hover:border-vedic-gold/60'
                    }`}
                  >
                    <span className="text-xl">🤝</span>
                    <div>
                      <p className="font-bold text-sm text-yellow-200">{isBn ? "উভয় পক্ষ" : "Both Families"}</p>
                      <p className="text-[11px] text-amber-200/70">{isBn ? "উভয় পরিবারের শুভাকাঙ্ক্ষী" : "Mutual Family Friend"}</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Attending Radio Selection */}
              <div>
                <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-2">
                  {isBn ? "আপনি কি অনুষ্ঠানে উপস্থিত থাকতে পারবেন? *" : "Will You Attend? *"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      formData.attending === 'yes'
                        ? 'bg-vedic-gold/15 border-vedic-gold text-yellow-200 shadow-md'
                        : 'bg-[#250307] border-vedic-gold/30 text-amber-100/70 hover:border-vedic-gold/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleInputChange}
                      className="accent-yellow-400"
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold">
                        {isBn ? "🌸 হ্যাঁ, আনন্দসহকারে উপস্থিত থাকব" : "🌸 Joyfully Accept"}
                      </p>
                      <p className="text-[11px] text-amber-200/60 mt-0.5">
                        {isBn ? "অনুষ্ঠানে অংশ নিয়ে নবদম্পতিকে আশীর্বাদ করব" : "Will celebrate in person with love"}
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      formData.attending === 'no'
                        ? 'bg-vedic-gold/15 border-vedic-gold text-yellow-200 shadow-md'
                        : 'bg-[#250307] border-vedic-gold/30 text-amber-100/70 hover:border-vedic-gold/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleInputChange}
                      className="accent-yellow-400"
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold">
                        {isBn ? "🕊️ দুঃখিত, আসতে পারছি না" : "🕊️ Regretfully Decline"}
                      </p>
                      <p className="text-[11px] text-amber-200/60 mt-0.5">
                        {isBn ? "দূর থেকেই অন্তরের ভালোবাসা ও আশীর্বাদ রইল" : "Sending warm wishes from afar"}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Guest Count (Only if Attending) */}
              {formData.attending === 'yes' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-2">
                      {isBn ? "মোট কতজন অতিথি আসবেন?" : "Number of Guests Attending"}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        name="guestCount"
                        min="1"
                        max="10"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className="w-full accent-yellow-400 cursor-pointer"
                      />
                      <span className="w-12 h-10 rounded-xl bg-vedic-maroonDark border border-vedic-gold flex items-center justify-center font-bold text-yellow-300 text-base shadow">
                        {formData.guestCount}
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-200/60 mt-1">
                      {isBn ? "(আপনার পরিবার বা সঙ্গীদের সংখ্যাসহ মোট আসন)" : "(Including family members & kids)"}
                    </p>
                  </div>

                  {/* Event Selection: Biye naki Boubhat */}
                  <div>
                    <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-2">
                      {isBn ? "কোন অনুষ্ঠানে উপস্থিত থাকবেন? (বিয়ে নাকি বৌভাত) *" : "Which Ceremony Will You Attend? *"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, eventChoice: 'vivah' }))}
                        className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                          formData.eventChoice === 'vivah'
                            ? 'bg-amber-500/20 border-yellow-400 text-yellow-200 font-semibold shadow-md'
                            : 'bg-[#250307] border-vedic-gold/30 text-amber-100/70 hover:border-vedic-gold/60'
                        }`}
                      >
                        <span className="text-xl">🪷</span>
                        <div>
                          <p className="font-bold text-sm text-yellow-200">{isBn ? "শুভ বিবাহ" : "Wedding Only"}</p>
                          <p className="text-[11px] text-amber-200/70">{isBn ? "২৪ ফেব্রুয়ারি (ঝালকাঠি)" : "Feb 24 (Jhalokathi)"}</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, eventChoice: 'boubhat' }))}
                        className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                          formData.eventChoice === 'boubhat'
                            ? 'bg-amber-500/20 border-yellow-400 text-yellow-200 font-semibold shadow-md'
                            : 'bg-[#250307] border-vedic-gold/30 text-amber-100/70 hover:border-vedic-gold/60'
                        }`}
                      >
                        <span className="text-xl">🍽️</span>
                        <div>
                          <p className="font-bold text-sm text-yellow-200">{isBn ? "শুভ বৌভাত" : "Boubhat Only"}</p>
                          <p className="text-[11px] text-amber-200/70">{isBn ? "২৬ ফেব্রুয়ারি (পাথরঘাটা)" : "Feb 26 (Patharghata)"}</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, eventChoice: 'both' }))}
                        className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                          formData.eventChoice === 'both'
                            ? 'bg-amber-500/20 border-yellow-400 text-yellow-200 font-semibold shadow-md'
                            : 'bg-[#250307] border-vedic-gold/30 text-amber-100/70 hover:border-vedic-gold/60'
                        }`}
                      >
                        <span className="text-xl">🎊</span>
                        <div>
                          <p className="font-bold text-sm text-yellow-200">{isBn ? "উভয় অনুষ্ঠান" : "Both Events"}</p>
                          <p className="text-[11px] text-amber-200/70">{isBn ? "বিবাহ ও বৌভাত উভয়েই" : "Wedding & Reception"}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Message / Diet Preference */}
              <div>
                <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-2">
                  {isBn ? "শুভেচ্ছা বার্তা বা বিশেষ মন্তব্য (ঐচ্ছিক)" : "Personal Message / Dietary Note (Optional)"}
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={isBn ? "নবদম্পতির উদ্দেশ্যে আপনার আন্তরিক আশীর্বাদ বা কোনো বিশেষ খাবার সংক্রান্ত অনুরোধ..." : "Leave your heartfelt blessings or any dietary preferences..."}
                  className="w-full bg-[#250307] border border-vedic-gold/40 rounded-xl px-4 py-3 text-amber-100 text-sm focus:outline-none focus:border-vedic-gold placeholder-amber-200/30 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl text-sm font-bold text-vedic-maroonDark bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 shadow-xl hover:shadow-yellow-400/25 transition duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {submitting
                      ? (isBn ? "সংরক্ষণ করা হচ্ছে..." : "Submitting RSVP...")
                      : (isBn ? "উপস্থিতি নিশ্চিত করুন (Send RSVP)" : "Submit RSVP")}
                  </span>
                </button>
                <p className="text-[11px] text-center text-amber-200/60 mt-3">
                  {isBn ? "🔒 আপনার তথ্য সম্পূর্ণ সুরক্ষিত এবং কেবল বর-কনের পরিবারের কাছে সংরক্ষিত হবে।" : "🔒 Your response will be securely stored for the wedding hosts."}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

