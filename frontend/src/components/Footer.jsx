import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="border-t border-glass-300 bg-glass-100 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Attribution */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              Built for{' '}
              <a 
                href="https://digitalheroesco.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-electric-blue hover:text-electric-purple transition-colors font-medium"
              >
                Digital Heroes Training Task
              </a>
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Made with</span>
            <FiHeart className="text-red-400 w-4 h-4" />
            <span>using</span>
            <span className="text-electric-blue">React</span>
            <span className="text-gray-600">,</span>
            <span className="text-electric-purple">Tailwind CSS</span>
            <span className="text-gray-600">,</span>
            <span className="text-electric-cyan">Node.js</span>
            <span className="text-gray-600">&</span>
            <span className="text-green-400">Express</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
              title="Twitter"
            >
              <FiTwitter className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-glass-300 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Page Pulse. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
