/**
 * Design tokens for @gr84x/fox-style.
 * CSS variables are defined in theme.css; this module exports token keys for tooling or JS use.
 */
export const tokens = {
  color: {
    bgPrimary: 'var(--fs-bg-primary)',
    bgSurface: 'var(--fs-bg-surface)',
    bgElevated: 'var(--fs-bg-elevated)',
    bgHover: 'var(--fs-bg-hover)',
    bgActive: 'var(--fs-bg-active)',
    textPrimary: 'var(--fs-text-primary)',
    textSecondary: 'var(--fs-text-secondary)',
    textTertiary: 'var(--fs-text-tertiary)',
    borderSubtle: 'var(--fs-border-subtle)',
    borderDefault: 'var(--fs-border-default)',
    borderStrong: 'var(--fs-border-strong)',
    accent: 'var(--fs-accent)',
    accentMuted: 'var(--fs-accent-muted)',
    accentText: 'var(--fs-accent-text)',
    success: 'var(--fs-success)',
    successMuted: 'var(--fs-success-muted)',
    warning: 'var(--fs-warning)',
    warningMuted: 'var(--fs-warning-muted)',
    danger: 'var(--fs-danger)',
    dangerMuted: 'var(--fs-danger-muted)',
  },
  radius: {
    sm: 'var(--fs-radius-sm)',
    md: 'var(--fs-radius-md)',
    lg: 'var(--fs-radius-lg)',
    xl: 'var(--fs-radius-xl)',
    full: 'var(--fs-radius-full)',
  },
  font: {
    sans: 'var(--fs-font-sans)',
    mono: 'var(--fs-font-mono)',
  },
  layout: {
    sidebarWidth: 'var(--fs-sidebar-width)',
    navTrayWidth: 'var(--fs-nav-tray-width)',
  },
} as const
