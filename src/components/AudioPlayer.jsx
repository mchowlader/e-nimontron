import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function AudioPlayer({ lang, autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  const tracks = weddingData.music.tracks;
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Helper to start playback smoothly
  const startPlayback = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Initial autoplay waiting for user interaction:", err);
      });
    }
  };

  // 1. Try to autoplay as soon as the page loads
  useEffect(() => {
    startPlayback();

    // 2. Fallback: On the first touch, scroll, or tap anywhere on the page, start audio automatically
    const handleFirstUserInteraction = () => {
      startPlayback();
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('scroll', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstUserInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('scroll', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, []);

  // Also play when envelope is opened
  useEffect(() => {
    if (autoPlayTrigger) {
      startPlayback();
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.8;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const handleTrackChange = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.volume = 0.8;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error("Track change play error:", err);
        });
      }
    }, 150);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Audio Controller Badge */}
      <div className="fixed top-20 right-4 z-40">
        <div className="relative">
          {/* Main Floating Button */}
          <div className="flex items-center bg-[#4a070f]/95 border-2 border-vedic-gold backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.35)] p-1.5 transition-all duration-300 hover:border-yellow-300">
            <button
              onClick={togglePlay}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-vedic-maroonDark shadow-lg shadow-yellow-500/40 animate-pulse'
                  : 'bg-vedic-maroon text-vedic-gold hover:bg-vedic-crimson'
              }`}
              title={isPlaying ? "মিউজিক থামান / Pause Music" : "মাঙ্গলিক সঙ্গীত চালান / Play Music"}
            >
              {isPlaying ? (
                <Disc className="w-5 h-5 animate-spin-slow text-vedic-maroonDark" />
              ) : (
                <Play className="w-5 h-5 translate-x-0.5 text-vedic-gold" />
              )}
            </button>

            {/* Quick Track Info / Expand Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1 text-left hidden sm:block max-w-[190px]"
            >
              <p className="text-xs font-semibold text-vedic-goldLight truncate">
                {lang === 'bn' ? currentTrack.nameBn : currentTrack.nameEn}
              </p>
              <p className="text-[10px] text-amber-200/80 truncate flex items-center gap-1 font-medium">
                <Music className="w-2.5 h-2.5 text-yellow-300" />
                {isPlaying ? (lang === 'bn' ? "সুর বাজছে..." : "Playing...") : (lang === 'bn' ? "চালু করতে ক্লিক করুন" : "Click to Play")}
              </p>
            </button>

            {/* Sound Wave Animation when Playing */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-4 px-2">
                <span className="w-0.5 bg-yellow-300 animate-bounce" style={{ height: '70%', animationDelay: '0ms' }} />
                <span className="w-0.5 bg-yellow-300 animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
                <span className="w-0.5 bg-yellow-300 animate-bounce" style={{ height: '50%', animationDelay: '300ms' }} />
                <span className="w-0.5 bg-yellow-300 animate-bounce" style={{ height: '85%', animationDelay: '200ms' }} />
              </div>
            )}

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="p-2 text-vedic-gold hover:text-white transition"
              title={isMuted ? "শব্দ অন করুন" : "মিউট করুন"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-yellow-300" />}
            </button>
          </div>

          {/* Expanded Playlist Dropdown */}
          {isExpanded && (
            <div className="absolute right-0 mt-2 w-72 bg-[#3c060c] border border-vedic-gold/60 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 text-left z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-vedic-gold/20">
                <span className="text-xs font-semibold text-vedic-gold uppercase tracking-wider">
                  {lang === 'bn' ? "মাঙ্গলিক সঙ্গীত" : "Wedding Music"}
                </span>
                <span className="text-[11px] text-amber-300/70">
                  {tracks.length} {lang === 'bn' ? "টি ট্র্যাক" : "track"}
                </span>
              </div>

              <div className="space-y-2">
                {tracks.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => handleTrackChange(idx)}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 ${
                      currentTrackIndex === idx
                        ? 'bg-vedic-gold/20 border border-vedic-gold text-yellow-200'
                        : 'hover:bg-vedic-maroon/60 text-gray-300 border border-transparent'
                    }`}
                  >
                    <div className="mt-0.5">
                      {currentTrackIndex === idx && isPlaying ? (
                        <Disc className="w-4 h-4 animate-spin-slow text-vedic-gold" />
                      ) : (
                        <Music className="w-4 h-4 text-vedic-gold/60" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-vedic-goldLight leading-snug">
                        {lang === 'bn' ? t.nameBn : t.nameEn}
                      </p>
                      <p className="text-[10px] text-amber-200/60 truncate mt-0.5">
                        {lang === 'bn' ? t.subtitleBn : t.subtitleEn}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Sanskrit Mantra Snippet */}
              <div className="mt-3 pt-2.5 border-t border-vedic-gold/20 text-center">
                <p className="text-[11px] text-amber-200/80 font-serif italic">
                  "{weddingData.sanskrit.rahmanSongSloka}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
