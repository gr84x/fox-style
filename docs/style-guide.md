# Fox Style — Style Guide

Design tokens and component usage for **@gr84x/fox-style**. For a visual token reference and component demos, run `npm run storybook` and see **Foundation / Tokens** and **Components**.

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
- **ChatInput** — Message input with auto-resize textarea and send button. Optional hint. Use in chat UIs.
- **PhaseDivider** — Horizontal divider with centered chip label. Use for phase or section breaks.
- **SystemStatus** — Status block: info, success, warning, error. Optional detail and timestamp.
- **Accordion** — Expand/collapse sections. Purpose: only one (or a few) sections visible at a time. Use cases: FAQs, settings groups, filters/options panels, terms and conditions, multi-section forms.
- **FormField** — Label, control slot, hint, error. Use to wrap Input, Select, Checkbox, etc.
- **Input** — Text input; supports error state and className.
- **TextArea** — Long-form multi-line text input; styled like Input, use with FormField.
- **ImageUpload** — File input for images with preview and clear.
- **ImageView** — Display-only image from URL or object URL; pairs with ImageUpload.
- **VideoUpload** — File input for video with optional preview and clear.
- **VideoViewer** — Play video from URL; native controls, optional poster.
- **AudioPlayer** — Audio playback widget: play/pause, progress bar, time display. Optional: volume slider, playback speed (.5×–2×, configurable rates), skip forward/backward (configurable seconds).
- **Checkbox** — Single checkbox with label; supports indeterminate.
- **RadioGroup / Radio** — Group of radio options.
- **Select** — Native select with options; supports FormField.
- **Slider** — Range input with token-styled track and thumb.
- **Link** — Text link using accent tokens; supports disabled.
- **Tooltip** — Positioned tooltip (e.g. top, bottom).
- **Popover** — Positioned floating panel.
- **Modal** — Dialog using native `<dialog>`; optional title and actions.
- **Drawer** — Slide-out panel (left/right); overlay and backdrop.
- **ToastProvider / useToast** — Toast notifications; configurable position and variants.
- **Menu** — Dropdown menu panel with items (optional icon, disabled).
- **Tabs, TabList, Tab, TabPanel** — Tabbed content.
- **Breadcrumbs** — Breadcrumb trail with links and current.
- **Pagination** — Page navigation buttons.
- **Table** — Data table with optional sortable headers and row click.
- **Avatar** — Circle avatar (image, initials, or icon); sizes sm/md/lg.
- **Skeleton** — Loading placeholder (text, circle, rect).
- **Divider** — Horizontal or vertical divider; optional label and spacing.
- **Typography (Heading, Text, Code)** — Heading levels, body text variants, inline code.

See Storybook for props, examples, and do’s and don’ts.

Components are grouped in Storybook as: **Actions**; **Feedback**; **Forms**; **Layout**; **Navigation**; **Data**; **Typography**. See the Storybook sidebar for the full list in each category.

## Storybook

Run `npm run storybook`. Sidebar: **Documentation** (Introduction, Get Started, Design Tokens, Contribution, Changelog, Recipes); **Foundation** (Tokens visual showcase); **Components** by role. **Recipes** show composition patterns: Header bar, Filter row, Task row, App shell.

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
