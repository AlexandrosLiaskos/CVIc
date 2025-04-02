# PLANNING.md

## 1. Project Goals

CVIc (Coastal Vulnerability Index Compiler) is a web application designed to:
- Allow users to upload shoreline data in standard formats (initially Shapefiles).
- Enable users to segment the uploaded shoreline based on a defined spatial resolution.
- Provide a curated list of standard coastal vulnerability parameters (e.g., Geomorphology, Coastal Slope, Sea-level Change Rate, Shoreline Change Rate, Tide Range, Wave Height).
- Allow users to select relevant parameters and assign weights to them for CVI calculation.
- Facilitate the assignment of parameter values (categorical or numerical) to each shoreline segment, potentially using map-based selection tools.
- Calculate the Coastal Vulnerability Index (CVI) for each segment using user-selected formulas (e.g., Geometric Mean, Arithmetic Mean).
- Visualize the shoreline segments and their calculated CVI scores on an interactive map.
- Persist user data (shoreline, segments, parameters, values) locally using IndexedDB.
- (Future) Allow users to manage and view past analysis results.
- (Future) Implement user authentication (e.g., via Firebase) to potentially store results centrally.

## 2. Architecture

- **Type:** Frontend Single Page Application (SPA).
- **Framework:** React with TypeScript.
- **Build Tool:** Vite.
- **Routing:** React Router DOM v6.
- **State Management:** Primarily component state (useState, useMemo, useCallback). Consider context or a dedicated library (like Zustand or Redux Toolkit) if complexity increases significantly.
- **Data Storage:** Client-side IndexedDB using the `idb` library for storing shoreline data, segments, parameters, and assigned values. Firebase for Authentication (currently mocked).
- **Mapping:** Leaflet library with `react-leaflet` wrappers. Leaflet Draw for user interactions (selection). Turf.js for geospatial calculations (length, bbox, segmentation logic).
- **Styling:** TailwindCSS.

## 3. Technology Stack

- **Core:** React 18+, TypeScript 5+
- **Build/Dev:** Vite 5+
- **Routing:** React Router DOM 6+
- **Mapping:** Leaflet 1.9+, react-leaflet 4+, Leaflet Draw 1.0+, Turf.js 6.5+
- **Styling:** TailwindCSS 3+
- **Data Processing:** shpjs 6+ (for shapefile parsing)
- **Client Storage:** idb 8+ (IndexedDB wrapper)
- **Authentication:** Firebase SDK 10+ (currently mocked via `useAuth` hook)
- **Linting/Formatting:** ESLint (with TypeScript plugin), configured via `eslint.config.js`. Editorconfig via `.editorconfig`.
- **Type Checking:** TypeScript (`tsc --noEmit`).

## 4. File Structure

```
/home/liaskos/CVIc
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons etc. (if needed)
│   ├── components/         # Reusable UI components
│   │   ├── common/         # General purpose components (e.g., ErrorBoundary)
│   │   ├── layout/         # Page layout components (e.g., Layout)
│   │   └── maps/           # Map-related components (e.g., Map)
│   ├── hooks/              # Custom React hooks (e.g., useAuth)
│   ├── lib/                # Library initializations/configurations (e.g., firebase.ts)
│   ├── pages/              # Top-level page components corresponding to routes
│   ├── services/           # Business logic, API interactions (e.g., auth, indexedDBService, shapefileProcessor)
│   ├── types/              # TypeScript type definitions (index.ts)
│   ├── utils/              # Utility functions (e.g., geometry.ts)
│   ├── App.tsx             # Main application component (routing setup)
│   ├── index.css           # Global styles / Tailwind directives
│   ├── main.tsx            # Application entry point
│   └── router.tsx          # Router configuration
├── .editorconfig           # Editor configuration
├── .gitattributes          # Git attributes
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML entry point
├── LICENSE                 # Project License
├── package.json            # Project dependencies and scripts
├── PLANNING.md             # This file
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project README
├── tailwind.config.js      # Tailwind configuration
├── TASK.md                 # Task tracking file
└── vite.config.ts          # Vite configuration
```

## 5. Coding Style & Conventions

- **Language:** TypeScript.
- **Style Guide:** Follow ESLint rules defined in `eslint.config.js`. Use Prettier (implicitly via standard setups or explicitly configured if needed) for code formatting. Adhere to `.editorconfig`.
- **Naming:** Use camelCase for variables and functions. Use PascalCase for components, classes, and types/interfaces.
- **Imports:** Group imports (stdlib, external libs, internal modules). Use relative paths for imports within `src`.
- **Modularity:** Adhere strictly to the 500-line limit per file as per Development Guidelines. Refactor components/logic into smaller, reusable units.
- **Typing:** Use static typing extensively. Define clear interfaces/types in `src/types/index.ts`. Avoid `any` where possible.
- **Documentation:** Add JSDoc/TSDoc comments for all exported functions, components, hooks, and complex types, explaining purpose, params, and return values. Use inline comments (`// Reason:`) for complex logic decisions.

## 6. Testing Strategy

- **Framework:** Jest with React Testing Library (based on devDependencies, though no tests currently exist).
- **Scope:**
    - **Unit Tests:** For utility functions (`utils/`, `services/`), complex logic within components, and hooks. Aim for high coverage of core logic.
    - **Integration Tests:** For testing interactions between components within pages or workflows (e.g., file upload -> segmentation).
    - **End-to-End Tests:** (Future) Consider Playwright or Cypress for testing the full user workflow in a browser.
- **Location:** Create a `/tests` or `/src/__tests__` directory mirroring the `src` structure.
- **Requirements:** Each new feature/module requires tests covering happy path, edge cases, and error handling, as per Development Guidelines.

## 7. Version Control

- **System:** Git.
- **Strategy:** GitHub Flow (main branch + feature branches).
- **Commits:** Small, atomic commits with clear messages referencing tasks from `TASK.md` (e.g., `feat: Add parameter weighting slider (#12)`).
- **Branching:** Create feature branches from `main`. Merge via Pull Requests (if collaborating) or directly for solo work after ensuring tests pass. Keep branches short-lived.

## 8. Documentation

- **`README.md`:** High-level overview, setup, development, deployment instructions. Keep up-to-date.
- **`PLANNING.md`:** This document, outlining project structure and standards.
- **`TASK.md`:** Tracking of ongoing and future work.
- **Code Documentation:** JSDoc/TSDoc comments for public APIs, components, functions, types. Inline comments for complex logic.

## 9. Deployment

- **Platform:** GitHub Pages (as indicated by `homepage` and `deploy` script in `package.json`).
- **Process:** `npm run build` followed by `npm run deploy` (using `gh-pages` package).