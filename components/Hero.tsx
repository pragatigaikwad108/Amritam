'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
export default function Hero() {
  const t = useTranslations('hero'); const locale = useLocale();
  return (
    <MotionConfig reducedMotion="user">
      <section className="mx-auto max-w-5xl px-4 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <Image src="/logo.png" alt="Amritam" width={120} height={120} className="mx-auto" priority />
          <h1 className="mt-4 text-4xl font-bold text-brand">अमृतम् · Amritam</h1>
          <p className="mt-2 text-xl font-semibold text-accent">Parakho, phir piyo</p>
          <p className="mx-auto mt-4 max-w-xl">{t('sub')}</p>
          <Link href={`/${locale}/tests`} className="btn mt-6">{t('cta')}</Link>
        </motion.div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {['s1', 's2', 's3'].map((k, i) => (
            <motion.div key={k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }} className="rounded-2xl border border-line bg-card p-5 text-left">
              <div className="text-3xl font-bold text-accent">{i + 1}</div><p className="mt-2">{t(k)}</p></motion.div>))}
        </div>
      </section>
    </MotionConfig>);
}
