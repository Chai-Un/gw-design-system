import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { colors, radii, spacing, typography } from '../src/tokens';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Generate Tailwind v4 @theme CSS adapter (theme.css)
const generateV4Theme = (): string => {
  const lines: string[] = [
    '/**',
    ' * Tailwind v4 Theme Adapter',
    ' * Auto-generated from design tokens. Do not edit directly.',
    ' */',
    '@theme {',
  ];

  // Colors
  for (const [family, shades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(shades)) {
      lines.push(`  --color-${family}-${shade}: ${value};`);
    }
  }

  // Semantic mappings
  lines.push('  --color-primary: var(--color-gold-500);');
  lines.push('  --color-primary-hover: var(--color-gold-600);');
  lines.push('  --color-destructive: var(--color-red-600);');
  lines.push('  --color-destructive-hover: var(--color-red-700);');
  lines.push('  --color-surface: var(--color-slate-900);');
  lines.push('  --color-surface-card: var(--color-slate-800);');

  // Radii
  for (const [key, value] of Object.entries(radii)) {
    lines.push(`  --radius-${key}: ${value};`);
  }

  // Spacing
  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  --spacing-gw-${key}: ${value};`);
  }

  lines.push('}');
  lines.push('');
  return lines.join('\n');
};

// 2. Generate Tailwind v3 Preset adapter (preset.js)
const generateV3Preset = (): string => {
  const content = `/**
 * Tailwind v3 Preset Adapter
 * Auto-generated from design tokens. Do not edit directly.
 */
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(
        {
          ...colors,
          primary: {
            DEFAULT: colors.gold[500],
            hover: colors.gold[600],
          },
          destructive: {
            DEFAULT: colors.red[600],
            hover: colors.red[700],
          },
          surface: {
            DEFAULT: colors.slate[900],
            card: colors.slate[800],
          },
        },
        null,
        6
      ).replace(/^ {6}/gm, '      ')},
      borderRadius: ${JSON.stringify(radii, null, 6).replace(/^ {6}/gm, '      ')},
      spacing: ${JSON.stringify(
        Object.fromEntries(Object.entries(spacing).map(([k, v]) => [`gw-${k}`, v])),
        null,
        6
      ).replace(/^ {6}/gm, '      ')},
      fontFamily: ${JSON.stringify(typography.fontFamily, null, 6).replace(/^ {6}/gm, '      ')}
    }
  }
};
`;
  return content;
};

fs.writeFileSync(path.join(distDir, 'theme.css'), generateV4Theme(), 'utf-8');
fs.writeFileSync(path.join(distDir, 'preset.js'), generateV3Preset(), 'utf-8');

console.log('Generated Tailwind v4 (theme.css) and v3 (preset.js) adapters.');
