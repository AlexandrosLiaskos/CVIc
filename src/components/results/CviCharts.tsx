// src/components/results/CviCharts.tsx
import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ComposedChart, Line, Scatter, ReferenceLine
} from 'recharts';
import type { ShorelineSegment, Parameter } from '../../types';
import { getCviCategory } from '../../utils/vulnerabilityMapping';

// Define colors for vulnerability categories
const CATEGORY_COLORS = {
  'Very Low': '#4caf50',  // Green
  'Low': '#8bc34a',       // Light Green
  'Moderate': '#ffeb3b',  // Yellow
  'High': '#ff9800',      // Orange
  'Very High': '#f44336', // Red
  'No Data': '#9e9e9e'    // Gray
};

// Parameter colors removed

interface CviStatistics {
  min: string;
  max: string;
  avg: string;
  count: number;
  totalSegments: number;
  categories: {
    veryLow: number;
    low: number;
    moderate: number;
    high: number;
    veryHigh: number;
  };
}

interface CviChartsProps {
  segments: ShorelineSegment[];
  parameters: Parameter[]; // Still needed for TypeScript, but not used directly
  cviStatistics: CviStatistics | null;
  className?: string;
}

const CviCharts: React.FC<CviChartsProps> = ({
  segments,
  // parameters is still in props but not used directly after removing the charts
  cviStatistics,
  className = ''
}) => {
  // Prepare data for category distribution chart
  const categoryDistributionData = useMemo(() => {
    if (!cviStatistics) return [];

    return [
      { name: 'Very Low', value: cviStatistics.categories.veryLow, color: CATEGORY_COLORS['Very Low'] },
      { name: 'Low', value: cviStatistics.categories.low, color: CATEGORY_COLORS['Low'] },
      { name: 'Moderate', value: cviStatistics.categories.moderate, color: CATEGORY_COLORS['Moderate'] },
      { name: 'High', value: cviStatistics.categories.high, color: CATEGORY_COLORS['High'] },
      { name: 'Very High', value: cviStatistics.categories.veryHigh, color: CATEGORY_COLORS['Very High'] }
    ].filter(item => item.value > 0); // Only include categories with values
  }, [cviStatistics]);

  // Removed parameter importance chart data

  // Prepare data for vulnerability profile chart
  const vulnerabilityProfileData = useMemo(() => {
    if (segments.length === 0) return [];

    // Get segments with vulnerability scores
    const segmentsWithScores = segments
      .filter(s => s.properties.vulnerabilityIndex !== undefined)
      .map((segment, index) => ({
        id: segment.id,
        index,
        score: segment.properties.vulnerabilityIndex || 0,
        category: getCviCategory(segment.properties.vulnerabilityIndex || 0, segment.properties.vulnerabilityFormula),
        color: CATEGORY_COLORS[getCviCategory(segment.properties.vulnerabilityIndex || 0, segment.properties.vulnerabilityFormula) as keyof typeof CATEGORY_COLORS],
        isICVI: segment.properties.vulnerabilityFormula?.includes('icvi') || false
      }))
      .sort((a, b) => a.index - b.index); // Sort by index to maintain shoreline order

    // Calculate moving average (window size of 5)
    const windowSize = Math.min(5, Math.max(3, Math.floor(segmentsWithScores.length / 10)));
    const movingAvg: number[] = [];

    for (let i = 0; i < segmentsWithScores.length; i++) {
      let sum = 0;
      let count = 0;

      for (let j = Math.max(0, i - Math.floor(windowSize/2));
           j <= Math.min(segmentsWithScores.length - 1, i + Math.floor(windowSize/2)); j++) {
        sum += segmentsWithScores[j].score;
        count++;
      }

      movingAvg.push(sum / count);
    }

    // Add moving average to data
    return segmentsWithScores.map((item, index) => ({
      ...item,
      movingAvg: movingAvg[index].toFixed(2),
      displayId: `${index+1}`
    }));
  }, [segments]);

  // Determine if we're using ICVI to set appropriate chart scale
  const isUsingICVI = useMemo(() => {
    return vulnerabilityProfileData.length > 0 && vulnerabilityProfileData[0].isICVI;
  }, [vulnerabilityProfileData]);

  // Removed parameter correlation matrix data

  if (!cviStatistics) {
    return <div className="text-gray-500 italic">No CVI data available for charts</div>;
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Category Distribution Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">CVI Category Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryDistributionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Segments', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value} segments`, 'Count']} />
              <Bar dataKey="value" isAnimationActive={false}>
                {categoryDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Parameter Importance Chart removed */}

      {/* Vulnerability Profile Chart */}
      {vulnerabilityProfileData.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Vulnerability Profile Along Shoreline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={vulnerabilityProfileData}
                margin={{ top: 5, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="displayId"
                  label={{ value: 'Segment', position: 'bottom', dy: 20 }}
                  interval={Math.max(1, Math.floor(vulnerabilityProfileData.length / 20))}
                />
                <YAxis
                  domain={isUsingICVI ? [0, 1] : [1, 5]}
                  label={{ value: 'CVI Score', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      // Find the score data point only
                      const scorePoint = payload.find(p => p.dataKey === 'score');
                      if (!scorePoint) return null;

                      const item = vulnerabilityProfileData.find(d => d.displayId === label);
                      return (
                        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded">
                          <p className="font-medium">{`Segment ${label} (${item?.category})`}</p>
                          <p className="text-blue-600">{`CVI Score: ${typeof scorePoint.value === 'number' ? scorePoint.value.toFixed(3) : scorePoint.value}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {isUsingICVI ? (
                  <>
                    <ReferenceLine y={0.2} stroke="#4caf50" strokeDasharray="3 3" />
                    <ReferenceLine y={0.4} stroke="#ffeb3b" strokeDasharray="3 3" />
                    <ReferenceLine y={0.6} stroke="#ff9800" strokeDasharray="3 3" />
                    <ReferenceLine y={0.8} stroke="#f44336" strokeDasharray="3 3" />
                  </>
                ) : (
                  <>
                    <ReferenceLine y={1.5} stroke="#4caf50" strokeDasharray="3 3" />
                    <ReferenceLine y={2.5} stroke="#ffeb3b" strokeDasharray="3 3" />
                    <ReferenceLine y={3.5} stroke="#ff9800" strokeDasharray="3 3" />
                    <ReferenceLine y={4.5} stroke="#f44336" strokeDasharray="3 3" />
                  </>
                )}
                <Scatter
                  dataKey="score"
                  fill="#8884d8"
                  isAnimationActive={false}
                >
                  {vulnerabilityProfileData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Scatter>
                <Line
                  type="monotone"
                  dataKey="movingAvg"
                  stroke="#000000"
                  dot={false}
                  strokeWidth={2}
                  isAnimationActive={false}
                  name=" " // Empty name to prevent it from showing in tooltip
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Parameter Correlation Matrix removed */}
    </div>
  );
};

export default CviCharts;
