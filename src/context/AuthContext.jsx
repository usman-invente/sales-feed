import { createContext, useContext, useState, useEffect } from "react";
import { refreshSession } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        console.log('fdf');
        // Backend verifies HTTP-only cookie and returns user profile
        const data = await refreshSession();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
       // setLoading(false);
      }
    };

    verifyUserSession();
  }, []);

  const loginUser = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
