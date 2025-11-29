import React from 'react'

type State = { hasError: boolean }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container-default py-20 text-center">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-gray-600">Try refreshing the page.</p>
        </div>
      )
    }
    return this.props.children
  }
}

