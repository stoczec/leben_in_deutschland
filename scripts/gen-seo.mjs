import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createServer } from 'vite';

const SITE = (process.env.SITE_URL || 'https://leben-in-deutschland-nine.vercel.app').replace(/\/$/, '');
const OUT = resolve(process.cwd(), 'dist');
const LANGS = ['de', 'en', 'ua', 'ru'];
const HREFLANG = { de: 'de', en: 'en', ua: 'uk', ru: 'ru', ar: 'ar' };
const OG_LOCALE = { de: 'de_DE', en: 'en_US', ua: 'uk_UA', ru: 'ru_RU', ar: 'ar_AR' };
const RTL = new Set(['ar']);
const BUILD_DATE = process.env.CONTENT_DATE || new Date().toISOString().slice(0, 10);
let TOTAL = 460;

const L = {
  frage: { de: 'Frage', en: 'Question', ua: 'Запитання', ru: 'Вопрос', ar: 'سؤال' },
  options: { de: 'Antwortmöglichkeiten', en: 'Answer options', ua: 'Варіанти відповідей', ru: 'Варианты ответов', ar: 'خيارات الإجابة' },
  correct: { de: 'Richtige Antwort', en: 'Correct answer', ua: 'Правильна відповідь', ru: 'Правильный ответ', ar: 'الإجابة الصحيحة' },
  original: { de: 'Originalfrage (Deutsch)', en: 'Original question (German)', ua: 'Оригінал запитання (німецькою)', ru: 'Оригинал вопроса (нем.)', ar: 'السؤال الأصلي (بالألمانية)' },
  practice: { de: 'Im Quiz üben', en: 'Practice in the quiz', ua: 'Тренуватися у вікторині', ru: 'Тренироваться в тесте', ar: 'تدرّب في الاختبار' },
  otherLangs: { de: 'In anderer Sprache', en: 'In another language', ua: 'Іншою мовою', ru: 'На другом языке', ar: 'بلغة أخرى' },
  source: {
    de: 'Frage aus dem amtlichen Gesamtfragenkatalog zum Test „Leben in Deutschland“ / Einbürgerungstest.',
    en: 'Question from the official catalogue of the German “Leben in Deutschland” / citizenship test.',
    ua: 'Запитання з офіційного каталогу тесту «Leben in Deutschland» / тесту на громадянство Німеччини.',
    ru: 'Вопрос из официального каталога теста «Leben in Deutschland» / теста на гражданство Германии.',
    ar: 'سؤال من الكتالوج الرسمي لاختبار «Leben in Deutschland» / اختبار الجنسية الألمانية.',
  },
  disclaimer: {
    de: 'Privates, nicht-kommerzielles Lernprojekt. Nicht mit dem BAMF verbunden.',
    en: 'Private, non-commercial learning project. Not affiliated with the BAMF.',
    ua: 'Приватний некомерційний навчальний проєкт. Не пов’язаний із BAMF.',
    ru: 'Частный некоммерческий учебный проект. Не связан с BAMF.',
    ar: 'مشروع تعليمي خاص غير تجاري. لا علاقة له بـ BAMF.',
  },
  langName: { de: 'Deutsch', en: 'English', ua: 'Українська', ru: 'Русский', ar: 'العربية' },
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clamp = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…');

function jsonLd(lang, id, q) {
  const key = q.answers.ansKey;
  const correct = q.answers[key][lang];
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${L.frage[lang]} ${id} — Leben in Deutschland`,
    inLanguage: HREFLANG[lang],
    url: `${SITE}/${lang}/frage/${id}`,
    about: { '@type': 'Thing', name: 'Einbürgerungstest / Leben in Deutschland' },
    publisher: {
      '@type': 'Person',
      name: 'Dmytro Herashchenko',
      url: SITE,
      sameAs: ['https://www.linkedin.com/in/herashchenko-dmytro/', 'https://github.com/stoczec'],
    },
    hasPart: {
      '@type': 'Question',
      eduQuestionType: 'Multiple choice',
      position: id,
      text: q[lang],
      suggestedAnswer: [1, 2, 3, 4]
        .filter((i) => i !== key)
        .map((i) => ({ '@type': 'Answer', position: i, text: q.answers[i][lang] })),
      acceptedAnswer: { '@type': 'Answer', position: key, text: correct },
    },
  };
  return JSON.stringify(data);
}

function head(lang, id, q) {
  const key = q.answers.ansKey;
  const correct = q.answers[key][lang];
  const title = `${L.frage[lang]} ${id}: ${clamp(q[lang], 60)}`;
  const desc = clamp(`${q[lang]} ${L.correct[lang]}: ${correct}.`, 160);
  const canonical = `${SITE}/${lang}/frage/${id}`;
  const alts = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}/${l}/frage/${id}">`
  ).join('\n    ');
  return `<title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}">
    <link rel="canonical" href="${canonical}">
    ${alts}
    <link rel="alternate" hreflang="x-default" href="${SITE}/en/frage/${id}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(desc)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:site_name" content="Leben in Deutschland">
    <meta property="og:locale" content="${OG_LOCALE[lang]}">
    <meta property="og:image" content="${SITE}/og.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${jsonLd(lang, id, q)}</script>`;
}

