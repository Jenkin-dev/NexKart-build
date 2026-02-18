import { Text, Image, View, Pressable, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import SafeView from "../components/safe-view";
import { router } from "expo-router";

const Onboarding = ({
  text1,
  text2,
  text3,
  nextPage,
  picture,
  style,
  color,
}) => {
  return (
    <SafeView>
      <View>
        <Image style={styles.image1} source={picture} />
      </View>
      <View>
        <Text style={styles.text1}>
          {text1 ? text1 : "Wishing for an item but it is too expensive"}
        </Text>
        <Text style={[styles.text1, styles.text2]}>
          {text2
            ? text2
            : "You will be notified of promotions for products in your wishlist"}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, style]}
        onPress={() => router.push(nextPage)}
      >
        <Text style={[styles.text3, color]}>{text3 ? text3 : "Next"}</Text>
      </TouchableOpacity>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  image1: {
    height: 245,
    width: "95%",
    alignSelf: "center",
    marginTop: 150,
    resizeMode: "contain",
  },

  text1: {
    fontFamily: "alexandriaRegular",
    fontSize: 22,
    textAlign: "center",
    marginTop: 45,
    width: "80%",
    alignSelf: "center",
  },

  text2: {
    fontFamily: "light",
    width: "90%",
    marginTop: 30,
  },

  text3: {
    color: "#4C69FF",
    fontFamily: "light",
    fontSize: 20,
  },

  nextButton: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#4C69FF",
    position: "absolute",
    bottom: 70,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
});
export default Onboarding;
