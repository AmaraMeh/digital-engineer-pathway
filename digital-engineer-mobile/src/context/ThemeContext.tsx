import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  inputBackground: string;
  placeholder: string;
}

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const lightTheme: Theme = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#6366f1',
  secondary: '#4f46e5',
  inputBackground: '#f3f4f6',
  placeholder: '#9ca3af',
};

const darkTheme: Theme = {
  background: '#1f2937',
  text: '#ffffff',
  primary: '#818cf8',
  secondary: '#6366f1',
  inputBackground: '#374151',
  placeholder: '#9ca3af',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 