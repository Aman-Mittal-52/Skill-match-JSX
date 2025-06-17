import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

// Constants for theme values
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_STORAGE_KEY = 'theme';

export default function ThemeToggle() {
  // Initialize theme state
  const [theme, setTheme] = useState(THEME_LIGHT);

  // Initialize theme on mount
  useEffect(() => {
    try {
      // Try to get theme from localStorage
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

      if (storedTheme === THEME_LIGHT || storedTheme === THEME_DARK) {
        // If valid theme found in localStorage, use it
        setTheme(storedTheme);
        document.documentElement.classList.toggle('dark', storedTheme === THEME_DARK);
      } else {
        // If no valid theme in localStorage, use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? THEME_DARK : THEME_LIGHT;
        
        setTheme(systemTheme);
        document.documentElement.classList.toggle('dark', prefersDark);
        console.log('Applied system theme preference:', systemTheme);
        
        // Store system preference in localStorage
        localStorage.setItem(THEME_STORAGE_KEY, systemTheme);
      }
    } catch (error) {
      // Handle any localStorage errors
      console.error('Error accessing localStorage:', error);
      // Fallback to light theme
      setTheme(THEME_LIGHT);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    try {
      const nextTheme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      console.log('Toggling theme to:', nextTheme);
      
      // Update state
      setTheme(nextTheme);
      
      // Update localStorage
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      
      // Update DOM
      document.documentElement.classList.toggle('dark', nextTheme === THEME_DARK);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className='dark:text-white'
    >
      {theme === THEME_LIGHT ? <Moon /> : <Sun />}
    </Button>
  );
}