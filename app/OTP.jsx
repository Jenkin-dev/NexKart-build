import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import Logohead from "../components/logohead";
import SafeView from "../components/safe-view";
import Input from "../components/input";
import Button from "../components/button";
import { router, useLocalSearchParams } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  linkWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase";

const OTP = () => {
  const { width } = Dimensions.get("screen");
  const [filled, setFilled] = useState(false);
  const [otInput, setOtInput] = useState("");
  const { verificationId, phoneNumber } = useLocalSearchParams();

  const handleVerifyCode = async (code) => {
    try {
      const phoneCredential = PhoneAuthProvider.credential(
        verificationId,
        code,
      );

      const phoneUserCredential = await signInWithCredential(
        auth,
        phoneCredential,
      );

      const user = phoneUserCredential.user;

      const savedUsername = await AsyncStorage.getItem("User");
      const savedPassword = await SecureStore.getItemAsync("Userpassword");

      // 1️⃣ Check if phone already has account
      const userDocRef = doc(db, "users", user.uid);
      const existingUserDoc = await getDoc(userDocRef);

      if (existingUserDoc.exists()) {
        Alert.alert(
          "Unsuccessful Signup",
          "Account already exists for this phone number.",
        );
        return;
      }

      // 2️⃣ Check if username is taken
      const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", savedUsername.toLowerCase()),
      );

      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        Alert.alert("Username already taken.");
        return;
      }

      // 3️⃣ Link email
      const internalEmail = `${savedUsername.trim().toLowerCase()}@nexkart.com`;

      const emailCredential = EmailAuthProvider.credential(
        internalEmail,
        savedPassword,
      );

      await linkWithCredential(user, emailCredential);

      // 4️⃣ Save profile
      await setDoc(userDocRef, {
        username: savedUsername.toLowerCase(),
        phoneNumber: phoneNumber,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Account created successfully!");
      router.push("/Home");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message);
    } finally {
      setFilled(false);
    }
  };
  return (
    <SafeView style={{ paddingHorizontal: 20 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
        <View style={{ flex: 1 }}>
          <Logohead pageDescription={"Verify your phone number"} />
          <ScrollView style={{ marginHorizontal: width * 0.02, flex: 1 }}>
            <Text
              style={{
                fontFamily: "alexandriaLight",
                lineHeight: 35,
                fontSize: 19,
              }}
            >
              Enter the 6 digit PIN that we sent to:
              <Text style={{ fontFamily: "alexandriaRegular" }}>
                {phoneNumber}
              </Text>
            </Text>

            <OtpInput
              numberOfDigits={6}
              focusColor={"#4C69FF"}
              onTextChange={(text) => {
                console.log("the current input is", text);
              }}
              focusStickBlinkingDuration={1000}
              onFilled={(code) => {
                setOtInput(code);
                setFilled(true);
                handleVerifyCode(code); // Auto-verify when all digits are entered
              }}
              theme={{
                pinCodeContainerStyle: styles.pinbox,
                containerStyle: styles.otpcontainer,
                focusStickStyle: styles.otppointer,
                pinCodeTextStyle: styles.otpin,
                filledPinCodeContainerStyle: styles.filledPinBox,
                focusedPinCodeContainerStyle: styles.focusedPinBox,
              }}
            />
          </ScrollView>
        </View>
        <Button
          text={!filled ? "Verify" : "Verifying"}
          style={{ backgroundColor: filled ? "#3DBECB" : "white" }}
          textColor={filled ? "white" : "grey"}
          disabled={!filled}
        />
      </KeyboardAvoidingView>
    </SafeView>
  );
};

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  pinbox: {
    width: 48,
    height: 48,
  },

  focusedPinBox: {
    borderWidth: 3,
  },
  filledPinBox: {
    backgroundColor: "whitesmoke",
    borderRadius: 0,
    borderColor: "#a3addd",
  },
  otpcontainer: {
    width: 0.6 * width,
    marginVertical: 35,
  },

  otppointer: {
    //   width: 48,
    //   height: 48,
    backgroundColor: "#3DBECB",
    //   display: "none",
  },

  otpin: {
    fontFamily: "alexandriaRegular",
    color: "#4C69FF",
    fontWeight: 600,
  },
});

export default OTP;
