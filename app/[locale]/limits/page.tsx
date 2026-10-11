import { useTranslations } from 'next-intl';
export default function Limits() {
  const t = useTranslations('limits');
  return (<div className="mx-auto max-w-3xl p-4"><h1 className="text-3xl font-bold text-brand">{t('title')}</h1>
    <ul className="mt-4 list-disc space-y-2 pl-5">{(t.raw('items') as string[]).map((s) => <li key={s}>{s}</li>)}</ul></div>);
}
