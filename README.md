# Strona Artysty z Pełnym Panelem CMS

Profesjonalna strona internetowa dla artysty muzycznego z pełnym panelem administratora (CMS) umożliwiającym zarządzanie całą zawartością strony.

## 🎨 Funkcjonalności

### Panel Administratora (CMS)
- ✅ **Zarządzanie Ustawieniami** - Pełna kontrola nad wyglądem i treścią strony
- ✅ **Zarządzanie Muzyką** - Upload plików MP3, linki zewnętrzne (Spotify, YouTube, SoundCloud)
- ✅ **Odtwarzacz Audio** - Wbudowany odtwarzacz muzyki z paskiem postępu
- ✅ **Zarządzanie Sekcjami** - Tworzenie i edycja sekcji strony (Galeria, Biografia, Kontakt, itp.)
- ✅ **Zarządzanie Zdjęciami** - Upload i zarządzanie galerią zdjęć
- ✅ **Live Preview** - Podgląd zmian w czasie rzeczywistym
- ✅ **Edycja Tekstów** - Pełna kontrola nad wszystkimi tekstami na stronie
- ✅ **Edycja Zdjęć** - Możliwość podmiany obrazów (biografia, sekcje, muzyka)
- ✅ **Kontrola Wyglądu** - Zarządzanie kolorami, tłami, kolejnością sekcji
- ✅ **Social Media Sharing** - Udostępnianie w Facebook, Twitter, LinkedIn, WhatsApp
- ✅ **Responsywny Design** - Działa na komputerze i telefonie

### Strona Główna
- Dynamiczna strona wczytująca dane z bazy
- Sekcja Hero z konfigurowalnymi tekstami
- Sekcja Biografia z edytowalnym zdjęciem i tekstem
- Odtwarzacz muzyki z wieloma utworami
- Dynamiczne sekcje tworzone przez admina
- Integracja z mediami społecznościowymi

## 🚀 Technologie

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Baza Danych**: MongoDB + Mongoose
- **Upload Plików**: Wbudowany system uploadów
- **Ikony**: React Icons
- **Styling**: Tailwind CSS + Custom CSS

## 📦 Instalacja

### Wymagania
- Node.js 18+
- MongoDB (lokalnie lub MongoDB Atlas)
- npm lub yarn

### Kroki instalacji

