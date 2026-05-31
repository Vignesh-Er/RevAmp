import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui-shared/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui-shared/animations/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FCC509',
        goldLight: '#FDE580',
        goldDim: '#D4A608',
        roseWhite: '#FFF9FA',
        charcoal: '#17171D',
        surface1: '#FFF4F5',
        surface2: '#FFEEF0',
        surfaceDark: '#1E1E25',
        textSecondary: '#3D3D45',
        textMuted: '#6B6B75',
        danger: '#D93025',
        success: '#1B8A4E',
        borderDefault: 'rgba(23, 23, 29, 0.08)',
        borderAccent: 'rgba(252, 197, 9, 0.40)',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
      fontSize: {
        display: ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['3rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        h2: ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        h3: ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        h4: ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '600' }],
        bodyLarge: ['1.125rem', { lineHeight: '1.7', letterSpacing: '0em', fontWeight: '400' }],
        bodyDefault: ['1rem', { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '400' }],
        bodySmall: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '400' }],
        btnText: ['0.9375rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '600' }],
        navLink: ['0.9375rem', { lineHeight: '1', letterSpacing: '0em', fontWeight: '500' }],
      },
      gridTemplateColumns: {
        'bento-12': 'repeat(12, minmax(0, 1fr))',
      },
      borderRadius: {
        'glass-20': '20px',
        'glass-24': '24px',
        'glass-16': '16px',
      },
    },
  },
  plugins: [],
};

export default config;
