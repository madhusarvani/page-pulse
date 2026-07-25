import { motion } from 'framer-motion';
import { FiZap, FiShield, FiTrendingUp, FiActivity, FiCheckCircle, FiClock } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Get comprehensive website audits in seconds with our optimized scanning engine.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiShield,
      title: 'SEO Analysis',
      description: 'Deep SEO insights including meta tags, headings, content structure, and keyword analysis.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Performance Metrics',
      description: 'Monitor page load times, response codes, and overall website performance indicators.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiActivity,
      title: 'Health Score',
      description: 'Get a comprehensive health score (0-100) based on multiple SEO and performance factors.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FiCheckCircle,
      title: 'Accessibility Check',
      description: 'Ensure your website is accessible to all users with WCAG compliance checking.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: FiClock,
      title: 'Real-time Monitoring',
      description: 'Track changes over time with detailed timestamps and historical data comparison.',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <div id="features" className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to analyze, optimize, and monitor your website's performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
