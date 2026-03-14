'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinksZh = [
  { name: '首頁', href: '/' },
  { name: '關於我', href: '/about' },
  { name: '個人專案', href: '/projects' },
  { name: '服務項目', href: '/service' },
  { name: '聯絡我', href: '/contact' },
];

const navLinksEn = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/service' },
  { name: 'Contact', href: '/contact' },
];

const navLinksYue = [
  { name: '主頁', href: '/' },
  { name: '關於我', href: '/about' },
  { name: '個人項目', href: '/projects' },
  { name: '服務內容', href: '/service' },
  { name: '聯絡我', href: '/contact' },
];

const normalize = (p) => (p === '/' ? '/' : p.replace(/\/$/, ''));

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const locale = useMemo(() => (pathname?.startsWith('/en') ? 'en' : pathname?.startsWith('/yue') ? 'yue' : 'zh'), [pathname]);
  const hrefPrefix = locale === 'zh' ? '' : `/${locale}`;
  const links = locale === 'en' ? navLinksEn : locale === 'yue' ? navLinksYue : navLinksZh;

  const toggleMenu = () => setIsOpen((v) => !v);

  const switchTo = useCallback((lang) => {
    if (!pathname) return;
    const base = pathname.replace(/^\/(en|yue)(?=\/|$)/, '') || '/';
    const target = lang === 'zh' ? (base === '' ? '/' : base) : `/${lang}${base === '/' ? '' : base}`;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-lang', lang);
        document.cookie = `preferred-lang=${lang}; path=/; max-age=31536000; samesite=lax`;
      }
    } catch {}
    setShowLang(false);
    router.push(target);
  }, [pathname, router]);

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href={hrefPrefix || '/'} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Morris
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const linkHref = normalize(`${hrefPrefix}${link.href}`.replace('//', '/'));
              const isActive = normalize(pathname || '') === linkHref;
              return (
                <Link key={`${link.name}-${link.href}`} href={linkHref} className={`relative text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 bottom-[-6px] block h-[2px] w-full bg-[var(--color-electric-blue)]"
                    />
                  )}
                </Link>
              );
            })}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLang(v => !v)}
                className="ml-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-colors"
                aria-haspopup="true"
                aria-expanded={showLang}
              >
                {locale === 'en' ? 'EN' : locale === 'yue' ? '粵語' : '繁中'}
              </button>
              {showLang && (
                <div className="absolute right-0 mt-2 w-28 rounded-lg border border-white/10 bg-black/70 backdrop-blur-xl shadow-lg p-1">
                  <button onClick={() => switchTo('zh')} className={`w-full text-left px-3 py-2 rounded-md text-xs ${locale==='zh' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>繁中</button>
                  <button onClick={() => switchTo('yue')} className={`w-full text-left px-3 py-2 rounded-md text-xs ${locale==='yue' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>粵語</button>
                  <button onClick={() => switchTo('en')} className={`w-full text-left px-3 py-2 rounded-md text-xs ${locale==='en' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>English</button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowLang(v => !v)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-colors"
                aria-haspopup="true"
                aria-expanded={showLang}
              >
                {locale === 'en' ? 'EN' : locale === 'yue' ? '粵語' : '繁中'}
              </button>
              {showLang && (
                <div className="absolute right-0 mt-2 w-28 rounded-lg border border-white/10 bg-black/70 backdrop-blur-xl shadow-lg p-1">
                  <button onClick={() => switchTo('zh')} className={`w-full text-left px-3 py-2 rounded-md text-xs ${locale==='zh' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>繁中</button>
                  <button onClick={() => switchTo('yue')} className={`w-full text-left px-3 py-2 rounded-md text-xs ${locale==='yue' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>粵語</button>
                  <button onClick={() => switchTo('en')} className={`w-full text-left px-3 py-2 rounded-md text-xs ${locale==='en' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>English</button>
                </div>
              )}
            </div>
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-black/50 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {links.map((link, index) => {
              const linkHref = normalize(`${hrefPrefix}${link.href}`.replace('//', '/'));
              const active = normalize(pathname || '') === linkHref;
              return (
                <motion.div
                  key={`${link.name}-${index}`}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={linkHref} onClick={toggleMenu} className={`block px-3 py-2 rounded-md text-base font-medium ${active ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
            <div className="flex gap-2 pt-2">
              {[
                { key: 'zh', label: '繁中' },
                { key: 'yue', label: '粵語' },
                { key: 'en', label: 'EN' },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => { switchTo(opt.key); toggleMenu(); }}
                  className={`px-3 py-2 rounded-full text-sm font-semibold border border-white/20 ${locale===opt.key ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:border-white/40'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
