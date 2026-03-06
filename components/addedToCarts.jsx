import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCartStore } from "../store/useCartStore";
import { useState } from "react";

const AddedToCarts = ({
  id,
  source,
  productname,
  productprice,
  qty,
  noItems,
}) => {
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
          <TouchableOpacity
            onPress={() => {
              if (qty > 0) {
                updateQuantity(id, -1);
              }
            }}
          >
            <AntDesign name="minus-square" size={24} color="#4C69FF" />
          </TouchableOpacity>
          <Text>{qty}</Text>
          <TouchableOpacity
            onPress={() => {
              if (qty < noItems) {
                updateQuantity(id, 1);
              } else {
                Alert.alert(
                  "Invalid Amount",
                  `Quantity exceeds number of ${productname} remaining: ${noItems}`,
                );
              }
            }}
          >
            <AntDesign name="plus-square" size={24} color="#4C69FF" />
          </TouchableOpacity>
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
