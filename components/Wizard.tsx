'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MotionConfig, motion } from 'framer-motion';
type R = 'neg' | 'pos' | 'retest';
export default function Wizard({ code, swatch }: { code: string; swatch: { neg: string; pos: string } }) {
  const t = useTranslations('wiz'); const tt = useTranslations('tests.' + code);
  const steps = tt.raw('steps') as string[];
  const [stage, setStage] = useState(0); const [i, setI] = useState(0); const [ack, setAck] = useState(false); const [res, setRes] = useState<R | null>(null);
  const pct = ((stage + 1) / 4) * 100;
  const pick = (r: R) => { setRes(r); setStage(3); };
  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto max-w-xl p-4">
        <div className="h-2 overflow-hidden rounded bg-line" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-2 origin-left bg-brand transition-transform duration-300" style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <h1 className="mt-4 text-2xl font-bold">{code}: {tt('title')}</h1>
        <motion.div key={stage + '-' + i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="mt-4 rounded-2xl border border-line bg-card p-5">
          {stage === 0 && (<>
            <h2 className="font-bold text-accent">{t('safetyTitle')}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">{(t.raw('safety') as string[]).map((s) => <li key={s}>{s}</li>)}</ul>
            <label className="mt-4 flex min-h-12 items-center gap-3"><input type="checkbox" className="h-6 w-6" checked={ack} onChange={(e) => setAck(e.target.checked)} />{t('ack')}</label>
            <button className="btn mt-3" disabled={!ack} onClick={() => setStage(1)}>{t('start')}</button></>)}
          {stage === 1 && (<>
            <p className="text-sm text-accent">{t('step')} {i + 1} / {steps.length}</p>
            <p className="mt-2 text-lg">{steps[i]}</p>
            <div className="mt-4 flex gap-2">
              <button className="btn btn-o" disabled={i === 0} onClick={() => setI(i - 1)}>{t('back')}</button>
              <button className="btn" onClick={() => (i < steps.length - 1 ? setI(i + 1) : setStage(2))}>{t('next')}</button></div></>)}
          {stage === 2 && (<>
            <h2 className="font-bold">{t('pick')}</h2>
            <div className="mt-3 grid gap-3">
              {([['neg', swatch.neg, tt('neg')], ['pos', swatch.pos, tt('pos')]] as [R, string, string][]).map(([r, c, label]) => (
                <button key={r} onClick={() => pick(r)} className="flex min-h-16 items-center gap-4 rounded-xl border-2 border-line p-3 text-left">
                  <span className="h-12 w-12 shrink-0 rounded-lg border border-line" style={{ background: c }} aria-hidden /><span>{label}</span></button>))}
              <button onClick={() => pick('retest')} className="min-h-12 rounded-xl border-2 border-dashed border-line p-3">{t('cannot')}</button></div></>)}
          {stage === 3 && res && (<>
            <h2 className={`rounded-xl p-4 text-2xl font-bold ${res === 'neg' ? 'bg-green-100 text-green-900' : res === 'pos' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-900'}`}>
              {res === 'neg' ? t('notDetected') : res === 'pos' ? t('suspected') : t('retest')}</h2>
            {res === 'pos' && <p className="mt-3">{t('actionSusp')} <a className="underline" href="https://fssai.gov.in" target="_blank" rel="noreferrer">fssai.gov.in</a></p>}
            {res === 'retest' && <p className="mt-3">{t('actionRetest')}</p>}
            <p className="mt-3 text-sm font-semibold">{t('disc')}</p>
            <button className="btn btn-o mt-4" onClick={() => { setStage(0); setI(0); setAck(false); setRes(null); }}>{t('again')}</button></>)}
        </motion.div>
      </div>
    </MotionConfig>);
}
