import { useTranslations } from 'next-intl';
export default function Sources() {
  const t = useTranslations('sources');
  return (<div className="mx-auto max-w-3xl p-4"><h1 className="text-3xl font-bold text-brand">{t('title')}</h1><p className="mt-3">{t('body')}</p><p className="mt-3 font-semibold">{t('na')}</p></div>);
}
