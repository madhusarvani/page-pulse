import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiLoader, FiGlobe, FiCode, FiShield, FiImage, FiFileText, FiActivity } from 'react-icons/fi';

const LoadingScanner = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages = [
    { icon: FiGlobe, text: 'Connecting...' },
    { icon: FiActivity, text: 'Resolving DNS...' },
    { icon: FiCode, text: 'Fetching HTML...' },
    { icon: FiShield, text: 'Checking HTTP Status...' },
    { icon: FiFileText, text: 'Extracting Metadata...' },
    { icon: FiImage, text: 'Scanning Images...' },
    { icon: FiShield, text: 'Analyzing Accessibility...' },
    { icon: FiLoader, text: 'Calculating Word Count...' },
    { icon: FiCheck, text: 'Generating Report...' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
      
      setCurrentStage(prev => {
        if (prev < stages.length - 1 && progress > (prev + 1) * (100 / stages.length)) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = stages[currentStage].icon;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-glass-300 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-premium rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{Math.round(progress)}%</span>
            <span>Scanning...</span>
          </div>
        </div>

        {/* Current Stage */}
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-full bg-glass-200 flex items-center justify-center"
          >
            <CurrentIcon className="text-electric-blue w-6 h-6" />
          </motion.div>
          <span className="text-xl text-white font-medium">{stages[currentStage].text}</span>
        </motion.div>

        {/* Stage Timeline */}
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const StageIcon = stage.icon;
            const isCompleted = index < currentStage;
            const isCurrent = index === currentStage;
            const isPending = index > currentStage;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 ${
                  isCompleted ? 'text-green-400' : isCurrent ? 'text-electric-blue' : 'text-gray-600'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-glass-200 flex items-center justify-center">
                  {isCompleted ? (
                    <FiCheck className="w-4 h-4" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <StageIcon className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <StageIcon className="w-4 h-4" />
                  )}
                </div>
                <span className="text-sm">{stage.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoadingScanner;
