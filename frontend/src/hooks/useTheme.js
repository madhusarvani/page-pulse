import { useEffect, useState } from 'react';

/**
 * Custom hook for managing dark/light theme
 * @returns {Object} - { theme: 'dark' | 'light', toggleTheme: function }
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { theme: isDark ? 'dark' : 'light', toggleTheme, isDark };
}
