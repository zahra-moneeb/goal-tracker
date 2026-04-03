import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    try {
      setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error("Error parsing user:", error);
      localStorage.removeItem("user"); // remove invalid data
    }
  }
}, []);

  const login = ( {email, password, username }) => { 
    const userData = {
    email,
    password,
    username,
  };

  localStorage.setItem("user", JSON.stringify(userData));
  setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);