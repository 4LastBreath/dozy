export const useLocalStorage = (key: string) => {

  const setLocalStorageItem = <T>(value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(err)
    }
  }

  const getLocalStorageItem = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : undefined
    } catch (err) {
      console.error(err)
    }
  }

  const removeLocalStorageItem = () => {
    try {
      window.localStorage.removeItem(key)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    setLocalStorageItem,
    getLocalStorageItem,
    removeLocalStorageItem
  }
}