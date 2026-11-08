import React, { useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData';
import { Heart, Camera, Send, Image as ImageIcon, Sparkles, X, MessageSquareHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WishesGuestbook({ lang }) {
  const isBn = lang === 'bn';

  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nimontron_wishes');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Clean out legacy sample dummy wishes (id "1", "2", "3")
        const realWishes = parsed.filter(w => w.id !== "1" && w.id !== "2" && w.id !== "3");
        setWishes(realWishes);
        localStorage.setItem('nimontron_wishes', JSON.stringify(realWishes));
      } else {
        setWishes([]);
        localStorage.setItem('nimontron_wishes', JSON.stringify([]));
      }
    } catch (e) {
      setWishes([]);
    }
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(isBn ? "ছবির সাইজ ২ মেগাবাইটের কম হতে হবে।" : "Photo must be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setPhotoUrl('');
  };

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);

    const newWish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      photo: photoUrl || null
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('nimontron_wishes', JSON.stringify(updated));
    } catch (err) {
      console.warn("Storage quota exceeded or error", err);
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#ff69b4', '#d4af37']
      });
    } catch (e) {}

    setTimeout(() => {
      setName('');
      setMessage('');
      setPhotoPreview(null);
      setPhotoUrl('');
      setSubmitting(false);
    }, 400);
  };

  return (
    <section id="wishes" className="py-20 px-4 bg-[#250307] relative">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-vedic-gold font-semibold">
            {isBn ? "প্রীতি ও আশীর্বাদ" : "Love & Blessings"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-yellow-300 drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)] leading-relaxed pt-2 pb-1 inline-block">
            {isBn ? "ছবিসহ শুভেচ্ছা বার্তা ও আশীর্বাদ" : "Wishes & Photo Guestbook"}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto">
            {isBn
              ? "মিঠুন ও মনস্বিতার নতুন জীবনের শুভক্ষণে আপনার স্নেহময় আশীর্বাদ ও স্মৃতিমধুর ছবি সংযুক্ত করে পাঠিয়ে দিন"
              : "Share your heartfelt blessings, warm wishes, and upload memories for Mithun & Manoswita"}
          </p>
        </div>

        {/* Input Wish Form Card */}
        <div className="bg-gradient-to-b from-[#3a060e] to-[#200306] border-2 border-vedic-gold/50 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-1.5">
                {isBn ? "আপনার নাম *" : "Your Name *"}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isBn ? "যেমন: সুব্রত ও সুমিতা মুখার্জী" : "e.g. Subrata & Sumita Mukherjee"}
                className="w-full bg-[#250307] border border-vedic-gold/40 rounded-xl px-4 py-2.5 text-amber-100 text-sm focus:outline-none focus:border-vedic-gold placeholder-amber-200/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-1.5">
                {isBn ? "আপনার আশীর্বাদ বা শুভেচ্ছা বার্তা *" : "Your Blessing or Message *"}
              </label>
              <textarea
                rows="3"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isBn ? "মিঠুন ও মনস্বিতার সুখী দাম্পত্য জীবনের জন্য আন্তরিক শুভকামনা..." : "Wishing Mithun & Manoswita a lifetime of happiness, peace, and eternal love..."}
                className="w-full bg-[#250307] border border-vedic-gold/40 rounded-xl px-4 py-2.5 text-amber-100 text-sm focus:outline-none focus:border-vedic-gold placeholder-amber-200/30 resize-none"
              />
            </div>

            {/* Photo Attachment (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-vedic-gold uppercase tracking-wider mb-1.5">
                {isBn ? "ছবি সংযুক্ত করুন (ঐচ্ছিক)" : "Add a Photo (Optional)"}
              </label>

              {photoPreview ? (
                <div className="relative inline-block mt-1">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-xl border-2 border-vedic-gold shadow-md"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shadow hover:bg-red-700 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-vedic-gold/50 bg-[#250307] text-xs text-amber-200/80 hover:text-white hover:border-vedic-gold cursor-pointer transition">
                  <Camera className="w-4 h-4 text-vedic-gold" />
                  <span>{isBn ? "মোবাইল বা পিসি থেকে ছবি নির্বাচন করুন" : "Upload a photo from your device"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-vedic-maroonDark bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 shadow-xl transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>
                {submitting
                  ? (isBn ? "পাঠানো হচ্ছে..." : "Posting Wish...")
                  : (isBn ? "শুভেচ্ছা বার্তা পাঠান" : "Share Blessing")}
              </span>
            </button>
          </form>
        </div>

        {/* Wishes Display Wall */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs uppercase tracking-widest text-vedic-gold font-semibold">
              {isBn ? `প্রাপ্ত শুভেচ্ছা সমূহ (${wishes.length})` : `All Blessings (${wishes.length})`}
            </span>
            <span className="text-xs text-amber-200/60 font-serif italic">
              {isBn ? "॥ শুভম ভবতু ॥" : "|| Shubham Bhavatu ||"}
            </span>
          </div>

          {wishes.length === 0 ? (
            /* Empty State: Prompting first guest to bless */
            <div className="text-center py-12 px-4 bg-[#2f040a]/60 border border-vedic-gold/30 rounded-3xl space-y-3 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-vedic-maroon border border-vedic-gold/50 flex items-center justify-center text-xl mx-auto text-vedic-gold shadow">
                🪷
              </div>
              <p className="text-sm font-semibold text-yellow-200">
                {isBn ? "এখনও কোনো শুভেচ্ছা বার্তা জমা পড়েনি।" : "No wishes submitted yet."}
              </p>
              <p className="text-xs text-amber-200/70">
                {isBn
                  ? "মিঠুন ও মনস্বিতার শুভ বিবাহের প্রথম আশীর্বাদবাণীটি ও স্মৃতিছবি আপনিই পাঠিয়ে দিন!"
                  : "Be the first to share your heartfelt blessings and photos for the newlyweds!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-b from-[#35050c] to-[#1e0205] border border-vedic-gold/40 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between hover:border-vedic-gold/80 transition duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-yellow-200">{item.name}</h4>
                        <p className="text-[10px] text-amber-200/60 mt-0.5">{item.date}</p>
                      </div>
                      <span className="text-xs text-vedic-gold/50 group-hover:text-yellow-400 transition">
                        🪷
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed italic">
                      "{item.message}"
                    </p>

                    {item.photo && (
                      <div className="pt-2">
                        <img
                          src={item.photo}
                          alt="Attached by guest"
                          className="w-full max-h-48 object-cover rounded-xl border border-vedic-gold/40 shadow"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-vedic-gold/20 flex items-center justify-between text-xs text-amber-200/70">
                    <button
                      onClick={() => handleLike(item.id)}
                      className="inline-flex items-center gap-1.5 text-rose-300 hover:text-rose-200 transition"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>{(likes[item.id] || 0) > 0 ? likes[item.id] : ''}</span>
                      <span className="text-[10px]">{isBn ? "আশীর্বাদ" : "Bless"}</span>
                    </button>
                    <span className="text-[10px] text-amber-300/40 font-serif">ॐ</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
