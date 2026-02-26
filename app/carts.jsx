import { router } from "expo-router";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WishedItems from "../components/wisheditems";
import { ScrollView } from "react-native";
import { useState } from "react";
import Button from "../components/button";

const Carts = () => {
  const [empty, setEmpty] = useState(true);

  const Addtocart = () => {
    return (
      <View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    );
  };
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
      <ScrollView>
        <View
          style={{
            display: empty ? undefined : "none",
          }}
        >
          <Image
            source={require("../assets/images/emptyCart.png")}
            style={styles.image}
            //   resizeMode="center"
          />
          <Text style={styles.emptyText}>Nothing on interest lately?</Text>
          <Text style={[styles.emptyText, { fontSize: 15 }]}>
            Browse through the app to check out for products and who knows you
            could get some discounts
          </Text>
        </View>

        <View style={[styles.cart, { display: empty ? "none" : undefined }]}>
          {/* <WishedItems />
          <WishedItems />
          <WishedItems />
          <WishedItems /> */}
        </View>
      </ScrollView>
      <Button
        onPress={() => setEmpty(!empty)}
        textColor={"white"}
        text={!empty ? "Clear Cart" : "Discover more products"}
      />
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
