import React, { useState } from 'react';
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

export default function App() {
  const [lang, setLang] = useState('bn'); // 'bn' (Bangla) or 'en' (English)
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  const handleEnvelopeClose = () => {
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
      />

      {/* Floating Top Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenEnvelope={() => setShowEnvelope(true)}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* Main Wedding Content Sections */}
      <main className="relative z-10">
        <HeroHeader lang={lang} />
        <CoupleSection lang={lang} />
        <VedicVows lang={lang} />
        <EventSchedule lang={lang} />
        <VenueMap lang={lang} />
        <RsvpSection lang={lang} />
        <WishesGuestbook lang={lang} />
        <GallerySection lang={lang} />
      </main>

      {/* Family Sign-off & WhatsApp Sharing */}
      <Footer lang={lang} />
    </div>
  );
}
