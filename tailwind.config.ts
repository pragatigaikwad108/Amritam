import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { bg: 'var(--bg)', fg: 'var(--fg)', card: 'var(--card)', brand: 'var(--brand)', onbrand: 'var(--onbrand)', accent: 'var(--accent)', line: 'var(--line)' } } } } satisfies Config;
