import { motion } from 'framer-motion';
import { FiServer, FiGlobe, FiLock, FiLink } from 'react-icons/fi';

const DomainInfo = ({ url }) => {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;
  const protocol = urlObj.protocol;
  const isHttps = protocol === 'https:';
  
  const parts = hostname.split('.');
  const rootDomain = parts.slice(-2).join('.');
  const subdomain = parts.length > 2 ? parts.slice(0, -2).join('.') : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-glass-200 backdrop-blur-xl rounded-2xl p-6 border border-glass-300"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Domain Information</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-glass-300">
          <div className="flex items-center gap-3">
            <FiServer className="text-electric-blue w-5 h-5" />
            <span className="text-gray-300">Hostname</span>
          </div>
          <span className="text-white font-medium">{hostname}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-glass-300">
          <div className="flex items-center gap-3">
            <FiGlobe className="text-electric-purple w-5 h-5" />
            <span className="text-gray-300">Protocol</span>
          </div>
          <span className="text-white font-medium uppercase">{protocol.replace(':', '')}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-glass-300">
          <div className="flex items-center gap-3">
            <FiLock className={`w-5 h-5 ${isHttps ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-gray-300">HTTPS</span>
          </div>
          <span className={`font-medium ${isHttps ? 'text-green-400' : 'text-red-400'}`}>
            {isHttps ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-glass-300">
          <div className="flex items-center gap-3">
            <FiLink className="text-electric-cyan w-5 h-5" />
            <span className="text-gray-300">Root Domain</span>
          </div>
          <span className="text-white font-medium">{rootDomain}</span>
        </div>

        {subdomain && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-glass-300">
            <div className="flex items-center gap-3">
              <FiServer className="text-orange-400 w-5 h-5" />
              <span className="text-gray-300">Subdomain</span>
            </div>
            <span className="text-white font-medium">{subdomain}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DomainInfo;
