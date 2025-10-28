'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchWithAuth } from '../../lib/api';

export default function CreateListing() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    departure_date: '',
    whatsapp: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check if user is authenticated (e.g., by checking a token in localStorage)
    const token = localStorage.getItem('accessToken'); // Assuming token is stored here
    if (!token) {
      router.push('/login'); // Redirect to login page if not authenticated
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const response = await fetchWithAuth('http://localhost:8000/api/listings/', {
        method: 'POST',
        body: formDataToSend,
        // Authorization header is handled by fetchWithAuth
        // credentials: 'include', // credentials handled by fetchWithAuth
      });

      if (response && response.ok) {
        setSuccessMessage('İlan başarıyla oluşturuldu!');
        setFormData({
          title: '',
          description: '',
          price: '',
          departure_date: '',
          whatsapp: '',
        });
        setImage(null);
        // Optionally, redirect after a short delay
        setTimeout(() => router.push('/'), 2000);
      } else if (response && response.status === 401) {
        setError('Giriş yapmanız gerekiyor.');
        router.push('/login');
      } else {
        const data = response ? await response.json() : { message: 'Bilinmeyen Hata' };
        setError(data.message || 'İlan oluşturma başarısız');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>; // Or a proper loading component
  }

  if (!isAuthenticated) {
    return null; // Should be redirected by useEffect, but good fallback
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Ana Sayfaya Dön
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 animate-fade-in" role="alert">
                <strong className="font-bold">Hata!</strong>
                <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-6 animate-fade-in" role="alert">
                <strong className="font-bold">Başarılı!</strong>
                <span className="block sm:inline ml-2">{successMessage}</span>
            </div>
          )}

          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Yeni İlan Oluştur</h1>

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                İlan Başlığı
              </label>
              <input
                type="text"
                id="title"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                id="description"
                required
                rows={4}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Fiyat (TL)
              </label>
              <input
                type="number"
                id="price"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="departure_date" className="block text-sm font-medium text-gray-700 mb-2">
                Çıkış Tarihi
              </label>
              <input
                type="date"
                id="departure_date"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={formData.departure_date}
                onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Numarası
              </label>
              <input
                type="tel"
                id="whatsapp"
                required
                placeholder="905xxxxxxxxx"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                İlan Görseli
              </label>
              <input
                type="file"
                id="image"
                required
                accept="image/*"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                İlanı Yayınla
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 