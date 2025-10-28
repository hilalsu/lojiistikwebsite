# Lojistik Projesi

Bu depo; `backend`, `frontend` ve `static` klasörlerinden oluşan bir lojistik uygulamasının kaynak kodlarını içerir. Bu dosya, projeyi hızlıca kurup çalıştırmanıza ve Git üzerinde sağlıklı bir akışla geliştirme yapmanıza yardımcı olmak için hazırlandı.

## İçindekiler
- Proje yapısı
- Hızlı başlangıç
- Backend çalıştırma
- Frontend çalıştırma
- Ortam değişkenleri
- Geliştirme & komutlar
- Testler
- Build/Dağıtım
- Git akışı ve commit mesajları
- Git ile bu projeyi uzağa yükleme (push)
- SSS

---

## Proje yapısı
```
lojistik/
  backend/   # Sunucu tarafı kodları (API, veritabanı, iş kuralları vb.)
  frontend/  # İstemci tarafı uygulama (UI)
  static/    # Statik varlıklar (görseller, dokümanlar vb.)
```

> Not: Alt klasörlerdeki teknoloji yığını (örn. Django/Flask veya React/Vue) proje kurulumuna göre değişebilir. Aşağıdaki komutlar tipik akışları gösterir; kendi yığınıza göre uyarlayın.

---

## Hızlı başlangıç
1) Depoyu klonlayın veya klasöre gelin
```bash
git clone <REPO_URL>
cd lojistik
```

2) Backend bağımlılıklarını kurun ve çalıştırın (örnek akış)
```bash
cd backend
# Python örneği
# python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
# pip install -r requirements.txt
# python manage.py migrate
# python manage.py runserver
```

3) Frontend bağımlılıklarını kurun ve çalıştırın (örnek akış)
```bash
cd ../frontend
# npm install
# npm run dev   # veya npm start
```

4) Uygulamayı tarayıcıda açın
- Backend: genellikle `http://localhost:8000` veya yapılandırılmış port
- Frontend: genellikle `http://localhost:3000` veya yapılandırılmış port

---

## Backend çalıştırma
Aşağıdaki akış Python tabanlı bir örnek içindir. Kendi yığınıza uyarlayın.
- Sanal ortam oluşturun ve aktifleştirin
- Bağımlılıkları kurun: `pip install -r requirements.txt`
- Gerekliyse veritabanı migrasyonlarını uygulayın
- Geliştirme sunucusunu başlatın

> Önemli: `.env` dosyasındaki değerler (örn. veritabanı bağlantısı, gizli anahtarlar) olmadan uygulama çalışmayabilir.

## Frontend çalıştırma
- Bağımlılıkları kurun: `npm install` veya `yarn`
- Geliştirme sunucusu: `npm run dev` veya `npm start`
- Üretim için derleme: `npm run build`

---

## Ortam değişkenleri
Proje, backend ve/veya frontend için ortam değişkenlerine ihtiyaç duyabilir. Önerilen yaklaşım:
- `backend/.env`
- `frontend/.env`

Örnek değişkenler (ihtiyaca göre değiştirin):
```
# Backend
DATABASE_URL=
SECRET_KEY=
DEBUG=true
ALLOWED_HOSTS=localhost,127.0.0.1

# Frontend
VITE_API_BASE_URL=http://localhost:8000
```

> Güvenlik: `.env` dosyalarını versiyon kontrolüne eklemeyin. `.gitignore` içinde hariç tutun.

---

## Geliştirme & komutlar
- Kod stilini koruyun ve linter uyarılarını giderin.
- Anlamlı fonksiyon/değişken isimleri kullanın; karmaşık akışlarda erken dönüş (guard clause) tercih edin.
- Yorumları yalnızca kritik bağlamlarda ve kısa tutun.

Örnek komutlar:
```bash
# Backend (ör.)
pytest -q            # test
ruff check .         # linter (Python ör.)

# Frontend (ör.)
npm run lint
npm run test
```
## Build/Dağıtım
- Frontend: `npm run build` çıktısı genellikle `dist/` klasörüne düşer.
- Backend: üretim yapılandırması için ortam değişkenlerini güncelleyin, veritabanı migrasyonlarını çalıştırın.
- Statik dosyalar: `static/` altında yönetilir; servis biçimi altyapıya göre değişir.

---

## Git akışı ve commit mesajları
- Ana akış: `main` (veya `master`) her zaman dağıtıma hazır olmalı.
- Yeni iş: `feature/<kısa-başlık>` dalında geliştirme yapın.
- Hata düzeltme: `fix/<kısa-başlık>`
- Yayın hazırlığı: `release/<sürüm>`





