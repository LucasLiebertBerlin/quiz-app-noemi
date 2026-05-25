// Vercel Serverless Function: /api/scores
// Speichert Scores in Vercel KV (Upstash Redis).
// Wenn KV nicht konfiguriert ist, fällt der Client automatisch auf localStorage zurück.

let kv = null;
try {
    // Optionaler Import – wenn @vercel/kv nicht installiert oder ENV fehlt, gibt API 503 zurück
    // und der Client nutzt localStorage als Fallback.
    kv = require('@vercel/kv').kv;
} catch (e) {
    kv = null;
}

const KEY = 'nutriquiz:scores';
const MAX_SCORES = 500; // hartes Limit gegen Spam

module.exports = async function handler(req, res) {
    // CORS (optional – falls von woanders abgerufen)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // Prüfe, ob KV verfügbar
    if (!kv || !process.env.KV_REST_API_URL) {
        return res.status(503).json({
            error: 'Scoreboard-API nicht konfiguriert. Client nutzt localStorage als Fallback.',
            scores: []
        });
    }

    try {
        if (req.method === 'GET') {
            const raw = await kv.get(KEY);
            const scores = Array.isArray(raw) ? raw : [];
            return res.status(200).json({ scores });
        }

        if (req.method === 'POST') {
            const body = req.body || {};
            const entry = sanitize(body);
            if (!entry) return res.status(400).json({ error: 'Ungültige Daten' });

            const raw = await kv.get(KEY);
            const scores = Array.isArray(raw) ? raw : [];
            scores.push(entry);

            // Cap auf MAX_SCORES (älteste raus)
            if (scores.length > MAX_SCORES) {
                scores.sort((a, b) => (b.ts || 0) - (a.ts || 0));
                scores.length = MAX_SCORES;
            }

            await kv.set(KEY, scores);
            return res.status(200).json({ ok: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server-Fehler', scores: [] });
    }
};

function sanitize(b) {
    if (!b || typeof b !== 'object') return null;
    const name = typeof b.name === 'string' ? b.name.trim().slice(0, 20) : '';
    const score = Number.isInteger(b.score) ? b.score : null;
    const time = Number.isFinite(b.time) ? Math.floor(b.time) : null;
    const total = Number.isInteger(b.total) ? b.total : 20;
    const ts = Number.isFinite(b.ts) ? Math.floor(b.ts) : Date.now();
    if (!name || score === null || time === null) return null;
    if (score < 0 || score > 100 || time < 0 || time > 60 * 60 * 1000) return null;
    return { name, score, time, total, ts };
}
