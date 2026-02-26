import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      // Toggle like/unlike
      toggleLike: (product) => {
        const { wishlist } = get();
        const isExist = wishlist.find((item) => item.id === product.id);

        if (isExist) {
          // Remove if already liked
          set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
        } else {
          // Add to wishlist
          set({ wishlist: [...wishlist, product] });
        }
      },

      // Check if a specific item is liked
      isLiked: (id) => get().wishlist.some((item) => item.id === id),
    }),
    {
      name: "wishlist-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
