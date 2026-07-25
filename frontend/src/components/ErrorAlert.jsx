/**
 * Error Alert Component
 * Displays error messages with retry option
 */

const ErrorAlert = ({ error, onRetry }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in">
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
              Error
            </h3>
            <p className="mt-2 text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
