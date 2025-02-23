import { Component, ErrorInfo } from 'react'
import { Props, State } from './interface'

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='p-4 bg-red-50 rounded-md'>
            <p className='text-red-800'>Something went wrong. Please try again.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className='mt-2 text-sm text-red-600 hover:text-red-500'
            >
              Try again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
