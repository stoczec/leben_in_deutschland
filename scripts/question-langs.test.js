import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

const LANGS = ['en', 'ua', 'ru', 'ar'];
let failRu = false;
let vite;
let full;

before(async () => {
  const offline = {
    name: 'offline-ru',
    load(id) {
      if (failRu && id.endsWith('dataNew.js?lang=ru')) throw new Error('offline');
    },
  };
  vite = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true, hmr: false },
    plugins: [offline],
  });
  full = (await vite.ssrLoadModule('/src/data/dataNew.js')).default;
});

after(() => vite.close());

test('base module keeps ids, German text, answer keys and images, without translations', async () => {
  const base = (await vite.ssrLoadModule('/src/data/dataNew.js?base')).default;
  assert.equal(base.length, full.length);
  base.forEach((q, i) => {
    const src = full[i];
    assert.deepEqual([q.id, q.land, q.img, q.de, q.answers.ansKey], [src.id, src.land, src.img, src.de, src.answers.ansKey]);
    for (const n of [1, 2, 3, 4]) assert.deepEqual(q.answers[n], { de: src.answers[n].de });
    for (const lang of LANGS) assert.equal(q[lang], undefined);
  });
});

test('a language resolves to its own question and answer texts for every id', async () => {
  const { loadTranslations, cachedTranslations } = await vite.ssrLoadModule('/src/data/translations.js');
  for (const lang of ['en', 'ua', 'ru']) {
    const byId = await loadTranslations(lang);
    assert.equal(Object.keys(byId).length, full.length);
    for (const q of full) {
      assert.deepEqual(byId[q.id], [q[lang], ...[1, 2, 3, 4].map((n) => q.answers[n][lang])]);
    }
    assert.equal(cachedTranslations(lang), byId);
    assert.equal(loadTranslations(lang), loadTranslations(lang));
  }
});

test('German, disabled and unknown codes resolve to null without a request', async () => {
  const { loadTranslations, cachedTranslations } = await vite.ssrLoadModule('/src/data/translations.js');
  for (const lang of ['de', 'ar', 'xx', null]) assert.equal(await loadTranslations(lang), null);
  assert.equal(cachedTranslations('de'), null);
});

test('a failed load falls back to null and is retried on the next call', async () => {
  vite.moduleGraph.invalidateAll();
  const { loadTranslations, cachedTranslations } = await vite.ssrLoadModule('/src/data/translations.js');
  failRu = true;
  assert.equal(await loadTranslations('ru'), null);
  assert.equal(cachedTranslations('ru'), null);
  failRu = false;
  const byId = await loadTranslations('ru');
  assert.equal(byId[1][0], full[0].ru);
});
