import { useFonts } from "expo-font";
import { Stack } from "expo-router";

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

  console.log("loaded?", loaded, " is error ", error);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Onboarding1" />
      <Stack.Screen name="Onboarding2" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="Mobile" />
      <Stack.Screen name="Terms" />
      <Stack.Screen name="Sidemenu" />
      {/* <Stack.Screen name="Signup" />
      <Stack.Screen name="Login" /> */}
    </Stack>
  );
};

export default RootLayout;
