import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Wishlist = () => {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 1,
        backgroundColor: "#bddcf6",
      }}
    >
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 30, fontSize: 25 },

  icons: {
    marginBottom: 20,
  },
});

export default Wishlist;
