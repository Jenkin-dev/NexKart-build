import create from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      likedItems: [],

      toggleLike: (item) => {
        const exists = get().likedItems.find((i) => i.id === item.id);
        if (exists) {
          set({
            likedItems: get().likedItems.filter((i) => i.id !== item.id),
          });
        } else {
          set({ likedItems: [...get().likedItems, item] });
        }
      },

      isLiked: (id) => {
        return !!get().likedItems.find((i) => i.id === id);
      },

      clearWishlist: () => set({ likedItems: [] }),
    }),
    {
      name: "wishlist-storage",
    },
  ),
);

export default useWishlistStore;
