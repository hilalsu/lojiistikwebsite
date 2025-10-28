'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  departure_date: string;
  image: string;
  whatsapp: string;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/listings/')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP Hata kodu: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setListings(data);
      })
      .catch(err => console.error('İlanlar getirilirken hata oluştu:', err));

    // Check if user is authenticated (e.g., by checking a token in localStorage)
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">LogiTrack</h1>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-blue-600">
              Giriş Yap
            </Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Kayıt Ol
            </Link>
          </div>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Lojistik Çözümleriniz İçin Güvenilir Adres</h2>
          <p className="text-xl mb-8">Güvenli, hızlı ve ekonomik lojistik hizmetleri</p>
          {isAuthenticated ? (
            <Link href="/create-listing" className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100">
              İlan Ver
            </Link>
          ) : (
            <Link href="/login" className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100">
              Giriş Yaparak İlan Ver
            </Link>
          )}
        </div>
      </section>

      {/* Listings Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Aktif İlanlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48" style={{ position: 'relative' }}>
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                <p className="text-gray-600 mb-4">{listing.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">{listing.price} TL</span>
                  <span className="text-gray-500">{listing.departure_date}</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <Link href={`/listings/${listing.id}`} className="text-blue-600 hover:underline">
                    Detayları Gör
                  </Link>
                  <a
                    href={`https://wa.me/${listing.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 