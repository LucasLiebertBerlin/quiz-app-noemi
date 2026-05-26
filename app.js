// ============================================================
// NutriQuiz – Ernährungsquiz mit Scoreboard
// ============================================================

const QUESTIONS = [
    {
        q: "Welcher Nährstoff liefert pro Gramm die meisten Kalorien?",
        options: ["Eiweiß", "Kohlenhydrate", "Fett", "Vitamine"],
        correct: [2],
        explain: "Fett liefert ca. 9 kcal/g – mehr als doppelt so viel wie Eiweiß oder Kohlenhydrate (je 4 kcal/g)."
    },
    {
        q: "Welche Art von Kohlenhydraten lässt den Blutzuckerspiegel besonders schnell ansteigen?",
        options: ["Komplexe Kohlenhydrate", "Einfache Kohlenhydrate", "Ballaststoffreiche Kohlenhydrate", "Langkettige Kohlenhydrate"],
        correct: [1],
        explain: "Einfache Kohlenhydrate (z. B. Zucker, Weißmehl) gehen schnell ins Blut über."
    },
    {
        q: "Ungesättigte Fettsäuren gelten meist als gesünder als gesättigte Fettsäuren.",
        options: ["Richtig", "Falsch"],
        correct: [0],
        explain: "Ungesättigte Fettsäuren (z. B. aus Fisch, Nüssen, Olivenöl) wirken sich positiv auf Herz und Gefäße aus."
    },
    {
        q: "Welches Lebensmittel hat normalerweise den höchsten Eiweißgehalt?",
        options: ["Hähnchenbrust", "Gurke", "Apfel", "Reis"],
        correct: [0],
        explain: "Hähnchenbrust hat ca. 23 g Eiweiß pro 100 g – Gurke und Apfel praktisch keines."
    },
    {
        q: "Vitamin D ist wichtig für die Aufnahme welches Mineralstoffs?",
        options: ["Eisen", "Magnesium", "Calcium", "Zink"],
        correct: [2],
        explain: "Vitamin D fördert die Calcium-Aufnahme im Darm – wichtig für Knochen und Zähne."
    },
    {
        q: "Welche Lebensmittel enthalten viele Omega-3-Fettsäuren? (Mehrfachauswahl)",
        options: ["Lachs", "Walnüsse", "Leinsamen", "Weißbrot"],
        correct: [0, 1, 2],
        explain: "Lachs, Walnüsse und Leinsamen sind reich an Omega-3 – Weißbrot nicht.",
        multi: true
    },
    {
        q: "Brauner Zucker ist automatisch viel gesünder als weißer Zucker.",
        options: ["Richtig", "Falsch"],
        correct: [1],
        explain: "Brauner Zucker enthält nur Spuren weiterer Stoffe – kalorisch und gesundheitlich kaum besser."
    },
    {
        q: "Wie speichert der Körper überschüssige Energie hauptsächlich?",
        options: ["Als Glykogen in der Leber", "Als Fett im Fettgewebe", "Als Eiweiß in den Muskeln", "Als Zucker im Blut"],
        correct: [1],
        explain: "Glykogen-Speicher sind begrenzt – der Rest wird als Fett gespeichert."
    },
    {
        q: "Welche Vitamine gehören zu den fettlöslichen Vitaminen? (Mehrfachauswahl)",
        options: ["Vitamin A", "Vitamin D", "Vitamin E", "Vitamin C"],
        correct: [0, 1, 2],
        explain: "Merksatz EDeKA: E, D, K, A sind fettlöslich. Vitamin C ist wasserlöslich.",
        multi: true
    },
    {
        q: "Zu wenig Eisen kann Müdigkeit verursachen.",
        options: ["Richtig", "Falsch"],
        correct: [0],
        explain: "Eisenmangel führt zu Anämie – typische Folge: Müdigkeit und Leistungsabfall."
    },
    {
        q: "Wie viele Portionen Obst und Gemüse empfiehlt die DGE pro Tag?",
        options: ["3", "5", "7", "10"],
        correct: [1],
        explain: "Die DGE empfiehlt „5 am Tag“ – idealerweise 3 Portionen Gemüse und 2 Portionen Obst."
    },
    {
        q: "Welches Lebensmittel hat den niedrigsten glykämischen Index?",
        options: ["Weißbrot", "Linsen", "Süßigkeiten", "Cornflakes"],
        correct: [1],
        explain: "Linsen haben einen niedrigen GI – Blutzucker steigt langsam und gleichmäßig."
    },
    {
        q: "Eiweiß kann vom Körper langfristig gespeichert werden wie Fett.",
        options: ["Richtig", "Falsch"],
        correct: [1],
        explain: "Es gibt keinen echten Eiweiß-Speicher – Überschüsse werden umgewandelt oder ausgeschieden."
    },
    {
        q: "Was fördern Ballaststoffe besonders?",
        options: ["Hungergefühl", "Sättigungsgefühl", "Durstgefühl", "Müdigkeit"],
        correct: [1],
        explain: "Ballaststoffe quellen auf, verlangsamen die Verdauung und sättigen länger."
    },
    {
        q: "Welche Aussagen stimmen? (Mehrfachauswahl)",
        options: [
            "Softdrinks enthalten oft viel Zucker",
            "Wasser hat Kalorien",
            "Vollkornprodukte enthalten oft mehr Ballaststoffe",
            "Fast Food enthält häufig viel Salz"
        ],
        correct: [0, 2, 3],
        explain: "Wasser hat 0 kcal – die anderen Aussagen stimmen.",
        multi: true
    },
    {
        q: "Muskelaufbau funktioniert nur mit Training UND ausreichend Eiweiß.",
        options: ["Richtig", "Falsch"],
        correct: [0],
        explain: "Ohne Trainingsreiz kein Muskelreiz – ohne Eiweiß kein Baumaterial."
    },
    {
        q: "Transfette erhöhen besonders das Risiko für welche Erkrankungen?",
        options: ["Atemwegserkrankungen", "Herz-Kreislauf-Erkrankungen", "Hauterkrankungen", "Augenkrankheiten"],
        correct: [1],
        explain: "Transfette senken HDL, erhöhen LDL und damit das Herzinfarkt-Risiko."
    },
    {
        q: "Welche Mineralstoffe sind wichtig für Muskeln und Nerven? (Mehrfachauswahl)",
        options: ["Magnesium", "Kalium", "Calcium", "Zucker"],
        correct: [0, 1, 2],
        explain: "Zucker ist kein Mineralstoff – Magnesium, Kalium und Calcium dagegen essenziell.",
        multi: true
    },
    {
        q: "Fruchtsaft enthält oft ähnlich viel Zucker wie Cola.",
        options: ["Richtig", "Falsch"],
        correct: [0],
        explain: "Fruchtsaft hat ca. 10 g Zucker / 100 ml – ähnlich wie Cola."
    },
    {
        q: "Warum sättigen Vollkornprodukte oft länger als Weißmehlprodukte?",
        options: [
            "Sie enthalten mehr Kalorien",
            "Ballaststoffe verlangsamen die Verdauung",
            "Sie enthalten mehr Zucker",
            "Sie enthalten mehr Wasser"
        ],
        correct: [1],
        explain: "Ballaststoffe verlangsamen die Verdauung und halten den Blutzucker stabil."
    },
    {
        type: "puzzle",
        text: "Eine dauerhaft erhöhte Aufnahme von {0} kann dazu führen, dass sich die Insulinempfindlichkeit der Körperzellen verschlechtert. Dadurch steigt langfristig das Risiko für {1}, {2}, {3}, {4} und {5}.",
        items: ["Zucker", "Diabetes Typ 2", "Übergewicht", "Bluthochdruck", "Herz-Kreislauf-Erkrankungen", "Fettleber"],
        correct: [0, 1, 2, 3, 4, 5],
        explain: "Zucker führt zu Insulinresistenz – das Risiko für Diabetes Typ 2, Übergewicht, Bluthochdruck, Herz-Kreislauf-Erkrankungen und Fettleber steigt."
    },
    {
        q: "Welche Aussagen über Mikronährstoffe treffen zu? (Mehrfachauswahl)",
        options: [
            "Fettlösliche Vitamine können im Körper gespeichert werden",
            "Wasserlösliche Vitamine werden immer vollständig gespeichert",
            "Ein Mineralstoffmangel kann Körperfunktionen beeinträchtigen",
            "Vitamine liefern direkt Energie wie Fett oder Kohlenhydrate"
        ],
        correct: [0, 2],
        explain: "Fettlösliche Vitamine (A, D, E, K) speichert der Körper. Wasserlösliche Vitamine (B, C) werden überwiegend ausgeschieden. Vitamine liefern keine Energie, sie unterstützen aber den Stoffwechsel.",
        multi: true
    },
    {
        type: "puzzle",
        text: "Werden über längere Zeit überwiegend stark verarbeitete Lebensmittel konsumiert, enthält die Ernährung häufig zu viel {0}, {1} und {2}, gleichzeitig aber zu wenig {3} und {4}.",
        items: ["Zucker", "Salz", "ungesunde Fette", "Ballaststoffe", "Vitamine"],
        correct: [0, 1, 2, 3, 4],
        explain: "Verarbeitete Lebensmittel sind oft reich an Zucker, Salz und ungesunden Fetten, aber arm an Ballaststoffen und Vitaminen."
    },
    {
        q: "Welche Faktoren beeinflussen den Energieverbrauch des Körpers? (Mehrfachauswahl)",
        options: ["Muskelmasse", "Alter", "Bewegung", "Stoffwechselaktivität"],
        correct: [0, 1, 2],
        explain: "Mehr Muskelmasse = mehr Grundumsatz. Mit sinkendem Alter sinkt der Umsatz. Bewegung erhöht den Verbrauch.",
        multi: true
    },
    {
        type: "puzzle",
        text: "Ein dauerhaft erhöhter Konsum gesättigter Fettsäuren kann die Konzentration von {0} im Blut erhöhen. Dadurch steigt unter anderem das Risiko für {1}, {2}, {3}, {4} und {5}.",
        items: ["LDL-Cholesterin", "Arteriosklerose", "Bluthochdruck", "Herzinfarkt", "Schlaganfall", "Herz-Kreislauf-Erkrankungen"],
        correct: [0, 1, 2, 3, 4, 5],
        explain: "Gesättigte Fettsäuren erhöhen LDL-Cholesterin – das Risiko für Arteriosklerose, Bluthochdruck, Herzinfarkt, Schlaganfall und Herz-Kreislauf-Erkrankungen steigt."
    }
];

