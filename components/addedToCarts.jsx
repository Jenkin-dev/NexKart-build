import { StyleSheet, Text } from "react-native";
import { Image, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCartStore } from "../store/useCartStore";
import { useState } from "react";

const AddedToCarts = ({ id, source, productname, productprice, qty }) => {
  //   const [qty, setQty] = useState(1);

  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <View
      style={{ flexDirection: "row", gap: 25, marginBottom: 25, width: "100%" }}
    >
      <View>
        <Image
          source={source}
          style={styles.productimage}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={styles.name}>{productname}</Text>
        <Text style={styles.price}>{productprice}</Text>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 25 }}>
          <AntDesign
            name="minus-square"
            size={24}
            color="#4C69FF"
            onPress={() => {
              if (qty > 0) {
                updateQuantity(id, -1);
              }
            }}
          />
          <Text>{qty}</Text>
          <AntDesign
            name="plus-square"
            size={24}
            color="#4C69FF"
            onPress={() => updateQuantity(id, 1)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productimage: { width: 100, height: 100 },
  name: { fontFamily: "alexandriaBold", fontSize: 20 },
  price: { fontFamily: "alexandriaSemibold", fontSize: 15, color: "#4C69FF" },
});
export default AddedToCarts;
