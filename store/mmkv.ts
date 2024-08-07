import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { MMKV } from 'react-native-mmkv'

interface AsyncStorage {
    getItem: (key: string) => string | null
    setItem: (key: string, value: string) => void
    removeItem: (key: string) => void
}

const storage = new MMKV()

function getItem<T>(key: string): T | null {
    const value = storage.getString(key)
    return value ? JSON.parse(value) : null
}

function setItem<T>(key: string, value: T): void {
    storage.set(key, JSON.stringify(value))
}

function removeItem(key: string): void {
    storage.delete(key)
}

function clearAll(): void {
    storage.clearAll()
}

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
    atomWithStorage<T>(
        key,
        initialValue,
        createJSONStorage<T>(() => ({
            getItem,
            setItem,
            removeItem,
            clearAll,
        })),
        { getOnInit: true },
    )

export const clientStorage: AsyncStorage = {
    getItem,
    setItem,
    removeItem,
}

export const mmkvClearAllKeys = () => clearAll()
