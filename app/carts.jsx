import { router } from "expo-router";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import WishedItems from "../components/wisheditems";
import { ScrollView } from "react-native";
import { useState } from "react";
import Button from "../components/button";
import AddedToCarts from "../components/addedToCarts";
import { ImageMap } from "../utils/imageMap";
import { useCartStore } from "../store/useCartStore";

const Carts = () => {
  const cartItems = useCartStore((state) => state.cart);

  const isEmpty = cartItems.length === 0;

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 1,
        backgroundColor: "#bddcf6",
      }}
    >
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={{ width: 20, height: 20, resizeMode: "center" }}
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.pageHead}>My Cart</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          /* Dynamic Cart Items List */
          <View style={styles.cart}>
            {cartItems.map((item) => (
              <AddedToCarts
                key={item.id}
                id={item.id}
                // Translate the cloud string back into a local asset
                source={ImageMap[item.imageKey]}
                productname={item.name}
                productprice={item.itemPrice || item.price}
                qty={item.qty}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 30, fontSize: 25 },
  cart: { flexDirection: "row", flexWrap: "wrap" },
  icons: {
    marginBottom: 20,
  },
  image: {
    width: "90%",
    height: 210,
    // backgroundColor: "red",
    alignSelf: "center",
  },

  emptyText: {
    fontFamily: "alexandriaRegular",
    fontSize: 19,
    textAlign: "center",
  },
});
export default Carts;
