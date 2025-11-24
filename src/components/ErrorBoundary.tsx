import React from "react";

type State = {
  hasError: boolean;
  error?: Error | null;
};

type Props = {
  children: React.ReactNode;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // Aquí podrías reportar a Sentry/Logs si quieres
    // console.error("ErrorBoundary caught", error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
    // opcional: también puedes forzar reload: window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto py-12">
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2 text-red-700">
              Something went wrong
            </h2>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-200">
              Sorry — an unexpected error occurred while displaying this
              section.
            </p>
            <details className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              <summary>Error details</summary>
              <pre className="whitespace-pre-wrap">
                {String(this.state.error)}
              </pre>
            </details>
            <div className="flex gap-2">
              <button
                onClick={this.reset}
                className="px-4 py-2 bg-green-950/80 text-white rounded"
              >
                Retry
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 border rounded"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}
