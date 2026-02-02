import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async ({ email, password }: any) => {
      await login(email, password);
    },
  });
};
