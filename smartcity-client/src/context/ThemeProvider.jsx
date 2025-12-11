import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }) => {
    
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
    console.log('Theme applied:', theme, 'Classes:', root.classList.toString());
  }, [theme]);

  const toggleTheme = () => {
    console.log('toggleTheme called in ThemeProvider');
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      console.log('Changing theme from', prev, 'to', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
