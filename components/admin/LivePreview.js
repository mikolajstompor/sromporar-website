'use client';

import { useEffect, useState } from 'react';

export default function LivePreview() {
  const [previewUrl, setPreviewUrl] = useState('/');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Listen for updates from other components
    const handleUpdate = () => {
      setRefreshKey((prev) => prev + 1);
    };

    window.addEventListener('cms-update', handleUpdate);
    return () => window.removeEventListener('cms-update', handleUpdate);
  }, []);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="admin-card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-space text-amber-400">Podgląd Na Żywo</h2>
        <button onClick={handleRefresh} className="admin-button-secondary text-sm">
          Odśwież
        </button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <iframe
          key={refreshKey}
          src={previewUrl}
          className="w-full h-full border-0"
          title="Live Preview"
        />
      </div>

      <p className="text-gray-500 text-xs mt-2 text-center">
        Podgląd może wymagać odświeżenia po zapisaniu zmian
      </p>
    </div>
  );
}
