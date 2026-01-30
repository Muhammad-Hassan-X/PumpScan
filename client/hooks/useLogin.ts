import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

type LoginPayload = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: (error: any) => {
      console.log(
        "Login failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
