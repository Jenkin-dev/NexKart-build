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
} from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";

const OTP = () => {
  const { width } = Dimensions.get("screen");
  const [filled, setFilled] = useState(false);
  const [otInput, setOtInput] = useState("");
  const { verificationId, phoneNumber } = useLocalSearchParams();

  const handleVerifyCode = async (code) => {
    try {
      // 2. Create the credential using the verificationId and the code entered by the user
      const credential = PhoneAuthProvider.credential(verificationId, code);

      // 3. Sign in to Firebase
      await signInWithCredential(auth, credential);

      Alert.alert("Success", "Phone authenticated!");
      router.push("./(tabs)/Login");
    } catch (err) {
      Alert.alert("Error", "Invalid code. Please try again.");
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
              Enter the 4 digit PIN that we sent to:
              <Text style={{ fontFamily: "alexandriaRegular" }}>{}</Text>
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

            <Text>
              Are sure this is your phone number? <Text>{}</Text>
            </Text>
          </ScrollView>
        </View>
        <Button
          text={"Verify"}
          style={{ backgroundColor: filled ? "#3DBECB" : "white" }}
          textColor={filled ? "white" : "grey"}
          disabled={!filled}
          onPress={() => {
            if (filled) {
              router.push("./(tabs)/Login");
            }
          }}
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
