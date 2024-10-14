import { useState } from "react";
import { api } from "../api/intances";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const navigation = useNavigate();
  const { setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/auth/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Login successful");
        navigation("/");
      }

      const { token, message } = response.data;

      setToken(token);
      setSuccess(true);
      console.log("Login successful:", message);
    } catch (error) {
      setError("Invalid email or password");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};
