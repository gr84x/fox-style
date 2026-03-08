# @gr84x/fox-style

Reusable component library and design tokens for Fox family UIs. Dark-first theme, React components, and a living style guide (Storybook).

## Purpose & audience

- **Purpose:** Shared design system and primitives for Fox/Mission Control frontends (e.g. fox-orchestrator).
- **Audience:** Frontend developers and designers consuming the package or contributing components.

## Quick start

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

- **Status:** Pre-alpha. Initial tokens and a small set of components (Badge, Button, ModeBanner). More components will be added as they are extracted from fox-orchestrator.
- **Compatibility:** React 18+, modern browsers. Built as ESM.

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

Open http://localhost:6006. Build a static version:

```bash
npm run build-storybook
```

Output is in `storybook-static/`.

## Contribution

1. Follow existing patterns (tokens, `fs-` class prefix, peer React).
2. Add components under `src/components/<Name>/` with CSS in `components.css` or a dedicated file that is aggregated.
3. Add a Storybook story for each component.
4. Update `docs/style-guide.md` when adding tokens or components.

## License

MIT.
