import { create } from "zustand";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const useCartStore = create((set, get) => ({
  cart: [],

  // Load cart from Firebase when the app starts
  loadCart: async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists() && docSnap.data().cart) {
        set({ cart: docSnap.data().cart });
      } else {
        set({ cart: [] }); // Reset if no cart exists
      }
    }
  },

  // Add a new item or increase quantity if it's already in the cart
  addToCart: async (product) => {
    const user = auth.currentUser;
    if (!user) return;

    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      // Item exists, increase quantity
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item,
      );
    } else {
      // New item, set initial quantity to 1
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    set({ cart: updatedCart });

    // Save the updated array to Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { cart: updatedCart }, { merge: true });
  },

  // Increase or decrease quantity
  updateQuantity: async (productId, amount) => {
    const user = auth.currentUser;
    if (!user) return;

    const { cart } = get();

    let updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          return { ...item, qty: item.qty + amount };
        }
        return item;
      })
      .filter((item) => item.qty > 0); // Automatically remove item if qty drops to 0

    set({ cart: updatedCart });

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { cart: updatedCart }, { merge: true });
  },

  clearCart: async () => {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "users", user.uid), { cart: [] }, { merge: true });
    }
    set({ cart: [] });
  },
}));
