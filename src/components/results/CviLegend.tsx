// ---- File: src/components/results/CviLegend.tsx ----
import React from 'react';

export const CviLegend: React.FC = () => {
  const categories = [
    { label: 'Very Low', rank: 1, color: 'bg-green-600', border: 'border-green-700', textColor: 'text-green-800' },
    { label: 'Low', rank: 2, color: 'bg-lime-500', border: 'border-lime-600', textColor: 'text-lime-800' },
    { label: 'Moderate', rank: 3, color: 'bg-yellow-400', border: 'border-yellow-500', textColor: 'text-yellow-800' },
    { label: 'High', rank: 4, color: 'bg-orange-500', border: 'border-orange-600', textColor: 'text-orange-800' },
    { label: 'Very High', rank: 5, color: 'bg-red-600', border: 'border-red-700', textColor: 'text-red-800' },
    { label: 'No Data / Error', rank: 0, color: 'bg-gray-400', border: 'border-gray-500', textColor: 'text-gray-700' },
  ];

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category.label} className="flex items-center group hover:bg-gray-100 p-1.5 rounded-md transition-colors">
          <div className="flex items-center justify-center mr-3">
            <span className={`w-5 h-5 rounded-full flex-shrink-0 ${category.color} border ${category.border} shadow-sm group-hover:scale-110 transition-transform`}></span>
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-medium ${category.textColor}`}>
              {category.label}
            </span>
            <span className="text-xs text-gray-500">
              {category.rank > 0 ? `Vulnerability Rank: ${category.rank}` : 'No vulnerability data'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};