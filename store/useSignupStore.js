import { create } from "zustand";

export const useSignupStore = create((set) => ({
  username: "",
  password: "",
  phone: "",

  setUser: (username, password) => set({ username, password }),

  setPhone: (phone) => set({ phone }),
}));
