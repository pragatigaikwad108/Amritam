'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
export default function Nav() {
  const t = useTranslations('nav'); const locale = useLocale(); const path = usePathname();
  const [dark, setDark] = useState(false);
  useEffect(() => { try { const d = localStorage.getItem('theme') === 'dark'; setDark(d); document.documentElement.classList.toggle('dark', d); } catch {} }, []);
  const toggle = () => { const d = !dark; setDark(d); document.documentElement.classList.toggle('dark', d); try { localStorage.setItem('theme', d ? 'dark' : 'light'); } catch {} };
  const rest = path.split('/').slice(2).join('/');
  const l = (p: string) => `/${locale}${p}`;
  return (
    <header className="border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 p-3" aria-label="Main">
        <Link href={l('')} className="flex min-h-12 items-center gap-2 font-bold" aria-label="Amritam">
          <Image src="/logo.png" alt="" width={32} height={32} /><span>Amritam</span></Link>
        <div className="ml-auto flex flex-wrap items-center gap-1 text-sm">
          <Link className="flex min-h-12 items-center px-2" href={l('/tests')}>{t('tests')}</Link>
          <Link className="flex min-h-12 items-center px-2" href={l('/limits')}>{t('limits')}</Link>
          <Link className="flex min-h-12 items-center px-2" href={l('/sources')}>{t('sources')}</Link>
          {['en', 'hi', 'mr'].map((x) => (
            <Link key={x} href={`/${x}${rest ? '/' + rest : ''}`} aria-current={x === locale} className={`flex min-h-12 min-w-12 items-center justify-center rounded-lg ${x === locale ? 'font-bold underline' : ''}`}>{x.toUpperCase()}</Link>))}
          <button onClick={toggle} className="min-h-12 min-w-12 rounded-lg border border-line px-3" aria-pressed={dark}>{dark ? '☀' : '☾'}<span className="sr-only">{t('theme')}</span></button>
        </div>
      </nav>
    </header>);
}
