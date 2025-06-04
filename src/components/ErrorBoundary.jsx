// components/ErrorBoundary.jsx
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('🛑 Error capturado en ErrorBoundary:', error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          <strong>Algo salió mal al mostrar este bloque.</strong>
          <br />
          <button
            className="mt-2 px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            onClick={this.handleRetry}
          >
            Reintentar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
