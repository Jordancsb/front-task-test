import { useState } from "react";
import { api } from "../api/intances";
import { toast } from "react-toastify";


export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const signUp = async (email: string, password: string, confirmPassword: string, role: string) => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/auth/signup", {
        email,
        password,
        role,
      });

      if (response.status === 201) {
        toast.success("Usuário criado com sucesso!");
      }

      setSuccess(true);
      console.log("User created successfully:", response.data);
    } catch (error) {
        console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading, error, success };
};
