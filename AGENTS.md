# Agent Guidelines for partyw

## Project Overview

A React 19 + TypeScript + Vite application. This is a client-side SPA with no backend.

## Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:5173
npm run preview      # Preview production build

# Build & Type Check
npm run build        # Run TypeScript check (tsc -b) then build with Vite

# Linting
npm run lint         # Run ESLint on all files
npm run lint -- --fix  # Auto-fix linting issues
```

### Running a Single Test

**Note:** This project has no test framework configured. If adding tests, prefer Vitest.

## Code Style

### TypeScript

- **Strict mode enabled** - all strict checks enforced
- **No `any`** - use `unknown` for truly unknown types
- **`verbatimModuleSyntax`** - use `import type` for type-only imports
- **`noUnusedLocals`** and **`noUnusedParameters`** - clean up unused code
- Prefer **interface** over **type** for object shapes
- Use explicit return types for functions exported from modules

### React

- Use **function components** exclusively
- Prefer **named exports** for components
- Use **React 19** patterns (no explicit `children` prop needed)
- React hooks from `react` package, not barrel re-exports

### Imports

```typescript
// Type-only imports (required - verbatimModuleSyntax)
import type { SomeType } from './types'

// Regular imports
import { useState, useEffect } from 'react'
import { SomeComponent } from './components'

// CSS imports
import './styles.css'
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: SCREAMING_SNAKE_CASE for true constants
- **Files**: kebab-case (`api-utils.ts`, `use-auth.ts`)

### Formatting

- **No Prettier config** - code is auto-formatted via ESLint
- 2-space indentation
- Single quotes for strings
- Trailing commas in multiline constructs
- Max line length: ~100 characters (soft wrap in ESLint)

### Error Handling

- Use **try/catch** with async functions
- Never swallow errors silently - at minimum log them
- Create descriptive Error subclasses for domain errors
- Never use `console.error` for expected error flows

### React Component Patterns

```typescript
// Preferred: named export with explicit props interface
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}

// Avoid default exports for components
export default Button  // Avoid this pattern
```

### File Organization

```
src/
├── components/      # React components
├── hooks/           # Custom React hooks
├── utils/           # Pure utility functions
├── types/           # TypeScript type definitions
├── styles/          # CSS files
└── App.tsx          # Root component
```

## Linting

ESLint is configured with:
- `typescript-eslint` - TypeScript support
- `eslint-plugin-react-hooks` - Hooks rules
- `eslint-plugin-react-refresh` - HMR compatibility

ESLint ignores the `dist/` directory.

## TypeScript Configuration

- Target: ES2023
- Module: ESNext with bundler resolution
- JSX: react-jsx (React 19)
- Strict: true (includes strictNullChecks, noImplicitAny, etc.)
