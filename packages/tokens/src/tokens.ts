/**
 * Design tokens palette inspired by Warhammer Citadel color harmonies.
 */

export const colors = {
  // Gold (Primary action)
  gold: {
    50: '#FDF8E7',
    100: '#FBF0C6',
    200: '#F7E18E',
    300: '#F2D054',
    400: '#ECC128',
    500: '#D4AF37',
    600: '#B8860B',
    700: '#8C6508',
    800: '#604505',
    900: '#382803',
  },

  // Slate (Surfaces & text)
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  // Red (Destructive)
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Emerald (Success)
  emerald: {
    50: '#ECFDF5',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },
} as const;

export const radii = {
  none: '0px',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  full: '9999px',
} as const;

export const spacing = {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
} as const;

export const typography = {
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: '"Cinzel", "Cinzel Decorative", Georgia, serif',
  },
} as const;

export const tokens = {
  colors,
  radii,
  spacing,
  typography,
} as const;
