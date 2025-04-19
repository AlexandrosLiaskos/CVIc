// src/components/parameters/ParameterAssignmentHeader.tsx
import React from 'react';

interface ParameterAssignmentHeaderProps {
  title: string;
  completionPercentage: number;
}

export const ParameterAssignmentHeader: React.FC<ParameterAssignmentHeaderProps> = ({
  title,
  completionPercentage,
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="text-right">
        <p className="text-sm text-gray-600">Overall Completion:</p>
        <div className="w-32 bg-gray-200 rounded-full h-2.5 mt-1 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{completionPercentage}%</p>
      </div>
    </div>
  );
};