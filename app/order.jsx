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
  const [all, setAll] = useState(true);

  const [paid, setPaid] = useState(false);
  const [shipped, setShipped] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [returned, setReturned] = useState(false);

  const { width } = Dimensions.get("screen");
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
        <Button
          onPress={() => setAll(!all)}
          style={styles.categoryselector}
          bgcolor={all ? "#4C69FF" : "#bddcf6"}
          textColor={all ? "white" : "gray"}
          text={"All"}
          fontfamily={"alexandriaRegular"}
        />
        <Button
          onPress={() => setPaid(!paid)}
          style={styles.categoryselector}
          bgcolor={paid ? "#4C69FF" : "#bddcf6"}
          textColor={paid ? "white" : "gray"}
          text={"Paid"}
          fontfamily={"alexandriaRegular"}
        />
        <Button
          onPress={() => setShipped(!shipped)}
          style={styles.categoryselector}
          bgcolor={shipped ? "#4C69FF" : "#bddcf6"}
          textColor={shipped ? "white" : "gray"}
          text={"Shipped"}
          fontfamily={"alexandriaRegular"}
        />
        <Button
          onPress={() => setDelivered(!delivered)}
          style={styles.categoryselector}
          bgcolor={delivered ? "#4C69FF" : "#bddcf6"}
          textColor={delivered ? "white" : "gray"}
          text={"Delivered"}
          fontfamily={"alexandriaRegular"}
        />
        <Button
          onPress={() => setReturned(!returned)}
          style={styles.categoryselector}
          bgcolor={returned ? "#FF4C96" : "#bddcf6"}
          textColor={returned ? "white" : "gray"}
          text={"Returned"}
          fontfamily={"alexandriaRegular"}
        />
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.orders}>
          <View
            style={[
              styles.orderitems,
              { display: all || paid ? undefined : "none" },
            ]}
          >
            <Text style={{ fontFamily: "alexandriaRegular", fontSize: 22 }}>
              Order ID
            </Text>
            <OrderItems
              source={require("../assets/images/XIaomMiMix3.png")}
              itemname={"Xiaomi Mi Mix 3"}
              itemprice={"USD 160"}
              itemcolor={"Black"}
              itemqty={"x 1"}
              itemstatus={"Packing"}
            />
            <OrderItems
              source={require("../assets/images/mouse.png")}
              itemname={"Logitech G703 Wireless Gaming Mouse"}
              itemprice={"USD 100"}
              itemcolor={"Black"}
              itemqty={"x 1"}
              itemstatus={"Packing"}
            />

            <View style={styles.orderbuttons}>
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
                fontfamily={"alexandriaLight"}
                text={"Messages"}
              />
            </View>
          </View>

          <View
            style={[
              styles.orderitems,
              { display: all || paid ? undefined : "none" },
            ]}
          >
            <Text style={{ fontFamily: "alexandriaRegular", fontSize: 22 }}>
              Order ID
            </Text>
            <OrderItems
              source={require("../assets/images/Pixel3.png")}
              itemname={"Pixel 3"}
              itemprice={"USD 1200"}
              itemcolor={"Clearly White"}
              itemqty={"x 1"}
              itemstatus={"Packing"}
            />

            <View style={styles.orderbuttons}>
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
                fontfamily={"alexandriaLight"}
                text={"Messages"}
              />
            </View>
          </View>

          <View
            style={[
              styles.orderitems,
              { display: all || shipped ? undefined : "none" },
            ]}
          >
            <Text style={{ fontFamily: "alexandriaRegular", fontSize: 22 }}>
              Order ID
            </Text>
            <OrderItems
              source={require("../assets/images/watchorder.png")}
              itemname={"FitBit Versa"}
              itemprice={"USD 280"}
              itemcolor={"Black"}
              itemqty={"x 1"}
              itemstatus={"Shipped"}
            />

            <View style={styles.orderbuttons}>
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
                fontfamily={"alexandriaLight"}
                text={"Track Package"}
              />
            </View>
          </View>

          <View
            style={[
              styles.orderitems,
              { display: all || shipped ? undefined : "none" },
            ]}
          >
            <Text style={{ fontFamily: "alexandriaRegular", fontSize: 22 }}>
              Order ID
            </Text>
            <OrderItems
              source={require("../assets/images/xiaomia2lute.png")}
              itemname={"Xiaomi A2 Lite"}
              itemprice={"USD 100"}
              itemcolor={"Black"}
              itemqty={"x 1"}
              itemstatus={"Shipped"}
            />

            <View style={styles.orderbuttons}>
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
                fontfamily={"alexandriaLight"}
                text={"Track Package"}
              />
            </View>
          </View>

          <View
            style={[
              styles.orderitems,
              { display: all || delivered ? undefined : "none" },
            ]}
          >
            <Text style={{ fontFamily: "alexandriaRegular", fontSize: 22 }}>
              Order ID
            </Text>
            <OrderItems
              source={require("../assets/images/order2.png")}
              itemname={"Google Home Mini"}
              itemprice={"USD 40"}
              itemcolor={"Charcoal"}
              itemqty={"x 1"}
              itemstatus={"Delivered"}
            />

            <OrderItems
              source={require("../assets/images/cardimage3.png")}
              itemname={"Chrome Home Max"}
              itemprice={"USD 80"}
              itemcolor={"Charcoal"}
              itemqty={"x 1"}
              itemstatus={"Delivered"}
            />

            <View style={styles.orderbuttons}>
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
                fontfamily={"alexandriaLight"}
                text={"Leave Review"}
              />
            </View>
          </View>

          <View
            style={[
              styles.orderitems,
              { display: all || returned ? undefined : "none" },
            ]}
          >
            <Text style={{ fontFamily: "alexandriaRegular", fontSize: 22 }}>
              Order ID
            </Text>
            <OrderItems
              source={require("../assets/images/amazonecho.png")}
              itemname={"Amazon Echo"}
              itemprice={"USD 160"}
              itemcolor={"Slate Black"}
              itemqty={"x 1"}
              itemstatus={"Returned"}
            />

            <OrderItems
              source={require("../assets/images/iphonexr.png")}
              itemname={"iPhone XR"}
              itemprice={"USD 680"}
              itemcolor={"Coral Blue"}
              itemqty={"x 1"}
              itemstatus={"Returned"}
            />

            <View style={styles.orderbuttons}>
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
                fontfamily={"alexandriaLight"}
                text={"Order Details"}
              />
            </View>
          </View>
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
