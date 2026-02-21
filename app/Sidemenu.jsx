import {
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import SafeView from "../components/safe-view";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { router } from "expo-router";

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
          <TouchableOpacity onPress={() => router.push("/Account")}>
            <Text style={styles.text}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.text}>Support</Text>
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
