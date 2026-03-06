import { router } from "expo-router";
import { Image, StyleSheet, ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        // 1. Check local memory to see if they've opened the app before
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");

        setTimeout(async () => {
          if (hasLaunched === null) {
            await AsyncStorage.setItem("hasLaunched", "true");
            router.replace("/Onboarding1");
          } else {
            router.replace("/(tabs)/Login");
          }
        }, 4000);
      } catch (error) {
        console.error("Error checking first launch:", error);
        router.replace("/Onboarding1");
      }
    };

    checkFirstLaunch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/Signup_Loginlogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#4C69FF" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bddcf6",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  spinnerContainer: {
    position: "absolute",
    bottom: 100,
  },
});
