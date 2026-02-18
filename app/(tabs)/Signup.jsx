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
import { useSignupStore } from "../../store/useSignupStore";

const Signup = () => {
  const setUser = useSignupStore((s) => s.setUser);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [username, setUsername] = useState("");
  const { width } = Dimensions.get("screen");
  const { height } = Dimensions.get("screen");
  const passwordLength = password.length;

  // console.log(useSignupStore);
  // console.log(password.length);
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
          style={{ backgroundColor: "#3DBECB" }}
          text="Sign Up"
          textColor={"white"}
          fontfamily="alexandriaSemibold"
          onPress={() => {
            if (password === cpassword && password !== "") {
              setUser(username, password);
              router.push("../Mobile");
              console.log("The username is:", username);
              console.log("The password inputed is:", password);
              console.log("The confirmation password is:", cpassword);
            } else if (password === "") {
              Alert.alert("Invalid request", "Please input password");
            } else if (passwordLength < 6) {
              Alert.alert(
                "Invalid Password",
                "A minimum of 6 characters required",
              );
            } else {
              Alert.alert(
                "Unable to proceed",
                "make sure you properly confirm password",
              );
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
