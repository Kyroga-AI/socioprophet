// useDarkMode.js
import React, { useEffect, useState, useContext } from 'react';

interface Props {
  children: React.ReactNode;
}

const ThemeContext = React.createContext<any>(null);

export const useDarkMode = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState('dark');
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode('dark');
    }
    setComponentMounted(true);
  }, []);

  //   return [theme, toggleTheme, componentMounted];

  const value = {
    componentMounted,
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
