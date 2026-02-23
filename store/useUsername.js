import { create } from "zustand";

export const useUsername = create((set) => ({
  zusUsername: "",

  setZusUsername: (username) =>
    set(() => ({
      zusUsername: username,
    })),
}));
