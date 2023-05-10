import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAsyncStorage = (key: string, defaultValue?: string) => {
  const [value, setValue] = useState<undefined | null | string>()

  const updateValue = (newValue: string) => {
    AsyncStorage.setItem(key, newValue)
    setValue(newValue)
  }

  const clearValue = () => {
    AsyncStorage.removeItem(key)
    setValue(null)
  }

  useEffect(() => {
    const getStorageValue = async () => {
      const storageValue = await AsyncStorage.getItem(key)

      setValue(
        storageValue === null && defaultValue ? defaultValue : storageValue
      )
    }

    getStorageValue()
  }, [defaultValue, key])

  return { value, setValue: updateValue, removeValue: clearValue }
}
