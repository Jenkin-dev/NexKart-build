// store/wishliststore.js
import { create } from "zustand";
import { auth, db } from "../services/firebase";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const useWishlistStore = create((set, get) => ({
  wishlist: [],

  // Load wishlist from Firestore
  loadWishlist: async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(
      collection(db, "users", user.uid, "wishlist"),
    );
    const items = snapshot.docs.map((doc) => doc.data());

    set({ wishlist: items });
  },

  // Toggle like/unlike in Firestore
  toggleLike: async (product) => {
    const user = auth.currentUser;
    if (!user) return;

    const exists = get().wishlist.find((item) => item.id === product.id);

    if (exists) {
      // Remove from Firestore
      await deleteDoc(doc(db, "users", user.uid, "wishlist", product.id));
      set({
        wishlist: get().wishlist.filter((item) => item.id !== product.id),
      });
    } else {
      // Add to Firestore
      await setDoc(doc(db, "users", user.uid, "wishlist", product.id), product);
      set({ wishlist: [...get().wishlist, product] });
    }
  },

  // Check if item is liked
  isLiked: (id) => get().wishlist.some((item) => item.id === id),

  // Clear wishlist (e.g., on logout)
  clearWishlist: () => set({ wishlist: [] }),
}));
