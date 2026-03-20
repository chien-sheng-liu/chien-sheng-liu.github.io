'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Replaces middleware language detection for static (GitHub Pages) deployments.
 * Runs once on mount: checks preferred-lang cookie → navigator.language fallback.
 * Only redirects if currently on a zh path and the detected language is 'en'.
 */
export default function LangDetect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Already on an /en path — nothing to do
    if (pathname?.startsWith('/en')) return;

    // Read cookie
    const cookieLang = document.cookie
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('preferred-lang='))
      ?.split('=')[1];

    // Fall back to browser language
    const browserLang = navigator.language?.toLowerCase() || '';
    const preferEn =
      cookieLang === 'en' ||
      (!cookieLang && (browserLang.startsWith('en')));

    if (preferEn) {
      const enPath = `/en${pathname === '/' ? '' : pathname}`;
      router.replace(enPath);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
