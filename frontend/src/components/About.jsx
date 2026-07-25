import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiAward, FiGlobe } from 'react-icons/fi';

const About = () => {
  return (
    <div id="about" className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Page Pulse
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A powerful website auditing tool designed to help developers and businesses optimize their online presence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              Page Pulse was built with a simple goal: to make website analysis accessible, fast, and comprehensive. 
              We believe that every website deserves to be optimized for performance, SEO, and accessibility.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our tool provides instant insights into your website's health, helping you identify issues before they impact your users.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">What We Do</h3>
            <p className="text-gray-400 leading-relaxed">
              We analyze websites across multiple dimensions including SEO performance, accessibility compliance, 
              loading speeds, and content structure. Our AI-powered engine provides actionable recommendations 
              to improve your website's overall health score.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: FiTarget, label: 'Our Focus', value: 'Quality' },
            { icon: FiAward, label: 'Accuracy Rate', value: '99%' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <stat.icon className="text-blue-500 w-8 h-8 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
