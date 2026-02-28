import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import Button from "../../components/button";
import SafeView from "../../components/safe-view";
import TopTab from "../../components/toptab";
import Input from "../../components/input";
import Passwordinput from "../../components/passwordInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const ExistingUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { width, height } = Dimensions.get("screen");

  const handleLogin = async () => {
    if (!email || password.length < 6) {
      Alert.alert(
        "Invalid input",
        "Please enter your email address and a valid password.",
      );
      return;
    }

    setLoading(true);
    try {
      const emailAddress = email.trim().toLowerCase();
      await signInWithEmailAndPassword(auth, emailAddress, password);

      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const fetchedUsername = userDoc.data().username;
          await AsyncStorage.setItem("savedUsername", fetchedUsername);
        }
      }
      await AsyncStorage.setItem("savedEmail", emailAddress);
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Confirm login details/Check internet connection.",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeView>
      <TopTab style={{ position: "relative", top: 0.025 * height }} />
      <ScrollView>
        <View style={{ marginHorizontal: 30 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.text1}>Welcome back,</Text>
              <Text style={styles.text2}>Sign in</Text>
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Input
              inputtype={"Email Address"}
              value={email}
              onChangeText={setEmail}
              style={{ marginBottom: 20 }}
            />

            <Passwordinput
              head={"Password"}
              value={password}
              onChangeText={setPassword}
            />

            <Button
              text={loading ? "Verifying..." : "Login"}
              disabled={loading}
              textColor={"white"}
              style={{
                backgroundColor: loading ? "#A0A0A0" : "#3DBECB",
                marginVertical: 25,
              }}
              onPress={handleLogin}
            />

            <TouchableOpacity onPress={() => router.push("/Signup")}>
              <Text style={styles.forgotPassword}>
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontSize: 20,
    fontFamily: "medium",
    color: "#000000",
  },
  text2: {
    fontSize: 30,
    fontFamily: "medium",
  },
  dp: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  forgotPassword: {
    color: "#4C69FF",
    fontFamily: "regular",
    fontSize: 14,
    textAlign: "center",
  },
});

export default ExistingUser;
