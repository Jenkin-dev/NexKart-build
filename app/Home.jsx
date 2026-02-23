import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeView from "../components/safe-view";
import { useState } from "react";
import { router } from "expo-router";
import SpecialDeals from "../components/specialdeals";

const Home = () => {
  const [incoming, setIncoming] = useState(false);

  return (
    <SafeView style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => router.push("/Sidemenu")}>
          <Image
            style={{ width: 20, height: 20, resizeMode: "center" }}
            source={
              incoming
                ? require("../assets/images/menu-incoming.png")
                : require("../assets/images/menu.png")
            }
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={{ fontFamily: "alexandriaRegular", fontSize: 20 }}>
            My Cart
          </Text>
          <View style={styles.numberText}>
            <Text style={styles.subtext}>8</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <View>
          <SpecialDeals />
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  numberText: {
    backgroundColor: "#FF4C96",
    borderRadius: 20,
    width: 24,
    height: 24,

    // flexDirection: "row",
    justifyContent: "center",
  },
  subtext: {
    fontFamily: "alexandriaRegular",
    fontSize: 15,
    alignSelf: "center",
    color: "white",
    // textAlign: "center",
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardsContainer: {},
});
export default Home;
