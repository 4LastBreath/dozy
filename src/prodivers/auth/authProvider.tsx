import { PropsWithChildren, useEffect, useState } from "react"
import { AuthContext } from "./authContext";
import { useToast } from "../toasts/toastContext";
import axios from "axios";
import api from "@/api";
import { User } from "@/types";
import { API_ROUTES } from '@/utils/api';


export const AuthProdiver = ({children}: PropsWithChildren) => {

  const defaultUser: User = {
    _id: '',
    email: '',
    username: '',
    active: undefined,
    avatar: '',
    role: '',
    lists: [],
  };

  const [user, setUser] = useState<User>(defaultUser);
  const [authLoading, setAuthLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false)

  const toast = useToast()

  const fetchUserData = async () => {
    try {
      setIsGuest(false)
      const { data } = await api.get('/users/me');
      setUser(data.user); 
    } catch (err) {
      setIsGuest(true)
      setUser(defaultUser);
      console.error(err)
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get(API_ROUTES.logout, {
        withCredentials: true
      })

      if (res.data.status === 'success') {
        setUser(defaultUser)
        setIsGuest(true)
        toast.success('You\'re logged out!')
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{user, authLoading, logout, fetchUserData, isGuest}}>
      {children}
    </AuthContext.Provider>
  )
}