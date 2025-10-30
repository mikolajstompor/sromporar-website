'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUpload, FaSave, FaTimes, FaMusic } from 'react-icons/fa';

export default function MusicPanel() {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: 'Mikołaj Stompór',
    description: '',
    audioUrl: '',
    coverImage: '',
    duration: 0,
    genre: '',
    visible: true,
    order: 0,
    externalLinks: {
      spotify: '',
      youtube: '',
      soundcloud: '',
      appleMusic: '',
    },
  });

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const res = await fetch('/api/music');
      const data = await res.json();
      setMusic(data.sort((a, b) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching music:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = '/api/music';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, _id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchMusic();
        resetForm();
        alert('Muzyka została zapisana!');
      }
    } catch (error) {
      console.error('Error saving music:', error);
      alert('Błąd podczas zapisywania muzyki');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Czy na pewno chcesz usunąć ten utwór?')) return;

    try {
      const res = await fetch(`/api/music?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMusic();
        alert('Utwór został usunięty');
      }
    } catch (error) {
      console.error('Error deleting music:', error);
      alert('Błąd podczas usuwania utworu');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      artist: 'Mikołaj Stompór',
      description: '',
      audioUrl: '',
      coverImage: '',
      duration: 0,
      genre: '',
      visible: true,
      order: 0,
      externalLinks: {
        spotify: '',
        youtube: '',
        soundcloud: '',
        appleMusic: '',
      },
    });
  };

  const handleFileUpload = async (e, fieldName) => {
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
        setFormData((prev) => ({ ...prev, [fieldName]: data.url }));
        alert('Plik został przesłany!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Błąd podczas przesyłania pliku');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Ładowanie muzyki...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="admin-card">
        <h2 className="text-2xl font-space mb-6 text-amber-400 flex items-center gap-2">
          <FaMusic />
          {editingId ? 'Edytuj Utwór' : 'Dodaj Nowy Utwór'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Tytuł Utworu *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="admin-input"
                required
                placeholder="Nazwa utworu..."
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Artysta</label>
              <input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                className="admin-input"
                placeholder="Mikołaj Stompór"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Opis</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="admin-input h-24"
              placeholder="Opis utworu..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Gatunek</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="admin-input"
                placeholder="np. Electronic, Ambient..."
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Kolejność</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="admin-input"
              />
            </div>
          </div>

          {/* Audio Upload */}
          <div>
            <label className="block text-gray-400 mb-2">Plik Audio (MP3) *</label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="audio/mp3,audio/mpeg"
                onChange={(e) => handleFileUpload(e, 'audioUrl')}
                className="admin-input flex-1"
              />
              <span className="text-gray-500 text-sm">lub</span>
              <input
                type="url"
                value={formData.audioUrl}
                onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                className="admin-input flex-1"
                placeholder="Link zewnętrzny (URL)"
              />
            </div>
            {formData.audioUrl && (
              <p className="text-green-400 text-sm mt-2">Plik: {formData.audioUrl}</p>
            )}
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-400 mb-2">Okładka Utworu</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'coverImage')}
              className="admin-input"
            />
            {formData.coverImage && (
              <img
                src={formData.coverImage}
                alt="Cover"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Linki Zewnętrzne</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.keys(formData.externalLinks).map((platform) => (
                <div key={platform}>
                  <label className="block text-gray-400 mb-2 capitalize">{platform}</label>
                  <input
                    type="url"
                    value={formData.externalLinks[platform]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        externalLinks: {
                          ...formData.externalLinks,
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

          {/* Visibility */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.visible}
              onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-gray-400">Widoczny na stronie</label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button type="submit" className="admin-button flex items-center gap-2">
              <FaSave /> {editingId ? 'Zaktualizuj' : 'Dodaj'} Utwór
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="admin-button-secondary flex items-center gap-2"
              >
                <FaTimes /> Anuluj
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Music List */}
      <div className="admin-card">
        <h2 className="text-2xl font-space mb-6 text-amber-400">Lista Utworów</h2>

        {music.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Brak utworów. Dodaj pierwszy utwór!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {music.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-amber-500 transition-colors"
              >
                {item.coverImage && (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{item.artist}</p>
                {item.genre && (
                  <span className="text-xs bg-amber-600 text-black px-2 py-1 rounded">
                    {item.genre}
                  </span>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-1"
                  >
                    <FaEdit /> Edytuj
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center gap-1"
                  >
                    <FaTrash /> Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
