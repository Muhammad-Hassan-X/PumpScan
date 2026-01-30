import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;

  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      error: null,

      setToken: (token: string) => {
        set({ token, isAuthenticated: true, error: null });
      },

      logout: () => {
        set({ token: null, isAuthenticated: false, error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: async (name: string) => {
          const json = await AsyncStorage.getItem(name);
          return json ? JSON.parse(json) : null;
        },
        setItem: async (name: string, value: any) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: AsyncStorage.removeItem,
      },
    }
  )
);
