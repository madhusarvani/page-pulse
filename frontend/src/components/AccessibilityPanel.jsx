import { motion } from 'framer-motion';
import { FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';
import { calculateAccessibility, getAccessibilityScore } from '../utils/calculateAccessibility';

const AccessibilityPanel = ({ data }) => {
  const checks = calculateAccessibility(data);
  const score = getAccessibilityScore(checks);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <FiCheck className="text-green-400" />;
      case 'warning':
        return <FiAlertTriangle className="text-yellow-400" />;
      case 'fail':
        return <FiX className="text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass':
        return 'border-green-400/30 bg-green-400/10';
      case 'warning':
        return 'border-yellow-400/30 bg-yellow-400/10';
      case 'fail':
        return 'border-red-400/30 bg-red-400/10';
      default:
        return 'border-gray-400/30 bg-gray-400/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-glass-200 backdrop-blur-xl rounded-2xl p-6 border border-glass-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Accessibility Checklist</h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Score:</span>
          <span className="text-2xl font-bold text-electric-blue">{score}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {checks.map((check, index) => (
          <motion.div
            key={check.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-xl border ${getStatusColor(check.status)}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-glass-300 flex items-center justify-center">
                {getStatusIcon(check.status)}
              </div>
              <span className="text-white">{check.label}</span>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              check.status === 'pass' ? 'bg-green-400/20 text-green-400' :
              check.status === 'warning' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {check.status === 'pass' ? 'PASS' :
               check.status === 'warning' ? 'WARNING' : 'FAIL'}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AccessibilityPanel;
