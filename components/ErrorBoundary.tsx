'use client';

import React, { Component, ReactNode } from 'react';
import { NeonButton } from './ui/NeonButton';
import { GlassCard } from './ui/GlassCard';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen animated-gradient flex items-center justify-center px-6">
          <GlassCard className="max-w-2xl w-full text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold text-[#ff00ff] mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-300 mb-6">
              An unexpected error occurred in this section. Please try refreshing the page.
            </p>
            {this.state.error && (
              <div className="glass rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-400 mb-2">Error details:</p>
                <p className="text-sm text-red-400 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <NeonButton onClick={this.handleReset} color="primary">
              Try Again
            </NeonButton>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
