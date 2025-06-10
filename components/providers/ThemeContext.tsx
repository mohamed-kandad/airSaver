import React, {createContext, useState, useContext, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {COLORS} from '../../constant';
import {color} from '../../constant/colors';

interface ThemeContextType {
  theme: color;
  isDark: boolean;
  toggleTheme: () => void;
  systemColorScheme: any;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: COLORS.light,
  isDark: false,
  toggleTheme: () => {},
  systemColorScheme: 'light',
});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  const theme = isDark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider
      value={{theme, isDark, toggleTheme, systemColorScheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
