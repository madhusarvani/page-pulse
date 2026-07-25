import { motion } from 'framer-motion';
import { FiPlay, FiCheckCircle, FiClock } from 'react-icons/fi';
import { formatRelativeTime } from '../utils/formatDate';

const Timeline = ({ timestamp, responseTime }) => {
  const events = [
    { icon: FiPlay, label: 'Request Started', time: timestamp },
    { icon: FiCheckCircle, label: 'Connected', time: new Date(new Date(timestamp).getTime() + responseTime * 0.2) },
    { icon: FiCheckCircle, label: 'HTML Downloaded', time: new Date(new Date(timestamp).getTime() + responseTime * 0.4) },
    { icon: FiCheckCircle, label: 'Metadata Parsed', time: new Date(new Date(timestamp).getTime() + responseTime * 0.6) },
    { icon: FiCheckCircle, label: 'Accessibility Checked', time: new Date(new Date(timestamp).getTime() + responseTime * 0.8) },
    { icon: FiClock, label: 'Report Generated', time: timestamp }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-glass-200 backdrop-blur-xl rounded-2xl p-6 border border-glass-300"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Scan Timeline</h3>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-glass-300"></div>
        
        <div className="space-y-4">
          {events.map((event, index) => {
            const EventIcon = event.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-4"
              >
                <div className="relative z-10 w-8 h-8 rounded-full bg-glass-300 flex items-center justify-center">
                  <EventIcon className="text-electric-blue w-4 h-4" />
                </div>
                
                <div className="flex-1 pt-1">
                  <p className="text-white font-medium">{event.label}</p>
                  <p className="text-gray-400 text-sm">{formatRelativeTime(event.time)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
