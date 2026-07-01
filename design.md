# Airtap Design System

A React + TypeScript implementation of the **Airtap DS** Figma file
([source](https://www.figma.com/design/05Vnb7nuaZ9LBri0sJ4jdr/Airtap-DS)).

This document is the living context for the design system: its token architecture,
naming convention, theming model, and component inventory. It exists so any
contributor (or AI agent) can extend the system without re-deriving decisions from
the Figma file.

---

## 1. Brand at a glance

| Aspect            | Value                                                            |
| ----------------- | ---------------------------------------------------------------- |
| Brand             | Airtap                                                           |
| Accent (purple)   | `#714FEE` (`Secondary/Secondary-600`)                            |
| Typeface          | IBM Plex Sans (UI) · IBM Plex Mono (code)                        |
| Primary ramp      | **Inverted neutral** — `Primary-25` is darkest, `Primary-1000` lightest |
| Themes            | Light (default) and Dark, toggled with `data-theme`              |

---

## 2. Tooling

- **React 19** + **TypeScript** + **Vite 8**
- **CSS Modules** for component styles (`*.module.css`)
- **Storybook 10** (`@storybook/react-vite`) for component documentation & states
- CSS custom properties (design tokens) for all themeable values

Scripts (`package.json`):

```bash
npm run dev              # Vite dev server (component showcase in App.tsx)
npm run build            # tsc -b && vite build
npm run storybook        # Storybook dev server on :6006
npm run build-storybook  # static Storybook build
npm run lint             # oxlint
```

---

## 3. Token architecture

Tokens flow through three layers. **Components only ever consume the semantic layer**
(plus raw `Scale`/`Border Radius`/`Font` primitives for spacing & geometry, which are
theme-independent).

```
Primitives (raw values)  ─→  Semantic (light/dark aliases)  ─→  Components
src/styles/primitives.css    src/styles/theme.css               *.module.css
```

| Layer        | File                       | Figma collection                          | Theme-aware? |
| ------------ | -------------------------- | ----------------------------------------- | ------------ |
| Primitives   | `src/styles/primitives.css`| Primitives                                | No           |
| Semantic     | `src/styles/theme.css`     | Colors (Light / Dark modes)               | Yes          |
| Global setup | `src/styles/global.css`    | —                                         | —            |
| TS mirror    | `src/tokens/index.ts`      | — (typed helpers for spacing/typography)  | No           |

`global.css` imports the IBM Plex fonts, then `primitives.css` and `theme.css`, and
applies a `box-sizing` reset and base `body` styles.

### Naming convention (critical)

**CSS custom property names mirror the Figma variable path**, lower-cased, with `/`
and spaces collapsed to `-`. This is a deliberate constraint so the codebase and Figma
stay 1:1 searchable.

| Figma variable path            | CSS custom property              |
| ------------------------------ | -------------------------------- |
| `Primary/Primary-800`          | `--primary-primary-800`          |
| `Secondary/Secondary-600`      | `--secondary-secondary-600`      |
| `Scale/400 (16)`               | `--scale-400`                    |
| `Surface/Neutral-Default`      | `--surface-neutral-default`      |
| `Text/Title`                   | `--text-title`                   |
| `Button/Primary/Default/Bg`    | `--button-primary-default-bg`    |
| `Forms/Default/BG`             | `--forms-default-bg`             |
| `Global/Page-BG`               | `--global-page-bg`               |
| `Font Config/H1/Font Size`     | `--font-config-h1-font-size`     |

> Figma typos are preserved on purpose so names match exactly:
> `Boder Radius` → `--boder-radius-*`, `Boder Width` → `--boder-width-*`.
> The Figma group `Cyan` uses `Blue-###` member names, so its tokens are
> `--cyan-blue-100 … --cyan-blue-900`.

### 3a. Primitive token groups (`primitives.css`)

- **Transparent Darks / Lights** — `--transparent-darks-black-{05..100}`, `--transparent-lights-white-{05..100}`
- **Primary** (inverted neutral ramp) — `--primary-primary-{25,50,100..1000}`
- **Secondary** (brand purple) — `--secondary-secondary-{100..1000}`
- **Tertiary** (magenta) — `--tertiary-tertiary-{100..1000}`
- **Neutral** (true gray) — `--neutral-neutral-{100..1000,black,white}`
- **Status colors** — `--{red,green,orange,blue,yellow}-{...}-{100..900}`, `--cyan-blue-{100..900}`
- **Foundations** — `--foundations-{white,black,transparent}`
- **Scale** (spacing, px) — `--scale-{0,25,50,100..1600}`
- **Border Radius** — `--boder-radius-{none,scale-50..900,full-round}`
- **Border Width** — `--boder-width-{none,sm,md,lg}`
- **Font families** — `--font-{primary,secondary,code}`
- **Font Config** (Desktop mode) — `--font-config-{h1..h6,body,body-medium,body-small,body-x-small,caption}-{font-size,line-height,font-weight,letter-spacing}`
- **Weights** — `--weight-{light,regular,medium,semibold,bold}`
- **Shadows** — `--shadow-{small,normal,big}`

### 3b. Semantic token groups (`theme.css`)

Defined under `:root, [data-theme="light"]` and overridden under `[data-theme="dark"]`.
Every value aliases a primitive exactly as Figma's `Colors` collection does.

- **Global** — `--global-{page-bg,primary-accent,secondary-accent,dividers,overlay}`
- **Surface** — `--surface-{neutral,subtle,muted,disabled,transparent,success,information,warning,error}-default`
- **Text** — `--text-{title,body,small,subtle,label,muted,disabled,on-color-default}` + status (`--text-{success,information,warning,error}-default`)
- **Border** — `--border-{neutral,subtle,muted,transparent,disabled,success,information,warning,error}-default`
- **Forms** — `--forms-{default,hover,filled,focus,error,disabled}-{bg,border,text}` + `--forms-link`
- **Button** — `--button-{primary,secondary,outline,transparent}-{default,hover,clicked}-{bg,text,border,stroke}` + shared `--button-disabled-{bg,border,text}`

---

## 4. Theming

Set `data-theme="light"` (default) or `data-theme="dark"` on any container; semantic
tokens cascade automatically. No JS theme provider is required — it's pure CSS.

```tsx
<div data-theme="dark">
  <Button>Adapts to dark mode</Button>
</div>
```

- **App showcase** (`src/App.tsx`) has a Light/Dark toggle.
- **Storybook** exposes a theme switcher in the toolbar (see `.storybook/preview.tsx`),
  which wraps every story in a `data-theme` container against `--global-page-bg`.

---

## 5. Component inventory (atomic design)

Components live in `src/components/{atoms,molecules,organisms}/`. Each component folder
contains `Component.tsx`, `Component.module.css`, `index.ts`, and `Component.stories.tsx`.
A barrel export is available at `src/components/index.ts`.

### Atoms

| Component    | Key props                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `Button`     | `variant` (primary/secondary/outline/transparent), `size` (small/medium/large/xlarge), `shape` (rounded/pill/rectangle), `fullWidth`, `loading`, `startIcon`, `endIcon` |
| `Typography` | `variant` (h1–h6/body/bodySmall/bodyXSmall/caption), `color`, `weight`, `as`                        |
| `Icon`       | `name` (check/close/info/warning/error/success/search/chevron-down/eye/logo), `size` (default 16)  |
| `Input`      | `inputSize` (small/medium/large), `error`, `startAdornment`, `endAdornment` (forwardRef)           |
| `Badge`      | `tone` (neutral/success/info/warning/error/accent), `size` (sm/md/lg), `dot`                       |
| `Spinner`    | `size`, `thickness`, `label` (CSS keyframe loader, "Infinite Loader")                              |
| `Divider`    | `orientation` (horizontal/vertical)                                                                |

### Molecules

| Component    | Composition & key props                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `InputField` | `Input` + label + helper/error message. Props: `label`, `helperText`, `errorMessage`, `required` (+ all `Input` props). Wires `aria-describedby` via `useId()`. |
| `Tooltip`    | Hover/focus tooltip wrapping a trigger. Props: `content`, `placement` (top/bottom/left/right), `children`. |
| `Snackbar`   | Transient notification. Props: `tone` (neutral/success/information/warning/error), `message`, `actionLabel` + `onAction`, `onDismiss`. |

### Organisms

| Component | Composition & key props                                                                               |
| --------- | ----------------------------------------------------------------------------------------------------- |
| `Alert`   | Inline banner using `Icon`. Props: `tone` (neutral/success/information/warning/error), `title`, `actions`, `onDismiss`, `children` (description). |

---

## 6. Project structure

```
airtap-ds/
├─ .storybook/
│  ├─ main.ts            # framework: @storybook/react-vite; globs src/**/*.stories.*
│  └─ preview.tsx        # imports global.css; theme toolbar + decorator
├─ src/
│  ├─ styles/
│  │  ├─ primitives.css  # Layer 1 — raw tokens (Figma "Primitives")
│  │  ├─ theme.css       # Layer 2 — semantic light/dark tokens (Figma "Colors")
│  │  └─ global.css      # font imports + resets + base body
│  ├─ tokens/index.ts    # typed spacing/typography helpers pointing at CSS vars
│  ├─ components/
│  │  ├─ atoms/          # Button, Typography, Icon, Input, Badge, Spinner, Divider
│  │  ├─ molecules/      # InputField, Tooltip, Snackbar
│  │  ├─ organisms/      # Alert
│  │  └─ index.ts        # barrel export of all components
│  ├─ App.tsx            # live showcase with Light/Dark toggle
│  └─ main.tsx           # imports styles/global.css
└─ design.md             # this file
```

---

## 7. Conventions for extending the system

1. **Add the Figma variable first**, then mirror its path into `primitives.css`
   (raw value) and/or `theme.css` (semantic alias). Never invent token names.
2. **Components consume semantic tokens only** for color; use `--scale-*`,
   `--boder-radius-*`, and `--font-*` primitives for geometry/spacing/type.
3. Each component ships `.tsx` + `.module.css` + `index.ts` + `.stories.tsx`.
4. Stories import from **`@storybook/react-vite`** and use CSF3 (`Meta`/`StoryObj`,
   `tags: ["autodocs"]`).
5. Keep props typed and accessible (labels, `aria-*`, roles) — see `InputField`,
   `Tooltip`, `Alert` for the pattern.
