import { notFound } from 'next/navigation';
import Wizard from '@/components/Wizard';
import { demoTests } from '@/lib/tests';
export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params; const x = demoTests.find((d) => d.code === code);
  if (!x) notFound();
  return <Wizard code={x.code} swatch={x.swatch} />;
}
