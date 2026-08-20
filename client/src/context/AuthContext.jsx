import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api/client";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await API.get("/users/current-user");
      if (res.data && res.data.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await API.post("/users/login", { username, password });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success(res.data.message || "Logged in successfully!");
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await API.post("/users/signup", { username, email, password });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success(res.data.message || "Welcome to Basera!");
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      const res = await API.post("/users/logout");
      setUser(null);
      toast.success(res.data.message || "Logged out successfully!");
    } catch (err) {
      setUser(null);
      toast.success("Logged out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
