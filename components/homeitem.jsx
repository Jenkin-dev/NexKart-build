import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Button from "./button";
import { useWishlistStore } from "../store/wishliststore";
import { useState } from "react";
import { router } from "expo-router";
import { ImageMap } from "../utils/imageMap";

const HomeItems = ({ id, name, source, noItems, itemPrice }) => {
  const toggleLike = useWishlistStore((state) => state.toggleLike);
  const isLiked = useWishlistStore((state) => state.isLiked(id));
  const [process, setProcess] = useState(false);

  const handlePress = async () => {
    try {
      setProcess(true);
      await toggleLike({ id, source, noItems, name, itemPrice });
    } finally {
      setProcess(false);
    }
  };

  const handleCardPress = () => {
    router.push({
      pathname: "/productDetails",
      params: { id }, // Pass the data!
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image
        style={styles.image}
        source={ImageMap[source]}
        resizeMode="contain"
      />

      <Text style={styles.number}>{noItems}</Text>
      <Text style={styles.number}>{name}</Text>
      {!process && (
        <Button
          onPress={handlePress}
          textColor={isLiked ? "white" : "#3DBECB"}
          style={styles.button}
          bgcolor={isLiked ? "#3DBECB" : "white"}
          text={isLiked ? "Liked" : "Like"}
          fontfamily={"alexandriaLight"}
          fontsize={13}
        />
      )}
      {process && (
        <Button
          onPress={handlePress}
          textColor={isLiked ? "white" : "#3DBECB"}
          style={styles.button}
          bgcolor={isLiked ? "#3DBECB" : "white"}
          text={"Loading"}
          fontfamily={"alexandriaLight"}
          fontsize={13}
        />
      )}
      <Text style={styles.price}>{itemPrice}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 210,
    width: "43%",
    paddingVertical: 10,
    borderRadius: 20,
    margin: 10,
    boxShadow: "0px 0px 20px 5px #a7c9f9",
  },
  button: { height: "20%", width: "50%", alignSelf: "center" },
  image: { width: 72, height: 72, marginBottom: 10, alignSelf: "center" },
  number: { textAlign: "center", fontFamily: "alexandriaLight", fontSize: 13 },
  price: { textAlign: "center", fontFamily: "alexandriaBold" },
});

export default HomeItems;
