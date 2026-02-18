import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
          backgroundColor: "red",
          height: 20,
        },
      }}
    >
      <Tabs.Screen name="Login" options={{ title: "Login" }} />
      <Tabs.Screen name="Signup" options={{ title: "Signup" }} />
    </Tabs>
  );
};

export default TabsLayout;
