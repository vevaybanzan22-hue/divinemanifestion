import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(ROOT, 'raw_pages');
const PAGES_DIR = path.join(ROOT, 'pages');
const PUBLIC_DIR = path.join(ROOT, 'public');

fs.mkdirSync(PAGES_DIR, { recursive: true });

// Next-step mapping for simulated funnel progression
const NEXT_STEP = {
  'thrive': { url: '/seed', label: 'Ir para Oferta Principal (/seed) →' },
  'seed': { url: '/abound', label: 'Simular Compra ($27-$100) → Ir p/ Upsell 1 (/abound)' },
  'seed-nome': { url: '/abound', label: 'Simular Compra → Ir p/ Upsell 1 (/abound)' },
  'abound': { url: '/gather', label: 'Próximo: Upsell 2 (/gather) →' },
  'prosper': { url: '/circle', label: 'Próximo: Upsell 2 Compliance (/circle) →' },
  'gather': { url: '/miracle', label: 'Próximo: Upsell 3 (/miracle) →' },
  'circle': { url: '/moment', label: 'Próximo: Upsell 3 Compliance (/moment) →' },
  'miracle': { url: '/dmiracle', label: 'Ver Downsell (/dmiracle) ou Upsell 4 (/gnosis) →' },
  'moment': { url: '/dmoment', label: 'Ver Downsell (/dmoment) →' },
  'dmiracle': { url: '/gnosis', label: 'Próximo: Upsell 4 (/gnosis) →' },
  'dmoment': { url: '/whole', label: 'Próximo: Upsell 4 Compliance (/whole) →' },
  'gnosis': { url: '/gift', label: 'Próximo: Upsell 5 (/gift) →' },
  'whole': { url: '/gift', label: 'Próximo: Upsell 5 (/gift) →' },
  'gift': { url: '/ttf-welcome', label: 'Finalizar Funil → Boas-Vindas (/ttf-welcome)' },
  'ttf-welcome': { url: '/dms5286', label: 'Abrir Entregável Principal (/dms5286) →' },
  'grace': { url: '/dgrace', label: 'Ver Downsell (/dgrace) ou Entregável (/tlp9981) →' },
  'dgrace': { url: '/tlp9981', label: 'Abrir Entregável The Lost Prayer (/tlp9981) →' }
};

function buildFloatingToolbar() {
  return '';
}

