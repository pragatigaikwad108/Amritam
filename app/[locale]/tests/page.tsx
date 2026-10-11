import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { demoTests } from '@/lib/tests';
export default function Tests() {
  const t = useTranslations(); const locale = useLocale();
  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-3xl font-bold text-brand">{t('lib.title')}</h1><p className="mt-1">{t('lib.levelA')}</p>
      <ul className="mt-4 grid gap-3">{demoTests.map((x) => (
        <li key={x.code}><Link className="flex min-h-14 items-center rounded-xl border border-line bg-card p-4 font-semibold" href={`/${locale}/tests/${x.code}`}>{x.code}: {t(`tests.${x.code}.title`)}</Link></li>))}</ul>
    </div>);
}
