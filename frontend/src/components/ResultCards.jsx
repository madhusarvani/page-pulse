/**
 * Result Cards Component
 * Displays audit results in organized cards with status badges
 */

const ResultCards = ({ data, onCopyJson, onAuditAnother }) => {
  // Determine status badge color based on HTTP status
  const getStatusBadgeColor = (status) => {
    if (status === 200) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (status >= 300 && status < 400) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    onCopyJson();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 animate-slide-up">
      {/* Status Badge */}
      <div className="flex justify-center mb-6">
        <span className={`px-4 py-2 rounded-full font-semibold ${getStatusBadgeColor(data.httpStatus)}`}>
          HTTP Status: {data.httpStatus}
        </span>
      </div>

      {/* Main URL Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">URL</h3>
        <a 
          href={data.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline break-all"
        >
          {data.url}
        </a>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Response Time */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Response Time</h3>
          </div>
          <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">{data.responseTime}</p>
        </div>

        {/* Page Title */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Page Title</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-200 line-clamp-2">{data.pageTitle}</p>
        </div>

        {/* Meta Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-1">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Meta Description</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-200 line-clamp-3">{data.metaDescription}</p>
        </div>

        {/* H1 Count */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">H1 Tags</h3>
          </div>
          <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">{data.h1Count}</p>
        </div>

        {/* Images Missing Alt */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Images Missing Alt</h3>
          </div>
          <p className={`text-3xl font-bold ${data.imagesMissingAlt > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            {data.imagesMissingAlt}
          </p>
        </div>

        {/* Word Count */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-pink-600 dark:text-pink-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Word Count</h3>
          </div>
          <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">{data.wordCount.toLocaleString()}</p>
        </div>
      </div>

      {/* Timestamp Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-2">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Audit Timestamp</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-200">{formatTimestamp(data.timestamp)}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={copyToClipboard}
          className="px-6 py-3 text-lg font-semibold text-white bg-gray-600 hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Copy JSON
        </button>
        <button
          onClick={onAuditAnother}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Audit Another Page
        </button>
      </div>
    </div>
  );
};

export default ResultCards;
