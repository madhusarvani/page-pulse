import { motion } from 'framer-motion';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

const ErrorCard = ({ error, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl p-8 border border-red-500/30">
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center"
          >
            <FiAlertCircle className="text-red-400 w-6 h-6" />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Audit Failed</h3>
            <p className="text-gray-300 mb-4">{error || 'An error occurred while auditing the website.'}</p>
            
            <div className="space-y-2 text-sm text-gray-400">
              <p>Possible reasons:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Invalid URL format</li>
                <li>Website is not accessible</li>
                <li>Request timed out</li>
                <li>Website blocks automated requests</li>
              </ul>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
        >
          <FiRefreshCw className="w-5 h-5" />
          <span>Try Again</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ErrorCard;
