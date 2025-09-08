# Satellite Image Storage Fix

## Problem
The application was failing with "Function object could not be cloned" error when storing satellite images in IndexedDB. This occurred because the `ProcessedImage` object contained a `georaster` property with functions that cannot be serialized.

## Solution Implemented
1. **Modified `storeSatelliteImage`**: Exclude the `georaster` property when storing to IndexedDB, keeping only serializable data including the `arrayBuffer`.

2. **Added `recreateGeoRaster` function**: New utility function in `imageProcessor.ts` that recreates the georaster object from the stored ArrayBuffer and bounds data.

3. **Updated retrieval methods**: Modified `getSatelliteImage` and `getAllSatelliteImages` to automatically recreate the georaster when retrieving from storage.

## Files Modified
- `src/services/indexedDBService.ts`: Updated storage and retrieval methods
- `src/services/imageProcessor.ts`: Added `recreateGeoRaster` function

## Key Changes
- Storage now excludes non-serializable `georaster` property
- Retrieval automatically recreates `georaster` from `arrayBuffer`
- Graceful fallback if georaster recreation fails
- Maintains backward compatibility with existing stored data

## Testing Required
1. Upload a GeoTIFF satellite image
2. Verify it stores without errors
3. Refresh page and verify image loads correctly
4. Check that map visualization still works