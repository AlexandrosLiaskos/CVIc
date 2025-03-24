import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { InteractiveMap } from '../InteractiveMap'
import type { Feature, LineString } from 'geojson'

// Mock react-leaflet
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  GeoJSON: ({ data, eventHandlers }: any) => (
    <div data-testid={`geojson-${data.id}`} onClick={eventHandlers?.click} />
  ),
  Rectangle: ({ bounds }: any) => (
    <div data-testid="selection-rectangle" data-bounds={JSON.stringify(bounds)} />
  ),
  FeatureGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="feature-group">{children}</div>
  ),
  useMap: () => ({
    on: jest.fn(),
    off: jest.fn()
  })
}))

describe('InteractiveMap', () => {
  const mockSegments: Feature<LineString>[] = [
    {
      type: 'Feature',
      id: '1',
      geometry: {
        type: 'LineString',
        coordinates: [[0, 0], [1, 1]]
      },
      properties: {}
    },
    {
      type: 'Feature',
      id: '2',
      geometry: {
        type: 'LineString',
        coordinates: [[1, 1], [2, 2]]
      },
      properties: {}
    }
  ]

  const mockProps = {
    segments: mockSegments,
    selectedSegments: new Set<string>(),
    onSegmentSelect: jest.fn(),
    onSegmentDeselect: jest.fn(),
    onMultiSegmentSelect: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<InteractiveMap {...mockProps} />)
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
  })

  it('renders all segments', () => {
    render(<InteractiveMap {...mockProps} />)
    mockSegments.forEach(segment => {
      expect(screen.getByTestId(`geojson-${segment.id}`)).toBeInTheDocument()
    })
  })

  it('handles segment selection', () => {
    render(<InteractiveMap {...mockProps} />)
    const segment = screen.getByTestId('geojson-1')
    fireEvent.click(segment)
    expect(mockProps.onSegmentSelect).toHaveBeenCalledWith('1')
  })

  it('handles segment deselection', () => {
    const selectedProps = {
      ...mockProps,
      selectedSegments: new Set(['1'])
    }
    render(<InteractiveMap {...selectedProps} />)
    const segment = screen.getByTestId('geojson-1')
    fireEvent.click(segment)
    expect(mockProps.onSegmentDeselect).toHaveBeenCalledWith('1')
  })

  it('shows selection rectangle when drawing', () => {
    render(<InteractiveMap {...mockProps} />)
    const map = screen.getByTestId('map-container')
    
    // Simulate drawing
    fireEvent.mouseDown(map, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(map, { clientX: 100, clientY: 100 })
    
    const rectangle = screen.getByTestId('selection-rectangle')
    expect(rectangle).toBeInTheDocument()
  })

  it('handles multi-segment selection', () => {
    render(<InteractiveMap {...mockProps} />)
    const map = screen.getByTestId('map-container')
    
    // Simulate drawing and selection
    fireEvent.mouseDown(map, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(map, { clientX: 100, clientY: 100 })
    fireEvent.mouseUp(map)
    
    expect(mockProps.onMultiSegmentSelect).toHaveBeenCalled()
  })

  it('shows selected segments count', () => {
    const selectedProps = {
      ...mockProps,
      selectedSegments: new Set(['1', '2'])
    }
    render(<InteractiveMap {...selectedProps} />)
    expect(screen.getByText('Selected: 2 segments')).toBeInTheDocument()
  })
}) 