import { View } from "react-native-web";
import SafeView from "../components/safe-view";
import { StyleSheet } from "react-native";

const Sidemenu = () => {
  return (
    <SafeView>
      <View></View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "blue" },
});

export default Sidemenu;
