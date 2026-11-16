import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroHeader from './components/HeroHeader';
import CoupleSection from './components/CoupleSection';
import VedicVows from './components/VedicVows';
import EventSchedule from './components/EventSchedule';
import VenueMap from './components/VenueMap';
import RsvpSection from './components/RsvpSection';
import WishesGuestbook from './components/WishesGuestbook';
import GallerySection from './components/GallerySection';
import AdminDashboard from './components/AdminDashboard';
import EnvelopeModal from './components/EnvelopeModal';
import AudioPlayer from './components/AudioPlayer';
import PetalsCanvas from './components/PetalsCanvas';
import Footer from './components/Footer';
import { weddingData } from './data/weddingData';

export default function App() {
  const [lang, setLang] = useState('bn'); // 'bn' (Bangla) or 'en' (English)
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  // Admin configurable RSVP section visibility
  const [showRsvpSection, setShowRsvpSection] = useState(() => {
    const cached = localStorage.getItem('nimontron_config_show_rsvp');
    return cached === null ? true : cached !== 'false';
  });

  // Ensure page always starts at top and never restores old scroll offset on fresh visit or reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Fetch initial config from cloud storage
  useEffect(() => {
    if (weddingData.cloudStorage?.rsvpsUrl) {
      fetch(weddingData.cloudStorage.rsvpsUrl)
        .then(res => res.json())
        .then(data => {
          if (data?.data?.config?.showRsvp !== undefined) {
            setShowRsvpSection(Boolean(data.data.config.showRsvp));
            localStorage.setItem('nimontron_config_show_rsvp', String(data.data.config.showRsvp));
          }
        })
        .catch(err => console.log('Config fetch:', err));
    }
  }, []);

  const handleEnvelopeClose = () => {
    // Reset scroll to the absolute top of the invitation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.location.hash && window.location.hash !== '#hero') {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {}
    }
    setShowEnvelope(false);
    setAutoPlayMusic(true); // Triggers audio play upon user opening the envelope
  };

  return (
    <div className="min-h-screen bg-[#250307] text-amber-100 font-sans selection:bg-vedic-gold selection:text-vedic-maroonDark relative">
      {/* Falling Flower Petals Canvas */}
      <PetalsCanvas />

      {/* Movie Sanskrit Vivaha Music & Shehnai Player */}
      <AudioPlayer lang={lang} autoPlayTrigger={autoPlayMusic} />

      {/* Royal Wax-Seal Envelope Opening Ceremony */}
      <EnvelopeModal
        isOpen={showEnvelope}
        onClose={handleEnvelopeClose}
        lang={lang}
      />

      {/* Host Admin Management Dashboard Modal */}
      <AdminDashboard
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
        lang={lang}
        showRsvpSection={showRsvpSection}
        onToggleShowRsvp={setShowRsvpSection}
      />

      {/* Floating Top Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        showRsvp={showRsvpSection}
        onOpenEnvelope={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          setShowEnvelope(true);
        }}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* Main Wedding Content Sections */}
      <main className="relative z-10">
        <HeroHeader lang={lang} showRsvp={showRsvpSection} />
        <CoupleSection lang={lang} />
        <VedicVows lang={lang} />
        <EventSchedule lang={lang} />
        <VenueMap lang={lang} />
        {showRsvpSection && <RsvpSection lang={lang} />}
        <WishesGuestbook lang={lang} />
        <GallerySection lang={lang} />
      </main>

      {/* Family Sign-off & WhatsApp Sharing */}
      <Footer lang={lang} />
    </div>
  );
}