// ============================================================
// Sound (Web Audio API – keine externen Dateien)
// ============================================================
const Sound = (() => {
    let ctx = null;
    let muted = localStorage.getItem('nq_muted') === '1';

    function getCtx() {
        if (!ctx) {
            try {
                ctx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) { return null; }
        }
        return ctx;
    }

    function tone(freq, duration, type = 'sine', volume = 0.15) {
        if (muted) return;
        const c = getCtx();
        if (!c) return;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
        osc.connect(gain).connect(c.destination);
        osc.start();
        osc.stop(c.currentTime + duration);
    }

    function correct() {
        tone(523.25, 0.12, 'sine', 0.15); // C5
        setTimeout(() => tone(783.99, 0.2, 'sine', 0.15), 100); // G5
    }
    function wrong() {
        tone(220, 0.15, 'sawtooth', 0.12);
        setTimeout(() => tone(165, 0.25, 'sawtooth', 0.1), 120);
    }
    function click() { tone(600, 0.04, 'square', 0.06); }
    function finish() {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
            setTimeout(() => tone(f, 0.18, 'triangle', 0.15), i * 90)
        );
    }
    function toggle() {
        muted = !muted;
        localStorage.setItem('nq_muted', muted ? '1' : '0');
        document.body.classList.toggle('muted', muted);
        if (!muted) click();
    }
    function init() {
        document.body.classList.toggle('muted', muted);
        document.getElementById('sound-toggle').addEventListener('click', toggle);
    }

    return { correct, wrong, click, finish, init };
})();

