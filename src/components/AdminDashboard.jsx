import React, { useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData';
import { Shield, Key, Printer, Trash2, Users, CheckCircle, XCircle, Heart, X, Eye, EyeOff, RefreshCw } from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose, lang }) {
  const isBn = lang === 'bn';
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [isLoadingCloud, setIsLoadingCloud] = useState(false);

  const [rsvps, setRsvps] = useState([]);
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setIsLoadingCloud(true);
    try {
      // 1. Load local cache
      const storedRsvps = JSON.parse(localStorage.getItem('nimontron_rsvps') || '[]');
      setRsvps(storedRsvps);

      const storedWishes = JSON.parse(localStorage.getItem('nimontron_wishes') || '[]');
      const cleanWishes = storedWishes.filter(w => w.id !== '1' && w.id !== '2' && w.id !== '3');
      setWishes(cleanWishes);

      // 2. Fetch live cloud storage (CORS REST)
      if (weddingData.cloudStorage?.wishesUrl) {
        fetch(weddingData.cloudStorage.wishesUrl)
          .then(res => res.json())
          .then(data => {
            if (data?.data?.wishes) {
              setWishes(data.data.wishes);
              localStorage.setItem('nimontron_wishes', JSON.stringify(data.data.wishes));
            }
          })
          .catch(err => console.log('Cloud wishes:', err));
      }

      if (weddingData.cloudStorage?.rsvpsUrl) {
        fetch(weddingData.cloudStorage.rsvpsUrl)
          .then(res => res.json())
          .then(data => {
            if (data?.data?.rsvps) {
              setRsvps(data.data.rsvps);
              localStorage.setItem('nimontron_rsvps', JSON.stringify(data.data.rsvps));
            }
          })
          .catch(err => console.log('Cloud rsvps:', err));
      }
    } catch (e) {
      console.error("Error loading data", e);
    } finally {
      setIsLoadingCloud(false);
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

  const syncWishesToCloud = async (updated) => {
    if (weddingData.cloudStorage?.wishesUrl) {
      try {
        await fetch(weddingData.cloudStorage.wishesUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: "Mithun_Manoswita_Wedding_Wishes",
            data: { wishes: updated }
          })
        });
      } catch (e) {
        console.warn("Cloud sync wish update error:", e);
      }
    }
  };

  const syncRsvpsToCloud = async (updated) => {
    if (weddingData.cloudStorage?.rsvpsUrl) {
      try {
        await fetch(weddingData.cloudStorage.rsvpsUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: "Mithun_Manoswita_Wedding_RSVP",
            data: { rsvps: updated }
          })
        });
      } catch (e) {
        console.warn("Cloud sync rsvp update error:", e);
      }
    }
  };

  const handleDeleteWish = (id) => {
    if (confirm(isBn ? "আপনি কি এই শুভেচ্ছা বার্তাটি মুছে ফেলতে চান?" : "Are you sure you want to delete this wish?")) {
      const updated = wishes.filter(w => w.id !== id);
      setWishes(updated);
      localStorage.setItem('nimontron_wishes', JSON.stringify(updated));
      syncWishesToCloud(updated);
    }
  };

  const handleDeleteRsvp = (id) => {
    if (confirm(isBn ? "আপনি কি এই RSVP রেকর্ডটি মুছে ফেলতে চান?" : "Are you sure you want to delete this RSVP entry?")) {
      const updated = rsvps.filter(r => r.id !== id);
      setRsvps(updated);
      localStorage.setItem('nimontron_rsvps', JSON.stringify(updated));
      syncRsvpsToCloud(updated);
    }
  };

  const handleClearAllTestData = () => {
    if (confirm(isBn ? "সতর্কতা: এটি সমস্ত লোকাল ও ক্লাউড টেস্ট ডেটা মুছে দেবে। আপনি কি নিশ্চিত?" : "Warning: This will clear all test wishes and RSVPs. Are you sure?")) {
      setWishes([]);
      setRsvps([]);
      localStorage.setItem('nimontron_wishes', JSON.stringify([]));
      localStorage.setItem('nimontron_rsvps', JSON.stringify([]));
      syncWishesToCloud([]);
      syncRsvpsToCloud([]);
      alert(isBn ? "সকল টেস্ট ডেটা সফলভাবে মুছে ফেলা হয়েছে।" : "All test data cleared successfully.");
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

  const groomSideGuests = rsvps
    .filter(r => r.attending === 'yes' && (r.side === 'groom' || !r.side))
    .reduce((sum, r) => sum + (parseInt(r.guestCount, 10) || 0), 0);

  const brideSideGuests = rsvps
    .filter(r => r.attending === 'yes' && r.side === 'bride')
    .reduce((sum, r) => sum + (parseInt(r.guestCount, 10) || 0), 0);

  const vivahEventGuests = rsvps
    .filter(r => r.attending === 'yes' && (r.eventChoice === 'vivah' || r.eventChoice === 'both' || !r.eventChoice))
    .reduce((sum, r) => sum + (parseInt(r.guestCount, 10) || 0), 0);

  const boubhatEventGuests = rsvps
    .filter(r => r.attending === 'yes' && (r.eventChoice === 'boubhat' || r.eventChoice === 'both' || !r.eventChoice))
    .reduce((sum, r) => sum + (parseInt(r.guestCount, 10) || 0), 0);

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
                  type={showPin ? "text" : "password"}
                  autoFocus
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder={isBn ? "গোপন অ্যাডমিন পিন লিখুন" : "Enter Host Admin PIN"}
                  className="w-full bg-[#1b0205] border border-vedic-gold/60 rounded-xl px-10 py-3 text-center text-lg tracking-wider text-yellow-300 focus:outline-none focus:border-yellow-400 placeholder:text-xs placeholder:tracking-normal placeholder:text-amber-200/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-vedic-gold/70 hover:text-yellow-300 transition p-1"
                  title={showPin ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {pinError && (
                <p className="text-xs text-red-400">
                  {isBn ? "ভুল পিন কোড! অনুগ্রহ করে সঠিক পিন প্রদান করুন।" : "Incorrect PIN! Please try again."}
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

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={loadData}
                  disabled={isLoadingCloud}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-100 bg-[#3a060d] border border-vedic-gold/40 hover:bg-[#4d0912] shadow transition"
                  title={isBn ? "ক্লাউড থেকে নতুন ডেটা রিফ্রেশ করুন" : "Refresh data from cloud"}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCloud ? 'animate-spin' : ''}`} />
                  <span>{isBn ? "রিফ্রেশ" : "Refresh"}</span>
                </button>

                <button
                  onClick={handleClearAllTestData}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-200 bg-red-950/60 border border-red-500/40 hover:bg-red-900/80 shadow transition"
                  title={isBn ? "টেস্ট ডেটা মুছুন" : "Clear Test Data"}
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>{isBn ? "টেস্ট ডেটা মুছুন" : "Clear Test Data"}</span>
                </button>

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

            {/* Side & Event Breakdown Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#170204] border border-vedic-gold/30 rounded-2xl p-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">👔</span>
                <div>
                  <span className="text-amber-200/60 text-[10px] block">{isBn ? "বর পক্ষ" : "Groom Side"}</span>
                  <span className="font-bold text-yellow-300">{groomSideGuests} জন</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">👑</span>
                <div>
                  <span className="text-amber-200/60 text-[10px] block">{isBn ? "কনে পক্ষ" : "Bride Side"}</span>
                  <span className="font-bold text-yellow-300">{brideSideGuests} জন</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">🪷</span>
                <div>
                  <span className="text-amber-200/60 text-[10px] block">{isBn ? "বিবাহে উপস্থিতি" : "Vivah Guests"}</span>
                  <span className="font-bold text-amber-200">{vivahEventGuests} জন</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">🍽️</span>
                <div>
                  <span className="text-amber-200/60 text-[10px] block">{isBn ? "বৌভাতে উপস্থিতি" : "Boubhat Guests"}</span>
                  <span className="font-bold text-amber-200">{boubhatEventGuests} জন</span>
                </div>
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
                        <th className="p-3">{isBn ? "পক্ষ" : "Side"}</th>
                        <th className="p-3">{isBn ? "অনুষ্ঠান" : "Event"}</th>
                        <th className="p-3">{isBn ? "অবস্থা" : "Status"}</th>
                        <th className="p-3">{isBn ? "অতিথি" : "Guests"}</th>
                        <th className="p-3">{isBn ? "মোবাইল" : "Contact"}</th>
                        <th className="p-3">{isBn ? "মন্তব্য" : "Note"}</th>
                        <th className="p-3 text-right">{isBn ? "অ্যাকশন" : "Action"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-vedic-gold/15 bg-[#250307]">
                      {rsvps.map((r, i) => (
                        <tr key={r.id} className="hover:bg-vedic-maroon/40 transition">
                          <td className="p-3 text-amber-200/60">{i + 1}</td>
                          <td className="p-3 font-semibold text-yellow-200">{r.name}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 border border-vedic-gold/30 text-yellow-300">
                              {r.side === 'bride' ? '👑 কনে পক্ষ' : r.side === 'both' ? '🤝 উভয় পক্ষ' : '👔 বর পক্ষ'}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#35050b] border border-vedic-gold/20 text-amber-200">
                              {r.eventChoice === 'vivah' ? '🪷 বিবাহ' : r.eventChoice === 'boubhat' ? '🍽️ বৌভাত' : '🎊 উভয়'}
                            </span>
                          </td>
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
                          <td className="p-3 text-amber-100">{r.phone || '-'}</td>
                          <td className="p-3 text-amber-100/80 max-w-[150px] truncate">{r.message || '-'}</td>
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

