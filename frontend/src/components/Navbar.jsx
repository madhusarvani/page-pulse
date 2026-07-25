import { motion } from 'framer-motion';
import { FiMenu, FiX, FiFileText, FiInfo, FiMail } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl tracking-tight">Page Pulse</h1>
                <p className="text-gray-400 text-xs font-medium">Website Auditor</p>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <FiFileText className="w-4 h-4" />
              <span className="text-sm font-medium">Features</span>
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <FiInfo className="w-4 h-4" />
              <span className="text-sm font-medium">About</span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all"
            >
              <FiMail className="w-4 h-4" />
              <span className="text-sm font-medium">Contact</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 bg-black/90"
        >
          <div className="px-4 py-4 space-y-3">
            <a
              href="#features"
              className="flex items-center gap-2 text-white hover:text-gray-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiFileText size={20} />
              <span>Features</span>
            </a>
            <a
              href="#about"
              className="flex items-center gap-2 text-white hover:text-gray-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiInfo size={20} />
              <span>About</span>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 text-white hover:text-gray-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiMail size={20} />
              <span>Contact</span>
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
