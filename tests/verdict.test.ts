import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
const words: Record<string, string[]> = {
  en: ['safe', 'unsafe', 'pure', 'adulterated', 'confirmed'],
  hi: ['सुरक्षित', 'असुरक्षित', 'शुद्ध', 'मिलावटी', 'पुष्ट', 'प्रमाणित'],
  mr: ['सुरक्षित', 'असुरक्षित', 'शुद्ध', 'भेसळयुक्त', 'पुष्टी', 'प्रमाणित']
};
const flat = (o: unknown): string[] => typeof o === 'string' ? [o] : o && typeof o === 'object' ? Object.values(o).flatMap(flat) : [];
describe('no verdict words', () => {
  for (const l of ['en', 'hi', 'mr']) it(l, () => {
    const texts = flat(JSON.parse(readFileSync(`messages/${l}.json`, 'utf8')));
    for (const w of words[l]) { const re = new RegExp(`(?<![\\p{L}\\p{M}])${w}(?![\\p{L}\\p{M}])`, 'iu'); for (const s of texts) expect(re.test(s), `${l}: "${w}" in "${s}"`).toBe(false); }
  });
  it('allows safety/safely', () => { expect(/\b(safe)\b/i.test('safety safely')).toBe(false); });
});
