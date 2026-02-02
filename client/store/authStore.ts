import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email, pass) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email === "error@test.com") {
        throw new Error("Invalid credentials");
      }

      const mockToken = "mock-jwt-token-" + Date.now();
      const mockUser = { id: 1, email, name: "Mock User" };

      await AsyncStorage.setItem("token", mockToken);
      set({ user: mockUser, token: mockToken, isLoading: false });
    } catch (error) {
      set({ error: "Login failed", isLoading: false });
      throw error;
    }
  },

  signup: async (email, pass, name) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email === "error@test.com") {
        throw new Error("Invalid details");
      }

      const mockToken = "mock-jwt-token-" + Date.now();
      const mockUser = { id: 1, email, name };

      await AsyncStorage.setItem("token", mockToken);
      set({ user: mockUser, token: mockToken, isLoading: false });
    } catch (error) {
      set({ error: "Signup failed", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
