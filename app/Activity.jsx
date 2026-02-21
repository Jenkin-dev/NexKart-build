import SafeView from "../components/safe-view";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import Activities from "../components/Activities";
import Button from "../components/button";
import Activityinfo from "../components/Activityinfo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const Activity = () => {
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
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.activity}>
          <Activities
            activityImage={require("../assets/images/order.png")}
            activity={"Ordered"}
          />

          <Activities
            activityImage={require("../assets/images/shipped.png")}
            activity={"Shipped"}
          />
          <Activities
            activityImage={require("../assets/images/intransit.png")}
            activity={"Arriving"}
          />
          <Activities
            activityImage={require("../assets/images/warehouse.png")}
            activity={"Delivered"}
          />
        </View>
        <Button
          text={"View my orders"}
          fontfamily={"alexandriaLight"}
          bgcolor={"white"}
          textColor={"#4C69FF"}
          style={styles.button}
        />
        {/* <View style={styles.boundaryLine} /> */}
        <View style={styles.importaant}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
              alignItems: "baseline",
            }}
          >
            <Text style={{ fontFamily: "alexandriaMedium", fontSize: 23 }}>
              Important
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: "alexandriaRegular",
                  fontSize: 18,
                  color: "#FF4C96",
                }}
              >
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityinfo}>
            <Activityinfo
              icon={
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/images/xiaomi.png")}
                />
              }
              topic={"2 unread messages from Xiaomi"}
              subtext={"13 Dec 2018, 09:38"}
              // icon2={<Image source={null} />}
            />

            <Activityinfo
              icon={<AntDesign name="account-book" size={24} color="#4C69FF" />}
              topic={"Your voucher is about to expire"}
              subtext={"Don't miss out! Use you voucher now."}
            />
          </View>
        </View>

        <View style={styles.orderUpdates}>
          <Text style={{ fontFamily: "alexandriaMedium", fontSize: 23 }}>
            Order Updates
          </Text>
          <View
            style={{
              marginVertical: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#E5E5E5",
            }}
          >
            <Activityinfo
              icon={
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/images/shipped.png")}
                />
              }
              topic={"Parcel shipped from China"}
              subtext={"12 Dec 2018, 09:38"}
              icon2={
                <Image
                  style={{ width: 42, height: 42 }}
                  source={require("../assets/images/watchorder.png")}
                />
              }
            />
          </View>
          <View
            style={{
              marginBottom: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#E5E5E5",
            }}
          >
            <Activityinfo
              icon={
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/images/warehouse.png")}
                />
              }
              topic={"Order delivered to 22 Baker Street"}
              subtext={"12 Dec 2018, 09:38"}
              icon2={
                <Image
                  style={{ width: 33, height: 42 }}
                  source={require("../assets/images/order2.png")}
                />
              }
            />
          </View>
          <View
            style={{
              marginBottom: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#E5E5E5",
            }}
          >
            <Activityinfo
              icon={
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/images/shipped.png")}
                />
              }
              topic={"Parcel shipped from Maldives"}
              subtext={"17 Oct 2018, 09:56"}
              icon2={
                <Image
                  style={{ width: 42, height: 42 }}
                  source={require("../assets/images/watchorder.png")}
                />
              }
            />
          </View>
          <View
            style={{
              marginBottom: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#E5E5E5",
            }}
          >
            <Activityinfo
              icon={
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/images/warehouse.png")}
                />
              }
              topic={"Order delivered to 22 Baker Street"}
              subtext={"16 Oct 2018, 09:38"}
              icon2={
                <Image
                  style={{ width: 33, height: 42 }}
                  source={require("../assets/images/order2.png")}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
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

  activityinfo: { marginHorizontal: 20 },

  boundaryLine: { borderColor: "grey", borderWidth: 0.4 },

  button: {
    marginBottom: 28,
  },

  orderUpdates: { paddingVertical: 20 },
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
    marginTop: 20,
    paddingVertical: 30,
    flex: 1,
    marginHorizontal: width * 0.02,
  },
});
export default Activity;
