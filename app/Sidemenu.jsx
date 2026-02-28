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
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Sidemenu = () => {
  const [username, setUsername] = useState("Undefined");

  useEffect(() => {
    const fetchusername = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        } else {
          setUsername("Null");
        }
      }
    };
    fetchusername();
  }, []);
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
          <Text style={styles.welcomeText}>
            WELCOME {username.toUpperCase()}
          </Text>
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
  welcomeText: {
    color: "whitesmoke",
    fontFamily: "alexandriaBold",
    fontSize: 27,
  },
});

export default Sidemenu;
