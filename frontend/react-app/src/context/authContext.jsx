import { createContext, useCallback, useEffect, useState } from 'react'
import { decodeToken, getToken, validateToken } from '@/utils/auth.js'


export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  userName: '',
  login: () => {},
  logout: () => {},
})

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    setIsLoading(true)

    function initialAuth() {
      const tokenLocalStorage = getToken()

      if (tokenLocalStorage) {
        const decodedToken = decodeToken(tokenLocalStorage)
        const isExpired = validateToken(decodedToken.exp)

        if (!isExpired) {
          setUsername(decodedToken.username)
          setToken(tokenLocalStorage)
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('token')
        }
      }
    }

    initialAuth()
    setIsLoading(false)
  }, [])

  const handleLogin = useCallback((token) => {
      setIsLoading(true)

      const decodedToken = decodeToken(token)
      const isExpired = validateToken(decodedToken.exp)

      if (!isExpired) {
        setUsername(decodedToken.username)
        localStorage.setItem('token', token)
        setToken(token)
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }, [token]
  )

  const handleLogout = useCallback(() => {
    setIsLoading(true)
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
    setUsername('')
    setIsLoading(false)
  }, [])

  const values = {
    token: token,
    login: handleLogin,
    logout: handleLogout,
    username: username,
    isAuthenticated: isAuthenticated,
    isLoading: isLoading,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}