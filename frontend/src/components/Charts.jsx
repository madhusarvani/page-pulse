import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { calculateAccessibility } from '../utils/calculateAccessibility';

const Charts = ({ data }) => {
  const accessibilityChecks = calculateAccessibility(data);
  
  // Pie chart data for accessibility
  const pieData = [
    { name: 'Pass', value: accessibilityChecks.filter(c => c.status === 'pass').length, color: '#4ade80' },
    { name: 'Warning', value: accessibilityChecks.filter(c => c.status === 'warning').length, color: '#facc15' },
    { name: 'Fail', value: accessibilityChecks.filter(c => c.status === 'fail').length, color: '#ef4444' }
  ];

  // Bar chart data for metrics
  const barData = [
    { name: 'H1 Tags', value: data.h1Count, color: '#00D4FF' },
    { name: 'Images Missing ALT', value: data.imagesMissingAlt, color: '#7C3AED' },
    { name: 'Word Count (100s)', value: Math.round(data.wordCount / 100), color: '#06B6D4' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-glass-300 backdrop-blur-xl p-3 rounded-lg border border-glass-400">
          <p className="text-white">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Accessibility Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-glass-200 backdrop-blur-xl rounded-2xl p-6 border border-glass-300"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Accessibility Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-4">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-400 text-sm">{entry.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Metrics Bar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-glass-200 backdrop-blur-xl rounded-2xl p-6 border border-glass-300"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Content Metrics</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Charts;
