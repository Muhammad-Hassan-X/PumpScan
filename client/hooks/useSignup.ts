import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

export const useSignup = () => {
  const { signup } = useAuthStore();

  return useMutation({
    mutationFn: async ({ name, email, password }: any) => {
      await signup(email, password, name);
    },
  });
};
