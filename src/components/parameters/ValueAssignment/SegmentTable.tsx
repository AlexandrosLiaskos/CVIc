import React, { useMemo } from 'react'
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual'
import { SegmentTableProps } from './types'

export const SegmentTable: React.FC<SegmentTableProps> = ({
  segments,
  parameters,
  selectedSegments,
  segmentValues,
  onValueChange
}) => {
  // Create a virtualized list for efficient rendering
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rows = useMemo(() => {
    return segments.map(segment => ({
      id: segment.id as string,
      values: parameters.reduce((acc, param) => ({
        ...acc,
        [param.id]: segmentValues[segment.id as string]?.[param.id] || 0
      }), {} as Record<string, number>),
      isSelected: selectedSegments.has(segment.id as string)
    }))
  }, [segments, parameters, segmentValues, selectedSegments])

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5
  })

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-[100px_repeat(auto-fill,minmax(120px,1fr))] gap-4 p-4">
          <div className="text-sm font-medium text-gray-700">Segment ID</div>
          {parameters.map(param => (
            <div key={param.id} className="text-sm font-medium text-gray-700">
              {param.name}
            </div>
          ))}
        </div>
      </div>

      {/* Virtualized Body */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height: '400px' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative'
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
            const row = rows[virtualRow.index]
            return (
              <div
                key={row.id}
                className={`
                  absolute top-0 left-0 w-full
                  grid grid-cols-[100px_repeat(auto-fill,minmax(120px,1fr))] gap-4 p-4
                  ${row.isSelected ? 'bg-blue-50' : 'bg-white'}
                  ${virtualRow.index % 2 === 0 ? 'bg-opacity-50' : ''}
                  hover:bg-gray-50
                  border-b border-gray-200
                  transition-colors duration-150
                `}
                style={{
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                <div className="text-sm text-gray-900 truncate">
                  {row.id}
                </div>
                {parameters.map(param => (
                  <div key={param.id}>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={row.values[param.id] || ''}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        if (!isNaN(value) && value >= 1 && value <= 5) {
                          onValueChange(row.id, param.id, value)
                        }
                      }}
                      className={`
                        w-20 px-2 py-1 text-sm
                        border border-gray-300 rounded-md
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        disabled:bg-gray-100
                        ${!row.isSelected && 'bg-gray-50'}
                      `}
                      disabled={!row.isSelected}
                    />
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer with summary */}
      <div className="bg-gray-50 border-t border-gray-200 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">
            Total Segments: {segments.length}
          </span>
          <span className="text-gray-700">
            Selected: {selectedSegments.size}
          </span>
        </div>
      </div>
    </div>
  )
} 