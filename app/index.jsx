import { router } from "expo-router";
import { Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Image
        onPress={() => router.push("/Onboarding1")}
        source={require("../assets/images/Signup_Loginlogo.png")}
      />
      <Text>CLick the image to proceed</Text>
    </SafeAreaView>
  );
}
