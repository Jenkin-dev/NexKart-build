import { StyleSheet, Text } from "react-native";
import { Image, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

const AddedToCarts = ({ source, productname, productprice }) => {
  const [qty, setQty] = useState(1);
  return (
    <View style={{ flexDirection: "row", gap: 25 }}>
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
                setQty(qty - 1);
              }
            }}
          />
          <Text>{qty}</Text>
          <AntDesign
            name="plus-square"
            size={24}
            color="#4C69FF"
            onPress={() => setQty(qty + 1)}
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
