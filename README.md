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

---

## Testler
- Birim testler: küçük ve izole senaryoları kapsar
- Entegrasyon testleri: modüller arası etkileşimi doğrular
- Gerekirse uçtan uca (E2E) testler ekleyin

> PR açmadan önce tüm testlerin geçtiğinden emin olun.

---

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

Commit mesaj formatı (öneri):
```
<tür>: <kısa açıklama>

[gerekirse detaylı açıklama]
[ilgili iş/bug referansı]
```
Örnek türler: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`, `perf`, `build`.

Örnek:
```
feat: sevkiyat listesinde gelişmiş filtreleme

- tarih aralığı ve durum bazlı filtre eklendi
- API parametreleri güncellendi
```

PR kontrol listesi (öneri):
- [ ] Testler geçiyor
- [ ] Linter/format uyarısı yok
- [ ] Gerekliyse dokümantasyon güncellendi
- [ ] Büyük değişikliklerde migrasyon talimatları eklendi

---

## Git ile bu projeyi uzağa yükleme (push)
Aşağıdaki komutlar yeni bir Git deposu başlatıp GitHub/GitLab/Bitbucket gibi uzak depoya yüklemeyi gösterir.
```bash
# Proje kökünde çalıştırın
cd C:\Users\hilal\Desktop\project\lojistik

# Eğer repo henüz git değilse başlatın
git init

# Ana branch'i main yapın (gerekirse)
git branch -M main

# Dosyaları ekleyin ve ilk commit'i oluşturun
git add .
git commit -m "docs: README eklendi ve proje açıklamaları"

# Uzak depoyu ekleyin (URL'yi değiştirin)
git remote add origin <UZAK_REPO_URL>

# İlk push
git push -u origin main
```
İpuçları:
- `.env` gibi gizli dosyaları `.gitignore` ile hariç tutun.
- Büyük dosyalar için (örn. medya), gerekiyorsa Git LFS kullanın.

---

## SSS
- S: Komutlar birebir çalışmıyor.
  - C: Proje teknoloji yığınına göre komutları uyarlayın (örn. Django/Flask, React/Vue). Gerekirse `README.md`yi güncelleyin.
- S: `.env` nerede?
  - C: `backend/.env` ve/veya `frontend/.env`. Üretim değerlerini gizli tutun.

---

Geri bildirim ve iyileştirme önerileri için PR veya Issue açabilirsiniz.
