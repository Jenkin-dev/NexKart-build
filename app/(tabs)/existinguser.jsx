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
import Input from "../../components/input"; // Re-using your input component
import Passwordinput from "../../components/passwordInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

const ExistingUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { width, height } = Dimensions.get("screen");

  const handleLogin = async () => {
    if (!username || password.length < 6) {
      Alert.alert(
        "Invalid input",
        "Please enter your username and a valid password.",
      );
      return;
    }

    setLoading(true);
    try {
      const internalEmail = `${username.trim().toLowerCase()}@nexkart.com`;
      await signInWithEmailAndPassword(auth, internalEmail, password);

      // Update AsyncStorage so next time the "Login" screen greets this new user
      await AsyncStorage.setItem("User", username);
    } catch (error) {
      Alert.alert("Login Failed", "No account found with these details.");
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
              inputtype={"Username"}
              value={username}
              onChangeText={setUsername}
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
