import {
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const Sidemenu = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/Rectangle_10.png")}
    >
      <SafeAreaView style={styles.safeview}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={styles.cancelImage}
            source={require("../assets/images/cancel.png")}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => router.push("/Home")}>
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Account")}>
            <Text style={styles.text}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Activity")}>
            <Text style={styles.text}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("./order")}>
            <Text style={styles.text}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("./wishlist")}>
            <Text style={styles.text}>My Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => signOut(auth)}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeview: { marginHorizontal: 30 },
  cancelImage: { width: 30, resizeMode: "contain" },
  text: {
    color: "white",
    fontFamily: "alexandriaLight",
    fontSize: 30,
    marginVertical: 20,
  },
});

export default Sidemenu;
