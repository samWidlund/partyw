# Agent Guidelines for brainstorm

## Project Overview

A React 19 + TypeScript + Vite application. This is a client-side SPA with no backend.
The app is a word game where teams compete to guess words within a time limit.

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

This project has no test framework configured. If tests are needed, prefer Vitest.

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
- Use early returns for conditional rendering (see App.tsx pattern)

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
- Use `console.warn` for recoverable issues (see App.tsx line 39)
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
├── components/      # React components (PascalCase)
├── hooks/           # Custom React hooks (use*.ts)
├── utils/           # Pure utility functions (camelCase)
├── types/           # TypeScript type definitions (kebab-case)
├── styles/          # CSS files
└── App.tsx          # Root component
```

### CSS Patterns

- Use semantic class names (e.g., `.team-score`, `.word-display`)
- Avoid deeply nested selectors
- Keep styles modular per component

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

## Environment Variables

- `VITE_GROQ_API` - Optional API key for word generation
- Use `import.meta.env.VITE_*` to access (see App.tsx line 13)

## State Management

- Use `useState` for local component state
- Use `useRef` for mutable values that don't trigger re-renders (see App.tsx)
- No external state management library needed for this scope

## Common Patterns

- **Conditionals**: Use early returns for phase-based rendering
- **Event handlers**: Inline simple handlers, extract complex ones
- **Types**: Define shared types in `src/types/`
- **Utilities**: Pure functions go in `src/utils/`