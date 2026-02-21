import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logohead from "../components/logohead";
import SafeView from "../components/safe-view";
import Input from "../components/input";
import Button from "../components/button";
import { router, useLocalSearchParams } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { useSignupStore } from "../store/useSignupStore";
import { useState } from "react";

const OTP = () => {
  const { width } = Dimensions.get("screen");
  const [filled, setFilled] = useState(false);
  const [otInput, setOtInput] = useState("");
  //   const { phone } = useLocalSearchParams();
  //   const { userpassword } = useLocalSearchParams();
  //   console.log(userpassword, "is the user's password");
  //   const phoneNumber = Number(phone);

  const phone = useSignupStore((s) => s.phone);

  //   console.log(phoneNumber, typeof phoneNumber);
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
              <Text style={{ fontFamily: "alexandriaRegular" }}>{phone}</Text>
            </Text>

            <OtpInput
              numberOfDigits={6}
              focusColor={"#4C69FF"}
              onTextChange={(text) => {
                console.log("the current input is", text);
              }}
              focusStickBlinkingDuration={1000}
              onFilled={() => {
                console.log("OTP entered");
                setFilled(true);

                router.push("./(tabs)/Login");
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
              Are sure this is your phone number? <Text>{phone}</Text>
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
