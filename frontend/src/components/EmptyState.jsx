import { motion } from 'framer-motion';
import { FiSearch, FiGlobe } from 'react-icons/fi';

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-2xl bg-glass-200 backdrop-blur-xl flex items-center justify-center border border-glass-300">
          <FiGlobe className="text-electric-blue w-12 h-12" />
        </div>
      </motion.div>
      
      <h2 className="text-3xl font-bold text-white mb-4">No Website Audited Yet</h2>
      
      <p className="text-gray-400 text-lg max-w-md text-center mb-8">
        Enter any URL above to generate a complete website audit with SEO insights, 
        performance metrics, and accessibility checks.
      </p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        {['example.com', 'github.com', 'google.com'].map((url) => (
          <motion.button
            key={url}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-glass-200 border border-glass-300 text-gray-300 hover:text-white hover:border-electric-blue transition-all"
          >
            {url}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
