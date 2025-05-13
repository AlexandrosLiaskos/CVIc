import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { indexedDBService } from '../services/indexedDBService';
import type { Parameter, ShorelineSegment, ShorelineSegmentProperties, Formula, ParameterValue } from '../types'; 
import type { LineString, MultiLineString } from 'geojson';
import * as turf from '@turf/turf';
import L from 'leaflet';
import { availableFormulas } from '../config/formulas';

export const useParameterAssignmentData = () => {
  const navigate = useNavigate();
  const [segments, setSegments] = useState<ShorelineSegment[]>([]);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [mapBounds, setMapBounds] = useState<L.LatLngBoundsExpression | null>(null);
  const [initialCviScores, setInitialCviScores] = useState<Record<string, number>>({});
  const [initialFormula, setInitialFormula] = useState<Formula | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Loading data for Parameter Assignment...");
      const segmentData = await indexedDBService.getShorelineData('current-segments');
      if (!segmentData || !segmentData.features || segmentData.features.length === 0) {
        setError('No segments found. Please complete the segmentation step first.');
        navigate('/segment-table'); 
        setLoading(false);
        return;
      }
      const parameterData = await indexedDBService.getShorelineData('current-parameters');
      if (!parameterData || !parameterData.features || parameterData.features.length === 0) {
        setError('No parameters found. Please complete the parameter selection step first.');
        navigate('/parameter-selection'); 
        setLoading(false);
        return; 
      }

      const loadedSegments = segmentData.features
        .filter(feature => feature && feature.geometry && (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString'))
        .map((feature, index) => {
          const segmentId = feature.properties?.id || `segment-${index + 1}`;
          const propertiesBase = feature.properties || {};
          const parametersFromProperties: Record<string, ParameterValue> =
            propertiesBase.parameters && typeof propertiesBase.parameters === 'object'
            ? propertiesBase.parameters
            : {};

          let length = propertiesBase.length;
          if (length === undefined || length === null || typeof length !== 'number') {
              try {
                length = turf.length(feature.geometry, { units: 'meters' });
              } catch (e) {
                 console.warn(`Could not calculate length for segment ${segmentId}:`, e);
                 length = 0; 
              }
          }


          const finalProperties: ShorelineSegmentProperties = {
             ...propertiesBase, 
             id: segmentId,
             length: length,
             parameters: parametersFromProperties,
             index: propertiesBase.index ?? index + 1, 
             vulnerabilityIndex: propertiesBase.vulnerabilityIndex,
             vulnerabilityFormula: propertiesBase.vulnerabilityFormula
          };

          return {
            id: segmentId,
            type: 'Feature' as const,
            geometry: feature.geometry as LineString | MultiLineString,
            properties: finalProperties,
            parameters: parametersFromProperties
          };
        });

      if (loadedSegments.length === 0) throw new Error('No valid line segments found after filtering');
      console.log(`Processed ${loadedSegments.length} segments`);
      setSegments(loadedSegments as ShorelineSegment[]);

      if (loadedSegments.length > 0) {
        const featuresForBounds = loadedSegments.map(s => ({ type: 'Feature' as const, geometry: s.geometry, properties: {} }));
        const fc = turf.featureCollection(featuresForBounds);
        try {
          const bbox = turf.bbox(fc);
          if (bbox && bbox.length === 4 && bbox.every(b => isFinite(b)) && bbox[0] <= bbox[2] && bbox[1] <= bbox[3]) {
            const bounds: L.LatLngBoundsExpression = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
            setMapBounds(bounds);
            console.log("Calculated map bounds:", bounds);
          } else { console.warn("Could not calculate valid bounds from segments."); }
        } catch (e) { console.error("Error calculating bounds:", e); }
      }

      const loadedParameters = parameterData.features
        .map(feature => feature.properties as Parameter)
        .filter((p): p is Parameter => p !== null && p.enabled === true); 
      console.log(`Processed ${loadedParameters.length} enabled parameters`);
      setParameters(loadedParameters);

      const existingScores = loadedSegments.reduce((acc, seg) => {
        if (seg.properties.vulnerabilityIndex !== undefined && seg.properties.vulnerabilityIndex !== null) {
          acc[seg.id] = seg.properties.vulnerabilityIndex;
        }
        return acc;
      }, {} as Record<string, number>);

      if (Object.keys(existingScores).length > 0) {
          console.log(`Loaded ${Object.keys(existingScores).length} pre-existing CVI scores`);
          setInitialCviScores(existingScores); 
          const firstSegmentWithFormula = loadedSegments.find(seg => seg.properties.vulnerabilityFormula);
          if (firstSegmentWithFormula?.properties.vulnerabilityFormula) {
              const formula = availableFormulas.find(f => f.type === firstSegmentWithFormula.properties.vulnerabilityFormula);
              if (formula) {
                  console.log(`Setting pre-existing formula: ${formula.name}`);
                  setInitialFormula(formula); 
              } else {
                   console.warn(`Segment ${firstSegmentWithFormula.id} has unknown formula type: ${firstSegmentWithFormula.properties.vulnerabilityFormula}`);
              }
          }
      }

    } catch (err) {
      console.error('Error loading data:', err);
      setError(`Failed to load assignment data: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]); 

  return {
    segments,
    setSegments, 
    parameters,
    mapBounds,
    initialCviScores,
    initialFormula,
    loading,
    error,
    setError
  };
};