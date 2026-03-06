import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { View, ActivityIndicator, Image } from "react-native";

import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/wishliststore";

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

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        await useCartStore.getState().loadCart();
        if (useWishlistStore.getState().loadWishlist) {
          await useWishlistStore.getState().loadWishlist();
        }
      } else {
        // Clear user details upon logging out
        useCartStore.getState().clearCart();
        if (useWishlistStore.getState().clearWishlist) {
          useWishlistStore.getState().clearWishlist();
        }
      }

      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);

  useEffect(() => {
    if (initializing) return;

    const isAuthScreen =
      segments[0] === "Login" ||
      segments[0] === "Signup" ||
      segments[0] === "ExistingUser" ||
      segments[0] === "Mobile" ||
      segments[0] === "(tabs)";

    if (!user && !isAuthScreen) {
      router.replace("/(tabs)/Login");
    } else if (user && isAuthScreen) {
      router.replace("/Home");
    }
  }, [user, segments, initializing]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={"/assets/images/Signup_Loginlogo.png"} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Mobile" />
      <Stack.Screen name="Home" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default RootLayout;
