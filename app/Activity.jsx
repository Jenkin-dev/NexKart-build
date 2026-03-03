import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import Activities from "../components/Activities";
import Button from "../components/button";
import Activityinfo from "../components/Activityinfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { ImageMap } from "../utils/imageMap";

const Activity = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const activitiesRef = collection(db, "users", user.uid, "activities");
          const q = query(activitiesRef, orderBy("createdAt", "desc"));
          const snapshot = await getDocs(q);
          const fetchedActivities = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          setRecentActivities(fetchedActivities);
        } catch (error) {
          console.error("An error occured while fetching activity:", "error");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "Just now";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStausIcon = (status) => {
    switch (status) {
      case "Delivered":
        return require("../assets/images/warehouse.png");
      case "Shipped":
        return require("../assets/images/intransit.png");
      case "Returned":
        return require("../assets/images/cancel.png");
      default:
        return require("../assets/images/order.png");
    }
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => router.push("/Sidemenu")}>
            <Image
              style={{ width: 20, height: 20, resizeMode: "center" }}
              source={require("../assets/images/menu.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.pageHead}>Activity</Text>

      <View style={styles.activity}>
        <Activities
          onPress={() => router.push("./wishlist")}
          activityImage={require("../assets/images/order.png")}
          activity={"WishList"}
        />

        <Activities
          activityImage={require("../assets/images/shipped.png")}
          activity={"Shipped"}
          onPress={() => router.push("/order")}
        />
        <Activities
          onPress={() => router.push("./carts")}
          activityImage={require("../assets/images/intransit.png")}
          activity={"Carts"}
        />
        <Activities
          onPress={() => router.push("/order")}
          activityImage={require("../assets/images/warehouse.png")}
          activity={"Delivered"}
        />
      </View>
      <Button
        onPress={() => router.push("./order")}
        text={"View my orders"}
        fontfamily={"alexandriaLight"}
        bgcolor={"#bddcf6"}
        textColor={"#4C69FF"}
        style={styles.button}
      />

      <View style={styles.orderUpdates}>
        <Text
          style={{
            fontFamily: "alexandriaMedium",
            fontSize: 23,
            marginBottom: 15,
          }}
        >
          Order Updates
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          {loading ? (
            <ActivityIndicator
              size={"large"}
              color={"#4c69ff"}
              style={{ marginTop: 20 }}
            />
          ) : recentActivities.length === 0 ? (
            <Text
              style={{
                fontfamily: "alexandriaLight",
                color: "grey",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              No recent activity to show
            </Text>
          ) : (
            recentActivities.map((activity) => (
              <View
                key={activity.id}
                style={{
                  marginBottom: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: "#efefef",
                }}
              >
                <Activityinfo
                  icon={
                    <Image
                      style={{ width: 40, height: 40, resizeMode: "contain" }}
                      source={getStausIcon(activity.status)}
                    />
                  }
                  topic={`Order ${activity.status.toLowerCase()} (ID: ${activity.orderID})`}
                  subtext={formatDate(activity.createdAt)}
                  icon2={
                    <Image
                      style={{ width: 33, height: 42, resizeMode: "contain" }}
                      // Grab the image of the FIRST item in that specific order using your dictionary!
                      source={
                        activity.items && activity.items[0]
                          ? ImageMap[activity.items[0].imageKey]
                          : null
                      }
                    />
                  }
                />
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("screen");
console.log(width);

const styles = StyleSheet.create({
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 30, fontSize: 25 },

  activity: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  activityinfo: {
    paddingHorizontal: 20,
    // backgroundColor: "green",
  },

  boundaryLine: { borderColor: "grey", borderWidth: 0.4 },

  button: {
    // marginBottom: 28,
  },

  orderUpdates: { paddingVertical: 20, paddingBottom: 300 },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  importaant: {
    // backgroundColor: "green",
    borderTopColor: "#E5E5E5",
    borderTopWidth: 2,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 2,
  },
  safeview: {
    paddingHorizontal: 20,
    // marginTop: 20,
    paddingVertical: 30,
    flex: 1,
    // marginHorizontal: width * 0.02,
    backgroundColor: "#bddcf6",
  },
});
export default Activity;
