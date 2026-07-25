import { motion } from 'framer-motion';
import { FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';

const Hero = () => {
  return (
    <div className="text-center pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/30 mb-6">
          <FiZap className="text-electric-blue w-4 h-4" />
          <span className="text-electric-blue text-sm font-medium">AI-Powered Website Analysis</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-premium bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
            Analyze Any Website
          </span>
          <br />
          <span className="text-white">In Seconds</span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          Get instant insights on SEO, performance, accessibility, and more. 
          Enter a URL below to get started.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2 text-gray-300">
            <FiShield className="text-electric-blue w-5 h-5" />
            <span>SEO Analysis</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <FiTrendingUp className="text-electric-purple w-5 h-5" />
            <span>Performance Metrics</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <FiZap className="text-electric-cyan w-5 h-5" />
            <span>Accessibility Check</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
