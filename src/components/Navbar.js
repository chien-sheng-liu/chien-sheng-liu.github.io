"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const navigation = {
  zh: [
    ["首頁", "/"],
    ["關於我", "/about"],
    ["作品", "/projects"],
    ["文章", "/articles"],
    ["聯絡", "/contact"],
  ],
  en: [
    ["Home", "/"],
    ["About", "/about"],
    ["Work", "/projects"],
    ["Notes", "/articles"],
    ["Contact", "/contact"],
  ],
};

const normalize = (path) => (path === "/" ? "/" : path?.replace(/\/$/, ""));

export default function Navbar() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const locale = useMemo(() => (pathname?.startsWith("/en") ? "en" : "zh"), [pathname]);
  const prefix = locale === "en" ? "/en" : "";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    const focusable = Array.from(menuRef.current?.querySelectorAll("a, button") || []);
    document.body.style.overflow = "hidden";
    focusable[0]?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const languageTarget = (language) => {
    const base = pathname?.replace(/^\/en(?=\/|$)/, "") || "/";
    return language === "en" ? `/en${base === "/" ? "" : base}` : base;
  };

  const rememberLanguage = (language) => {
    localStorage.setItem("preferred-lang", language);
    document.cookie = `preferred-lang=${language}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <header className="jre-header">
      <div className="jre-header__bar">
        <Link href={prefix || "/"} className="jre-brand" aria-label="Morris Liu home">
          <span className="jre-brand__mark">ML<small>MORRIS</small></span>
          <span className="jre-brand__name">Morris Liu<br /><small>Personal portfolio</small></span>
        </Link>

        <nav className="jre-nav" aria-label="Primary navigation">
          {navigation[locale].map(([label, href]) => {
            const target = normalize(`${prefix}${href}`.replace("//", "/"));
            const active = normalize(pathname || "/") === target;
            return (
              <Link href={target} className={active ? "is-active" : ""} key={href}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="jre-header__actions">
          <div className="jre-language" aria-label="Language">
            <Link href={languageTarget("zh")} onClick={() => rememberLanguage("zh")} hrefLang="zh-Hant" className={locale === "zh" ? "is-active" : ""}>繁中</Link>
            <span>/</span>
            <Link href={languageTarget("en")} onClick={() => rememberLanguage("en")} hrefLang="en" className={locale === "en" ? "is-active" : ""}>EN</Link>
          </div>
          <Link href={`${prefix}/contact`} className="jre-header__contact">
            {locale === "zh" ? "聯絡我" : "CONTACT"} <span aria-hidden="true">↗</span>
          </Link>
          <button
            className="jre-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="jre-mobile-menu"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <i className={open ? "is-open" : ""} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="jre-mobile-menu"
            className="jre-mobile-menu"
            initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0 : 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {navigation[locale].map(([label, href], index) => {
                const target = normalize(`${prefix}${href}`.replace("//", "/"));
                return (
                  <Link href={target} key={href}>
                    <span>0{index + 1}</span><strong>{label}</strong><i>↗</i>
                  </Link>
                );
              })}
            </nav>
            <div className="jre-mobile-menu__foot">
              <div className="jre-language">
                <Link href={languageTarget("zh")} onClick={() => rememberLanguage("zh")} hrefLang="zh-Hant" className={locale === "zh" ? "is-active" : ""}>繁中</Link>
                <span>/</span>
                <Link href={languageTarget("en")} onClick={() => rememberLanguage("en")} hrefLang="en" className={locale === "en" ? "is-active" : ""}>EN</Link>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/chienshengliu/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="https://github.com/chien-sheng-liu" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
