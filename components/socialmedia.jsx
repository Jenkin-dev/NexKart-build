import { View, Image, StyleSheet } from "react-native";

const Socialmedia = ({ style }) => {
  const styles = StyleSheet.create({
    image: {
      height: 20,
      width: 20,
      resizeMode: "contain",
    },
  });
  return (
    <View
      flexDirection={"row"}
      justifyContent={"flex-start"}
      marginTop={30}
      gap={40}
      style={{ ...style }}
    >
      <Image
        style={styles.image}
        source={require("../assets/images/twitter.png")}
      />
      <Image
        style={styles.image}
        source={require("../assets/images/facebook.png")}
      />
      <Image
        style={styles.image}
        source={require("../assets/images/google.png")}
      />
    </View>
  );
};

export default Socialmedia;
