import { router } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

import Button from "../components/button";
import OrderItems from "../components/OrderItems";
import { ImageMap } from "../utils/imageMap";

import { auth, db } from "../services/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

const Orders = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Paid", "Delivered", "Shipped", "Returned"];
  const { width } = Dimensions.get("screen");
  const [delivering, setDelivering] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const ordersRef = collection(db, "users", user.uid, "orders");
          const q = query(ordersRef, orderBy("createdAt", "desc"));
          const snapshot = await getDocs(q);

          const fetchedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        Alert.alert("Error", "Failed to fetch orders");
      }
    };

    fetchUserOrders();
  }, []);

  const handleDelivered = async (order) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to confirm delivery.");
      return;
    }
    try {
      setDelivering(true);
      const orderRef = doc(db, "users", user.uid, "orders", order.id);

      await updateDoc(orderRef, { status: "Delivered" });

      const activityID = `ACT-${Date.now()}`;
      await setDoc(doc(db, "users", user.uid, "activities", activityID), {
        id: activityID,
        orderID: order.id,
        status: "Delivered",
        items: order.items,
        createdAt: new Date().toISOString(),
      });

      setOrders((prevOrders) =>
        prevOrders.map((orderr) =>
          orderr.id === order.id ? { ...orderr, status: "Delivered" } : orderr,
        ),
      );

      Alert.alert(
        "Success",
        "Thanks for shopping with us. Looking forward to handling more of your deliveries",
      );
    } catch (error) {
      console.error("Error updating order:", error);
      Alert.alert("Error", "Delivery not confirmed");
    } finally {
      setDelivering(false);
    }
  };

  const filteredOrders =
    selectedCategory === "All"
      ? orders
      : orders.filter((order) => order.status === selectedCategory);

  const renderOrderButtons = (order) => {
    switch (order.status) {
      case "Paid":
        return (
          <>
            {/* <Button
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={"Order Details"}
              fontfamily={"alexandriaLight"}
            /> */}
            <Button
              onPress={() => handleDelivered(order)}
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={delivering ? "Confirming..." : "Confirm Delivery"}
              fontfamily={"alexandriaLight"}
            />
          </>
        );
      case "Shipped":
        return (
          <>
            {/* <Button
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={"Order Details"}
              fontfamily={"alexandriaLight"}
            /> */}
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
            {/* <Button
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={"Order Details"}
              fontfamily={"alexandriaLight"}
            /> */}
            <Button
              style={styles.orderbutton}
              onPress={() =>
                Alert.alert(
                  "Invalid Operation",
                  "This feature is not available at the moment.",
                )
              }
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
            {/* <Button
              style={styles.orderbutton}
              bgcolor={"#bddcf6"}
              textColor={"#4C69FF"}
              text={"Contact Support"}
              fontfamily={"alexandriaLight"}
            /> */}
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
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#4C69FF"
            style={{ marginTop: 50 }}
          />
        ) : orders.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              fontFamily: "alexandriaRegular",
              color: "grey",
            }}
          >
            You haven't placed any orders yet.
          </Text>
        ) : filteredOrders.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              fontFamily: "alexandriaRegular",
              color: "grey",
            }}
          >
            No orders found for this category.
          </Text>
        ) : (
          <View style={styles.orders}>
            {filteredOrders.map((order) => (
              <View key={order.id} style={styles.orderitems}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "alexandriaBold",
                      fontSize: 18,
                      color: "#333",
                    }}
                  >
                    ID: {order.id}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "alexandriaMedium",
                      fontSize: 16,
                      color: "#4C69FF",
                    }}
                  >
                    {order.total && `USD ${order.total}`}
                  </Text>
                </View>

                {order.items.map((item, index) => (
                  <OrderItems
                    key={index}
                    source={ImageMap[item.imageKey]}
                    itemname={item.name}
                    itemprice={item.price}
                    itemcolor={item.color}
                    itemqty={item.qty}
                    itemstatus={order.status}
                  />
                ))}

                <View style={styles.orderbuttons}>
                  <View style={styles.orderbuttons}>
                    {renderOrderButtons(order)}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 10, fontSize: 25 },
  category: { gap: 20, marginBottom: 30 },
  icons: { marginBottom: 20 },
  // orderbuttons: { flexDirection: "row", gap: "5%" },
  orderitems: {
    paddingBottom: 30,
    marginBottom: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  orderbutton: { alignSelf: "flex-end", width: "47.5%", height: 40 },
  safeview: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    backgroundColor: "#bddcf6",
  },
  categoryselector: { paddingHorizontal: 30, height: 32, borderRadius: 16 },
});

export default Orders;
