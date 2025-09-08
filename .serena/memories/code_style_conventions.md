# CVIc Code Style and Conventions

## TypeScript Configuration
- Strict TypeScript enabled
- No unused disable directives allowed
- Maximum 0 warnings in linting

## File Organization
```
src/
├── components/          # React components organized by feature
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   ├── maps/           # Map-related components
│   ├── parameters/     # Parameter assignment components
│   └── results/        # Results visualization components
├── pages/              # Page components
├── services/           # Business logic and external services
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── config/             # Configuration files
├── calculators/        # CVI calculation logic
└── indices/            # Index-specific implementations
```

## Naming Conventions
- **Files**: PascalCase for components (e.g., `SatelliteImageUploadPage.tsx`)
- **Files**: camelCase for utilities (e.g., `imageProcessor.ts`)
- **Interfaces**: PascalCase with descriptive names (e.g., `ProcessedImage`)
- **Functions**: camelCase with verb-noun pattern (e.g., `processSatelliteImage`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DB_VERSION`)

## Import Organization
- External libraries first
- Internal imports grouped by type (components, services, types, utils)
- Relative imports last

## Error Handling
- Use try-catch blocks for async operations
- Provide meaningful error messages to users
- Log detailed errors to console for debugging
- Handle IndexedDB quota exceeded errors specifically