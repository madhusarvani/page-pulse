import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const UrlInput = ({ onAnalyze, isLoading, inputRef }) => {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const handleClear = () => {
    setUrl('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-4">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
        <div className="absolute inset-0 bg-gradient-premium rounded-2xl blur-xl opacity-20 animate-pulse-glow"></div>
        
        <div className={`relative flex items-center bg-glass-200 backdrop-blur-xl rounded-2xl border-2 transition-all duration-300 ${
          isFocused 
            ? 'border-electric-blue shadow-lg shadow-electric-blue/20' 
            : 'border-glass-300 hover:border-glass-400'
        }`}>
          <div className="pl-6">
            <FiSearch className="text-gray-400 w-6 h-6" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter website URL (e.g., example.com)"
            className="flex-1 px-4 py-5 text-lg bg-transparent text-white placeholder-gray-500 focus:outline-none"
            disabled={isLoading}
          />
          
          {url && !isLoading && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={handleClear}
              className="pr-6 text-gray-400 hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </motion.button>
          )}
          
          <motion.button
            type="submit"
            disabled={isLoading || !url.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`mr-2 px-8 py-3 rounded-xl font-semibold text-white transition-all ${
              isLoading || !url.trim()
                ? 'bg-glass-300 cursor-not-allowed'
                : 'bg-gradient-premium hover:shadow-lg hover:shadow-electric-blue/30'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </span>
            ) : (
              'Analyze'
            )}
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default UrlInput;
