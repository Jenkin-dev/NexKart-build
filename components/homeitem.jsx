import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Image, View } from "react-native";
import Button from "./button";
import { useState } from "react";

const HomeItems = ({ source, noItems, itemPrice }) => {
  const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity
      style={{
        // backgroundColor: "blue",
        height: 176,
        width: "43%",
        paddingVertical: 10,
        borderRadius: 20,
        margin: 10,
        boxShadow: "0px 0px 20px 5px #a7c9f9",
        // backgroundColor: "#dcf6f5",
      }}
    >
      <Image style={styles.image} source={source} resizeMode="none" />
      <Text style={styles.number}>{noItems}</Text>
      <Button
        onPress={() => setLiked(!liked)}
        textColor={liked ? "white" : "#3DBECB"}
        style={styles.button}
        bgcolor={liked ? undefined : "white"}
        text={liked ? "Liked" : "Like"}
        fontfamily={"alexandriaLight"}
        fontsize={13}
      />
      <Text style={styles.price}>{itemPrice}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { height: "20%", width: "50%", alignSelf: "center" },
  image: {
    width: 72,
    height: 72,
    marginBottom: 10,
    alignSelf: "center",
  },

  number: {
    textAlign: "center",
    fontFamily: "alexandriaLight",
    fontSize: 13,
  },

  price: {
    textAlign: "center",
    fontFamily: "alexandriaBold",
    // position: "relative",
    // bottom: -20,
  },
});

export default HomeItems;
