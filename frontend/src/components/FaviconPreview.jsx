import { motion } from 'framer-motion';
import { FiGlobe, FiLock, FiUnlock } from 'react-icons/fi';

const FaviconPreview = ({ url }) => {
  const domain = new URL(url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
  const isHttps = url.startsWith('https://');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-glass-200 backdrop-blur-xl rounded-2xl p-6 border border-glass-300"
    >
      <div className="flex items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-20 h-20 rounded-2xl bg-glass-300 flex items-center justify-center overflow-hidden"
        >
          <img
            src={faviconUrl}
            alt={`${domain} favicon`}
            className="w-12 h-12"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
            }}
          />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{domain}</h3>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-glass-300">
              <FiGlobe className="text-electric-blue w-4 h-4" />
              <span className="text-sm text-gray-300">{domain}</span>
            </div>
            
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isHttps ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {isHttps ? (
                <FiLock className="text-green-400 w-4 h-4" />
              ) : (
                <FiUnlock className="text-red-400 w-4 h-4" />
              )}
              <span className={`text-sm ${isHttps ? 'text-green-400' : 'text-red-400'}`}>
                {isHttps ? 'HTTPS' : 'HTTP'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FaviconPreview;
