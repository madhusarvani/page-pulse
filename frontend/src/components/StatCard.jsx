import { motion } from 'framer-motion';
import { FiClock, FiFileText, FiType, FiImage, FiHash, FiActivity, FiGlobe } from 'react-icons/fi';

const StatCard = ({ icon: Icon, label, value, color = 'electric-blue', delay = 0 }) => {
  const colorClasses = {
    'electric-blue': 'text-electric-blue',
    'electric-purple': 'text-electric-purple',
    'electric-cyan': 'text-electric-cyan',
    'green': 'text-green-400',
    'orange': 'text-orange-400',
    'red': 'text-red-400'
  };

  const bgGlowClasses = {
    'electric-blue': 'hover:shadow-electric-blue/20',
    'electric-purple': 'hover:shadow-electric-purple/20',
    'electric-cyan': 'hover:shadow-electric-cyan/20',
    'green': 'hover:shadow-green-400/20',
    'orange': 'hover:shadow-orange-400/20',
    'red': 'hover:shadow-red-400/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-glass-200 backdrop-blur-xl rounded-2xl p-6 border border-glass-300 hover:border-glass-400 transition-all duration-300 hover:shadow-lg ${bgGlowClasses[color]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-glass-300 ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="text-2xl font-bold text-white"
      >
        {value}
      </motion.p>
    </motion.div>
  );
};

export default StatCard;
