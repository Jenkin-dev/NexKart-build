import { router } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/button";
import { useState } from "react";
import { ScrollView } from "react-native";
import OrderItems from "../components/OrderItems";

const Orders = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Paid", "Shipped", "Delivered", "Returned"];
  const { width } = Dimensions.get("screen");

  const orders = [
    {
      id: "001",
      status: "Paid",
      items: [
        {
          source: require("../assets/images/XIaomMiMix3.png"),
          name: "Xiaomi Mi Mix 3",
          price: "USD 160",
          color: "Black",
          qty: "x 1",
        },
        {
          source: require("../assets/images/mouse.png"),
          name: "Logitech G703 Wireless Gaming Mouse",
          price: "USD 100",
          color: "Black",
          qty: "x 1",
        },
      ],
    },
    {
      id: "002",
      status: "Shipped",
      items: [
        {
          source: require("../assets/images/watchorder.png"),
          name: "FitBit Versa",
          price: "USD 280",
          color: "Black",
          qty: "x 1",
        },
      ],
    },
    {
      id: "003",
      status: "Paid",
      items: [
        {
          source: require("../assets/images/Pixel3.png"),
          name: "Pixel 3",
          price: "USD 1200",
          color: "Clearly White",
          qty: "x 1",
        },
      ],
    },

    {
      id: "004",
      status: "Shipped",
      items: [
        {
          source: require("../assets/images/xiaomia2lute.png"),
          name: "Xiaomi A2 Lite",
          price: "USD 100",
          color: "Black",
          qty: "x 1",
        },
      ],
    },

    {
      id: "005",
      status: "Delivered",
      items: [
        {
          source: require("../assets/images/order2.png"),
          name: "Google Home Mini",
          price: "40",
          color: "Charcoal",
          qty: "x 1",
        },
        {
          source: require("../assets/images/cardimage3.png"),
          name: "Chrome Home Max",
          price: "USD 80",
          color: "Charcoal",
          qty: "x 1",
        },
      ],
    },

    {
      id: "006",
      status: "Returned",
      items: [
        {
          source: require("../assets/images/amazonecho.png"),
          name: "Amazon Echo",
          price: "USD 160",
          color: "Slate Black",
          qty: "x 1",
        },
        {
          source: require("../assets/images/iphonexr.png"),
          name: "iPhone XR",
          price: "USD 680",
          color: "Coral Blue",
          qty: "x 1",
        },
      ],
    },
  ];

  const filteredOrders =
    selectedCategory === "All"
      ? orders
      : orders.filter((order) => order.status === selectedCategory);

  const renderOrderButtons = (status) => {
    switch (status) {
      case "Paid":
        return (
          <>
            <Button
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={"Order Details"}
              fontfamily={"alexandriaLight"}
            />
            <Button
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={"Messages"}
              fontfamily={"alexandriaLight"}
            />
          </>
        );

      case "Shipped":
        return (
          <>
            <Button
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={"Order Details"}
              fontfamily={"alexandriaLight"}
            />
            <Button
              style={styles.orderbutton}
              bgcolor={"#4C69FF"}
              textColor={"#BDDCF6"}
              text={"Track Package"}
              fontfamily={"alexandriaLight"}
            />
          </>
        );

      case "Delivered":
        return (
          <>
            <Button
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={"Order Details"}
              fontfamily={"alexandriaLight"}
            />
            <Button
              style={styles.orderbutton}
              bgcolor={"#4C69FF"}
              textColor={"#BDDCF6"}
              text={"Leave Review"}
              fontfamily={"alexandriaLight"}
            />
          </>
        );

      case "Returned":
        return (
          <>
            <Button
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={"Contact Support"}
              fontfamily={"alexandriaLight"}
            />
            <Button
              style={styles.orderbutton}
              bgcolor={"#4C69FF"}
              textColor={"#BDDCF6"}
              text={"Order Details"}
              fontfamily={"alexandriaLight"}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.safeview, { width: width }]}>
      <View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              style={{ width: 20, height: 20, resizeMode: "center" }}
              source={require("../assets/images/back.png")}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.pageHead}>My Orders</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.category}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((item) => (
          <Button
            key={item}
            onPress={() => setSelectedCategory(item)}
            style={styles.categoryselector}
            bgcolor={
              selectedCategory === item
                ? item === "Returned"
                  ? "#FF4C96"
                  : "#4C69FF"
                : "#bddcf6"
            }
            textColor={selectedCategory === item ? "white" : "gray"}
            text={item}
            fontfamily={"alexandriaRegular"}
          />
        ))}
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.orders}>
          {filteredOrders.map((order) => (
            <View key={order.id} style={styles.orderitems}>
              <Text style={{ fontFamily: "alexandriaRegular", fontSize: 22 }}>
                Order ID: {order.id}
              </Text>

              {order.items.map((item, index) => (
                <OrderItems
                  key={index}
                  source={item.source}
                  itemname={item.name}
                  itemprice={item.price}
                  itemcolor={item.color}
                  itemqty={item.qty}
                  itemstatus={order.status}
                />
              ))}

              <View style={styles.orderbuttons}>
                <View style={styles.orderbuttons}>
                  {renderOrderButtons(order.status)}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 10, fontSize: 25 },
  category: {
    // flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  icons: {
    marginBottom: 20,
  },
  orderbuttons: {
    flexDirection: "row",
    gap: "5%",
  },
  orderitems: {
    paddingBottom: 30,
    marginBottom: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  orderbutton: { width: "47.5%", height: 40 },
  safeview: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    backgroundColor: "#bddcf6",
  },

  categoryselector: {
    // width: 78,
    paddingHorizontal: 30,
    height: 32,
    borderRadius: 16,
  },
});

export default Orders;
