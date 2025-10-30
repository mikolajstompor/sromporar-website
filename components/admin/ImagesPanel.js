'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaUpload } from 'react-icons/fa';

export default function ImagesPanel() {
  const [images, setImages] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [imagesRes, sectionsRes] = await Promise.all([
        fetch('/api/images'),
        fetch('/api/sections'),
      ]);

      const imagesData = await imagesRes.json();
      const sectionsData = await sectionsRes.json();

      setImages(imagesData);
      setSections(sectionsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadData.success) {
          // Create image record in database
          await fetch('/api/images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: file.name.replace(/\.[^/.]+$/, ''),
              url: uploadData.url,
              alt: file.name,
              category: 'gallery',
              visible: true,
            }),
          });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setUploading(false);
    fetchData();
    alert('Zdjęcia zostały przesłane!');
  };

  const handleDelete = async (id) => {
    if (!confirm('Czy na pewno chcesz usunąć to zdjęcie?')) return;

    try {
      const res = await fetch(`/api/images?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
        alert('Zdjęcie zostało usunięte');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Błąd podczas usuwania zdjęcia');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Ładowanie zdjęć...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="admin-card">
        <h2 className="text-2xl font-space mb-6 text-amber-400">Prześlij Zdjęcia</h2>

        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
          <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-400 mb-4">Przeciągnij pliki lub kliknij aby wybrać</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="admin-button inline-block cursor-pointer">
            {uploading ? 'Przesyłanie...' : 'Wybierz Zdjęcia'}
          </label>
        </div>
      </div>

      {/* Images Gallery */}
      <div className="admin-card">
        <h2 className="text-2xl font-space mb-6 text-amber-400">Galeria Zdjęć ({images.length})</h2>

        {images.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Brak zdjęć. Prześlij pierwsze zdjęcie!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image._id}
                className="relative group bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-amber-500 transition-colors"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold truncate">{image.title}</p>
                  <p className="text-xs text-gray-400 truncate">{image.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(image._id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
