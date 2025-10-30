'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaCheck } from 'react-icons/fa';

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    siteName: '',
    tagline: '',
    heroTitle: '',
    heroSubtitle: '',
    biographyTitle: '',
    biographyImage: '',
    biographyText: '',
    contactEmail: '',
    contactPhone: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      spotify: '',
      youtube: '',
    },
    theme: {
      primaryColor: '#D4AF37',
      secondaryColor: '#2C1810',
      accentColor: '#FFD700',
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Błąd podczas zapisywania ustawień');
    }
    setSaving(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setSettings({ ...settings, biographyImage: data.url });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Błąd podczas przesyłania zdjęcia');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Ładowanie...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="admin-card">
        <h2 className="text-2xl font-space mb-6 text-amber-400">Ustawienia Strony</h2>

        <div className="space-y-4">
          {/* Hero Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Sekcja Hero</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Tytuł Główny</label>
                <input
                  type="text"
                  value={settings.heroTitle}
                  onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  className="admin-input"
                  placeholder="MIKOŁAJ STOMPÓR"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Podtytuł</label>
                <input
                  type="text"
                  value={settings.heroSubtitle}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="admin-input"
                  placeholder="Essence of Art"
                />
              </div>
            </div>
          </div>

          {/* Biography Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Biografia</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Tytuł Biografii</label>
                <input
                  type="text"
                  value={settings.biographyTitle}
                  onChange={(e) => setSettings({ ...settings, biographyTitle: e.target.value })}
                  className="admin-input"
                  placeholder="Biografia"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Zdjęcie przy biografii</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="admin-input"
                />
                {settings.biographyImage && (
                  <img
                    src={settings.biographyImage}
                    alt="Biography"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Tekst Biografii</label>
                <textarea
                  value={settings.biographyText}
                  onChange={(e) => setSettings({ ...settings, biographyText: e.target.value })}
                  className="admin-input h-32"
                  placeholder="Opisz artystę..."
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Kontakt</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="admin-input"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="admin-input"
                  placeholder="+48 123 456 789"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Media Społecznościowe</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.keys(settings.socialMedia || {}).map((platform) => (
                <div key={platform}>
                  <label className="block text-gray-400 mb-2 capitalize">{platform}</label>
                  <input
                    type="url"
                    value={settings.socialMedia[platform] || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialMedia: {
                          ...settings.socialMedia,
                          [platform]: e.target.value,
                        },
                      })
                    }
                    className="admin-input"
                    placeholder={`https://${platform}.com/...`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Theme Colors */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Kolory Motywu</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Kolor Główny</label>
                <input
                  type="color"
                  value={settings.theme?.primaryColor || '#D4AF37'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, primaryColor: e.target.value },
                    })
                  }
                  className="admin-input h-12"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Kolor Drugorzędny</label>
                <input
                  type="color"
                  value={settings.theme?.secondaryColor || '#2C1810'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, secondaryColor: e.target.value },
                    })
                  }
                  className="admin-input h-12"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Kolor Akcentu</label>
                <input
                  type="color"
                  value={settings.theme?.accentColor || '#FFD700'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, accentColor: e.target.value },
                    })
                  }
                  className="admin-input h-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-button flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Zapisywanie...
              </>
            ) : saved ? (
              <>
                <FaCheck /> Zapisano!
              </>
            ) : (
              <>
                <FaSave /> Zapisz Zmiany
              </>
            )}
          </button>
          {saved && (
            <span className="text-green-400 text-sm">
              Zmiany zostały zapisane pomyślnie!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
