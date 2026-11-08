import React, { useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData';
import { Shield, Key, Printer, Trash2, Users, CheckCircle, XCircle, Heart, X } from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose, lang }) {
  const isBn = lang === 'bn';
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [rsvps, setRsvps] = useState([]);
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    try {
      const storedRsvps = JSON.parse(localStorage.getItem('nimontron_rsvps') || '[]');
      setRsvps(storedRsvps);

      const storedWishes = JSON.parse(localStorage.getItem('nimontron_wishes') || '[]');
      setWishes(storedWishes);
    } catch (e) {
      console.error("Error loading data", e);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === weddingData.adminPin) {
      setIsAuthenticated(true);
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
    }
  };

  const handleDeleteWish = (id) => {
    if (confirm(isBn ? "আপনি কি এই শুভেচ্ছা বার্তাটি মুছে ফেলতে চান?" : "Are you sure you want to delete this wish?")) {
      const updated = wishes.filter(w => w.id !== id);
      setWishes(updated);
      localStorage.setItem('nimontron_wishes', JSON.stringify(updated));
    }
  };

  const handleDeleteRsvp = (id) => {
    if (confirm(isBn ? "আপনি কি এই RSVP রেকর্ডটি মুছে ফেলতে চান?" : "Are you sure you want to delete this RSVP entry?")) {
      const updated = rsvps.filter(r => r.id !== id);
      setRsvps(updated);
      localStorage.setItem('nimontron_rsvps', JSON.stringify(updated));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculations
  const attendingCount = rsvps.filter(r => r.attending === 'yes').length;
  const totalGuests = rsvps
    .filter(r => r.attending === 'yes')
    .reduce((sum, r) => sum + (parseInt(r.guestCount, 10) || 0), 0);
  const declinedCount = rsvps.filter(r => r.attending === 'no').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#2a0409] border-2 border-vedic-gold rounded-3xl shadow-2xl p-6 sm:p-8 my-auto text-amber-100 max-h-[92vh] overflow-y-auto">
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-vedic-maroon text-vedic-gold hover:text-white border border-vedic-gold/40 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* PIN Authentication Screen */
          <div className="max-w-md mx-auto py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-vedic-maroonDark border-2 border-vedic-gold mx-auto flex items-center justify-center text-vedic-gold shadow-lg">
              <Shield className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-yellow-200">
                {isBn ? "হোস্ট অ্যাডমিন ড্যাশবোর্ড" : "Host Management Portal"}
              </h3>
              <p className="text-xs text-amber-200/70 mt-1">
                {isBn
                  ? "আমন্ত্রণকারী পরিবারের জন্য সুরক্ষিত ড্যাশবোর্ড। প্রবেশের জন্য পিন কোড প্রদান করুন।"
                  : "Private dashboard for the hosts to view guest confirmations and keepsake list."}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder={isBn ? "গোপন পিন লিখুন (যেমন: 1234)" : "Enter PIN (Default: 1234)"}
                  className="w-full bg-[#1b0205] border border-vedic-gold/60 rounded-xl px-4 py-3 text-center text-xl tracking-widest text-yellow-300 focus:outline-none focus:border-yellow-400 placeholder:text-xs placeholder:tracking-normal placeholder:text-amber-200/30"
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-400">
                  {isBn ? "ভুল পিন কোড! অনুগ্রহ করে সঠিক পিন প্রদান করুন।" : "Incorrect PIN! Please try again (default: 1234)."}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-bold text-vedic-maroonDark bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 shadow-xl transition"
              >
                {isBn ? "লগইন করুন" : "Unlock Dashboard"}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <div className="space-y-8 print:p-0 print:text-black">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-vedic-gold/30">
              <div>
                <span className="text-xs uppercase tracking-widest text-vedic-gold font-semibold">
                  {isBn ? "লাইভ অতিথি তালিকা ও পরিসংখ্যান" : "Live Guest Tracker"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-yellow-200">
                  {weddingData.couple.groom.nameBn} ও {weddingData.couple.bride.nameBn} এর শুভ বিবাহ
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-vedic-maroonDark bg-gradient-to-r from-amber-200 to-yellow-400 shadow hover:from-yellow-300 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isBn ? "প্রিন্ট / PDF সংরক্ষণ" : "Print / Save PDF"}</span>
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#1e0205] border border-vedic-gold/40 rounded-2xl p-4 text-center">
                <p className="text-[10px] sm:text-xs text-amber-200/70 uppercase">
                  {isBn ? "উপস্থিত সম্মতি" : "Attending"}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-green-400 mt-1">{attendingCount}</p>
                <p className="text-[10px] text-amber-200/50 mt-0.5">{isBn ? "পরিবার / ব্যক্তি" : "parties"}</p>
              </div>

              <div className="bg-[#1e0205] border border-vedic-gold/40 rounded-2xl p-4 text-center">
                <p className="text-[10px] sm:text-xs text-amber-200/70 uppercase">
                  {isBn ? "মোট অতিথি সংখ্যা" : "Total Headcount"}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-300 mt-1">{totalGuests}</p>
                <p className="text-[10px] text-amber-200/50 mt-0.5">{isBn ? "জন মেহমান" : "guests"}</p>
              </div>

              <div className="bg-[#1e0205] border border-vedic-gold/40 rounded-2xl p-4 text-center">
                <p className="text-[10px] sm:text-xs text-amber-200/70 uppercase">
                  {isBn ? "আসতে পারছেন না" : "Declined"}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-red-400 mt-1">{declinedCount}</p>
                <p className="text-[10px] text-amber-200/50 mt-0.5">{isBn ? "ব্যক্তি" : "responses"}</p>
              </div>

              <div className="bg-[#1e0205] border border-vedic-gold/40 rounded-2xl p-4 text-center">
                <p className="text-[10px] sm:text-xs text-amber-200/70 uppercase">
                  {isBn ? "প্রাপ্ত শুভেচ্ছা" : "Total Wishes"}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-300 mt-1">{wishes.length}</p>
                <p className="text-[10px] text-amber-200/50 mt-0.5">{isBn ? "বার্তা" : "messages"}</p>
              </div>
            </div>

            {/* RSVP Guest List Table */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-vedic-gold uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{isBn ? "অতিথিদের বিস্তারিত তালিকা (RSVP Responses)" : "Detailed Guest Responses"}</span>
              </h4>

              {rsvps.length === 0 ? (
                <div className="text-center py-8 bg-[#1e0205] rounded-2xl border border-vedic-gold/20 text-amber-200/60 text-xs">
                  {isBn ? "এখনও কোনো অতিথি RSVP পূরণ করেননি।" : "No guest responses submitted yet."}
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-vedic-gold/30">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1b0205] text-vedic-gold uppercase font-semibold border-b border-vedic-gold/30">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">{isBn ? "নাম" : "Name"}</th>
                        <th className="p-3">{isBn ? "মোবাইল" : "Contact"}</th>
                        <th className="p-3">{isBn ? "অবস্থা" : "Status"}</th>
                        <th className="p-3">{isBn ? "অতিথি" : "Guests"}</th>
                        <th className="p-3">{isBn ? "মন্তব্য" : "Note"}</th>
                        <th className="p-3 text-right">{isBn ? "অ্যাকশন" : "Action"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-vedic-gold/15 bg-[#250307]">
                      {rsvps.map((r, i) => (
                        <tr key={r.id} className="hover:bg-vedic-maroon/40 transition">
                          <td className="p-3 text-amber-200/60">{i + 1}</td>
                          <td className="p-3 font-semibold text-yellow-200">{r.name}</td>
                          <td className="p-3 text-amber-100">{r.phone || '-'}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                r.attending === 'yes'
                                  ? 'bg-green-900/60 text-green-300 border border-green-700/50'
                                  : 'bg-red-900/60 text-red-300 border border-red-700/50'
                              }`}
                            >
                              {r.attending === 'yes' ? (isBn ? 'আসবেন' : 'Attending') : (isBn ? 'আসছেন না' : 'Declined')}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-yellow-300">{r.guestCount || 0}</td>
                          <td className="p-3 text-amber-100/80 max-w-[180px] truncate">{r.message || '-'}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteRsvp(r.id)}
                              className="p-1 text-red-400 hover:text-red-300 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Wishes Moderation List */}
            <div className="space-y-3 pt-4 border-t border-vedic-gold/20">
              <h4 className="text-sm font-semibold text-vedic-gold uppercase tracking-wider flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>{isBn ? "শুভেচ্ছা বার্তা মডারেশন" : "Wishes Moderation"}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    className="bg-[#1b0205] border border-vedic-gold/30 rounded-xl p-3 flex items-start justify-between gap-2 text-xs"
                  >
                    <div>
                      <p className="font-bold text-yellow-200">{w.name}</p>
                      <p className="text-amber-100/80 text-[11px] line-clamp-2 mt-0.5 italic">"{w.message}"</p>
                    </div>
                    <button
                      onClick={() => handleDeleteWish(w.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

