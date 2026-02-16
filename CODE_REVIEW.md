# Code Review Notes

Date: 2026-02-12

## Scope

- Ran repository-level linting and build checks.
- Performed targeted source inspection in files with high-signal lint failures.

## Key Findings

1. **Lint pipeline is not compatible with Next.js 16 defaults**
   - `npm run lint` was configured to use `next lint`, which is no longer valid in this setup and caused an immediate CLI failure.
   - The ESLint flat config also used legacy `FlatCompat` wiring that produced a circular-structure validation crash.
   - Fixed in this change by:
     - switching the lint script to `eslint .`
     - migrating `eslint.config.mjs` to use `eslint-config-next/core-web-vitals` directly.

2. **Ref reads during render in multiple components**
   - Example: `components/coding/splash.jsx` computes textarea `minHeight` via `codeRef.current?.offsetHeight` during render.
   - This now triggers `react-hooks/refs` errors and can cause stale measurements/rerender issues.
   - Recommendation: measure in `useLayoutEffect` and store dimensions in state.

3. **Synchronous setState calls inside effects**
   - Example: `components/design/splash.jsx` updates state directly from `useEffect` for values derived from props/theme.
   - This triggers `react-hooks/set-state-in-effect` and introduces extra render passes.
   - Recommendation: compute directly in render/memo when derivable, or initialize from deps and only effect for external sync.

4. **Build depends on runtime Google Fonts fetch**
   - Production build failed in this environment while fetching `Archivo` from `fonts.googleapis.com`.
   - Recommendation: consider self-hosted/local font fallback for offline/CI reliability.

## Current Status

- Lint command now executes correctly and surfaces actionable code-level issues.
- Full lint pass still fails due to existing component-level rule violations.
- Build currently fails in this environment due to remote font fetch.
