import { motion } from 'framer-motion';
import { calculateHealthScore, getHealthRating, getHealthColor } from '../utils/healthScore';

const HealthScore = ({ data }) => {
  const score = calculateHealthScore(data);
  const rating = getHealthRating(score);
  const colorClass = getHealthColor(score);
  
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const getGaugeColor = () => {
    if (score >= 90) return '#4ade80'; // green
    if (score >= 70) return '#60a5fa'; // blue
    if (score >= 50) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const gaugeColor = getGaugeColor();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-glass-200 backdrop-blur-xl rounded-2xl p-6 border border-glass-300"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Website Health Score</h3>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-40 h-40 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="45"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="80"
              cy="80"
              r="45"
              stroke={gaugeColor}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-4xl font-bold ${colorClass}`}
            >
              {score}
            </motion.span>
            <span className="text-gray-400 text-sm">/ 100</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <span className={`text-2xl font-semibold ${colorClass}`}>
          {rating}
        </span>
        <p className="text-gray-400 text-sm mt-1">
          {score >= 90 ? 'Excellent! Your website is well optimized.' :
           score >= 70 ? 'Good! Some improvements recommended.' :
           score >= 50 ? 'Needs improvement. Focus on SEO basics.' :
           'Poor. Significant improvements needed.'}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HealthScore;
