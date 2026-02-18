import { router } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text onPress={() => router.push("/Onboarding1")}>
        Click here to move to onboarding now
      </Text>
    </SafeAreaView>
  );
}
