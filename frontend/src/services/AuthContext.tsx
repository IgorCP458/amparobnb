import { createContext, useContext, useEffect, useState } from "react";
import { UserServices } from "./users";

const AuthContext = createContext(null)

export function AuthProvider ({children}) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const data = await UserServices.authCheck();
      setUser(data)
    }) ()
  },[])

  return(
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}