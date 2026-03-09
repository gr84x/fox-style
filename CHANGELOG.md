# Changelog

All notable changes to **@gr84x/fox-style** are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.2.0] - 2025-03-08

### Added

- **Loader** — Animated 9-cell loading indicator with 7 strategies: binary, gray-code, ripple, sparkle, fill-drain, life (Conway), wave. Layouts: grid (3×3), row (9×1). Optional label and inline mode.
- **SearchInput** — Controlled search field with icon.
- **SegmentedControl** — Tab-style segment buttons; configurable options, value, onChange.
- **Card** — Container with optional padding; `.fs-card-title` and `.fs-card-body` for typography.
- **StatusDot** — Small status dot with variants (default, success, warning, danger, accent) and optional pulse.
- **ProgressBar** — Linear progress (0–100) with optional label and success-at-full styling.
- **NavTray** — Vertical icon nav with configurable items (id, label, icon). Icon docs and example story.
- **Layout** — App shell with optional NavTray, sidebar slot, and main content; responsive visibility.
- **ChatInput** — Message input with auto-resize textarea, send button, optional hint.
- **PhaseDivider** — Horizontal divider with centered chip label.
- **SystemStatus** — Status block (info, success, warning, error) with optional detail and timestamp.
- Documentation pages: Get Started, Design Tokens, Contribution, Changelog.
- Foundation tokens visual showcase.
- Storybook sidebar reorganized: Documentation, Foundation, Components (Actions, Feedback, Forms, Layout, Navigation).
- Recipe stories: Header bar, Filter row, Task row, App shell.

### Changed

- Card WithHeading story uses design-token typography classes.
- SegmentedControl: long labels truncate with ellipsis; control can wrap when narrow.

## [0.1.0] - 2025-03-08

### Added

- Initial package and repository.
- Design tokens: `theme.css` with `--fs-*` variables (color, radius, typography, layout).
- **Badge** — Variants: default, success, warning, danger, accent.
- **Button** — Variants: primary, secondary, ghost.
- **ModeBanner** — Optional pill (e.g. Demo, Beta); renders when visible.
- Storybook with Introduction and component stories.
- README and docs/style-guide.md.
