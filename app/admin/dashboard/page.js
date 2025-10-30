'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaCog, FaMusic, FaImages, FaList, FaSignOutAlt, FaEye, FaGlobe } from 'react-icons/fa';
import SettingsPanel from '@/components/admin/SettingsPanel';
import MusicPanel from '@/components/admin/MusicPanel';
import SectionsPanel from '@/components/admin/SectionsPanel';
import ImagesPanel from '@/components/admin/ImagesPanel';
import LivePreview from '@/components/admin/LivePreview';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('settings');
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const tabs = [
    { id: 'settings', label: 'Ustawienia', icon: <FaCog /> },
    { id: 'sections', label: 'Sekcje', icon: <FaList /> },
    { id: 'music', label: 'Muzyka', icon: <FaMusic /> },
    { id: 'images', label: 'Zdjęcia', icon: <FaImages /> },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-black border-b border-amber-500 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-space text-2xl golden-glow">Panel CMS</h1>
              <p className="text-gray-400 text-sm">Zarządzanie stroną artysty</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="admin-button-secondary flex items-center gap-2"
              >
                <FaEye /> {showPreview ? 'Ukryj' : 'Pokaż'} Podgląd
              </button>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="admin-button flex items-center gap-2"
              >
                <FaHome /> Strona Główna
              </a>
              <button
                onClick={handleLogout}
                className="admin-button-danger flex items-center gap-2"
              >
                <FaSignOutAlt /> Wyloguj
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className={`flex-1 ${showPreview ? 'lg:w-1/2' : 'w-full'}`}>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'settings' && <SettingsPanel />}
              {activeTab === 'sections' && <SectionsPanel />}
              {activeTab === 'music' && <MusicPanel />}
              {activeTab === 'images' && <ImagesPanel />}
            </div>
          </div>

          {/* Live Preview */}
          {showPreview && (
            <div className="lg:w-1/2">
              <div className="sticky top-24">
                <LivePreview />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
