import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddedToCarts from "../components/addedToCarts";
import { ImageMap } from "../utils/imageMap";
import { useCartStore } from "../store/useCartStore";
import Button from "../components/button";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { nanoid } from "nanoid/non-secure";

const Carts = () => {
  const cartItems = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const isEmpty = cartItems.length === 0;
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const priceString = item.itemPrice?.toString() || "0";

        const numericPrice = parseFloat(priceString.replace(/[^0-9.]/g, ""));

        return total + numericPrice * item.qty;
      }, 0)
      .toFixed(2); // 2 decimal places for currency precision
  };

  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert(
        "Error",
        "You must be logged in before you can be permitted to make transactions",
      );
    }

    setIsCheckingOut(true);

    try {
      const orderID = `ORD-NXK${nanoid(6).toUpperCase()}`;

      const formattedItems = cartItems.map((item) => ({
        imageKey: item.imageKey,
        name: item.name,
        price: item.itemPrice,
        color: "Standard",
        qty: `x ${item.qty}`,
      }));

      const orderData = {
        id: orderID,
        status: "Paid",
        total: calculateTotal(),
        items: formattedItems,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", user.uid, "orders", orderID), orderData);

      const activityID = `ACT-${Date.now()}`;
      await setDoc(doc(db, "users", user.uid, "activities", activityID), {
        id: activityID,
        orderID: orderID,
        status: "Paid",
        items: formattedItems,
        createdAt: new Date().toISOString(),
      });

      await clearCart();
      Alert.alert(
        "Payment Successful!",
        `Your order (${orderID}) has been placed`,
      );
    } catch (error) {
      console.error(`Checkout Error: ${error}`);
      Alert.alert(
        "Checkout Failed",
        "Something went wrong while processing your payment",
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={{ width: 20, height: 20, resizeMode: "center" }}
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.pageHead}>My Cart</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {isEmpty ? (
          <View>
            <Image
              source={require("../assets/images/emptyCart.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>Nothing of interest lately?</Text>
            <Text style={[styles.emptyText, { fontSize: 15, marginTop: 10 }]}>
              Browse through the app to check out products and who knows, you
              could get some discounts.
            </Text>
          </View>
        ) : (
          <View style={styles.cart}>
            {cartItems.map((item) => (
              <AddedToCarts
                key={item.id}
                id={item.id}
                source={ImageMap[item.imageKey]}
                productname={item.name}
                productprice={item.itemPrice}
                qty={item.qty}
                noItems={parseInt(item.noItems)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {!isEmpty && (
        <View style={styles.checkoutBar}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>USD {calculateTotal()}</Text>
          </View>
          <Button
            onPress={() => {
              if (isCheckingOut) return;
              Alert.alert(
                `Are you sure you want to checkout?`,
                `Proceeding to checkout with USD ${calculateTotal()}`,
                [
                  {
                    text: "Yes, Proceed",
                    onPress: () => handleCheckout(),
                  },
                  {
                    text: "Confirm Cart",
                  },
                ],
              );
            }}
            text={isCheckingOut ? "Processing..." : "Checkout"}
            bgcolor={isCheckingOut ? "#888" : "#4C69FF"}
            textColor="white"
            fontfamily="alexandriaBold"
            style={styles.checkoutButton}
            disabled={isCheckingOut}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeview: {
    paddingHorizontal: 20,
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#bddcf6",
  },
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 20, fontSize: 25 },
  cart: { flexDirection: "column" },
  icons: { marginBottom: 20 },
  image: { width: "90%", height: 210, alignSelf: "center" },
  emptyText: {
    fontFamily: "alexandriaRegular",
    fontSize: 19,
    textAlign: "center",
  },

  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontFamily: "alexandriaMedium",
    fontSize: 18,
    color: "#888",
  },
  totalPrice: {
    fontFamily: "alexandriaBold",
    fontSize: 24,
    color: "#4C69FF",
  },
  checkoutButton: {
    width: "100%",
    height: 55,
    borderRadius: 30,
  },
});

export default Carts;
