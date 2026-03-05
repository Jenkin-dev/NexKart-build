import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

// 👈 Standardized your Firebase imports to use your central services file
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Account = () => {
  const [username, setUsername] = useState("Loading...");
  const [userphone, setUserphone] = useState("Loading...");
  const [useremail, setUseremail] = useState("Loading...");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUseremail(user.email);
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUsername(docSnap.data().username || "User");
            setUserphone(docSnap.data().phoneNumber || "No phone number added");
          } else {
            setUsername("User Details Not Found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // 🚀 The Secure Logout Flow
  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out of NexKart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            // This triggers your _layout.jsx listener, clears memory, and navigates home automatically!
            await signOut(auth);
          } catch (error) {
            Alert.alert("Error", "Could not log out. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Banner */}
        <ImageBackground
          source={require("../assets/images/dpimage.png")}
          resizeMode="stretch"
          blurRadius={5}
          imageStyle={{ opacity: 0.5, borderRadius: 20 }}
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
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.username}>{username.toUpperCase()}</Text>
              <Text style={styles.phone}>{userphone}</Text>
              <Text style={styles.phone}>{useremail}</Text>
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.profile}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Account Options Menu */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/order")}
          >
            <AntDesign name="inbox" size={24} color="#4C69FF" />
            <Text style={styles.menuText}>My Orders</Text>
            <AntDesign
              name="right"
              size={20}
              color="grey"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/wishlist")}
          >
            <FontAwesome5 name="clipboard-list" size={24} color="#4C69FF" />
            <Text style={styles.menuText}>My Wishlist</Text>
            <AntDesign
              name="right"
              size={20}
              color="grey"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Activity")}
          >
            <AntDesign name="history" size={24} color="#4C69FF" />
            <Text style={styles.menuText}>Activity Log</Text>
            <AntDesign
              name="right"
              size={20}
              color="grey"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <AntDesign name="setting" size={24} color="#4C69FF" />
            <Text style={styles.menuText}>Settings</Text>
            <AntDesign
              name="right"
              size={20}
              color="grey"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0, marginTop: 20 }]}
            onPress={handleLogout}
          >
            <AntDesign name="logout" size={24} color="#FF4C96" />
            <Text style={[styles.menuText, { color: "#FF4C96" }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  safeview: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#bddcf6",
    flex: 1,
  },
  container1: { paddingVertical: 30, paddingHorizontal: 15, marginBottom: 30 },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  image: { width: 24, height: 24, resizeMode: "center" },
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 20, fontSize: 25 },
  details: { flexDirection: "row", gap: 20 },
  dp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    borderWidth: 3,
    borderColor: "white",
  },
  username: { fontSize: 20, fontFamily: "alexandriaBold", color: "#333" },
  phone: {
    fontFamily: "alexandriaMedium",
    fontSize: 13,
    marginVertical: 2,
    color: "#555",
  },
  profileButton: {
    backgroundColor: "#4C69FF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  profile: {
    color: "white",
    fontFamily: "alexandriaMedium",
    fontSize: 14,
    textAlign: "center",
  },

  // Menu Styles
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuText: {
    fontFamily: "alexandriaMedium",
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
});

export default Account;
