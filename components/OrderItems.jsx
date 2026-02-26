import { Dimensions, StyleSheet } from "react-native";
import { Image, View, Text } from "react-native";

const OrderItems = ({
  itemname,
  itemprice,
  itemcolor,
  itemqty,
  itemstatus,
  source,
}) => {
  const { width } = Dimensions.get("screen");
  return (
    <View>
      <Text style={styles.itemStatus}>{itemstatus}</Text>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 20,
          gap: 30,
          maxWidth: 0.8 * width,
          // backgroundColor: "red",
          // height: ,
        }}
      >
        <Image
          style={{
            width: "30%",
            resizeMode: "none",
            height: 98,
            alignSelf: "center",
          }}
          source={source}
        />
        <View>
          <View style={{ width: "100%" }}>
            <Text style={styles.itemName}>{itemname}</Text>
          </View>
          <Text style={styles.itemPrice}>{itemprice}</Text>
          <Text></Text>
          <Text style={styles.itemColor}>{itemcolor}</Text>
          <Text style={styles.itemQty}>{itemqty}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemName: {
    fontFamily: "alexandriaRegular",
    fontSize: 20,
    // width: "90%",
    // backgroundColor: "red",
  },

  itemPrice: { fontFamily: "alexandriaBold", color: "#4C69FF" },

  itemColor: {
    fontFamily: "alexandriaLight",
  },

  itemQty: {
    fontFamily: "alexandriaLight",
  },

  itemStatus: { fontFamily: "italic", color: "grey" },
});

export default OrderItems;
