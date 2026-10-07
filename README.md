# Games Workshop Shared Component Library (`@gw/design-system`)

A multi-package component library built for Games Workshop web applications. It provides design tokens, accessible UI components, and supports both Tailwind CSS v3 and Tailwind CSS v4.

---

## 1. Quickstart

### Prerequisites
* **Node.js**: `>= 20.0.0`
* **pnpm**: `>= 9.0.0`

### Setup and Run
```bash
# 1. Install all dependencies
pnpm install

# 2. Build all packages and apps
pnpm build

# 3. Run all tests (unit tests and axe-core accessibility audits)
pnpm test

# 4. Start both playground apps
pnpm dev
```

### Preview URLs
* **Tailwind v3 Playground**: [http://localhost:3003](http://localhost:3003) (Uses Tailwind v3 preset adapter)
* **Tailwind v4 Playground**: [http://localhost:3004](http://localhost:3004) (Uses Tailwind v4 `@theme` and `@source`)

---

## 2. Tech Stack Decision Matrix

| Tool | Role | Why We Picked It |
| :--- | :--- | :--- |
| **`pnpm` Workspaces** | Package Manager | Fast, uses hard links to save disk space, and prevents phantom dependencies. |
| **Turborepo** | Monorepo Build System | Runs tasks in parallel and caches build outputs to save time. |
| **`tsup`** | Bundler for `@gw/ui` and `@gw/tokens` | Built on esbuild. Compiles fast and outputs dual **ESM** (`.mjs`), **CJS** (`.js`), and TypeScript definitions (`.d.ts`). |
| **Tailwind CSS (v3 & v4)** | Styling Engine | Utility-first CSS with zero runtime cost. We provide adapters for both v3 and v4 consumers. |
| **CVA + `tailwind-merge`** | Variant Management | Type-safe component variants (`primary`, `secondary`, etc.) and merges custom class names without CSS conflicts. |
| **Vitest + `jsdom`** | Unit Testing | Fast Vite-based test runner with instant startup and watch mode. |
| **`axe-core`** | Accessibility Audits | Automatically checks WCAG 2.1 AA rules (contrast, ARIA roles, labels) in unit tests. |
| **`@changesets/cli`** | Versioning & Releases | Tracks package changes, updates version numbers, and creates changelogs automatically. |

---

## 3. Monorepo Directory Architecture

```
gw-design-system/
├── apps/
│   ├── playground-v3/             # Consumer app using Tailwind CSS v3 (PostCSS preset)
│   │   ├── src/
│   │   │   ├── App.tsx            # Sign-in form and button preview
│   │   │   └── index.css          # Standard @tailwind directives
│   │   └── tailwind.config.js     # Imports @gw/tokens/preset
│   │
│   └── playground-v4/             # Consumer app using Tailwind CSS v4 (@tailwindcss/vite)
│       ├── src/
│       │   ├── App.tsx            # Sign-in form and button preview
│       │   └── index.css          # Uses @theme and @source
│       └── vite.config.ts         # Configured with @tailwindcss/vite
│
├── packages/
│   ├── tokens/                    # Single source of truth for design tokens
│   │   ├── src/tokens.ts          # Color palette (Citadel Gold, Charcoal, Khorne Red)
│   │   ├── scripts/build.ts       # Generates preset.js (v3) and theme.css (v4)
│   │   └── dist/                  # Compiled token files
│   │
│   └── ui/                        # Core component library (@gw/ui)
│       ├── src/
│       │   ├── components/
│       │   │   ├── Button/        # Button with variants and loading state
│       │   │   ├── Input/         # Accessible input with error and helper text
│       │   │   └── Card/          # Compound card (Header, Title, Content, Footer)
│       │   ├── test/setup.ts      # axe-core custom matcher setup
│       │   └── utils/cn.ts        # Helper to merge Tailwind classes
│       └── tsup.config.ts         # Builds ESM, CJS, and .d.ts
│
├── .changeset/                    # Release tracking and changelog config
├── turbo.json                     # Turborepo task pipeline configuration
└── package.json                   # Root package manifest
```

---

## 4. Guideline Command

Common daily commands for developing and maintaining this library:

### Development & Build
```bash
# Start all apps in development mode
pnpm dev

# Build all packages and apps
pnpm build

# Build only the UI package
pnpm --filter @gw/ui build

# Build only the tokens package and regenerate CSS/JS adapters
pnpm --filter @gw/tokens build
```

### Testing & Accessibility
```bash
# Run all tests across the monorepo
pnpm test

# Run tests only for the UI package
pnpm --filter @gw/ui test

# Run UI tests in watch mode
pnpm --filter @gw/ui test --watch
```

### Releasing & Versioning (Changesets)
```bash
# Create a new changeset when you make changes to a package
pnpm changeset

# Bump versions and update CHANGELOG.md files
pnpm changeset version
```

---

## 5. Nice-to-Have & Future Enhancements

The following features were intentionally scoped out to keep the initial delivery focused and within the 3.5-hour time-box:

1. **Polymorphic Components (`asChild` pattern via Radix UI Slot)**
   * *What it does*: Allows rendering a `Button` as an anchor link (`<a>` or Next.js `<Link>`) while keeping all button styles.
   * *Status*: Planned for the next iteration to keep the initial prototype dependency-free.

2. **Visual Regression Testing with Playwright**
   * *What it does*: Takes screenshots of components across Chromium, Firefox, and WebKit on CI to catch visual layout bugs.
   * *Status*: Current coverage focuses on unit and accessibility testing (`axe-core`). Playwright can be added to the CI pipeline.

3. **Component Catalog with Storybook**
   * *What it does*: Provides an isolated workbench for designers and developers to view all component states and props.
   * *Status*: The two playground apps (`playground-v3` and `playground-v4`) serve as the integration test environments for now.
