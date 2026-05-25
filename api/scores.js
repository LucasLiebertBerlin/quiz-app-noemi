// Vercel Serverless Function: /api/scores
// Speichert Scores in Upstash Redis (via Vercel Marketplace Integration).
// Wenn Redis nicht konfiguriert ist, fällt der Client automatisch auf localStorage zurück.

const { Redis } = require('@upstash/redis');

let redis = null;
try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        redis = new Redis({
            url: process.env.KV_REST_API_URL,
            token: process.env.KV_REST_API_TOKEN
        });
    }
} catch (e) {
    redis = null;
}

const KEY = 'nutriquiz:scores';
const MAX_SCORES = 500; // hartes Limit gegen Spam

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'OPTIONS') return res.status(204).end();

    if (!redis) {
        return res.status(503).json({
            error: 'Scoreboard-API nicht konfiguriert (Redis fehlt).',
            scores: []
        });
    }

    try {
        if (req.method === 'GET') {
            const raw = await redis.get(KEY);
            const scores = Array.isArray(raw) ? raw : [];
            return res.status(200).json({ scores });
        }

        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
            const entry = sanitize(body);
            if (!entry) return res.status(400).json({ error: 'Ungültige Daten' });

            const raw = await redis.get(KEY);
            const scores = Array.isArray(raw) ? raw : [];
            scores.push(entry);

            if (scores.length > MAX_SCORES) {
                scores.sort((a, b) => (b.ts || 0) - (a.ts || 0));
                scores.length = MAX_SCORES;
            }

            await redis.set(KEY, scores);
            return res.status(200).json({ ok: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('scores api error', err);
        return res.status(500).json({ error: 'Server-Fehler', message: String(err && err.message || err), scores: [] });
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
