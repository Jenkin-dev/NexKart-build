import { useWishlistStore } from "../store/wishliststore";
import HomeItems from "../components/homeitem"; // Reuse your component!
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Wishlist = () => {
  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={{ width: 20, height: 20, resizeMode: "center" }}
                source={require("../assets/images/back.png")}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.pageHead}>Wishlist</Text>
        </View>

        <View style={styles.wish}>
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <HomeItems
                key={item.id}
                id={item.id}
                source={item.source}
                noItems={item.noItems}
                itemPrice={item.itemPrice}
              />
            ))
          ) : (
            <Text
              style={{
                textAlign: "center",
                marginTop: 50,
                alignSelf: "center",
              }}
            >
              Your wishlist is empty!
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 30, fontSize: 25 },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    backgroundColor: "#bddcf6",
  },
  icons: {
    marginBottom: 20,
  },

  wish: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Wishlist;
