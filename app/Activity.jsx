import SafeView from "../components/safe-view";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import Activities from "../components/Activities";
import Button from "../components/button";
import Activityinfo from "../components/Activityinfo";
import AntDesign from "@expo/vector-icons/AntDesign";

const Activity = () => {
  return (
    <SafeView style={styles.safeview}>
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
      <ScrollView>
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
        <View style={styles.boundaryLine} />
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
          <View>
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
              subtext={"Don't miss out!"}
              icon2={
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/images/xiaomi.png")}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};
const styles = StyleSheet.create({
  pageHead: { fontFamily: "alexandriaBold", paddingBottom: 30, fontSize: 25 },

  activity: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  boundaryLine: { borderColor: "grey", borderWidth: 0.4 },

  button: {
    marginBottom: 28,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  importaant: {},
  safeview: { paddingHorizontal: 20, marginTop: 20, paddingVertical: 30 },
});
export default Activity;
