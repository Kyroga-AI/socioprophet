import { useDarkMode } from '../ThemeContext';

export const getTheme = (): string => {
  const { theme, componentMounted } = useDarkMode();
  let themeClass: string = '';

  if (componentMounted) {
    if (theme === 'light') {
      themeClass = 'lightTheme';
    } else {
      themeClass = 'darkTheme';
    }
  }

  return themeClass;
};
