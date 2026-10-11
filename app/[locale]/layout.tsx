import '../globals.css';
import type { Metadata } from 'next';
import { Poppins, Noto_Sans_Devanagari } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Nav from '@/components/Nav';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], display: 'swap', variable: '--font-poppins' });
const deva = Noto_Sans_Devanagari({ subsets: ['devanagari', 'latin'], weight: ['400', '600', '700'], display: 'swap', variable: '--font-deva' });
export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })); }
export const metadata: Metadata = { title: 'Amritam (अमृतम्)', description: 'Screening of milk and milk products with simple colour tests.', openGraph: { title: 'Amritam (अमृतम्)', type: 'website' } };
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages(); const t = await getTranslations({ locale });
  return (
    <html lang={locale} className={`${poppins.variable} ${deva.variable}`} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="bg-brand px-3 py-2 text-center text-sm font-semibold text-onbrand" role="note">{t('banner')}</div>
          <Nav />
          <main>{children}</main>
          <footer className="mx-auto mt-12 max-w-5xl border-t border-line p-4 text-sm">{t('foot')}</footer>
        </NextIntlClientProvider>
      </body>
    </html>);
}
