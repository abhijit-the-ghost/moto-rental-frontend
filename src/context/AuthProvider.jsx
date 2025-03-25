import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { AuthContext } from "./AuthContext"; // ✅ Correct import

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user when app loads
  useEffect(() => {
    const fetchUser = async () => {
      const response = await AuthService.getUserProfile();
      if (!response.error) {
        setUser(response);
      }
      setLoading(false);
    };

    if (AuthService.isAuthenticated()) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Handle login
  const login = async (email, password) => {
    const response = await AuthService.login(email, password);
    // if (!response.error) {
    //   setUser(response.user);
    // }
    return response;
  };

  // ✅ Handle logout
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
