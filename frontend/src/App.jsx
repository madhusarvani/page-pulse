import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UrlInput from './components/UrlInput';
import LoadingScanner from './components/LoadingSpinner';
import ErrorCard from './components/ErrorCard';
import EmptyState from './components/EmptyState';
import HealthScore from './components/HealthScore';
import StatCard from './components/StatCard';
import FaviconPreview from './components/FaviconPreview';
import DomainInfo from './components/DomainInfo';
import AccessibilityPanel from './components/AccessibilityPanel';
import Timeline from './components/Timeline';
import Charts from './components/Charts';
import ExportButtons from './components/ExportButtons';
import Footer from './components/Footer';
import RecentSearches from './components/RecentSearches';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import { auditUrl } from './services/api';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { calculateHealthScore } from './utils/healthScore';
import { FiClock, FiActivity, FiFileText, FiType, FiImage, FiHash } from 'react-icons/fi';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);
  const inputRef = useRef(null);

  const handleAnalyze = async (url) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setShowConfetti(false);

    try {
      console.log('Auditing URL:', url);
      const data = await auditUrl(url);
      console.log('Audit result:', data);
      setResult(data);
      
      // Add to recent searches
      setRecentSearches(prev => {
        const filtered = prev.filter(s => s !== url);
        const updated = [url, ...filtered].slice(0, 5);
        return updated;
      });

      // Trigger confetti for high health score
      const healthScore = calculateHealthScore(data);
      if (healthScore >= 90) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (err) {
      console.error('Audit error:', err);
      setError(err.error || 'Failed to audit URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuditAnother = () => {
    setResult(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRetry = () => {
    if (result) {
      handleAnalyze(result.url);
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    '/': () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    'escape': () => {
      if (result) {
        handleAuditAnother();
      }
    },
    'ctrl+shift+c': () => {
      if (result) {
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
        alert('JSON copied to clipboard!');
      }
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <Hero />
        
        {!result && !isLoading && (
          <>
            <UrlInput 
              onAnalyze={handleAnalyze} 
              isLoading={isLoading} 
              inputRef={inputRef}
            />
            <RecentSearches 
              onSelect={handleAnalyze} 
              currentUrl={null}
            />
            {error && <ErrorCard error={error} onRetry={handleRetry} />}
            {!error && recentSearches.length === 0 && <EmptyState />}
          </>
        )}

        {isLoading && <LoadingScanner />}

        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Header with URL and actions */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <UrlInput 
                onAnalyze={handleAnalyze} 
                isLoading={isLoading} 
                inputRef={inputRef}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAuditAnother}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:border-blue-500 transition-all"
              >
                Audit Another
              </motion.button>
            </div>

            <RecentSearches onSelect={handleAnalyze} currentUrl={result.url} />

            {/* Favicon and Domain Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FaviconPreview url={result.url} />
              <DomainInfo url={result.url} />
            </div>

            {/* Health Score */}
            <HealthScore data={result} />

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard 
                icon={FiActivity} 
                label="HTTP Status" 
                value={result.httpStatus} 
                color={result.httpStatus >= 200 && result.httpStatus < 300 ? 'green' : 'red'}
                delay={0.1}
              />
              <StatCard 
                icon={FiClock} 
                label="Response Time" 
                value={result.responseTime} 
                color="blue"
                delay={0.2}
              />
              <StatCard 
                icon={FiType} 
                label="Page Title" 
                value={result.pageTitle || 'N/A'} 
                color="purple"
                delay={0.3}
              />
              <StatCard 
                icon={FiFileText} 
                label="H1 Tags" 
                value={result.h1Count} 
                color="cyan"
                delay={0.4}
              />
              <StatCard 
                icon={FiImage} 
                label="Images Missing ALT" 
                value={result.imagesMissingAlt} 
                color={result.imagesMissingAlt === 0 ? 'green' : 'orange'}
                delay={0.5}
              />
              <StatCard 
                icon={FiHash} 
                label="Word Count" 
                value={result.wordCount.toLocaleString()} 
                color="blue"
                delay={0.6}
              />
            </div>

            {/* Charts */}
            <Charts data={result} />

            {/* Accessibility Panel */}
            <AccessibilityPanel data={result} />

            {/* Timeline */}
            <Timeline timestamp={result.timestamp} responseTime={parseInt(result.responseTime)} />

            {/* Export Buttons */}
            <ExportButtons data={result} />
          </motion.div>
        )}

        {/* Static Sections */}
        {!result && !isLoading && (
          <>
            <Features />
            <About />
            <Contact />
          </>
        )}
      </main>

      <Footer />

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          initialVelocityY={-20}
        />
      )}
    </div>
  );
}

export default App;
