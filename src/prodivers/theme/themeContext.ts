import { createContext, useContext } from "react";
import { ThemeType } from './themeProdiver'

type ThemeContextValue = {
  theme: ThemeType,
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export const useTheme = () => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    throw new Error('useTheme must be used within <ThemeContext.Provider>')
  }

  return themeContext
}