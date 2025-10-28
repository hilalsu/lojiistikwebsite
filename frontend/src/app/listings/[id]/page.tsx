'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  departure_date: string;
  image: string;
  whatsapp: string;
  user: {
    username: string;
    email: string;
  };
}

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Current Listing ID:', id);
    fetch(`http://localhost:8000/api/listings/${id}/`)
      .then(res => {
        console.log('API Yanıtı:', res);
        if (!res.ok) {
          throw new Error(`HTTP Hata kodu: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('API Verisi:', data);
        setListing(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('İlan detayı getirilirken hata oluştu:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Yükleniyor...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">İlan bulunamadı</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Ana Sayfaya Dön
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96" style={{ position: 'relative' }}>
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            <p className="text-gray-600 mb-6">{listing.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">İlan Detayları</h2>
                <div className="space-y-2">
                  <p><span className="font-semibold">Fiyat:</span> {listing.price} TL</p>
                  <p><span className="font-semibold">Çıkış Tarihi:</span> {listing.departure_date}</p>
                  <p><span className="font-semibold">İlan Sahibi:</span> {listing.user.username}</p>
                  <p><span className="font-semibold">E-posta:</span> {listing.user.email}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">İletişim</h2>
                <a
                  href={`https://wa.me/${listing.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
                >
                  WhatsApp ile İletişime Geç
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 