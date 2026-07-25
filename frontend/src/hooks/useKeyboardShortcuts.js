import { useEffect } from 'react';

/**
 * Custom hook for handling keyboard shortcuts
 * @param {Object} shortcuts - Object mapping keys to callbacks
 */
export function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if user is typing in an input field
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
        event.target.tagName
      ) || event.target.isContentEditable;

      if (isTyping) return;

      const key = event.key.toLowerCase();
      
      // Handle single key shortcuts
      if (shortcuts[key] && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
        shortcuts[key]();
      }

      // Handle Ctrl/Cmd combinations
      if (event.ctrlKey || event.metaKey) {
        const combo = `ctrl+${key}`;
        if (shortcuts[combo]) {
          event.preventDefault();
          shortcuts[combo]();
        }
      }

      // Handle Shift combinations
      if (event.shiftKey && !event.ctrlKey && !event.metaKey) {
        const combo = `shift+${key}`;
        if (shortcuts[combo]) {
          event.preventDefault();
          shortcuts[combo]();
        }
      }

      // Handle Ctrl+Shift combinations
      if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
        const combo = `ctrl+shift+${key}`;
        if (shortcuts[combo]) {
          event.preventDefault();
          shortcuts[combo]();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