function sanitizeHtml(html, slug) {
  // 1. Neutralize qzHome / qzMark / qzBack / qzSeal domain locks
  html = html.replace(
    /function qzHome\(\)\{[\s\S]*?function qzSeal\(\)\{[\s\S]*?\}\s*\}/,
    `function qzHome(){return true;}
  function qzMark(){}
  function qzBack(){return false;}
  function qzSeal(){}`
  );
  // Also fallback regex if formatting differs
  html = html.replace(/function qzHome\(\)\{try\{return location\.hostname===QZ_H[\s\S]*?\}/g, 'function qzHome(){return true;}');
  html = html.replace(/function qzBack\(\)\{[\s\S]*?location\.replace\([\s\S]*?\}/g, 'function qzBack(){return false;}');

  // 2. Replace Italian/external myblessingslibrary art URLs with local /art/ if present
  html = html.replace(/https:\/\/myblessingslibrary\.com\/art\//g, '/art/');
  html = html.replace(/https:\/\/myblessingslibrary\.com\/icon-192\.png/g, '/icon-192.png');

  // 3. Inject floating navigation bar before </body>
  if (html.includes('</body>')) {
    html = html.replace('</body>', `${buildFloatingToolbar(slug)}\n</body>`);
  } else {
    html += buildFloatingToolbar(slug);
  }
  return html;
}

// First process all raw HTML pages
for (const file of fs.readdirSync(RAW_DIR)) {
  if (!file.endsWith('.html')) continue;
  const slug = file.replace(/\.html$/, '');
  const raw = fs.readFileSync(path.join(RAW_DIR, file), 'utf8');
  const cleaned = sanitizeHtml(raw, slug);
  fs.writeFileSync(path.join(PAGES_DIR, file), cleaned, 'utf8');
}

// Now create the 4 reconstructed English Deliverable & Welcome Pages:
// 1. dms5286.html (Main Deliverable: Time To Flourish + 7-Part Divine Manifestation Script + 290-Page Faith & Abundance Blueprint PDF)
const dms5286Html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Time To Flourish — Your Divine Manifestation Script & Blueprint</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;700;900&family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Open+Sans:wght@400;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:#0b1026 url('/media/the-lost-prayer/acesso/bg.webp') center top/cover fixed no-repeat;color:#1a1a2e;font-family:'Open Sans',Arial,sans-serif;-webkit-font-smoothing:antialiased}
.topo{padding:32px 16px 22px;text-align:center;background:linear-gradient(180deg,rgba(11,16,38,0.92),rgba(11,16,38,0.75));color:#fff;border-bottom:2px solid rgba(232,200,120,0.4)}
.kicker{color:#e8c878;text-transform:uppercase;letter-spacing:0.2em;font-size:13px;font-weight:700;margin:0 0 8px}
h1{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:38px;line-height:1.15;margin:0 auto;max-width:900px;color:#fff}
.card{background:#fff;max-width:980px;margin:28px auto;padding:34px 38px 48px;border-radius:18px;box-shadow:0 20px 50px rgba(0,0,0,0.35)}
.capa{display:block;width:100%;max-width:340px;height:auto;margin:0 auto 20px;border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,0.25)}
.nota{font-family:'Be Vietnam Pro',Arial,sans-serif;font-weight:400;font-size:24px;line-height:1.3;text-align:center;margin:18px auto 14px;max-width:820px;color:#1e293b}
.aviso{font-size:17px;line-height:1.6;margin:0 auto 32px;max-width:800px;text-align:center;color:#475569}
.grade{display:grid;grid-template-columns:repeat(2,1fr);gap:32px;margin-bottom:42px}
.item{display:flex;flex-direction:column;align-items:center;text-align:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:24px}
.item img{width:100%;max-width:260px;height:auto;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,0.12);margin-bottom:16px}
.item h2{font-family:Poppins,Arial,sans-serif;font-weight:700;font-size:21px;line-height:1.3;margin:8px 0 10px;color:#0f172a}
.item p{font-size:14.5px;color:#475569;margin:0 0 18px;line-height:1.5}
.btn{display:inline-block;background:linear-gradient(135deg,#e8c878,#b8892e);color:#1b1403;font-family:Poppins,Arial,sans-serif;font-weight:700;font-size:16px;text-decoration:none;padding:12px 28px;border-radius:999px;box-shadow:0 10px 20px -6px rgba(184,137,46,0.6);border:0;cursor:pointer}
.btn:hover{filter:brightness(1.06)}
.script-box{background:linear-gradient(180deg,#0f172a,#0b1026);color:#f6f1e4;border:2px solid #e8c878;border-radius:18px;padding:32px;margin-top:24px}
.script-box h2{font-family:'Playfair Display',Georgia,serif;color:#f4dc9a;font-size:28px;margin:0 0 8px;text-align:center}
.script-box .sub{text-align:center;color:#c2bca9;margin:0 0 24px;font-size:15px}
.name-bar{display:flex;gap:10px;justify-content:center;align-items:center;margin-bottom:26px;flex-wrap:wrap}
.name-bar input{padding:10px 16px;border-radius:10px;border:1px solid rgba(232,200,120,0.5);background:rgba(255,255,255,0.08);color:#fff;font-size:16px;min-width:240px}
.part{background:rgba(255,255,255,0.04);border:1px solid rgba(232,200,120,0.25);border-radius:14px;padding:20px 24px;margin-bottom:16px}
.part-kicker{color:#e8c878;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:4px}
.part h3{font-family:'Playfair Display',Georgia,serif;color:#fff;font-size:21px;margin:0 0 10px}
.part p{font-family:'Playfair Display',Georgia,serif;font-size:17.5px;line-height:1.7;color:#f6f1e4;margin:0;font-style:italic}
.upsell-shelf{margin-top:40px;padding-top:30px;border-top:2px dashed #e2e8f0}
.upsell-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:16px;margin-top:18px}
.upsell-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-align:center;text-decoration:none;color:#0f172a;transition:transform .15s}
.upsell-card:hover{transform:translateY(-3px);border-color:#b8892e}
.upsell-card img{width:100%;max-width:120px;border-radius:8px;margin-bottom:8px}
.upsell-card strong{display:block;font-size:14px;margin-bottom:4px}
.upsell-card span{font-size:12px;color:#b8892e;font-weight:700}
footer{background:#070a1a;color:#c2bca9;text-align:center;font-size:14px;line-height:1.6;padding:28px 16px}
footer a{color:#e8c878}
@media (max-width:760px){.grade{grid-template-columns:1fr}.card{padding:22px 16px}}
</style></head>
<body>
<div class="topo">
  <p class="kicker">My Blessings Library • Official Access Portal</p>
  <h1>Welcome to Time To Flourish! Access Your Deliverables Below:</h1>
</div>
<main class="card">
  <img class="capa" src="/art/cover-time-to-flourish.webp" alt="Time To Flourish">
  <p class="nota"><b>Congratulations!</b> Your <b>Divine Manifestation Script</b> &amp; <b>290-Page Faith &amp; Abundance Blueprint</b> Are Ready.</p>
  <p class="aviso">Read your personalized 7-Part <b>Divine Manifestation Script</b> out loud every morning for 7 days (takes about 7 minutes), and download your complete 290-page <b>Faith &amp; Abundance Blueprint</b> PDF below.</p>

  <div class="grade">
    <div class="item">
      <img src="/media/time-to-flourish/acesso/cover-blueprint.webp" alt="Faith & Abundance Blueprint">
      <h2>The Faith &amp; Abundance Blueprint (290-Page PDF)</h2>
      <p>Complete 290-page book with daily prayers, Scripture declarations, and the 7-day abundance protocol.</p>
      <a class="btn" href="/media/time-to-flourish/acesso/files/faith-abundance-blueprint.pdf" target="_blank" rel="noopener">📥 Download / Read PDF (290 Pages)</a>
    </div>
    <div class="item">
      <img src="/media/time-to-flourish/acesso/cover-script.webp" alt="Divine Manifestation Script">
      <h2>Your 7-Part Divine Manifestation Script</h2>
      <p>Your personalized 7-part prayer written with your name to speak out loud each morning.</p>
      <a class="btn" href="#script-section">📜 Read &amp; Personalize Your Script</a>
    </div>
  </div>

  <section class="script-box" id="script-section">
    <h2>Your Personalized 7-Part Divine Manifestation Script</h2>
    <p class="sub">Enter your name below (auto-filled from your quiz session if available) to personalize all 7 declarations:</p>
    <div class="name-bar">
      <input type="text" id="reader-name" placeholder="Enter your first name..." value="Beloved Child of God">
      <button class="btn" onclick="updateScriptName()">✨ Personalize Script</button>
      <button class="btn" style="background:#334155;color:#fff;" onclick="window.print()">🖨️ Print Script</button>
    </div>

    <div class="part">
      <div class="part-kicker">Part 1 of 7 — Opening the Heavens</div>
      <h3>1. Calling You By Name Before the Lord</h3>
      <p>"Lord, today I, <strong class="u-name">Beloved Child of God</strong>, come before Your throne of grace. You knew my name before the foundations of the world were laid. Today I quiet every doubt, every fear, and every memory of scarcity, and I open my heart to receive the full measure of Your covenant blessings."</p>
    </div>
    <div class="part">
      <div class="part-kicker">Part 2 of 7 — Breaking Hidden Blocks</div>
      <h3>2. Dissolving the Invisible Weight of Past Seasons</h3>
      <p>"Father, every door that closed in the past and every season of delay in the life of <strong class="u-name">Beloved Child of God</strong> ends today. By Your word in Deuteronomy 8:18, You give me the power to create wealth and establish Your covenant. I release every generational block and step into Your divine timing."</p>
    </div>
    <div class="part">
      <div class="part-kicker">Part 3 of 7 — The Measure Pressed Down &amp; Overflowing</div>
      <h3>3. Claiming Luke 6:38 Over My Household</h3>
      <p>"As I sow in faith, I declare over <strong class="u-name">Beloved Child of God</strong>: Give, and it shall be given unto me; good measure, pressed down, shaken together, and running over. Financial peace, unexpected provision, and debt-free overflow are entering my home right now."</p>
    </div>
    <div class="part">
      <div class="part-kicker">Part 4 of 7 — Protection of Family &amp; Loved Ones</div>
      <h3>4. A Wall of Grace Around My Family</h3>
      <p>"Lord, bless the household of <strong class="u-name">Beloved Child of God</strong>. Let peace reign at our table, let sickness be far from our bodies, and give me more than enough so that I may be a vessel of generosity and comfort to every person I love."</p>
    </div>
    <div class="part">
      <div class="part-kicker">Part 5 of 7 — Favor &amp; Open Doors</div>
      <h3>5. Walking Through the Portal of Favor</h3>
      <p>"Where <strong class="u-name">Beloved Child of God</strong> once walked in worry, I now walk in supernatural favor. Ideas, opportunities, righteous connections, and multiplied harvests find me effortlessly this week."</p>
    </div>
    <div class="part">
      <div class="part-kicker">Part 6 of 7 — Gratitude Before the Miracle Appears</div>
      <h3>6. Thanking God in Advance</h3>
      <p>"Father, I do not wait to see the harvest before I praise You. I, <strong class="u-name">Beloved Child of God</strong>, thank You right now because the command has already been given in heaven, and my blessing is already on its way."</p>
    </div>
    <div class="part">
      <div class="part-kicker">Part 7 of 7 — The Daily Seal</div>
      <h3>7. Sealing the Harvest in Faith</h3>
      <p>"The windows of heaven are open over <strong class="u-name">Beloved Child of God</strong> today. My mind is at peace, my hands are blessed, and my harvest is overflowing. In Jesus' mighty name, Amen."</p>
    </div>
  </section>
</main>
<footer>
  <p>Time To Flourish • My Blessings Library &copy; 2026 - All Rights Reserved</p>
  <p><a href="/ttf-privacy">Privacy Policy</a> | <a href="/ttf-terms">Terms of Service</a> | <a href="/ttf-legal">Legal Notice</a></p>
</footer>
<script>
function updateScriptName(val) {
  var name = (val || document.getElementById('reader-name').value || 'Beloved Child of God').trim();
  document.querySelectorAll('.u-name').forEach(function(el){ el.textContent = name; });
}
try {
  var saved = JSON.parse(sessionStorage.getItem('flourish_offer') || localStorage.getItem('flourish_offer') || '{}');
  if (saved && saved.userName) {
    document.getElementById('reader-name').value = saved.userName;
    updateScriptName(saved.userName);
  }
} catch(e){}
</script>
${buildFloatingToolbar('dms5286')}
</body></html>`;

fs.writeFileSync(path.join(PAGES_DIR, 'dms5286.html'), dms5286Html, 'utf8');

// 2. kp3861.html (Upsell 1 Deliverable Portal: The Key to Prosperity)
const kp3861Html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Key to Prosperity — Deliverable Access</title>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;900&family=Open+Sans:wght@400;700&family=Poppins:wght@600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}html,body{margin:0;padding:0}
body{background:#fdfdfd url('/media/the-lost-prayer/acesso/bg.webp') center top/cover fixed no-repeat;color:#000;font-family:'Open Sans',Arial,sans-serif}
.topo{padding:28px 16px 18px;text-align:center}
h1{font-family:'Be Vietnam Pro',Arial,sans-serif;font-weight:900;font-size:38px;line-height:1.15;margin:0 auto;max-width:900px}
.card{background:#fff;max-width:960px;margin:0 auto 40px;padding:28px 36px 48px;border-radius:16px;box-shadow:0 12px 36px rgba(0,0,0,0.12)}
.capa{display:block;width:100%;max-width:300px;height:auto;margin:0 auto;border-radius:12px}
.nota{font-family:'Be Vietnam Pro',Arial,sans-serif;font-size:26px;text-align:center;margin:24px auto 14px;max-width:820px}
.aviso{font-size:17px;line-height:1.5;margin:0 auto 34px;max-width:780px;text-align:center;color:#334155}
.grade{display:grid;grid-template-columns:repeat(2,1fr);gap:36px 28px}
.item{display:flex;flex-direction:column;align-items:center;text-align:center;background:#f8fafc;padding:24px;border-radius:14px;border:1px solid #e2e8f0}
.item img{width:100%;max-width:240px;height:auto;object-fit:contain;display:block;border-radius:10px}
.item h2{font-family:Poppins,Arial,sans-serif;font-weight:600;font-size:20px;margin:14px 0 12px}
.btn{display:inline-block;background:#f5a623;color:#fff;font-family:Poppins,Arial,sans-serif;font-weight:600;font-size:17px;text-decoration:none;padding:10px 25px;border-radius:6px;box-shadow:0 12px 24px -8px #000}
footer{background:#000;color:#f6fbff;text-align:center;font-size:14px;padding:28px 16px}
@media(max-width:760px){.grade{grid-template-columns:1fr}}
</style></head>
<body>
<div class="topo"><h1>Congratulations On Your Upgrade! Access The Key to Prosperity Below:</h1></div>
<main class="card">
  <img class="capa" src="/art/cover-key-to-prosperity.webp" alt="The Key to Prosperity">
  <p class="nota"><b>Upsell 1 Unlocked:</b> The Key to Prosperity &amp; 21-Day Practice</p>
  <p class="aviso">Start with <b>The Key to Prosperity</b> main book (51 pages), then follow your daily exercises in the <b>21-Day Prosperity Key Practice</b> guide.</p>
  <div class="grade">
    <div class="item">
      <img src="/media/time-to-flourish/acesso/kp/cover-prosperity.webp" alt="The Key to Prosperity">
      <h2>The Key to Prosperity (51-Page Official Book)</h2>
      <a class="btn" href="/media/time-to-flourish/acesso/kp/files/the-key-to-prosperity.pdf" target="_blank" rel="noopener">📥 Access PDF Now</a>
    </div>
    <div class="item">
      <img src="/media/time-to-flourish/acesso/kp/cover-21day.webp" alt="21-Day Prosperity Key Practice">
      <h2>21-Day Prosperity Key Practice</h2>
      <a class="btn" href="/media/time-to-flourish/acesso/kp/files/21-day-prosperity-key-practice.pdf" target="_blank" rel="noopener">📥 Access PDF Now</a>
    </div>
  </div>
</main>
<footer><p>Time To Flourish &copy; 2026 - All Rights Reserved</p></footer>
${buildFloatingToolbar('kp3861')}
</body></html>`;

fs.writeFileSync(path.join(PAGES_DIR, 'kp3861.html'), kp3861Html, 'utf8');

// 3. wmc2718.html (Upsell 2 Deliverable Portal: World's Largest Manifestation Club)
const wmc2718Html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>World's Largest Manifestation Club — Member Access</title>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;900&family=Open+Sans:wght@400;700&family=Poppins:wght@600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}html,body{margin:0;padding:0}
body{background:#fdfdfd url('/media/the-lost-prayer/acesso/bg.webp') center top/cover fixed no-repeat;color:#000;font-family:'Open Sans',Arial,sans-serif}
.topo{padding:28px 16px 18px;text-align:center}
h1{font-family:'Be Vietnam Pro',Arial,sans-serif;font-weight:900;font-size:38px;line-height:1.15;margin:0 auto;max-width:900px}
.card{background:#fff;max-width:960px;margin:0 auto 40px;padding:28px 36px 48px;border-radius:16px;box-shadow:0 12px 36px rgba(0,0,0,0.12)}
.capa{display:block;width:100%;max-width:300px;height:auto;margin:0 auto;border-radius:12px}
.nota{font-family:'Be Vietnam Pro',Arial,sans-serif;font-size:26px;text-align:center;margin:24px auto 14px;max-width:820px}
.aviso{font-size:17px;line-height:1.5;margin:0 auto 34px;max-width:780px;text-align:center;color:#334155}
.grade{display:grid;grid-template-columns:repeat(2,1fr);gap:28px}
.item{display:flex;flex-direction:column;align-items:center;text-align:center;background:#f8fafc;padding:22px;border-radius:14px;border:1px solid #e2e8f0}
.item img{width:100%;max-width:220px;height:auto;object-fit:contain;display:block;border-radius:10px}
.item h2{font-family:Poppins,Arial,sans-serif;font-weight:600;font-size:19px;margin:14px 0 12px}
.btn{display:inline-block;background:#f5a623;color:#fff;font-family:Poppins,Arial,sans-serif;font-weight:600;font-size:16px;text-decoration:none;padding:10px 22px;border-radius:6px;box-shadow:0 12px 24px -8px #000}
footer{background:#000;color:#f6fbff;text-align:center;font-size:14px;padding:28px 16px}
@media(max-width:760px){.grade{grid-template-columns:1fr}}
</style></head>
<body>
<div class="topo"><h1>Welcome to The World's Largest Manifestation Club!</h1></div>
<main class="card">
  <img class="capa" src="/art/cover-manifestation-club.webp" alt="Manifestation Club">
  <p class="nota"><b>Upsell 2 Unlocked:</b> Complete Circle Member Materials &amp; Audio Alignment</p>
  <p class="aviso">Read <b>Welcome to the Circle</b> first, listen to your <b>Daily Circle Alignment Audio</b>, and study <b>Circle Teaching #1</b>.</p>
  <div class="grade">
    <div class="item">
      <img src="/media/time-to-flourish/acesso/mc/cover-welcome.webp" alt="Welcome to the Circle">
      <h2>Welcome to the Circle (Member Guide PDF)</h2>
      <a class="btn" href="/media/time-to-flourish/acesso/mc/files/welcome-to-the-circle.pdf" target="_blank" rel="noopener">📥 Access PDF Now</a>
    </div>
    <div class="item">
      <img src="/media/time-to-flourish/acesso/mc/cover-alignment.webp" alt="Daily Circle Alignment Audio">
      <h2>Daily Circle Alignment (Guided Audio MP3)</h2>
      <audio controls style="width:100%;margin-bottom:12px" src="/media/time-to-flourish/acesso/mc/files/daily-circle-alignment-audio.mp3"></audio>
      <a class="btn" href="/media/time-to-flourish/acesso/mc/files/daily-circle-alignment-audio.mp3" target="_blank" rel="noopener">🎧 Download MP3</a>
    </div>
    <div class="item">
      <img src="/media/time-to-flourish/acesso/mc/cover-alignment.webp" alt="Daily Circle Alignment PDF">
      <h2>Daily Circle Alignment (Companion PDF)</h2>
      <a class="btn" href="/media/time-to-flourish/acesso/mc/files/daily-circle-alignment.pdf" target="_blank" rel="noopener">📥 Access PDF Now</a>
    </div>
    <div class="item">
      <img src="/media/time-to-flourish/acesso/mc/cover-teaching1.webp" alt="Circle Teaching 1">
      <h2>Circle Teaching #1: The Faithful Manifestation Method</h2>
      <a class="btn" href="/media/time-to-flourish/acesso/mc/files/circle-teaching-1-faithful-manifestation-method.pdf" target="_blank" rel="noopener">📥 Access PDF Now</a>
    </div>
  </div>
</main>
<footer><p>Time To Flourish &copy; 2026 - All Rights Reserved</p></footer>
${buildFloatingToolbar('wmc2718')}
</body></html>`;

fs.writeFileSync(path.join(PAGES_DIR, 'wmc2718.html'), wmc2718Html, 'utf8');

// 4. ttf-welcome.html (English version of fio-benvenuto.html with the Golden Gates animation & shelf)
let benvenuto = fs.readFileSync(path.join(RAW_DIR, 'fio-benvenuto.html'), 'utf8');
let ttfWelcome = benvenuto
  .replace('<html lang="it">', '<html lang="en">')
  .replace('<title>La tua Supplica è pronta</title>', '<title>Your Divine Manifestation Script Is Ready</title>')
  .replace(/https:\/\/it\.myblessingslibrary\.com\/icon-192\.png/g, '/icon-192.png')
  .replace(/https:\/\/it\.myblessingslibrary\.com\/art\/jesus-welcome\.webp/g, '/art/jesus-welcome.webp')
  .replace(/https:\/\/it\.myblessingslibrary\.com\/art\/cover-time-to-flourish-it\.webp/g, '/art/cover-time-to-flourish.webp')
  .replace(/https:\/\/it\.myblessingslibrary\.com\/art\/cover-chiave-della-prosperita-it\.webp/g, '/art/cover-key-to-prosperity.webp')
  .replace(/https:\/\/it\.myblessingslibrary\.com\/art\/cover-club-della-manifestazione-it\.webp/g, '/art/cover-manifestation-club.webp')
  .replace(/https:\/\/it\.myblessingslibrary\.com\/art\/cover-momento-del-miracolo-it\.webp/g, '/art/cover-miracle-moment.webp')
  .replace(/https:\/\/it\.myblessingslibrary\.com\/art\/cover-codice-della-gnosi-it\.webp/g, '/art/cover-gnosis-code.webp')
  .replace(/https:\/\/it\.myblessingslibrary\.com\/art\/cover-rituali-dell-abbondanza-it\.webp/g, '/art/cover-abundance-rituals.webp')
  .replace('Il Tempo di Fiorire', 'Time To Flourish')
  .replace('La Mia Biblioteca delle Benedizioni', 'My Blessings Library')
  .replace('Grazie.', 'Thank You.')
  .replace("La tua Supplica dell'Abbondanza è pronta.", 'Your Divine Manifestation Script is ready.')
  .replace('Ti aspetta nella tua biblioteca privata, insieme a tutto il resto che hai ricevuto.', 'It is waiting for you in your private library, along with everything else you received today.')
  .replace(/<section class="card gold" id="box">[\s\S]*?<\/section>/, `
  <section class="card gold" id="box">
    <div>
      <h2 class="serif">Your Private Library Is Open</h2>
      <p>Tap the golden button below to read your personalized 7-Part <strong>Divine Manifestation Script</strong> and download your 290-page <strong>Faith &amp; Abundance Blueprint</strong>.</p>
      <a class="btn" href="/dms5286">Open My Blessings Library Now →</a>
    </div>
  </section>`)
  .replace('Nella tua biblioteca', 'Inside Your Library')
  .replace("La tua Supplica dell'Abbondanza", 'Your Divine Manifestation Script')
  .replace('Scritta con il tuo nome. Leggila ad alta voce: sette mattine, circa sette minuti ciascuna.', 'Written with your name. Read it out loud: seven mornings, about seven minutes each.')
  .replace('Il Piano Fede e Abbondanza', 'The Faith & Abundance Blueprint')
  .replace('290 pagine di preghiere, passi della Scrittura e dichiarazioni quotidiane.', '290 pages of prayers, Scripture passages, and daily declarations.')
  .replace('Tutto ciò che hai aggiunto oggi è sullo stesso scaffale.', 'Everything you unlocked today is on the same shelf — click any cover in the portal to access.');

ttfWelcome = sanitizeHtml(ttfWelcome, 'ttf-welcome');
fs.writeFileSync(path.join(PAGES_DIR, 'ttf-welcome.html'), ttfWelcome, 'utf8');

// Mirror all generated HTML pages into public/ for zero-config static deployment (Vercel/Netlify)
fs.mkdirSync(PUBLIC_DIR, { recursive: true });
for (const file of fs.readdirSync(PAGES_DIR)) {
  if (!file.endsWith('.html')) continue;
  fs.copyFileSync(path.join(PAGES_DIR, file), path.join(PUBLIC_DIR, file));
}
if (fs.existsSync(path.join(PAGES_DIR, 'thrive.html'))) {
  fs.copyFileSync(path.join(PAGES_DIR, 'thrive.html'), path.join(PUBLIC_DIR, 'index.html'));
}

console.log('Processed all HTML pages into', PAGES_DIR, 'and mirrored into', PUBLIC_DIR);