function body(lang, id, q) {
  const key = q.answers.ansKey;
  const showDe = lang !== 'de';
  const items = [1, 2, 3, 4]
    .map((i) => {
      const isC = i === key;
      const tr = showDe
        ? `<span class="tr">${esc(q.answers[i][lang])}</span>`
        : '';
      return `<li class="${isC ? 'ok' : ''}"><span class="de">${esc(q.answers[i].de)}</span>${tr}${isC ? '<span class="mark">✓</span>' : ''}</li>`;
    })
    .join('\n        ');
  const correctTxt = showDe
    ? `${esc(q.answers[key][lang])} — ${esc(q.answers[key].de)}`
    : esc(q.answers[key].de);
  const langNav = LANGS.filter((l) => l !== lang)
    .map((l) => `<a href="${SITE}/${l}/frage/${id}" hreflang="${HREFLANG[l]}">${L.langName[l]}</a>`)
    .join(' · ');
  const prev = id > 1 ? `<a class="pg" rel="prev" href="${SITE}/${lang}/frage/${id - 1}">← ${L.frage[lang]} ${id - 1}</a>` : '<span></span>';
  const next = id < TOTAL ? `<a class="pg" rel="next" href="${SITE}/${lang}/frage/${id + 1}">${L.frage[lang]} ${id + 1} →</a>` : '<span></span>';
  return `<header class="top"><a class="brand" href="${SITE}/"><span class="logo">LiD</span> Leben in Deutschland</a></header>
      <main>
        <article>
          <p class="kicker">Einbürgerungstest · ${L.frage[lang]} ${id} / ${TOTAL}</p>
          <h1>${esc(q[lang])}</h1>
          ${showDe ? `<p class="orig"><span class="lbl">${L.original[lang]}:</span> ${esc(q.de)}</p>` : ''}
          <h2>${L.options[lang]}</h2>
          <ol class="answers">
        ${items}
          </ol>
          <p class="correct"><strong>${L.correct[lang]}:</strong> ${correctTxt}</p>
          <a class="cta" href="${SITE}/?frage=${id}">${L.practice[lang]} →</a>
          <p class="source">${esc(L.source[lang])}</p>
          <nav class="langs"><span class="lbl">${L.otherLangs[lang]}:</span> ${langNav}</nav>
          <nav class="pager">${prev}${next}</nav>
        </article>
      </main>
      <footer class="foot">
        <p>${esc(L.disclaimer[lang])}</p>
        <p>© 2023–2026 · <a href="${SITE}/">Leben in Deutschland</a></p>
      </footer>`;
}

