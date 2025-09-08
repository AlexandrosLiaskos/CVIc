# Task Completion Checklist for CVIc

## Before Committing Code
1. **Type Check**: Run `npm run type-check` to ensure no TypeScript errors
2. **Linting**: Run `npm run lint` to check code style and catch issues
3. **Build Test**: Run `npm run build` to ensure production build works
4. **Manual Testing**: Test the specific feature in development mode (`npm run dev`)

## Testing Workflow
1. Start development server: `npm run dev`
2. Navigate to affected pages/features
3. Test with sample data (GeoTIFF files, shapefiles)
4. Check browser console for errors
5. Verify IndexedDB storage works correctly
6. Test map interactions and visualizations

## Deployment Process
1. Ensure all tests pass
2. Run `npm run build` successfully
3. Test production build with `npm run preview`
4. Deploy with `npm run deploy:github` (if authorized)

## Key Areas to Test
- **Satellite Image Upload**: GeoTIFF processing and storage
- **Shoreline Digitization**: Map interactions and drawing
- **Parameter Assignment**: Value assignment and calculations
- **Results Visualization**: Charts and map rendering
- **Data Export**: GeoJSON and report generation

## Common Issues to Check
- IndexedDB storage limits and serialization
- GeoRaster object handling (functions can't be stored)
- Map library initialization
- File processing memory usage
- Browser compatibility