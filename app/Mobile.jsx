import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import SafeView from "../components/safe-view";
import Logohead from "../components/logohead";
import Input from "../components/input";
import { useState } from "react";
import Button from "../components/button";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { auth, db } from "../services/firebase";
import { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc } from "firebase/firestore";

const Mobile = () => {
  const [country, setCountry] = useState("Nigeria");
  const [phoneNumber, setPhoneNumber] = useState("+234");
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert("Invalid Input, ", "Please enter a valid phone number");
      return;
    }
    try {
      setLoading(true);
      //Retrieving the credentials from signup page (Email, Username and password)
      const savedUsername = await AsyncStorage.getItem("User");

      const savedPassword = await SecureStore.getItemAsync("Userpassword");

      const emailAddress = await AsyncStorage.getItem("UserEmail");
      console.log(
        `The password that would be used for ${savedUsername} is ${savedPassword} and the email would be ${emailAddress}`,
      );

      //CREATING THE USER ACCOUNT
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailAddress,
        savedPassword,
      );

      //SAVING THE USER PROFILE
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        username: savedUsername,
        phoneNumber: phoneNumber,
        country: country,
        createdAt: new Date().toISOString(),
      });

      Alert.alert(
        "Success",
        `Congratulations ${savedUsername}, you have succesfully created an account`,
      );

      router.replace("/Home");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        Alert.alert(
          "Error",
          `This username/email is already taken. Please try another.`,
        );
        router.replace("/(tabs)/Signup");
      } else {
        Alert.alert("Signup Error", err.message);
        router.replace("/(tabs)/Signup");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeView style={{ paddingHorizontal: 20 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <View style={{ flex: 1 }}>
          <Logohead pageDescription={"Add Mobile number"} />
          <ScrollView>
            <Input
              inputtype={"Country"}
              value={country}
              onChangeText={setCountry}
              style={{ marginBottom: 25 }}
            />

            <Input
              inputtype={"Phone Number"}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType={"phone-pad"}
            />
          </ScrollView>
        </View>
        <Button
          onPress={handleCreateAccount}
          style={{
            backgroundColor: loading ? "white" : "#3dbecb",
            marginBottom: 2,
          }}
          text={loading ? "Creating Account" : "Finish Signup"}
          textColor={loading ? "grey" : "white"}
          fontfamily={"alexandriaSemibold"}
        />
      </KeyboardAvoidingView>
    </SafeView>
  );
};
export default Mobile;
