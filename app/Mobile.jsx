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
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../services/firebase";
import { useRef } from "react";
import { PhoneAuthProvider } from "firebase/auth";
// import { useSignupStore } from "../store/useSignupStore";

const Mobile = () => {
  const [country, setCountry] = useState("Nigeria");
  const [phoneNumber, setPhoneNumber] = useState("+234");
  const recaptchaVerifier = useRef();
  const handleSendCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current,
      );

      // Store the phone number locally
      await SecureStore.setItemAsync("PhoneNumber", phoneNumber);

      // Navigate to OTP and pass the verificationId
      router.push({
        pathname: "./OTP",
        params: { verificationId, phoneNumber },
      });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeView style={{ paddingHorizontal: 20 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
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
          onPress={handleSendCode} // 4. Link the new function
          style={{ backgroundColor: "white", marginBottom: 2 }}
          text={"Next"}
          textColor={"#4C69FF"}
        />
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default Mobile;
