import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  errorStack?: string
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
    errorStack: undefined
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorStack: error.stack
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console
    console.error('Uncaught error:', error, errorInfo)

    // Update state to include the error info
    this.setState({
      errorInfo
    })

    // You could also log the error to an error reporting service here
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-2xl w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Something went wrong
              </h2>

              <div className="text-left mb-6 p-4 bg-red-50 rounded-md border border-red-200">
                <p className="text-red-700 font-semibold mb-2">Error:</p>
                <p className="text-gray-800 mb-4">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </p>

                {this.state.errorStack && (
                  <div className="mt-4">
                    <p className="text-red-700 font-semibold mb-2">Stack Trace:</p>
                    <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
                      {this.state.errorStack}
                    </pre>
                  </div>
                )}

                {this.state.errorInfo && (
                  <div className="mt-4">
                    <p className="text-red-700 font-semibold mb-2">Component Stack:</p>
                    <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}