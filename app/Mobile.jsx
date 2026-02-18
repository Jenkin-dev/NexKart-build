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
import { useSignupStore } from "../store/useSignupStore";

const Mobile = () => {
  const [country, setCountry] = useState("Nigeria");
  const [phoneNumber, setPhoneNumber] = useState("+234");
  const setPhone = useSignupStore((s) => s.setPhone);
  // const { userpassword } = useLocalSearchParams();
  // const UserPassword = userpassword;
  // console.log(userpassword, UserPassword);
  console.log(typeof phoneNumber, phoneNumber);
  return (
    <SafeView style={{ paddingHorizontal: 20 }}>
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
          onPress={() => {
            if (!phoneNumber) {
              Alert.alert(
                "Input phone number",
                "Make sure you typed in a valid phone number",
              );
            } else {
              setPhone(phoneNumber);
              router.push({
                pathname: "./OTP",
                params: { number: phoneNumber },
              });
            }
          }}
          style={{ backgroundColor: "white", marginBottom: 2 }}
          text={"Next"}
          textColor={"#4C69FF"}
        />
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default Mobile;
