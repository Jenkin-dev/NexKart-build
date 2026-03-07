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
import Socialmedia from "../../components/socialmedia";
import TopTab from "../../components/toptab";

import Passwordinput from "../../components/passwordInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useUsername } from "../../store/useUsername";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../services/firebase";
// import { SecurityLevel } from "expo-local-authentication";
import * as LocalAuthentication from "expo-local-authentication";

const Login = () => {
  const { zusUsername, setZusUsername } = useUsername();
  const [password, setPassword] = useState("");
  const { width } = Dimensions.get("screen");
  const { height } = Dimensions.get("screen");
  const [loading, setLoading] = useState(false);
  const [sendingmail, setSendingMail] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [storedUser, setStoredUser] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  useEffect(() => {
    const initializeData = async () => {
      try {
        const userName = await AsyncStorage.getItem("savedUsername");
        if (userName) {
          setZusUsername(userName);
        } else {
          setZusUsername("Undefined User");
        }

        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        const types =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        console.log("--- BIOMETRIC DEBUG ---");
        console.log("Has Hardware:", compatible);
        console.log("Is Enrolled:", enrolled);
        console.log("Supported Types (1=Fingerprint, 2=Face, 3=Iris):", types);

        setIsBiometricSupported(true);
      } catch (e) {
        console.error("An error occured", e);
      }
    };

    initializeData();
  }, []);

  const handleForgotPassword = async () => {
    try {
      setSendingMail(true);
      const emailAddress = await AsyncStorage.getItem("savedEmail");

      if (!emailAddress) {
        Alert.alert("Error", "No email found. Please sign in manually first.");
        return;
      }

      await sendPasswordResetEmail(auth, emailAddress);

      Alert.alert(
        "Success",
        `A password reset link has been sent to ${emailAddress} provided it an account exists for this email`,
      );
    } catch (error) {
      console.error("Reset Error:", error);
      Alert.alert("Reset Failed", "Could not reset password. Please try again");
    } finally {
      setSendingMail(false);
    }
  };

  const handleLogin = async () => {
    if (password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Please ensure the password is at least 6 characters.",
      );
      return;
    }

    setLoading(true);
    try {
      const emailAddress = await AsyncStorage.getItem("savedEmail");

      if (!emailAddress) {
        Alert.alert(
          "Error",
          "No account found. Please use the 'existing user' link to sign in.",
        );
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, emailAddress, password);

      // router.replace("/Home");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.code === "auth/user-not-found") {
        Alert.alert(
          "Login Failed",
          "Incorrect email or password. Please try again.",
        );
      } else if (error.code === "auth/too-many-requests") {
        Alert.alert(
          "Too Many Attempts",
          "Your account has been temporarily locked due to many failed login attempts. Please reset your password or try again later.",
        );
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Incorrect Details", "Input valid login credentials");
      } else {
        Alert.alert(
          "Login Failed",
          "Please check your internet connection and try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login to NexKart",
        disableDeviceFallback: false,
        cancelLabel: "Cancel",
      });

      if (biometricAuth.success) {
        setLoading(true);

        const emailAddress = await AsyncStorage.getItem("savedEmail");
        const savedPassword = await SecureStore.getItemAsync("Userpassword");

        if (!emailAddress || !savedPassword) {
          Alert.alert(
            "Error",
            "No saved credentials found. Please log in manually with your password first.",
          );
          setLoading(false);
          return;
        }

        await signInWithEmailAndPassword(auth, emailAddress, savedPassword);
        // router.replace("/Home");
      }
    } catch (error) {
      console.error("Biometric Error:", error);
      Alert.alert(
        "Authentication Failed",
        "Could not verify Biometrics. Please use your password",
      );
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
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={styles.text1}>Hello again,</Text>
              <Text style={styles.text2}>{zusUsername}</Text>

              <TouchableOpacity onPress={() => router.push("/existinguser")}>
                <Text style={styles.text3}>This isn’t you? Sign in</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Image
                style={styles.dp}
                source={require("../../assets/images/dp_image.png")}
              />
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Passwordinput
              head={"Password"}
              value={password}
              onChangeText={setPassword}
            />

            {password.length > 0 && password.length < 6 ? (
              <Text style={{ color: "red", fontSize: 15 }}>
                A minimum of 6 characters is needed
              </Text>
            ) : undefined}
            <Button
              text={loading ? "Logging in..." : "Login"}
              disabled={loading}
              textColor={"white"}
              style={{
                backgroundColor: loading ? "#A0A0A0" : "#3DBECB",
                marginTop: 15,
              }}
              onPress={handleLogin}
            />
            {isBiometricSupported && (
              <Button
                icon={
                  <Image
                    style={styles.icon}
                    source={require("../../assets/images/faceid.png")}
                  />
                }
                text={loading ? "Verifying..." : "Login with Biometrics"}
                textColor={"#4C69FF"}
                disabled={loading}
                style={{
                  backgroundColor: "#E8EEFF",
                  marginVertical: 15,
                }}
                onPress={handleBiometricAuth}
              />
            )}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text
                style={[
                  styles.forgotPassword,
                  { color: sendingmail ? "grey" : "#4C69FF" },
                ]}
              >
                {sendingmail
                  ? "Sending password reset email"
                  : "Forgot Password?"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.line} />
          <Button
            icon={
              <Image
                style={styles.icon}
                source={require("../../assets/images/google.png")}
              />
            }
            textColor="#4C69FF"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#4C69FF",
              borderWidth: 2,
              marginBottom: 20,
            }}
            text="Continue with Google"
          />
        </View>
      </ScrollView>
      <Socialmedia
        style={{
          position: "relative",
          bottom: 0.02 * height,
          left: 0.05 * width,
        }}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    fontFamily: "regular",
    fontSize: 13,
  },

  line: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 40,
  },

  text1: {
    fontSize: 20,
    fontFamily: "medium",
    color: "#000000",
  },

  text2: {
    fontSize: 30,
    fontFamily: "medium",
  },

  text3: {
    fontSize: 15,
    paddingTop: 20,
    fontFamily: "semibold",
    color: "#4C69FF",
  },

  dp: {
    height: 80,
    width: 80,
  },

  icon: {
    height: 24,
    width: 24,
    position: "relative",
    left: -30,
    top: 2,
    marginBottom: 5,
    alignSelf: "center",
  },
});
export default Login;
