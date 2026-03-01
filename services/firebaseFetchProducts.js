import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return products;
};
