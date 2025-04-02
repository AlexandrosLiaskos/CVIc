// ---- File: src/components/results/CviLegend.tsx ----
import React from 'react';

/**
 * Displays a simple legend for CVI score categories and their colors.
 */
export const CviLegend: React.FC = () => {
  const categories = [
    { label: 'Very Low', rank: 1, color: 'bg-green-600', border: 'border-green-700' },
    { label: 'Low', rank: 2, color: 'bg-lime-500', border: 'border-lime-600' },
    { label: 'Moderate', rank: 3, color: 'bg-yellow-400', border: 'border-yellow-500' },
    { label: 'High', rank: 4, color: 'bg-orange-500', border: 'border-orange-600' },
    { label: 'Very High', rank: 5, color: 'bg-red-600', border: 'border-red-700' },
    { label: 'No Data / Error', rank: 0, color: 'bg-gray-400', border: 'border-gray-500' },
  ];

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div key={category.label} className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 ${category.color} border ${category.border}`}></span>
          <span className="text-sm text-gray-700">
            {category.label}
            <span className="text-xs text-gray-500 ml-1">(Rank {category.rank > 0 ? category.rank : 'N/A'})</span>
          </span>
        </div>
      ))}
    </div>
  );
};