const CSS = `:root{--bg:#14110e;--surface:#1c1815;--text:#ece7e1;--muted:#a39b92;--subtle:#6f675f;--accent:#e87a4f;--border:#2a2521;--ok:#5bbe8a}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:24px 16px}
a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}
.top{max-width:760px;margin:0 auto 8px}.brand{display:inline-flex;align-items:center;gap:10px;color:var(--text);font-weight:600}
.logo{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:var(--accent);color:#1b1209;font-weight:700;font-size:13px}
main{max-width:760px;margin:0 auto}
.kicker{color:var(--subtle);font-size:13px;letter-spacing:.02em;margin:24px 0 8px}
h1{font-size:25px;line-height:1.3;margin:0 0 18px;text-wrap:pretty}
h2{font-size:14px;color:var(--muted);font-weight:600;margin:26px 0 10px;text-transform:uppercase;letter-spacing:.05em}
.orig{color:var(--muted);font-size:15px;margin:0 0 4px}.lbl{color:var(--subtle)}
.answers{list-style:none;counter-reset:a;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.answers li{counter-increment:a;position:relative;padding:13px 16px 13px 48px;border:1px solid var(--border);border-radius:12px;background:var(--surface)}
.answers li::before{content:counter(a);position:absolute;left:14px;top:13px;width:24px;height:24px;border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--muted)}
.answers li.ok{border-color:var(--ok);background:#15211a}.answers li.ok::before{background:var(--ok);color:#0c1410;border-color:var(--ok)}
.answers .de{display:block;font-weight:500}.answers .tr{display:block;color:var(--muted);font-size:14px;margin-top:2px}
.answers .mark{position:absolute;right:14px;top:13px;color:var(--ok);font-weight:700}
.correct{margin:20px 0;padding:14px 16px;border-radius:12px;background:#15211a;border:1px solid var(--ok)}
.cta{display:inline-block;margin:8px 0 4px;padding:11px 20px;border-radius:10px;background:var(--accent);color:#1b1209;font-weight:600}
.cta:hover{text-decoration:none;filter:brightness(1.05)}
.source{color:var(--subtle);font-size:13px;margin-top:24px}
.langs{margin-top:18px;font-size:14px;color:var(--muted)}
.pager{display:flex;justify-content:space-between;gap:12px;margin-top:18px}.pg{font-size:14px}
.foot{max-width:760px;margin:40px auto 0;padding-top:18px;border-top:1px solid var(--border);color:var(--subtle);font-size:12px}
.foot p{margin:4px 0}
[dir=rtl] .answers li{padding:13px 48px 13px 16px}[dir=rtl] .answers li::before{left:auto;right:14px}[dir=rtl] .answers .mark{right:auto;left:14px}`;

function pageHtml(lang, id, q) {
  const dir = RTL.has(lang) ? ' dir="rtl"' : '';
  return `<!doctype html>
<html lang="${HREFLANG[lang]}"${dir}>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${head(lang, id, q)}
    <style>${CSS}</style>
  </head>
  <body>
    ${body(lang, id, q)}
  </body>
</html>
`;
}

