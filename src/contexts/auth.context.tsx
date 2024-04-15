import { createContext, useState } from "react"
import { User } from "src/types/user.type"
import { getAccessTokenToLs, getProfileToLs } from "src/utils/auth"

interface Props {
  children: React.ReactNode
}

interface TypeInitialState {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isProfile: User | null
  setIsProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialState: TypeInitialState = {
  isAuthenticated: Boolean(getAccessTokenToLs()), // lấy access_token từ ls ra và chuyển nó thành boolean
  setIsAuthenticated: () => null,
  isProfile: getProfileToLs(),
  setIsProfile: () => null
}

export const AppContext = createContext<TypeInitialState>(initialState)

export const AppProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState.isAuthenticated)
  const [isProfile, setIsProfile] = useState<User | null>(initialState.isProfile)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, isProfile, setIsProfile }}>
      {children}
    </AppContext.Provider>
  )
}

// component này bao trùm cả app thì truyền 4 value này xuống, component cha thay đổi kéo theo component con