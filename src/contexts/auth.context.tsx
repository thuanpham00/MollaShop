import { createContext, useEffect, useState } from "react"
import { ExtendedPurchase } from "src/types/purchase.type"
import { User } from "src/types/user.type"
import {
  getAccessTokenToLs,
  getDarkModeToLs,
  getProfileToLs,
  setDarkModeToLs
} from "src/utils/auth"

interface Props {
  children: React.ReactNode
}

interface TypeInitialState {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isProfile: User | null
  setIsProfile: React.Dispatch<React.SetStateAction<User | null>>
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>,
  reset: () => void
}

const initialState: TypeInitialState = {
  isAuthenticated: Boolean(getAccessTokenToLs()), // lấy access_token từ ls ra và chuyển nó thành boolean
  setIsAuthenticated: () => null,
  isProfile: getProfileToLs(),
  setIsProfile: () => null,
  darkMode: getDarkModeToLs() === "true" ? true : false,
  setDarkMode: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  reset: () => null
}

export const AppContext = createContext<TypeInitialState>(initialState)

// global state - context api - state toàn cục
export const AppProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState<boolean>(initialState.darkMode)
  useEffect(() => {
    setDarkModeToLs(darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    const isDarkMode = getDarkModeToLs() === "true"
    setDarkMode(isDarkMode)
  }, [])

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState.isAuthenticated)
  const [isProfile, setIsProfile] = useState<User | null>(initialState.isProfile)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(initialState.extendedPurchase)

  const reset = () => {
    setIsAuthenticated(false)
    setIsProfile(null)
    setExtendedPurchase([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isProfile,
        setIsProfile,
        darkMode,
        setDarkMode,
        extendedPurchase,
        setExtendedPurchase,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// component này bao trùm cả app thì truyền 4 value này xuống, component cha thay đổi kéo theo component con
