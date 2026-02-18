import { useFonts } from "expo-font";
import { Stack } from "expo-router";

const RootLayout = () => {
  const [loaded, error] = useFonts({
    regular: require("../assets/fonts/Montserrat-Roboto/Roboto/static/Roboto-Regular.ttf"),
    medium: require("../assets/fonts/Montserrat-Roboto/Roboto/static/Roboto-Medium.ttf"),
    semibold: require("../assets/fonts/Montserrat-Roboto/Roboto/static/Roboto-SemiBold.ttf"),
    bold: require("../assets/fonts/Montserrat-Roboto/Roboto/static/Roboto-Bold.ttf"),
    italic: require("../assets/fonts/Montserrat-Roboto/Roboto/static/Roboto-Italic.ttf"),
    light: require("../assets/fonts/Montserrat-Roboto/Roboto/static/Roboto-Light.ttf"),

    alexandriaRegular: require("../assets/fonts/Alexandria-Montserrat-Roboto/Alexandria/static/Alexandria-Regular.ttf"),

    alexandriaSemibold: require("../assets/fonts/Alexandria-Montserrat-Roboto/Alexandria/static/Alexandria-SemiBold.ttf"),

    alexandriaBold: require("../assets/fonts/Alexandria-Montserrat-Roboto/Alexandria/static/Alexandria-Bold.ttf"),

    alexandriaLight: require("../assets/fonts/Alexandria-Montserrat-Roboto/Alexandria/static/Alexandria-Light.ttf"),

    alexandriaMedium: require("../assets/fonts/Alexandria-Montserrat-Roboto/Alexandria/static/Alexandria-Medium.ttf"),
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
      {/* <Stack.Screen name="Signup" />
      <Stack.Screen name="Login" /> */}
    </Stack>
  );
};

export default RootLayout;
