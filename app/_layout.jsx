import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { View, ActivityIndicator } from "react-native";

const RootLayout = () => {
  const [loaded, error] = useFonts({
    regular: require("../assets/fonts/Roboto-Regular.ttf"),
    medium: require("../assets/fonts/Roboto-Medium.ttf"),
    semibold: require("../assets/fonts/Roboto-SemiBold.ttf"),
    bold: require("../assets/fonts/Roboto-Bold.ttf"),
    italic: require("../assets/fonts/Roboto-Italic.ttf"),
    light: require("../assets/fonts/Roboto-Light.ttf"),

    alexandriaRegular: require("../assets/fonts/Alexandria-Regular.ttf"),
    alexandriaSemibold: require("../assets/fonts/Alexandria-SemiBold.ttf"),
    alexandriaBold: require("../assets/fonts/Alexandria-Bold.ttf"),
    alexandriaLight: require("../assets/fonts/Alexandria-Light.ttf"),
    alexandriaMedium: require("../assets/fonts/Alexandria-Medium.ttf"),
  });

  if (error) {
    console.log("Error loading fonts", error);
    return null;
  }

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const segments = useSegments();

  // Listen for auth state changes
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  // Handle redirection logic
  useEffect(() => {
    if (initializing) return;

    // 1. Define which screens are "Auth" screens (where users go when NOT logged in)
    const isAuthScreen =
      segments[0] === "Login" ||
      segments[0] === "Signup" ||
      segments[0] === "ExistingUser" ||
      segments[0] === "Mobile" ||
      segments[0] === "(tabs)"; // Assuming Login/Signup are inside (tabs)

    if (!user && !isAuthScreen && segments[0] !== "OTP") {
      // If no user and trying to go to Home/Profile, force Login
      router.replace("/(tabs)/Login");
    } else if (user && isAuthScreen) {
      // If user IS logged in and trying to access Login/Signup, force Home
      router.replace("/Home");
    }
  }, [user, segments, initializing]);
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4C69FF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Mobile" />
      <Stack.Screen name="OTP" />
      <Stack.Screen name="Home" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default RootLayout;
