import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Button from "./button";
import { useWishlistStore } from "../store/wishliststore";

const HomeItems = ({ id, name, source, noItems, itemPrice }) => {
  const toggleLike = useWishlistStore((state) => state.toggleLike);
  const isLiked = useWishlistStore((state) => state.isLiked(id));

  const handlePress = () => {
    toggleLike({ id, source, noItems, name, itemPrice });
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image style={styles.image} source={source} resizeMode="contain" />
      {/* <Text style={styles.number}>{productName}</Text> */}
      <Text style={styles.number}>{noItems}</Text>
      <Text style={styles.number}>{name}</Text>
      <Button
        onPress={handlePress}
        textColor={isLiked ? "white" : "#3DBECB"}
        style={styles.button}
        bgcolor={isLiked ? "#3DBECB" : "white"}
        text={isLiked ? "Liked" : "Like"}
        fontfamily={"alexandriaLight"}
        fontsize={13}
      />
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
