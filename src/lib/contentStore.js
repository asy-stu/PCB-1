import i18n from "../i18n";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
import tr from "../locales/tr.json";

const BASE = { en, ar, tr };
const STORAGE_KEY = "site_content_overrides";

function deepMerge(base, override) {
  if (Array.isArray(base)) return override !== undefined ? override : base;
  if (typeof base === "object" && base !== null) {
    const result = { ...base };
    if (override && typeof override === "object") {
      Object.keys(override).forEach((k) => {
        result[k] = deepMerge(base[k], override[k]);
      });
    }
    return result;
  }
  return override !== undefined ? override : base;
}

export function getOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { en: {}, ar: {}, tr: {} };
  } catch {
    return { en: {}, ar: {}, tr: {} };
  }
}

export function getMergedContent(lang) {
  const overrides = getOverrides();
  return deepMerge(BASE[lang], overrides[lang] || {});
}

export function saveLanguageContent(lang, fullObject) {
  const overrides = getOverrides();
  overrides[lang] = fullObject;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  i18n.addResourceBundle(lang, "translation", fullObject, true, true);
  const cur = i18n.language;
  i18n.changeLanguage(cur === lang ? lang : cur).then(() => {
    if (cur !== lang) return;
    i18n.emit("languageChanged", cur);
  });
}

export function resetLanguageContent(lang) {
  const overrides = getOverrides();
  delete overrides[lang];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  i18n.addResourceBundle(lang, "translation", BASE[lang], true, true);
  const cur = i18n.language;
  i18n.changeLanguage(cur);
  return BASE[lang];
}

export function applyAllOverridesToI18n() {
  ["en", "ar", "tr"].forEach((lang) => {
    i18n.addResourceBundle(lang, "translation", getMergedContent(lang), true, true);
  });
}

export function getBase(lang) {
  return BASE[lang];
}
