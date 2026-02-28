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
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
  const { zusUsername } = useUsername();
  // const phone = useSignupStore((s) => s.phone);
  // const [phone, setPhone] = useState();
  // const [storedUser, setStoredUser] = useState("");
  const [username, setUsername] = useState("Loading...");
  const [userphone, setUserphone] = useState("+234...");
  const [useremail, setUseremail] = useState("email.domain.com");

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      setUseremail(user?.email);

      if (user) {
        // 1. Reference the specific document using the User's UID
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // 2. Set the 'username' field from your Firestore data to state
          setUsername(docSnap.data().username);
          setUserphone(docSnap.data().phoneNumber);
        } else {
          setUsername("No username found");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    // <SafeView style={{ paddingHorizontal: 20, marginTop: 20 }}>

    <SafeAreaView style={styles.safeview}>
      <ImageBackground
        source={require("../assets/images/dpimage.png")}
        resizeMode="stretch"
        blurRadius={5}
        imageStyle={{ opacity: 0.5 }}
        style={styles.container1}
      >
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
            <Text style={styles.username}>{username.toUpperCase()}</Text>
            <Text style={styles.phone}>{userphone}</Text>
            <Text style={styles.phone}>{useremail}</Text>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profile}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
  phone: { fontFamily: "alexandriaLight", fontSize: 15, marginVertical: 2 },
  safeview: {
    paddingHorizontal: 20,
    paddingVertica: 20,
    backgroundColor: "#bddcf6",
    flex: 1,
  },
  profileButton: {
    backgroundColor: "blue",
    width: 100,
    borderRadius: 20,
    marginVertical: 5,
  },
  username: { fontSize: 20, fontFamily: "alexandriaRegular" },
});
export default Account;