1. **Sklonuj repozytorium**
\`\`\`bash
git clone <repository-url>
cd sromporar-website
\`\`\`

2. **Zainstaluj zależności**
\`\`\`bash
npm install
\`\`\`

3. **Skonfiguruj zmienne środowiskowe**
\`\`\`bash
cp .env.example .env
\`\`\`

Edytuj plik \`.env\` i ustaw swoje wartości:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/artist-cms
NEXT_PUBLIC_ADMIN_PASSWORD=twoje-haslo
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

4. **Uruchom MongoDB**
- Jeśli używasz lokalnej instancji:
\`\`\`bash
mongod
\`\`\`
- Lub użyj MongoDB Atlas (cloud) i zaktualizuj MONGODB_URI

5. **Uruchom aplikację w trybie deweloperskim**
\`\`\`bash
npm run dev
\`\`\`

Aplikacja będzie dostępna pod adresem: **http://localhost:3000**

6. **Zaloguj się do panelu admina**
- Przejdź do: **http://localhost:3000/admin**
- Hasło domyślne: **stompor2024** (zmień w pliku .env)

## 🎯 Użytkowanie

### Panel Administratora

#### Logowanie
1. Przejdź do `/admin`
2. Wprowadź hasło (domyślnie: `stompor2024`)
3. Kliknij "Zaloguj się"

#### Zarządzanie Ustawieniami
1. W panelu admina wybierz zakładkę **"Ustawienia"**
2. Edytuj:
   - Tytuły i podtytuły strony
   - Biografię (tekst i zdjęcie)
   - Dane kontaktowe
   - Linki do mediów społecznościowych
   - Kolory motywu
3. Kliknij **"Zapisz Zmiany"**

#### Dodawanie Muzyki
1. Wybierz zakładkę **"Muzyka"**
2. Wypełnij formularz:
   - Tytuł utworu
   - Artysta
   - Opis
   - Upload pliku MP3 lub link zewnętrzny (Spotify, YouTube)
   - Okładka utworu (opcjonalnie)
   - Linki zewnętrzne (Spotify, YouTube, SoundCloud)
3. Kliknij **"Dodaj Utwór"**

#### Tworzenie Sekcji
1. Wybierz zakładkę **"Sekcje"**
2. Wypełnij formularz:
   - Tytuł sekcji
   - Slug (URL)
   - Opis i treść
   - Zdjęcie sekcji
   - Kolory (tło i tekst)
   - Kolejność wyświetlania
   - Typ sekcji (Tekst, Galeria, Muzyka, Kontakt, Własny)
3. Zaznacz "Widoczna na stronie"
4. Kliknij **"Dodaj Sekcję"**

#### Zarządzanie Zdjęciami
1. Wybierz zakładkę **"Zdjęcia"**
2. Kliknij **"Wybierz Zdjęcia"** lub przeciągnij pliki
3. Poczekaj na przesłanie
4. Zdjęcia są automatycznie dostępne do użycia

#### Live Preview
1. Kliknij przycisk **"Pokaż Podgląd"** w prawym górnym rogu
2. Zobacz zmiany w czasie rzeczywistym
3. Odśwież podgląd po zapisaniu zmian

## 📱 Responsywność

Strona jest w pełni responsywna i działa na:
- 🖥️ Komputerach desktop
- 💻 Laptopach
- 📱 Tabletach
- 📞 Smartfonach

## 🎨 Customizacja

### Zmiana Kolorów
1. Przejdź do panelu admina → Ustawienia
2. W sekcji "Kolory Motywu" wybierz nowe kolory
3. Zapisz zmiany

### Zmiana Czcionek
Edytuj plik `app/globals.css`:
\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap');
\`\`\`

### Dodawanie Własnych Stylów
Dodaj własne style w `app/globals.css`

## 🔒 Bezpieczeństwo

⚠️ **WAŻNE**: Przed wdrożeniem na produkcję:
1. Zmień domyślne hasło administratora
2. Ustaw silne hasło w zmiennej `NEXT_PUBLIC_ADMIN_PASSWORD`
3. Rozważ implementację pełnej autentykacji (NextAuth)
4. Zabezpiecz endpoint uploadu plików
5. Ogranicz rozmiar uploadowanych plików

## 📝 Struktura Projektu

\`\`\`
sromporar-website/
├── app/                      # Next.js App Router
│   ├── admin/               # Panel administratora
│   │   ├── dashboard/       # Dashboard admina
│   │   └── page.js          # Strona logowania admina
│   ├── api/                 # API Endpoints
│   │   ├── sections/        # API sekcji
│   │   ├── music/           # API muzyki
│   │   ├── images/          # API zdjęć
│   │   ├── settings/        # API ustawień
│   │   ├── upload/          # API uploadu plików
│   │   └── track-share/     # API śledzenia udostępnień
│   ├── globals.css          # Globalne style
│   ├── layout.js            # Layout aplikacji
│   └── page.js              # Strona główna
├── components/              # Komponenty React
│   ├── admin/              # Komponenty panelu admina
│   │   ├── SettingsPanel.js
│   │   ├── MusicPanel.js
│   │   ├── SectionsPanel.js
│   │   ├── ImagesPanel.js
│   │   └── LivePreview.js
│   ├── MusicPlayer.js      # Odtwarzacz muzyki
│   ├── SectionCard.js      # Karta sekcji
│   └── SocialShare.js      # Przyciski social media
├── models/                  # Modele MongoDB
│   ├── Section.js
│   ├── Music.js
│   ├── Image.js
│   └── Settings.js
├── lib/                     # Biblioteki pomocnicze
│   └── mongodb.js           # Połączenie z MongoDB
├── public/                  # Pliki publiczne
│   └── uploads/            # Uploadowane pliki
├── .env.example            # Przykładowa konfiguracja
├── .gitignore              # Git ignore
├── next.config.js          # Konfiguracja Next.js
├── tailwind.config.js      # Konfiguracja Tailwind
├── package.json            # Zależności projektu
└── README.md               # Ten plik
\`\`\`

## 🚢 Wdrożenie na Produkcję

### Vercel (Zalecane)
1. Push kod na GitHub
2. Połącz repozytorium z Vercel
3. Ustaw zmienne środowiskowe
4. Wdróż!

### Inne platformy
\`\`\`bash
npm run build
npm run start
\`\`\`

## 🐛 Rozwiązywanie Problemów

### MongoDB nie łączy się
- Sprawdź czy MongoDB jest uruchomiony
- Zweryfikuj MONGODB_URI w pliku .env
- Sprawdź logi błędów w konsoli

### Upload plików nie działa
- Sprawdź uprawnienia do folderu `public/uploads`
- Zweryfikuj konfigurację API route uploadu

### Strona nie wyświetla danych
- Sprawdź połączenie z bazą danych
- Zweryfikuj czy dane zostały zapisane w bazie
- Odśwież stronę

## 📞 Wsparcie

W razie problemów:
1. Sprawdź dokumentację
2. Przejrzyj kod
3. Zgłoś issue na GitHubie

## 📄 Licencja

MIT License - możesz swobodnie używać i modyfikować projekt.

## 🙏 Podziękowania

Projekt stworzony dla Mikołaja Stompóra - Artysty, Malarza, Muzyka.

---

**Autor**: Claude (Anthropic AI)
**Wersja**: 1.0.0
**Data**: 2025
