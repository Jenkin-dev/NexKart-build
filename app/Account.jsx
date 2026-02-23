import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeView from "../components/safe-view";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useSignupStore } from "../store/useSignupStore";
import { useState } from "react";
import { useUsername } from "../store/useUsername";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const Account = () => {
  const { zusUsername } = useUsername();
  // const phone = useSignupStore((s) => s.phone);
  const [phone, setPhone] = useState();
  const [storedUser, setStoredUser] = useState("");

  useEffect(() => {
    const getPhone = async () => {
      try {
        const phone = await SecureStore.getItemAsync("PhoneNumber");
        if (phone) {
          setPhone(phone);
          console.log("the phone number is:", phone);
        }
      } catch (e) {
        console.log("An error occcured", e);
      }
    };

    getPhone();
  }, []);
  return (
    // <SafeView style={{ paddingHorizontal: 20, marginTop: 20 }}>
    <ImageBackground
      source={require("../assets/images/dpimage.png")}
      resizeMode="stretch"
      blurRadius={5}
      imageStyle={{ opacity: 0.5 }}
      style={styles.container1}
    >
      <SafeAreaView style={styles.safeview}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              style={styles.image}
              source={require("../assets/images/menu.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require("../assets/images/settings.png")}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.pageHead}>Account</Text>
        <View style={styles.details}>
          <View>
            <Image
              style={styles.dp}
              source={require("../assets/images/dpimage.png")}
            />
          </View>
          <View>
            <Text style={styles.username}>{zusUsername}</Text>
            <Text style={styles.phone}>{phone}</Text>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profile}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const { width } = Dimensions.get("screen");
console.log(width);
const styles = StyleSheet.create({
  image: { width: 24, height: 24, resizeMode: "center" },
  dp: { width: 120, height: 170, resizeMode: "cover" },
  container1: { paddingVertical: 30 },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profile: {
    color: "white",
    fontFamily: "alexandriaLight",
    fontSize: 17,
    textAlign: "center",
  },
  details: { flexDirection: "row", gap: 20 },
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 30, fontSize: 25 },
  phone: { fontFamily: "alexandriaLight", fontSize: 15, marginBottom: 20 },
  safeview: { paddingHorizontal: 20, marginTop: 20 },
  profileButton: { backgroundColor: "blue", width: 100, borderRadius: 20 },
  username: { fontSize: 20, fontFamily: "alexandriaRegular" },
});
export default Account;
