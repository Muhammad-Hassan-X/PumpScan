import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@/constants/api";

interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  initialize: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      
      if (token && userJson) {
        set({ 
          token, 
          user: JSON.parse(userJson),
          isLoading: false 
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      if (response.data.success) {
        const { token, username } = response.data.data;
        const user = { email, name: username };

        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        
        set({ user, token, isLoading: false });
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Login failed";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  signup: async (email, password, username) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { 
        email, 
        password, 
        username 
      });

      if (response.data.success) {
        set({ isLoading: false });
      } else {
        throw new Error(response.data.message || "Signup failed");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Signup failed";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      const token = useAuthStore.getState().token;
      await axios.get(`${API_URL}/auth/logout`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ user: null, token: null });
    }
  },
}));


