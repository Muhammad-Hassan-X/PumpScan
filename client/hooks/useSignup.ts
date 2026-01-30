import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: async (data: SignupPayload) => {
      const res = await api.post("/auth/signup", data);
      return res.data; 
    },
    onSuccess: (data) => {
      setToken(data.token); 
    },
    onError: (error: any) => {
      console.log("Signup failed:", error.response?.data?.message || error.message);
    },
  });
};