function sitemap(ids) {
  const urls = [];
  for (const id of ids) {
    for (const lang of LANGS) {
      const alts = LANGS.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}/${l}/frage/${id}"/>`
      ).join('');
      urls.push(
        `<url><loc>${SITE}/${lang}/frage/${id}</loc><lastmod>${BUILD_DATE}</lastmod>${alts}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/en/frage/${id}"/></url>`
      );
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url><loc>${SITE}/</loc><lastmod>${BUILD_DATE}</lastmod></url>
${urls.join('\n')}
</urlset>
`;
}

const FAQ = [
  [
    'Wie viele Fragen hat der Einbürgerungstest „Leben in Deutschland“?',
    'Der amtliche Gesamtfragenkatalog umfasst 460 Fragen. In der Prüfung werden 33 Fragen gestellt.',
  ],
  [
    'Wie viele Fragen muss man richtig beantworten, um zu bestehen?',
    'Mindestens 17 der 33 gestellten Fragen müssen richtig beantwortet werden.',
  ],
  ['Ist das Üben kostenlos?', 'Ja, das Üben aller 460 Fragen ist komplett kostenlos und ohne Anmeldung.'],
  [
    'In welchen Sprachen kann ich üben?',
    'Auf Deutsch sowie mit Übersetzung auf Englisch, Ukrainisch und Russisch.',
  ],
];

function homepageBody() {
  const faq = FAQ.map(([q, a]) => `<h3>${esc(q)}</h3>\n      <p>${esc(a)}</p>`).join('\n      ');
  const ex = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<li><a href="/de/frage/${i}">Frage ${i}</a></li>`).join('');
  return `<main style="max-width:760px;margin:0 auto;padding:32px 18px;line-height:1.6;font-family:system-ui,-apple-system,sans-serif">
      <h1>Leben in Deutschland — Einbürgerungstest: alle 460 Fragen üben</h1>
      <p>Kostenloses Üben für den offiziellen Test „Leben in Deutschland“ und den Einbürgerungstest. Alle 460 amtlichen Fragen mit den richtigen Antworten — auf Deutsch, Englisch, Ukrainisch und Russisch.</p>
      <ul>
        <li>460 Fragen im amtlichen Gesamtfragenkatalog</li>
        <li>In der Prüfung: 33 Fragen, bestanden ab 17 richtigen Antworten</li>
        <li>4 Sprachen: Deutsch, English, Українська, Русский</li>
        <li>Kostenlos, ohne Anmeldung, offline nutzbar</li>
      </ul>
      <h2>Häufige Fragen</h2>
      ${faq}
      <h2>Beispielfragen</h2>
      <ul>${ex}</ul>
      <p><a href="/de/frage/1">Alle Fragen durchgehen →</a></p>
    </main>`;
}

function homepageJsonLd() {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Leben in Deutschland — Einbürgerungstest',
    url: `${SITE}/`,
    description:
      'Kostenlos den Einbürgerungstest „Leben in Deutschland“ üben: alle 460 amtlichen Fragen mit Antworten in 4 Sprachen.',
    inLanguage: ['de', 'en', 'uk', 'ru'],
    publisher: {
      '@type': 'Person',
      name: 'Dmytro Herashchenko',
      url: SITE,
      sameAs: ['https://www.linkedin.com/in/herashchenko-dmytro/', 'https://github.com/stoczec'],
    },
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(website)}</script>\n    <script type="application/ld+json">${JSON.stringify(faq)}</script>`;
}

async function injectHomepage() {
  const file = resolve(OUT, 'index.html');
  let html = await readFile(file, 'utf8');
  const head = html.includes('</head>');
  const root = html.includes('<div id="root"></div>');
  if (head) html = html.replace('</head>', `  ${homepageJsonLd()}\n  </head>`);
  if (root) html = html.replace('<div id="root"></div>', `<div id="root">${homepageBody()}</div>`);
  await writeFile(file, html, 'utf8');
  return head && root;
}

async function main() {
  const vite = await createServer({
    root: process.cwd(),
    appType: 'custom',
    logLevel: 'warn',
    server: { middlewareMode: true },
  });
  let data;
  try {
    data = (await vite.ssrLoadModule('/src/data/dataNew.js')).default;
  } finally {
    await vite.close();
  }

  TOTAL = data.length;
  let count = 0;
  for (const q of data) {
    for (const lang of LANGS) {
      const file = resolve(OUT, lang, 'frage', String(q.id), 'index.html');
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, pageHtml(lang, q.id, q), 'utf8');
      count++;
    }
  }
  await writeFile(resolve(OUT, 'sitemap.xml'), sitemap(data.map((q) => q.id)), 'utf8');
  const homeOk = await injectHomepage();

  console.log(`[gen-seo] ${count} pages for ${data.length} questions × ${LANGS.length} langs → dist/{lang}/frage/{id}/`);
  console.log(`[gen-seo] sitemap.xml: ${data.length * LANGS.length + 1} urls`);
  console.log(`[gen-seo] homepage SEO injected into dist/index.html: ${homeOk ? 'ok' : 'TARGETS NOT FOUND'}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
