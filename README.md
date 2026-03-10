# @gr84x/fox-style

Reusable component library and design tokens for Fox family UIs. Dark-first theme, React components, and a living style guide (Storybook).

## Purpose & audience

- **Purpose:** Shared design system and primitives for Fox/Mission Control frontends (e.g. fox-orchestrator).
- **Audience:** Frontend developers and designers consuming the package or contributing components.

## Quick start

**@gr84x/fox-style** is published to the [GR84X private npm registry](https://npm.gr84x.com/). Configure the `@gr84x` scope and authenticate before installing; see [Publishing and consumption](docs/publishing-and-consumption.md) for registry URL, auth, and consumer setup.

```bash
npm install @gr84x/fox-style react react-dom
```

In your app root (e.g. `main.tsx`), import styles once:

```ts
import '@gr84x/fox-style/theme.css'
import '@gr84x/fox-style/components.css'
```

Then use components:

```tsx
import { Badge, Button, ModeBanner } from '@gr84x/fox-style'

<ModeBanner visible={true} label="Demo" />
<Button variant="primary">Submit</Button>
<Badge variant="success">Done</Badge>
<Loader label="Loading" />
<SearchInput value={query} onChange={setQuery} placeholder="Search…" />
<StatusDot variant="accent" pulse />
<ProgressBar value={60} label="Planning" />
```

## Configuration

- **Registry:** Package is published at `https://npm.gr84x.com/`. Consumers need `@gr84x:registry=https://npm.gr84x.com/` in `.npmrc` and auth to that registry. Full details: [docs/publishing-and-consumption.md](docs/publishing-and-consumption.md).
- **Peer dependencies:** `react` and `react-dom` (>=18). Your app supplies them.
- **CSS:** You must import both `theme.css` (tokens + base) and `components.css` (component classes) for components to render correctly.

## Usage (realistic example)

```tsx
import { Button, Badge, ModeBanner } from '@gr84x/fox-style'

export function Header({ isDemo }: { isDemo: boolean }) {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
      <ModeBanner visible={isDemo} label="Demo" />
      <h1>My App</h1>
      <Badge variant="accent">Active</Badge>
      <Button variant="primary" onClick={() => {}}>Save</Button>
    </header>
  )
}
```

## Status & compatibility

- **Status:** Pre-alpha. Design tokens and 35+ components: Actions (Button), Feedback (Badge, Loader, ModeBanner, ProgressBar, StatusDot, SystemStatus, Tooltip, Modal, Drawer, Popover, Toast, Skeleton), Forms (SearchInput, SegmentedControl, FormField, Input, Checkbox, RadioGroup, Select, Slider, ChatInput, ImageUpload), Layout (Card, Layout, Divider, Accordion), Navigation (NavTray, Link, Breadcrumbs, Pagination, Menu, Tabs), Data (Table, Avatar), Typography (Heading, Text, Code). Documentation and Foundation in Storybook.
- **Compatibility:** React 18+, modern browsers. Built as ESM.
- **Changelog:** [CHANGELOG.md](CHANGELOG.md) or [Releases](https://github.com/gr84x/fox-style/releases).

## Architecture

- **Tokens:** CSS custom properties in `theme.css` (prefix `--fs-*`). Optional JS token map via `import { tokens } from '@gr84x/fox-style'`.
- **Components:** React components that rely on theme and component CSS; no inline styles for layout/color beyond tokens.
- **Style guide:** See [Storybook](#storybook) and `docs/style-guide.md`.

## Storybook

Run the living style guide locally:

```bash
npm install
npm run storybook
```

Open http://localhost:6006. The sidebar is organized as:

- **Documentation** — Introduction, Get Started, Design Tokens, Contribution, Changelog, Recipes.
- **Foundation** — Tokens: visual showcase (colors, typography, spacing, radius).
- **Components** — Actions; Feedback; Forms; Layout; Navigation; Data; Typography. See Storybook for the full component list in each category.

Build a static version:

```bash
npm run build-storybook
```

Output is in `storybook-static/`.

## Publishing

The package is configured to publish to the GR84X private registry (`https://npm.gr84x.com/`). Maintainers: configure auth (see `.npmrc.example`), then `npm run build` and `npm publish`. Full steps and consumer setup: [docs/publishing-and-consumption.md](docs/publishing-and-consumption.md).

## Contribution

1. Follow existing patterns (tokens, `fs-` class prefix, peer React).
2. Add components under `src/components/<Name>/` with CSS in `components.css` or a dedicated file that is aggregated.
3. Add a Storybook story for each component.
4. Update `docs/style-guide.md` when adding tokens or components.

## License

MIT.
