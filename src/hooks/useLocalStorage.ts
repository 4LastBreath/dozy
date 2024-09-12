export const useLocalStorage = (key: string) => {

  const setLocalStorageItem = <T>(value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  const getLocalStorageItem = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : undefined
    } catch (error) {
      console.error(error)
    }
  }

  const removeLocalStorageItem = () => {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    setLocalStorageItem,
    getLocalStorageItem,
    removeLocalStorageItem
  }
}