import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiX, FiTrash2 } from 'react-icons/fi';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RecentSearches = ({ onSelect, currentUrl }) => {
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);

  const handleDelete = (e, urlToDelete) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter(url => url !== urlToDelete));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleSelect = (url) => {
    onSelect(url);
  };

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FiClock className="text-gray-400 w-4 h-4" />
          <span className="text-sm text-gray-400">Recent searches</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClearAll}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors"
        >
          <FiTrash2 className="w-3 h-3" />
          Clear all
        </motion.button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {recentSearches.map((url) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group relative"
            >
              <button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(url)}
                disabled={currentUrl === url}
                className={`px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500 transition-all ${
                  currentUrl === url ? 'border-blue-500' : ''
                }`}
              >
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {url.replace(/^https?:\/\//, '').split('/')[0]}
                </span>
              </button>
              
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                onClick={(e) => handleDelete(e, url)}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX className="text-white text-xs" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentSearches;
