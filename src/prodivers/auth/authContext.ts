import { createContext, useContext } from "react";
import { User } from "@/types";

type authContextValue = {
  user: User,
  authLoading: boolean,
  logout: () => void,
  fetchUserData: () => void,
  isGuest: boolean
}


export const AuthContext = createContext<authContextValue | null>(null)

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth must be used within <AuthContext.Provider>')
  }

  return authContext
}