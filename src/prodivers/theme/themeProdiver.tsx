import { useState, useEffect, PropsWithChildren } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ThemeContext } from "./themeContext"

export type ThemeType = "light" | "dark"

export function ThemeProdiver({children} : PropsWithChildren) {

  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage('theme')

  const savedTheme = getLocalStorageItem() || 'dark'

  const [theme, setTheme] = useState<ThemeType>(savedTheme)

  const toggleTheme = () => {
    const newValue = theme === 'dark' ? 'light' : 'dark'
    setTheme(newValue)
  }

  useEffect(() => {
    setLocalStorageItem(theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme, setLocalStorageItem])


  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}