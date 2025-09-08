# CVIc Development Commands

## Development
```bash
npm run dev              # Start development server with hot reload
npm run build            # Build optimized production bundle
npm run preview          # Preview production build locally
npm run serve            # Serve built files with http-server
```

## Code Quality
```bash
npm run lint             # Run ESLint on TypeScript files
npm run type-check       # Run TypeScript compiler without emitting files
```

## Deployment
```bash
npm run deploy:github    # Build and deploy to GitHub Pages
npm run build:static     # Build for static hosting
```

## Maintenance
```bash
npm run clean            # Remove dist and vite cache
npm install              # Install dependencies
```

## System Commands (Linux)
```bash
ls -la                   # List files with details
find . -name "*.ts"      # Find TypeScript files
grep -r "pattern" src/   # Search for patterns in source
cd src/                  # Navigate to source directory
git status               # Check git status
git log --oneline        # View commit history
```