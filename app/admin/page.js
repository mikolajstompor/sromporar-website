'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple password check (in production, use proper authentication)
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'stompor2024';

    if (password === ADMIN_PASSWORD) {
      // Store auth token in localStorage
      localStorage.setItem('adminAuth', 'authenticated');
      router.push('/admin/dashboard');
    } else {
      setError('Nieprawidłowe hasło!');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="art-card p-8 rounded-lg">
          <h1 className="font-space text-3xl text-center mb-8 golden-glow">
            Panel Administratora
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Hasło
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder="Wprowadź hasło..."
                autoFocus
                required
              />
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="admin-button w-full"
            >
              Zaloguj się
            </button>

            <p className="text-gray-500 text-sm text-center">
              Demo: stompor2024
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
