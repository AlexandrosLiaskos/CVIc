import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

interface AnalysisResult {
  id: string
  shorelineName: string
  location: string
  date: string
  cviScore: number
  status: 'completed' | 'in_progress'
}

export default function ResultsManagerPage() {
  const { user } = useAuth()
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // TODO: Implement fetching results from Supabase
        // For now, using mock data
        const mockResults: AnalysisResult[] = [
          {
            id: '1',
            shorelineName: 'Sample Shoreline',
            location: 'Sample Location',
            date: '2024-03-20',
            cviScore: 0.75,
            status: 'completed'
          }
        ]
        setResults(mockResults)
      } catch (err) {
        setError('Failed to fetch analysis results. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchResults()
    }
  }, [user])

  if (loading) {
    return (
      <div className="text-center mt-8">
        <p>Loading results...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-8">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-8">Analysis Results</h2>

      {results.length === 0 ? (
        <p className="text-center text-gray-600">
          No analysis results found. Start a new analysis to see results here.
        </p>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white shadow rounded-lg p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {result.shorelineName}
                  </h3>
                  <p className="text-sm text-gray-600">{result.location}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    result.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {result.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CVI Score</p>
                  <p className="text-sm font-medium text-gray-900">
                    {result.cviScore.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button className="btn btn-secondary btn-sm">
                  View Details
                </button>
                <button className="btn btn-primary btn-sm">
                  Export Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 