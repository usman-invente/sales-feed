import { createContext, useContext, useState, useEffect } from "react";
import { refreshSession } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();

    const verifyUserSession = async () => {
      try {
        // refreshSession me signal pass karein
        const data = await refreshSession({ signal: controller.signal });
        setUser(data.user);
      } catch (err) {
        // Abort hone wali request par state change mat hone dein
        if (err.name !== "AbortError" && err.name !== "CanceledError") {
          setUser(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    verifyUserSession();

    // Cleanup function: component unmount hone par request cancel karega
    return () => {
      controller.abort();
    };
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
    <AuthContext.Provider
      value={{ user, token, loginUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
