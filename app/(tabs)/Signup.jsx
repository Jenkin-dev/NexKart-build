import { SafeAreaView } from "react-native-safe-area-context";
import SafeView from "../../components/safe-view";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import TopTab from "../../components/toptab";
import Input from "../../components/input";
import Passwordinput from "../../components/passwordInput";
import Button from "../../components/button";
import { useState } from "react";
import Socialmedia from "../../components/socialmedia";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useUsername } from "../../store/useUsername";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const { width } = Dimensions.get("screen");
  const { height } = Dimensions.get("screen");
  const passwordLength = password.length;
  const { zusUsername } = useUsername();
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState(zusUsername);

  const storeUser = async (userName) => {
    try {
      await AsyncStorage.setItem("User", userName);
    } catch (e) {
      console.log("An error occured fetching last used Username", e);
    }
  };

  const storePassword = async (passWord) => {
    try {
      console.log("The last used password is", passWord);
      await SecureStore.setItemAsync("Userpassword", passWord);
    } catch (e) {
      console.log("An error occured trying to fetch last used Password", e);
    }
  };

  const styles = StyleSheet.create({
    head: {
      fontSize: 24,
      fontFamily: "alexandriaRegular",
      // marginBottom: 10,
    },

    line: {
      height: 1,
      backgroundColor: "#ccc",
      width: "100%",
      marginVertical: 30,
    },
  });

  return (
    <SafeView>
      <TopTab style={{ position: "relative", top: 0.025 * height }} />
      <KeyboardAvoidingView style={{}} behavior={"height"}>
        <ScrollView>
          <View style={{ marginHorizontal: 30 }}>
            <Text style={styles.head}>Manual Sign Up</Text>
            <Input
              style={{ marginVertical: 15 }}
              inputtype={"Username"}
              value={username}
              onChangeText={setUsername}
            />
            <Passwordinput
              head={"Password"}
              value={password}
              onChangeText={setPassword}
            />

            {passwordLength >= 6 ? (
              <Passwordinput
                head={"Confirm Password"}
                value={cpassword}
                onChangeText={setCpassword}
              />
            ) : undefined}

            <View style={{ paddingVertical: 10 }}></View>

            <View style={styles.line} />
          </View>
        </ScrollView>

        <Button
          style={{ backgroundColor: loading ? "grey" : "#3DBECB" }}
          text={loading ? "Signing up" : "Sign Up"}
          textColor={"white"}
          fontfamily="alexandriaSemibold"
          onPress={async () => {
            if (password === "") {
              Alert.alert("Invalid request", "Please input password");
              return;
            }

            if (passwordLength < 6) {
              Alert.alert(
                "Invalid Password",
                "A minimum of 6 characters required",
              );
              return;
            }

            if (password !== cpassword) {
              Alert.alert(
                "Unable to proceed",
                "Make sure you properly confirm password",
              );
              return;
            }

            try {
              setLoading(true);

              await storeUser(username);
              await storePassword(password);

              console.log("The username is:", username);

              router.push("../Mobile");
            } catch (error) {
              console.log("Signup error:", error);
              Alert.alert("Error", "Something went wrong");
            } finally {
              setLoading(false); // ✅ ALWAYS resets loading
            }
          }}
        />
      </KeyboardAvoidingView>
      <View style={{ position: "absolute", bottom: 0 }}>
        <Text
          style={[
            styles.head,
            {
              fontSize: 18,
              position: "relative",
              left: 0.05 * width,
              bottom: 0,
            },
          ]}
        >
          Connect with Social Media
        </Text>
        <Socialmedia
          style={{
            position: "relative",
            bottom: 0.02 * height,
            left: 0.05 * width,
          }}
        />
      </View>
    </SafeView>
  );
};
export default Signup;
