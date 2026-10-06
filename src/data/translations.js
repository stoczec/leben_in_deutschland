// Per-language chunks cut from dataNew.js by scripts/vite-plugin-question-langs.js.
const loaders = {
  en: () => import('./dataNew.js?lang=en'),
  ua: () => import('./dataNew.js?lang=ua'),
  ru: () => import('./dataNew.js?lang=ru'),
};

const loaded = new Map();
const pending = new Map();

export const cachedTranslations = (lang) => loaded.get(lang) ?? null;

// Resolves to { id: [question, answer1..4] }; null for German, unknown codes and failed loads (retried next call).
export function loadTranslations(lang) {
  const load = loaders[lang];
  if (!load) return Promise.resolve(null);
  if (!pending.has(lang)) {
    const request = load().then(
      (module) => {
        loaded.set(lang, module.default);
        return module.default;
      },
      () => {
        pending.delete(lang);
        return null;
      }
    );
    pending.set(lang, request);
  }
  return pending.get(lang);
}
