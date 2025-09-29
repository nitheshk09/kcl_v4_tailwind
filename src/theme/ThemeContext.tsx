import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'nativewind';

type ThemeName = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  currentTheme: ThemeName | undefined;
  isDark: boolean;
  setTheme: (scheme: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  const value = useMemo<ThemeContextValue>(
    () => ({
      currentTheme: colorScheme,
      isDark: colorScheme === 'dark',
      setTheme: setColorScheme,
      toggleTheme: toggleColorScheme,
    }),
    [colorScheme, setColorScheme, toggleColorScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
