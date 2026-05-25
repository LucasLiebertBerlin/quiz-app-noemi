# 🥗 NutriQuiz

Ernährungs-Quiz mit 20 Multiple-Choice-Fragen, Sofort-Feedback, Sounds, Live-Timer und geteiltem Scoreboard. Läuft kostenlos auf Vercel.

## Features

- ✅ 20 Multiple-Choice-Fragen (inkl. Mehrfachauswahl)
- ✅ Sofortiges Feedback nach jeder Frage (richtig/falsch + Erklärung)
- ✅ Namens-Eingabe + persönlicher Score
- ✅ Geteiltes Scoreboard (Top Score, Schnellste, Aktuell)
- ✅ Sound-Effekte (Web Audio API – keine Dateien nötig)
- ✅ Live-Timer
- ✅ 100% responsive (Mobile-First)
- ✅ Dark Theme mit Akzentfarbe, keine generische "AI-Optik"

## Lokal testen

Einfach `index.html` im Browser öffnen.
Das Scoreboard nutzt dann **localStorage** (lokal pro Gerät) — perfekt zum Testen.

## Deployment auf Vercel (kostenlos)

### 1. Projekt zu GitHub pushen

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/DEIN-USER/qr-quiz.git
git push -u origin main
```

### 2. Auf Vercel importieren

1. https://vercel.com/new öffnen
2. Repository auswählen → **Deploy**
3. Fertig — Quiz läuft sofort (Scoreboard nutzt erstmal localStorage)

### 3. Geteiltes Scoreboard aktivieren (optional)

Damit alle Spieler dasselbe Scoreboard sehen, brauchst du eine kostenlose KV-Datenbank:

1. Im Vercel-Dashboard dein Projekt öffnen
2. Tab **Storage** → **Create Database** → **Upstash Redis** (oder KV) wählen
3. Free Tier auswählen, Region wählen → erstellen
4. Vercel verbindet die DB automatisch mit dem Projekt (legt `KV_REST_API_URL` etc. als Env-Vars an)
5. Redeploy (passiert meistens automatisch)

Ab jetzt landen alle Scores in der Cloud-DB.

### 4. QR-Code erstellen

Sobald deployed (`https://dein-projekt.vercel.app`):

- z. B. https://qr-code-generator.com → URL einfügen → QR herunterladen
- Drucken / teilen / posten

Wer den QR-Code scannt, landet direkt im Quiz.

## Tech-Stack

- **Frontend**: Vanilla HTML / CSS / JS (kein Build-Step, keine Frameworks)
- **Backend**: Vercel Serverless Function (`/api/scores`)
- **DB**: Vercel KV / Upstash Redis (optional)
- **Fonts**: Space Grotesk, JetBrains Mono (Google Fonts)

## Dateistruktur

```
qr-quiz/
├── index.html         # Einstiegspunkt
├── styles.css         # Komplettes Styling
├── app.js             # Quiz-Logik, Sounds, Scoreboard
├── api/
│   └── scores.js      # Vercel Serverless Function
├── package.json
├── vercel.json
└── README.md
```

## Anpassen

- **Fragen ändern**: `app.js` → `QUESTIONS`-Array
- **Farben / Look**: `styles.css` → `:root`-Variablen
- **Sounds**: `app.js` → `Sound`-Modul (Töne sind als Frequenzen definiert)