// ============================================================
// Scoreboard (API + localStorage fallback)
// ============================================================
const Scoreboard = (() => {
    const LOCAL_KEY = 'nq_scores';
    let useApi = true;

    async function fetchScores() {
        if (useApi) {
            try {
                const res = await fetch('/api/scores', { method: 'GET' });
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data.scores)) return data.scores;
                }
                useApi = false;
            } catch (e) {
                useApi = false;
            }
        }
        // Fallback: localStorage
        try {
            return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
        } catch (e) { return []; }
    }

    async function clearScores(token) {
        try {
            const res = await fetch('/api/scores?token=' + encodeURIComponent(token), { method: 'DELETE' });
            if (res.ok) return { ok: true };
            const data = await res.json().catch(() => ({}));
            return { ok: false, error: data.error || 'Fehler' };
        } catch (e) {
            return { ok: false, error: 'Netzwerkfehler' };
        }
    }

    async function addScore(entry) {
        if (useApi) {
            try {
                const res = await fetch('/api/scores', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(entry)
                });
                if (res.ok) return;
                useApi = false;
            } catch (e) { useApi = false; }
        }
        // Fallback: localStorage
        const scores = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
        scores.push(entry);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(scores));
    }

    function sortBy(scores, mode) {
        const copy = [...scores];
        if (mode === 'time') {
            // Best time: highest score first, then shortest time
            copy.sort((a, b) => b.score - a.score || a.time - b.time);
        } else if (mode === 'recent') {
            copy.sort((a, b) => (b.ts || 0) - (a.ts || 0));
        } else {
            // 'top' – highest score, fewer mistakes break ties (shorter time)
            copy.sort((a, b) => b.score - a.score || a.time - b.time);
        }
        return copy;
    }

    function clearLocal() {
        localStorage.removeItem(LOCAL_KEY);
    }

    return { fetchScores, addScore, sortBy, clearScores, clearLocal };
})();

