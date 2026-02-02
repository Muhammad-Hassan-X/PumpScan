import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OnboardingState {
  isFirstLaunch: boolean;
  _hasHydrated: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      isFirstLaunch: true,
      _hasHydrated: false,
      completeOnboarding: () => set({ isFirstLaunch: false }),
      resetOnboarding: () => set({ isFirstLaunch: true }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
