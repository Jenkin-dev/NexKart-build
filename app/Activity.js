import SafeView from "../components/safe-view";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { router } from "expo-router";

const Activity = () => {
  return (
    <SafeView style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <View>
        <TouchableOpacity onPress={() => router.push("/Sidemenu")}>
          <Image
            style={{ width: 20, height: 20, resizeMode: "center" }}
            source={require("../assets/images/menu.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.pageHead}>Activity</Text>
    </SafeView>
  );
};
const styles = StyleSheet.create({
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 30, fontSize: 25 },
});
export default Activity;
