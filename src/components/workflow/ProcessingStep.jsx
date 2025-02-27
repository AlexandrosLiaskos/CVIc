import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GeoTIFF from 'geotiff';
import * as cv from 'opencv.js';
import { detectWater, cleanWaterMask, extractShoreline } from './ShorelineDetection';

// Re-export for consistency with existing code
export { detectWater, cleanWaterMask, extractShoreline };

export default function ProcessingStep() {
  // ... (existing implementation)
}
