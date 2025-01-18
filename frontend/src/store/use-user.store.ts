import { create } from "zustand";

export const useUserStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
