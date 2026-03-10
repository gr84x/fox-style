# Publishing and Consuming @gr84x/fox-style

**@gr84x/fox-style** is published to the GR84X private npm registry. This document describes how to publish the package (maintainers), how to access the registry (authentication), and how to consume the package in other projects.

---

## Registry

| Item | Value |
|------|--------|
| **Registry URL** | https://npm.gr84x.com/ |
| **Package name** | `@gr84x/fox-style` |
| **Scope** | `@gr84x` — all scoped packages under `@gr84x` are resolved from this registry when configured. |

---

## For maintainers: Publishing

### Prerequisites

- Access to the GR84X private registry and a token or credentials (obtain from your team or registry admin).
- Node.js and npm installed; repository cloned.

### 1. Configure authentication

Create a **local** `.npmrc` in the project root (or use your user `~/.npmrc`). **Do not commit `.npmrc` if it contains secrets** — it is listed in `.gitignore`.

**Option A — Auth token (recommended for CI or scripted publish):**

```ini
//npm.gr84x.com/:_authToken=${NPM_TOKEN}
```

Set the `NPM_TOKEN` environment variable to your registry token before running `npm publish`.

**Option B — Interactive login:**

```bash
npm login --registry=https://npm.gr84x.com/
```

Enter the username, password, and email your registry provides. npm will store credentials in your user `.npmrc`.

**Reference:** Copy `.npmrc.example` to `.npmrc` and replace placeholders with your token or use env vars. See [.npmrc.example](../.npmrc.example) in the repo root.

### 2. Build and publish

From the `fox-style` repository root:

```bash
npm install
npm run build
npm publish
```

- **`prepublishOnly`** runs automatically before `npm publish` and runs `npm run build`, so a fresh `dist/` is always included. You can still run `npm run build` beforehand to verify locally.
- To see what would be packed without publishing: `npm publish --dry-run`.

### 3. Versioning

- Bump the `version` in `package.json` before publishing a new release (e.g. `0.2.0` → `0.2.1` or `0.3.0`).
- Document changes in [CHANGELOG.md](../CHANGELOG.md).

### 4. CI: Automatic publish

A GitHub Actions workflow publishes the package to the private registry when changes are **pushed to the default branch** (`main` or `master`), e.g. when a PR is merged.

- **Workflow file:** [.github/workflows/publish.yml](../.github/workflows/publish.yml)
- **Steps:** Checkout → install deps → lint → test → configure registry auth → `npm publish`
- **Trigger:** `push` to `main` or `master`

**Required secret:** Add a repository secret named **`NPM_TOKEN`** with the value of your GR84X registry auth token.

1. In GitHub: **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** → Name: `NPM_TOKEN`, Value: your registry token (same token used for local `.npmrc` auth)

After the secret is set, every merge to the default branch will run the workflow and publish the current `package.json` version. **Bump the version** (and update CHANGELOG) in your PR before merging so each publish is a new version; if the version is unchanged, `npm publish` will fail with "version already exists" (expected when re-running the workflow on the same commit).

---

## For consumers: Access and authentication

To **install** `@gr84x/fox-style` (or any `@gr84x` package), consuming projects must point the `@gr84x` scope to the private registry and authenticate.

### 1. Point the scope to the registry

In the **consuming project** (e.g. fox-orchestrator), add one of the following.

**Project-level (recommended):** Create or edit `.npmrc` in the project root and commit it (no secrets in this file):

```ini
@gr84x:registry=https://npm.gr84x.com/
```

**User-level:** Add the same line to `~/.npmrc` (or `%USERPROFILE%\.npmrc` on Windows). Then all projects on that machine resolve `@gr84x/*` from the GR84X registry.

### 2. Authenticate to the registry

You must be able to authenticate to `https://npm.gr84x.com/`. Options:

- **Token in env (CI or local):** In `.npmrc` (project or user):  
  `//npm.gr84x.com/:_authToken=${NPM_TOKEN}`  
  Set `NPM_TOKEN` to your registry token. Do not commit `.npmrc` if it contains the literal token; use env and keep `.npmrc` in `.gitignore` or use a CI secret.
- **Interactive login:** Run `npm login --registry=https://npm.gr84x.com/` and enter the credentials provided by your team. Credentials are stored in your user `.npmrc`.

Consuming projects that use CI should set `NPM_TOKEN` (or equivalent) as a secret and ensure the scope + auth are configured so `npm install` can resolve and download `@gr84x/fox-style`.

---

## For consumers: Installing and using the package

### Install

In your application repository (with scope and auth configured as above):

```bash
npm install @gr84x/fox-style react react-dom
```

Your app must supply `react` and `react-dom` (peer dependencies, React 18+).

### Use in code

1. **Import CSS once** in your app root (e.g. `main.tsx` or `App.tsx`):

```ts
import '@gr84x/fox-style/theme.css'
import '@gr84x/fox-style/components.css'
```

2. **Import components** where needed:

```tsx
import { Badge, Button, ModeBanner, Loader, SearchInput, StatusDot, ProgressBar } from '@gr84x/fox-style'

export function MyScreen() {
  return (
    <>
      <ModeBanner visible={true} label="Demo" />
      <Button variant="primary">Submit</Button>
      <Badge variant="success">Done</Badge>
      <Loader label="Loading" />
      <SearchInput value={query} onChange={setQuery} placeholder="Search…" />
      <StatusDot variant="accent" pulse />
      <ProgressBar value={60} label="Planning" />
    </>
  )
}
```

3. **Optional — design tokens in JS:**  
   `import { tokens } from '@gr84x/fox-style'`  
   Or use CSS custom properties (e.g. `var(--fs-color-accent)`) in your own CSS; see the [style guide](style-guide.md) and Storybook.

### ToastProvider

If you use the Toast components, wrap the part of the tree that can show toasts with `ToastProvider`:

```tsx
import { ToastProvider, useToast } from '@gr84x/fox-style'

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  )
}
```

---

## Summary checklist

| Role | Action |
|------|--------|
| **Maintainer** | Get token/credentials → configure auth (e.g. `.npmrc` with `_authToken` or `npm login`) → `npm run build` → `npm publish`. |
| **Consumer** | Add `@gr84x:registry=https://npm.gr84x.com/` in project or user `.npmrc` → configure auth to `https://npm.gr84x.com/` → `npm install @gr84x/fox-style react react-dom` → import CSS and components as above. |

For component API details, design tokens, and examples, see the main [README](../README.md), [style-guide.md](style-guide.md), and Storybook (`npm run storybook` in this repo).
