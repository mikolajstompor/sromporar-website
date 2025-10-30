'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MusicPlayer from '@/components/MusicPlayer';
import SectionCard from '@/components/SectionCard';
import SocialShare from '@/components/SocialShare';

export default function Home() {
  const [sections, setSections] = useState([]);
  const [music, setMusic] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sectionsRes, musicRes, settingsRes] = await Promise.all([
        fetch('/api/sections'),
        fetch('/api/music'),
        fetch('/api/settings'),
      ]);

      const sectionsData = await sectionsRes.json();
      const musicData = await musicRes.json();
      const settingsData = await settingsRes.json();

      setSections(sectionsData.filter(s => s.visible).sort((a, b) => a.order - b.order));
      setMusic(musicData.filter(m => m.visible).sort((a, b) => a.order - b.order));
      setSettings(settingsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-amber-500 font-space">Ładowanie...</p>
        </div>
      </div>
    );
  }

  const heroTitle = settings?.heroTitle || 'MIKOŁAJ STOMPÓR';
  const heroSubtitle = settings?.heroSubtitle || 'Essence of Art';
  const biographyTitle = settings?.biographyTitle || 'Biografia';
  const biographyImage = settings?.biographyImage || '';
  const biographyText = settings?.biographyText || '';

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm z-50 border-b border-yellow-600 border-opacity-30" style={{ background: 'rgba(10, 11, 10, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="font-space text-lg font-bold straw-glow">{heroTitle}</div>

            <div className="hidden md:flex space-x-4">
              <a href="#home" className="nav-glow px-2 py-1 text-xs font-medium hover:text-amber-300 transition-colors">
                Strona Główna
              </a>
              <a href="#biography" className="nav-glow px-2 py-1 text-xs font-medium hover:text-amber-300 transition-colors">
                Biografia
              </a>
              <a href="#music" className="nav-glow px-2 py-1 text-xs font-medium hover:text-amber-300 transition-colors">
                Muzyka
              </a>
              <a href="#sections" className="nav-glow px-2 py-1 text-xs font-medium hover:text-amber-300 transition-colors">
                Sekcje
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/admin" className="nav-glow px-3 py-1 text-xs font-medium bg-amber-600 hover:bg-amber-700 text-black rounded transition-colors">
                ADMIN
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
        <div className="floating-particles"></div>
        <div className="text-center z-10 px-4">
          <h1 className="font-space text-4xl md:text-6xl font-bold mb-4 straw-glow text-glow">
            {heroTitle}
          </h1>
          <p className="font-space text-lg md:text-2xl italic pulse-straw golden-glow">
            {heroSubtitle}
          </p>
          <SocialShare
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={heroTitle}
            className="mt-8"
          />
        </div>
      </section>

      {/* Biography Section */}
      <section id="biography" className="py-16 px-4" style={{ background: 'rgba(21, 22, 21, 0.8)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-space text-2xl md:text-3xl text-center mb-12 straw-glow text-glow">
            {biographyTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="art-card p-6 rounded-lg">
              {biographyImage ? (
                <img src={biographyImage} alt="Mikołaj Stompór" className="w-full h-auto rounded-lg" />
              ) : (
                <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
                  <span className="text-lg font-space text-black font-bold">ARTYSTA</span>
                </div>
              )}
            </div>
            <div className="text-gray-300 leading-relaxed">
              {biographyText ? (
                <p className="whitespace-pre-wrap">{biographyText}</p>
              ) : (
                <p>Artysta malarz, konserwator dzieł sztuki, twórca muzyki elektronicznej i performansów audiowizualnych.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      {music.length > 0 && (
        <section id="music" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-space text-2xl md:text-3xl text-center mb-12 golden-glow text-glow">
              Muzyka
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {music.map((track) => (
                <MusicPlayer key={track._id} track={track} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      {sections.length > 0 && (
        <section id="sections" className="py-16 px-4" style={{ background: 'rgba(21, 22, 21, 0.7)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-space text-2xl md:text-3xl text-center mb-12 golden-glow text-glow">
              Sekcje
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <SectionCard key={section._id} section={section} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black bg-opacity-90 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">© 2025 {heroTitle}. Wszystkie prawa zastrzeżone.</p>
          {settings?.contactEmail && (
            <p className="text-gray-500">Kontakt: {settings.contactEmail}</p>
          )}
        </div>
      </footer>
    </main>
  );
}
