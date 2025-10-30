'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SectionsPanel() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    backgroundColor: '#2C1810',
    textColor: '#FFFFFF',
    order: 0,
    visible: true,
    type: 'text',
  });

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/sections');
      const data = await res.json();
      setSections(data.sort((a, b) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sections:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = '/api/sections';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, _id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchSections();
        resetForm();
        alert('Sekcja została zapisana!');
      }
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Błąd podczas zapisywania sekcji');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Czy na pewno chcesz usunąć tę sekcję?')) return;

    try {
      const res = await fetch(`/api/sections?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSections();
        alert('Sekcja została usunięta');
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      alert('Błąd podczas usuwania sekcji');
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
      slug: '',
      description: '',
      content: '',
      image: '',
      backgroundColor: '#2C1810',
      textColor: '#FFFFFF',
      order: 0,
      visible: true,
      type: 'text',
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Błąd podczas przesyłania zdjęcia');
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/ą/g, 'a')
      .replace(/ć/g, 'c')
      .replace(/ę/g, 'e')
      .replace(/ł/g, 'l')
      .replace(/ń/g, 'n')
      .replace(/ó/g, 'o')
      .replace(/ś/g, 's')
      .replace(/ź/g, 'z')
      .replace(/ż/g, 'z')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  if (loading) {
    return <div className="text-center py-8">Ładowanie sekcji...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="admin-card">
        <h2 className="text-2xl font-space mb-6 text-amber-400">
          {editingId ? 'Edytuj Sekcję' : 'Dodaj Nową Sekcję'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Tytuł Sekcji *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (!editingId) {
                    setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                  }
                }}
                className="admin-input"
                required
                placeholder="np. Galeria"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Slug (URL) *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="admin-input"
                required
                placeholder="np. galeria"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Opis</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="admin-input"
              placeholder="Krótki opis sekcji..."
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Treść</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="admin-input h-32"
              placeholder="Pełna treść sekcji..."
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Zdjęcie Sekcji</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="admin-input"
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Kolor Tła</label>
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                className="admin-input h-12"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Kolor Tekstu</label>
              <input
                type="color"
                value={formData.textColor}
                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                className="admin-input h-12"
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Typ Sekcji</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="admin-input"
              >
                <option value="text">Tekst</option>
                <option value="gallery">Galeria</option>
                <option value="music">Muzyka</option>
                <option value="contact">Kontakt</option>
                <option value="custom">Własny</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-8">
              <input
                type="checkbox"
                checked={formData.visible}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="w-4 h-4"
              />
              <label className="text-gray-400">Widoczna na stronie</label>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="admin-button flex items-center gap-2">
              <FaSave /> {editingId ? 'Zaktualizuj' : 'Dodaj'} Sekcję
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="admin-button-secondary flex items-center gap-2">
                <FaTimes /> Anuluj
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Sections List */}
      <div className="admin-card">
        <h2 className="text-2xl font-space mb-6 text-amber-400">Lista Sekcji</h2>

        {sections.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Brak sekcji. Dodaj pierwszą sekcję!</p>
        ) : (
          <div className="space-y-3">
            {sections.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-amber-500 transition-colors flex items-center gap-4"
                style={{ backgroundColor: item.backgroundColor + '20' }}
              >
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg" style={{ color: item.textColor }}>
                      {item.title}
                    </h3>
                    {item.visible ? (
                      <FaEye className="text-green-400" />
                    ) : (
                      <FaEyeSlash className="text-gray-500" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{item.description || 'Brak opisu'}</p>
                  <p className="text-gray-500 text-xs mt-1">Slug: /{item.slug} | Kolejność: {item.order}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-1"
                  >
                    <FaEdit /> Edytuj
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-1"
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