// ============================================================
// Game state
// ============================================================
const State = {
    playerName: '',
    current: 0,
    score: 0,
    answers: [], // {questionIdx, picked: [...], correct: bool}
    startTime: 0,
    timerInterval: null
};

// ============================================================
// Utility
// ============================================================
function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
}

function el(tag, attrs = {}, children = []) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class') n.className = v;
        else if (k === 'onclick') n.addEventListener('click', v);
        else if (k === 'html') n.innerHTML = v;
        else n.setAttribute(k, v);
    }
    children.forEach(c => {
        if (typeof c === 'string') n.appendChild(document.createTextNode(c));
        else if (c) n.appendChild(c);
    });
    return n;
}

// ============================================================
// Screens
// ============================================================
const app = document.getElementById('app');

function clearApp() { app.innerHTML = ''; }

async function renderStart() {
    clearApp();
    if (State.timerInterval) clearInterval(State.timerInterval);

    const card = el('div', { class: 'card' });
    card.innerHTML = `
        <div class="eyebrow">NutriQuiz · 25 Fragen</div>
        <h1>Wer weiß am meisten über Ernährung?</h1>
        <p class="subtitle">Beantworte 25 Fragen so schnell und genau wie möglich. Punkte und Zeit landen im Scoreboard.</p>
        <input id="name-input" class="input" type="text" placeholder="Dein Name" maxlength="20" autocomplete="off">
        <button id="start-btn" class="btn btn-primary" disabled>Quiz starten →</button>
        <div class="scoreboard">
            <h2 id="board-title" style="margin-top:32px;cursor:default;user-select:none;" title="Doppelklick zum Leeren (Admin)">🏆 Bestenliste</h2>
            <div class="scoreboard-tabs">
                <button class="tab active" data-mode="top">Top Score</button>
                <button class="tab" data-mode="time">Schnellste</button>
                <button class="tab" data-mode="recent">Aktuell</button>
            </div>
            <div id="scoreboard-list" class="scoreboard-list">
                <div class="scoreboard-empty">Lade Scoreboard…</div>
            </div>
        </div>
    `;
    app.appendChild(card);

    const input = card.querySelector('#name-input');
    const startBtn = card.querySelector('#start-btn');
    input.value = localStorage.getItem('nq_name') || '';
    startBtn.disabled = input.value.trim().length === 0;

    input.addEventListener('input', () => {
        startBtn.disabled = input.value.trim().length === 0;
    });
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !startBtn.disabled) startBtn.click();
    });
    startBtn.addEventListener('click', () => {
        Sound.click();
        State.playerName = input.value.trim().slice(0, 20);
        localStorage.setItem('nq_name', State.playerName);
        State.current = 0;
        State.score = 0;
        State.answers = [];
        State.startTime = Date.now();
        renderQuestion();
    });

    // Tabs
    const scores = await Scoreboard.fetchScores();
    let currentMode = 'top';
    const listEl = card.querySelector('#scoreboard-list');
    function paintList() {
        const sorted = Scoreboard.sortBy(scores, currentMode).slice(0, 10);
        if (sorted.length === 0) {
            listEl.innerHTML = '<div class="scoreboard-empty">Noch keine Einträge. Sei der Erste!</div>';
            return;
        }
        listEl.innerHTML = sorted.map((s, i) => `
            <div class="score-entry rank-${i+1}">
                <div class="score-rank">${i+1}.</div>
                <div class="score-name">${escapeHtml(s.name)}</div>
                <div class="score-points">${s.score}/${QUESTIONS.length}</div>
                <div class="score-time">${formatTime(s.time)}</div>
            </div>
        `).join('');
    }
    paintList();
    card.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            Sound.click();
            card.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentMode = tab.dataset.mode;
            paintList();
        });
    });

    // Versteckter Admin-Reset: Doppelklick auf "Bestenliste"
    const boardTitle = card.querySelector('#board-title');
    if (boardTitle) {
        boardTitle.addEventListener('dblclick', async () => {
            const pw = prompt('Passwort zum Leeren der Bestenliste eingeben:');
            if (!pw) return;
            if (!confirm('Wirklich ALLE Scores online löschen? Das kann nicht rückgängig gemacht werden.')) return;
            const r = await Scoreboard.clearScores(pw);
            Scoreboard.clearLocal();
            if (r.ok) {
                alert('✓ Scoreboard geleert!');
                renderStart();
            } else {
                alert('Fehler: ' + r.error);
            }
        });
    }
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function renderQuestion() {
    clearApp();
    const q = QUESTIONS[State.current];
    const picked = new Set();
    let answered = false;

    const card = el('div', { class: 'card' });

    // Progress
    const elapsed = Date.now() - State.startTime;
    card.innerHTML = `
        <div class="progress">
            <div class="progress-info">Frage <strong>${State.current + 1}</strong>/${QUESTIONS.length}</div>
            <div class="progress-bar"><div class="progress-fill" style="width:${((State.current) / QUESTIONS.length) * 100}%"></div></div>
            <div class="timer">⏱ <strong id="live-timer">${formatTime(elapsed)}</strong></div>
        </div>
        ${q.type === 'puzzle' ? `
        <div class="puzzle-banner">
            <div class="puzzle-banner-icon">🧩</div>
            <div class="puzzle-banner-text">
                <div class="puzzle-banner-title">PUZZLE</div>
                <div class="puzzle-banner-sub">Klicke auf einen Begriff, dann auf die passende Lücke</div>
            </div>
        </div>
        ` : ''}
        ${q.multi ? `
        <div class="multi-banner">
            <div class="multi-banner-icon">☑️</div>
            <div class="multi-banner-text">
                <div class="multi-banner-title">MEHRFACHAUSWAHL</div>
                <div class="multi-banner-sub">Wähle ALLE richtigen Antworten aus und bestätige unten</div>
            </div>
        </div>
        ` : ''}
        <div id="question-area"></div>
        <div id="feedback-slot"></div>
        <button id="confirm-btn" class="btn btn-primary" disabled>${q.multi ? 'Auswahl bestätigen' : (q.type === 'puzzle' ? 'Lösung prüfen' : 'Antwort wählen')}</button>
    `;
    app.appendChild(card);

    // Live timer
    if (State.timerInterval) clearInterval(State.timerInterval);
    State.timerInterval = setInterval(() => {
        const t = document.getElementById('live-timer');
        if (t) t.textContent = formatTime(Date.now() - State.startTime);
    }, 500);

    const questionArea = card.querySelector('#question-area');
    const confirmBtn = card.querySelector('#confirm-btn');

    // PUZZLE-Typ
    if (q.type === 'puzzle') {
        // Puzzle-Logik
        const slotAssignments = new Map(); // slotIndex -> itemIndex
        const itemAssignments = new Map(); // itemIndex -> slotIndex (oder null)
        let selectedItem = null;

        // Text mit Slots rendern
        const parts = q.text.split(/(\{\d+\})/);
        let html = '<div class="puzzle-text">';
        let slotIdx = 0;
        parts.forEach(part => {
            if (part.match(/^\{\d+\}$/)) {
                html += `<span class="puzzle-slot" data-slot="${slotIdx}" data-idx="${part}">______</span>`;
                slotIdx++;
            } else {
                html += escapeHtml(part);
            }
        });
        html += '</div>';
        html += '<div id="puzzle-items" class="puzzle-items"></div>';
        questionArea.innerHTML = html;

        const slotsEl = questionArea.querySelectorAll('.puzzle-slot');
        const itemsEl = questionArea.querySelector('#puzzle-items');

        // Items mischen und rendern
        const shuffled = [...q.items].map((item, i) => ({ item, originalIdx: i }));
        shuffled.sort(() => Math.random() - 0.5);

        shuffled.forEach(({ item, originalIdx }) => {
            const itemEl = el('div', { class: 'puzzle-item', 'data-idx': originalIdx }, [item]);
            itemEl.addEventListener('click', () => {
                if (answered) return;
                Sound.click();
                if (itemAssignments.has(originalIdx)) {
                    // Item bereits in Slot → zurückholen
                    const slotIdx = itemAssignments.get(originalIdx);
                    const slot = slotsEl[slotIdx];
                    slot.textContent = '______';
                    slot.classList.remove('filled', 'selected');
                    itemAssignments.delete(originalIdx);
                    slotAssignments.delete(slotIdx);
                    itemEl.classList.remove('used');
                } else {
                    // Item auswählen
                    document.querySelectorAll('.puzzle-item').forEach(el => el.classList.remove('selected'));
                    itemEl.classList.add('selected');
                    selectedItem = originalIdx;
                }
            });
            itemsEl.appendChild(itemEl);
        });

        // Slots klickbar
        slotsEl.forEach((slot, slotIdx) => {
            slot.addEventListener('click', () => {
                if (answered) return;
                Sound.click();
                if (selectedItem !== null) {
                    // Item in Slot platzieren
                    // Falls Slot schon belegt: altes Item zurückholen
                    if (slotAssignments.has(slotIdx)) {
                        const oldItemIdx = slotAssignments.get(slotIdx);
                        const oldItemEl = itemsEl.querySelector(`[data-idx="${oldItemIdx}"]`);
                        if (oldItemEl) oldItemEl.classList.remove('used');
                        itemAssignments.delete(oldItemIdx);
                    }
                    // Neues Item platzieren
                    slot.textContent = q.items[selectedItem];
                    slot.classList.add('filled');
                    itemAssignments.set(selectedItem, slotIdx);
                    slotAssignments.set(slotIdx, selectedItem);
                    const itemEl = itemsEl.querySelector(`[data-idx="${selectedItem}"]`);
                    if (itemEl) {
                        itemEl.classList.remove('selected');
                        itemEl.classList.add('used');
                    }
                    selectedItem = null;
                } else if (slot.classList.contains('filled')) {
                    // Slot leeren
                    const itemIdx = slotAssignments.get(slotIdx);
                    const itemEl = itemsEl.querySelector(`[data-idx="${itemIdx}"]`);
                    if (itemEl) itemEl.classList.remove('used');
                    slot.textContent = '______';
                    slot.classList.remove('filled');
                    itemAssignments.delete(itemIdx);
                    slotAssignments.delete(slotIdx);
                }
                // Button aktivieren wenn alle Slots gefüllt
                const allFilled = Array.from(slotsEl).every(s => s.classList.contains('filled'));
                confirmBtn.disabled = !allFilled;
            });
        });

        function handleConfirm() {
            if (answered) return;
            answered = true;

            // Prüfen ob alle Slots korrekt gefüllt
            let correctCount = 0;
            slotsEl.forEach((slot, slotIdx) => {
                const itemIdx = slotAssignments.get(slotIdx);
                const isCorrect = itemIdx === q.correct[slotIdx];
                if (isCorrect) correctCount++;
                slot.classList.add(isCorrect ? 'correct' : 'wrong');
                // Items markieren
                const itemEl = itemsEl.querySelector(`[data-idx="${itemIdx}"]`);
                if (itemEl) itemEl.classList.add(isCorrect ? 'correct' : 'wrong');
            });

            const isAllCorrect = correctCount === slotsEl.length;

            // Feedback
            const feedback = el('div', { class: `feedback ${isAllCorrect ? 'correct' : 'wrong'}` });
            feedback.innerHTML = `
                <div class="feedback-icon">${isAllCorrect ? '✓' : '✕'}</div>
                <div class="feedback-text">
                    <strong>${isAllCorrect ? 'Richtig!' : `${correctCount}/${slotsEl.length} richtig`}</strong>
                    <small>${escapeHtml(q.explain)}</small>
                </div>
            `;
            card.querySelector('#feedback-slot').appendChild(feedback);

            if (isAllCorrect) { Sound.correct(); State.score++; }
            else Sound.wrong();

            State.answers.push({ q: State.current, picked: Array.from(slotAssignments.values()), correct: isAllCorrect });

            confirmBtn.textContent = State.current < QUESTIONS.length - 1 ? 'Nächste Frage →' : 'Ergebnis anzeigen →';
            confirmBtn.disabled = false;
            confirmBtn.onclick = () => {
                Sound.click();
                State.current++;
                if (State.current >= QUESTIONS.length) renderResult();
                else renderQuestion();
            };
        }

        confirmBtn.addEventListener('click', () => {
            if (!answered) handleConfirm();
        });

        return;
    }

    // STANDARD Multiple Choice
    const optionsEl = el('div', { class: `options${q.multi ? ' multi' : ''}` });
    questionArea.appendChild(el('div', { class: 'question-text' }, [escapeHtml(q.q.replace(/\s*\(Mehrfachauswahl\)\s*/i, ''))]));
    questionArea.appendChild(optionsEl);

    const letters = ['A', 'B', 'C', 'D', 'E'];

    q.options.forEach((opt, i) => {
        const btn = el('button', { class: 'option', type: 'button' }, [
            el('div', { class: 'option-letter' }, [letters[i]]),
            el('div', { class: 'option-text' }, [opt]),
            el('div', { class: 'option-icon' })
        ]);
        btn.addEventListener('click', () => {
            if (answered) return;
            Sound.click();
            if (q.multi) {
                if (picked.has(i)) {
                    picked.delete(i);
                    btn.classList.remove('selected');
                } else {
                    picked.add(i);
                    btn.classList.add('selected');
                }
                confirmBtn.disabled = picked.size === 0;
                confirmBtn.innerHTML = picked.size > 0
                    ? `Auswahl bestätigen <span class="confirm-count">${picked.size}</span>`
                    : 'Auswahl bestätigen';
            } else {
                // Single choice: instant confirm
                picked.clear();
                picked.add(i);
                optionsEl.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                btn.classList.add('selected');
                confirmBtn.disabled = false;
                // Auto-confirm
                handleConfirm();
            }
        });
        optionsEl.appendChild(btn);
    });

    function handleConfirm() {
        if (answered) return;
        answered = true;
        const pickedArr = [...picked];
        const isCorrect = arraysEqual(pickedArr, q.correct);

        // Mark options
        optionsEl.querySelectorAll('.option').forEach((btn, i) => {
            btn.disabled = true;
            btn.classList.remove('selected');
            if (q.correct.includes(i)) {
                btn.classList.add('correct');
            } else if (pickedArr.includes(i)) {
                btn.classList.add('wrong');
            }
        });

        // Feedback
        const feedback = el('div', { class: `feedback ${isCorrect ? 'correct' : 'wrong'}` });
        feedback.innerHTML = `
            <div class="feedback-icon">${isCorrect ? '✓' : '✕'}</div>
            <div class="feedback-text">
                <strong>${isCorrect ? 'Richtig!' : 'Leider falsch.'}</strong>
                <small>${escapeHtml(q.explain)}</small>
            </div>
        `;
        card.querySelector('#feedback-slot').appendChild(feedback);

        // Sound
        if (isCorrect) { Sound.correct(); State.score++; }
        else Sound.wrong();

        State.answers.push({ q: State.current, picked: pickedArr, correct: isCorrect });

        // Next button
        confirmBtn.textContent = State.current < QUESTIONS.length - 1 ? 'Nächste Frage →' : 'Ergebnis anzeigen →';
        confirmBtn.disabled = false;
        confirmBtn.onclick = () => {
            Sound.click();
            State.current++;
            if (State.current >= QUESTIONS.length) renderResult();
            else renderQuestion();
        };
    }

    confirmBtn.addEventListener('click', () => {
        if (!answered) handleConfirm();
    });
}

