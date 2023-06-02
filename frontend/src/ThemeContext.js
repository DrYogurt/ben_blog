import React from 'react';
import lightTheme, { darkTheme } from './theme.js';

export const ThemeContext = React.createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [themeState, setThemeState] = React.useState(lightTheme);

  function toggleTheme() {
    setThemeState(prevState =>
      prevState === lightTheme ? darkTheme : lightTheme
    );
  }

  return (
    <ThemeContext.Provider value={{ theme: themeState, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
