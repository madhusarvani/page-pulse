import { motion } from 'framer-motion';
import { FiCopy, FiDownload, FiShare2, FiFileText } from 'react-icons/fi';
import { downloadPDF } from '../utils/generatePDF';
import { copyShareUrl, nativeShare } from '../utils/shareReport';

const ExportButtons = ({ data }) => {
  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      alert('JSON copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy JSON:', error);
    }
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `page-pulse-audit-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const success = downloadPDF(data);
    if (success) {
      alert('PDF downloaded successfully!');
    } else {
      alert('Failed to generate PDF');
    }
  };

  const handleShare = async () => {
    const nativeSuccess = await nativeShare(data.url, data);
    if (!nativeSuccess) {
      const copySuccess = await copyShareUrl(data.url);
      if (copySuccess) {
        alert('Share URL copied to clipboard!');
      } else {
        alert('Failed to copy share URL');
      }
    }
  };

  const buttons = [
    {
      icon: FiCopy,
      label: 'Copy JSON',
      onClick: handleCopyJSON,
      color: 'electric-blue'
    },
    {
      icon: FiFileText,
      label: 'Download JSON',
      onClick: handleDownloadJSON,
      color: 'electric-purple'
    },
    {
      icon: FiDownload,
      label: 'Download PDF',
      onClick: handleDownloadPDF,
      color: 'electric-cyan'
    },
    {
      icon: FiShare2,
      label: 'Share Report',
      onClick: handleShare,
      color: 'green'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-3 justify-center"
    >
      {buttons.map((button, index) => {
        const ButtonIcon = button.icon;
        const colorClasses = {
          'electric-blue': 'hover:bg-electric-blue hover:text-white border-electric-blue/30 text-electric-blue',
          'electric-purple': 'hover:bg-electric-purple hover:text-white border-electric-purple/30 text-electric-purple',
          'electric-cyan': 'hover:bg-electric-cyan hover:text-white border-electric-cyan/30 text-electric-cyan',
          'green': 'hover:bg-green-400 hover:text-white border-green-400/30 text-green-400'
        };

        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={button.onClick}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 bg-glass-200 backdrop-blur-xl transition-all duration-300 ${colorClasses[button.color]}`}
          >
            <ButtonIcon className="w-5 h-5" />
            <span className="font-medium">{button.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default ExportButtons;
