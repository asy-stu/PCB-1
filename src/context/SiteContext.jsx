import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTheme, saveTheme, applyThemeToDOM, resetTheme as resetThemeStore } from "../lib/themeStore";
import { applyAllOverridesToI18n } from "../lib/contentStore";
import { recordLangUsage } from "../lib/statsStore";
import { RTL_LANGS } from "../i18n";

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const { i18n } = useTranslation();
  const [theme, setThemeState] = useState(getTheme());

  useEffect(() => {
    applyAllOverridesToI18n();
    applyThemeToDOM(theme);
  }, []);

  useEffect(() => {
    const dir = RTL_LANGS.includes(i18n.language) ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    localStorage.setItem("site_lang", i18n.language);
    recordLangUsage(i18n.language);
  }, [i18n.language]);

  const setTheme = (updates) => {
    const next = { ...theme, ...updates };
    setThemeState(next);
    saveTheme(next);
    applyThemeToDOM(next);
  };

  const resetTheme = () => {
    const next = resetThemeStore();
    setThemeState(next);
    applyThemeToDOM(next);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SiteContext.Provider value={{ theme, setTheme, resetTheme, changeLanguage, lang: i18n.language }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
