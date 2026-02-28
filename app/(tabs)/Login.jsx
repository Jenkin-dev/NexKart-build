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
// import { useSignupStore } from "../../store/useSignupStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useUsername } from "../../store/useUsername";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

const Login = () => {
  const { zusUsername, setZusUsername } = useUsername();
  const [password, setPassword] = useState("");
  const { width } = Dimensions.get("screen");
  const { height } = Dimensions.get("screen");
  const [loading, setLoading] = useState(false);

  const [storedUser, setStoredUser] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  const styles = StyleSheet.create({
    forgotPassword: {
      color: "#4C69FF",
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
      left: -50,
      top: 2,
      marginBottom: 5,
      alignSelf: "center",
    },
  });

  useEffect(() => {
    const getUserName = async () => {
      try {
        const userName = await AsyncStorage.getItem("savedUsername");
        if (userName) {
          setZusUsername(userName);
          setStoredUser(userName);
        } else {
          setZusUsername("Undefined");
        }
        console.log("Retrieved username", userName);
        console.log("zustand username", storedUser);
      } catch (e) {
        console.log("an error occured", e);
      }
    };

    getUserName();

    const getPassword = async () => {
      try {
        const passWord = await SecureStore.getItemAsync("Userpassword");
        if (passWord) {
          setStoredPassword(passWord);
        }
        console.log("Retrieved password", passWord);
      } catch (e) {
        console.log("an error occured", e);
      }
    };

    getPassword();
  }, []);

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
                marginVertical: 15,
              }}
              onPress={async () => {
                if (password.length >= 6) {
                  setLoading(true);
                  try {
                    // const savedUsername = await AsyncStorage.getItem("User");
                    const emailAddress =
                      await AsyncStorage.getItem("savedEmail");
                    const savedUsername =
                      await AsyncStorage.getItem("savedUsername");
                    console.log(
                      "Attempting login for:",
                      emailAddress,
                      savedUsername,
                    );

                    // This tells Firebase to sign in
                    await signInWithEmailAndPassword(
                      auth,
                      emailAddress,
                      password,
                    );

                    // Note: You don't need router.push here because your _layout.jsx
                    // will automatically detect the 'user' and move you to /Home.
                  } catch (error) {
                    console.error(error);
                    Alert.alert("Login Failed", error.message);
                  } finally {
                    setLoading(false);
                  }
                } else {
                  Alert.alert(
                    "Invalid Password",
                    "Please ensure the password is at least 6 characters",
                  );
                }
              }}
            />
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
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
export default Login;
