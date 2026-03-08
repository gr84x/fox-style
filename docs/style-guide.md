# Fox Style — Style Guide

Design tokens and component usage for **@gr84x/fox-style**. For a living preview, run `npm run storybook`.

## Overview

- **Purpose:** Fox family UIs (e.g. fox-orchestrator) share a dark-first visual language and reusable primitives.
- **Principles:** Dark-first theme, consistent spacing and typography, accessibility (focus, contrast, reduced motion).

## Design tokens

### Color

| Token | CSS variable | Usage |
|-------|--------------|--------|
| Background primary | `--fs-bg-primary` | Page background |
| Background surface | `--fs-bg-surface` | Cards, sidebars |
| Background elevated | `--fs-bg-elevated` | Inputs, raised panels |
| Background hover | `--fs-bg-hover` | Hover state |
| Background active | `--fs-bg-active` | Selected/active state |
| Text primary | `--fs-text-primary` | Body text |
| Text secondary | `--fs-text-secondary` | Secondary text |
| Text tertiary | `--fs-text-tertiary` | Muted, hints |
| Border subtle/default/strong | `--fs-border-*` | Dividers, inputs |
| Accent | `--fs-accent`, `--fs-accent-muted`, `--fs-accent-text` | CTAs, links |
| Success / Warning / Danger | `--fs-success`, `--fs-warning`, `--fs-danger` (+ muted) | Status |

### Typography

- **Sans:** `var(--fs-font-sans)` — UI and body.
- **Mono:** `var(--fs-font-mono)` — Code, IDs.
- **Scale:** Prefer 0.65rem–0.9rem for UI, 1rem+ for headings (app-defined).

### Spacing & radius

- **Spacing rhythm:** 4px, 8px, 12px, 16px, 24px.
- **Radius:** `--fs-radius-sm` (6px), `--fs-radius-md` (10px), `--fs-radius-lg` (14px), `--fs-radius-xl` (18px), `--fs-radius-full` (pill).

### Motion

- **Duration:** 0.15s for hover/transition; 0.2–0.3s for enter/exit.
- **Reduced motion:** `prefers-reduced-motion: reduce` shortens animations in theme.css.

## Component catalog

- **Badge** — Small status or label pill. Variants: default, success, warning, danger, accent.
- **Button** — Primary, secondary, ghost. Use for actions.
- **ModeBanner** — Optional pill (e.g. "Demo", "Beta"). Renders only when `visible` is true.
- **Card** — Container with optional padding. Use for panels and content blocks.
- **Layout** — App shell: optional NavTray + sidebar slot + main content. Handles responsive visibility (e.g. sidebar vs main on mobile).
- **Loader** — Animated 9-cell loading indicator. Animations: binary, gray-code, ripple, sparkle, fill-drain, life (Conway), wave. Layouts: grid (3×3) or row (9×1). Optional label, inline mode.
- **NavTray** — Narrow vertical icon bar. Pass `items` (id, label, icon), `activeId`, `onNavigate`. Icon options: no built-in set; pass any ReactNode (e.g. inline SVG with currentColor, or an icon library component). Recommended icon size 20×20.
- **ProgressBar** — Linear progress (0–100). Optional label, `successAtFull` for green at 100%.
- **SearchInput** — Controlled search field with icon. Use for filters and search.
- **SegmentedControl** — Tab-like segment buttons. Pass `options` (value, label), `value`, `onChange`.
- **StatusDot** — Small colored dot. Variants: default, success, warning, danger, accent. Optional `pulse`.

See Storybook for props, examples, and do’s and don’ts.

## Layout (reference)

- **App shell:** Nav tray (52px) + sidebar (320px) + main (flex). Values: `--fs-nav-tray-width`, `--fs-sidebar-width`.
- **Breakpoints:** 768px (mobile), 1024px (tablet). Documented in fox-orchestrator; layout components to be added to fox-style as needed.

## Accessibility

- **Focus:** Visible 2px outline in accent color (`:focus-visible` in theme.css).
- **Contrast:** Text and borders meet WCAG AA on dark background.
- **Motion:** Respect `prefers-reduced-motion`.
- **ARIA:** Components expose `role` and `aria-label` where appropriate (e.g. ModeBanner, Badge).

## Implementation

- **Consumption:** `import '@gr84x/fox-style/theme.css'` and `import '@gr84x/fox-style/components.css'` in app root; then import components from `@gr84x/fox-style`.
- **Theming:** Single dark theme today; extend later if needed via additional theme files.
