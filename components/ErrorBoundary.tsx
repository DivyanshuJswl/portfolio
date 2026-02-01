"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-red-200 dark:border-red-900/30 p-6 text-center">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-slate-900 dark:text-white font-bold mb-2">
            System Module Failed
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The 3D component encountered an error.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-3 h-3" /> Reload Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