async function renderResult() {
    if (State.timerInterval) clearInterval(State.timerInterval);
    const totalTime = Date.now() - State.startTime;
    clearApp();

    // Save score
    const entry = {
        name: State.playerName,
        score: State.score,
        time: totalTime,
        total: QUESTIONS.length,
        ts: Date.now()
    };
    await Scoreboard.addScore(entry);

    Sound.finish();

    const pct = Math.round((State.score / QUESTIONS.length) * 100);
    let msg = '';
    if (pct === 100) msg = '🏆 Perfekt! Ernährungsprofi!';
    else if (pct >= 80) msg = '🔥 Stark – das war richtig gut!';
    else if (pct >= 60) msg = '👍 Solides Wissen.';
    else if (pct >= 40) msg = '💪 Da geht noch was!';
    else msg = '📚 Zeit für eine Auffrischung.';

    const card = el('div', { class: 'card' });
    card.innerHTML = `
        <div class="eyebrow">Fertig, ${escapeHtml(State.playerName)}!</div>
        <div class="result-hero">
            <div class="result-big">${State.score}</div>
            <div class="result-of">von ${QUESTIONS.length} Punkten · ${pct}%</div>
            <div class="result-msg">${msg}</div>
        </div>
        <div class="stats">
            <div class="stat">
                <div class="stat-value">${State.score}</div>
                <div class="stat-label">Richtig</div>
            </div>
            <div class="stat">
                <div class="stat-value">${QUESTIONS.length - State.score}</div>
                <div class="stat-label">Falsch</div>
            </div>
            <div class="stat">
                <div class="stat-value">${formatTime(totalTime)}</div>
                <div class="stat-label">Zeit</div>
            </div>
        </div>
        <div class="btn-row split">
            <button id="restart-btn" class="btn btn-primary">Nochmal spielen</button>
            <button id="home-btn" class="btn btn-secondary">Zur Startseite</button>
        </div>
        <div class="scoreboard">
            <h2 style="margin-top:32px;">🏆 Bestenliste</h2>
            <div class="scoreboard-tabs">
                <button class="tab active" data-mode="top">Top Score</button>
                <button class="tab" data-mode="time">Schnellste</button>
                <button class="tab" data-mode="recent">Aktuell</button>
            </div>
            <div id="scoreboard-list" class="scoreboard-list"></div>
        </div>
    `;
    app.appendChild(card);

    card.querySelector('#restart-btn').addEventListener('click', () => {
        Sound.click();
        State.current = 0;
        State.score = 0;
        State.answers = [];
        State.startTime = Date.now();
        renderQuestion();
    });
    card.querySelector('#home-btn').addEventListener('click', () => {
        Sound.click();
        renderStart();
    });

    // Scoreboard
    const scores = await Scoreboard.fetchScores();
    let currentMode = 'top';
    const listEl = card.querySelector('#scoreboard-list');
    function paintList() {
        const sorted = Scoreboard.sortBy(scores, currentMode).slice(0, 10);
        if (sorted.length === 0) {
            listEl.innerHTML = '<div class="scoreboard-empty">Noch keine Einträge.</div>';
            return;
        }
        listEl.innerHTML = sorted.map((s, i) => {
            const isYou = s.ts === entry.ts && s.name === entry.name;
            return `
                <div class="score-entry rank-${i+1} ${isYou ? 'you' : ''}">
                    <div class="score-rank">${i+1}.</div>
                    <div class="score-name">${escapeHtml(s.name)}${isYou ? ' (du)' : ''}</div>
                    <div class="score-points">${s.score}/${QUESTIONS.length}</div>
                    <div class="score-time">${formatTime(s.time)}</div>
                </div>
            `;
        }).join('');
    }
    paintList();
    card.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            Sound.click();
            card.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentMode = tab.dataset.mode;
            paintList();
        });
    });
}

// ============================================================
// Boot
// ============================================================
Sound.init();
renderStart();
