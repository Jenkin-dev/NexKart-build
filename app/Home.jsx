import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import SafeView from "../components/safe-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import SpecialDeals from "../components/specialdeals";
import HomeItems from "../components/homeitem";
import Button from "../components/button";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../components/input";
const Home = () => {
  const [incoming, setIncoming] = useState(false);
  const [searching, setSearching] = useState(false);
  const { height } = Dimensions.get("screen");
  // console.log(height);
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#5565FB", "#5599FB"]}
        style={{
          height: 160,
          marginBottom: -40,
          display: searching ? undefined : "none",
          paddingHorizontal: 40,
          paddingTop: 50,
        }}
      >
        <Input inputtype={"Search for a product"} />
      </LinearGradient>
      <SafeAreaView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          flex: 1,
          backgroundColor: "#bddcf6",
        }}
      >
        <View
          style={[
            styles.top,
            {
              display: searching ? "none" : undefined,
            },
          ]}
        >
          <TouchableOpacity onPress={() => router.push("/Sidemenu")}>
            <Image
              style={{ width: 20, height: 20, resizeMode: "center" }}
              source={
                incoming
                  ? require("../assets/images/menu-incoming.png")
                  : require("../assets/images/menu.png")
              }
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={{ fontFamily: "alexandriaRegular", fontSize: 20 }}>
              My Cart
            </Text>
            <View style={styles.numberText}>
              <Text style={styles.subtext}>8</Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              marginVertical: 20,
              display: searching ? "none" : undefined,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              <SpecialDeals
                linearcolors={["#5565FB", "cyan"]}
                linearstart={{ x: 0, y: 0 }}
                linearend={{ x: 1, y: 1 }}
                cardTopic={"NEW MONTH, NEW ME"}
                styleTopic={styles.cardtopic}
                styleSub={styles.cardsub}
                cardSub={"BEST DEALS UP \nTO 80% OFF"}
                source={require("../assets/images/shoe.png")}
              />

              <SpecialDeals
                linearcolors={["#48E3D6", "#5AEA46"]}
                linearstart={{ x: 0, y: 0 }}
                linearend={{ x: 1.3, y: 1.5 }}
                cardTopic={"BRANDED GADGETS"}
                styleTopic={styles.cardtopic2}
                styleSub={styles.cardsub2}
                cardSub={"FIND POPULAR DEALS \nAS LOW AS $20.00"}
                source={require("../assets/images/cardwatch.png")}
              />

              <SpecialDeals
                linearcolors={["#5565FB", "cyan"]}
                linearstart={{ x: 0, y: 0 }}
                linearend={{ x: 1, y: 1 }}
                cardTopic={"NEW MONTH, NEW ME"}
                styleTopic={styles.cardtopic}
                styleSub={styles.cardsub}
                cardSub={"BEST DEALS UP \nTO 80% OFF"}
                source={require("../assets/images/shoe.png")}
              />
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              display: searching ? "none" : undefined,
            }}
          >
            <HomeItems
              source={require("../assets/images/mouse.png")}
              noItems={"33 sold"}
              itemPrice={"USD 108.00"}
            />
            <HomeItems
              source={require("../assets/images/phone.png")}
              noItems={"8 sold"}
              itemPrice={"USD 360.00"}
            />
            <HomeItems
              source={require("../assets/images/cardimage3.png")}
              noItems={"6 sold"}
              itemPrice={"USD 80.00"}
            />
            <HomeItems
              source={require("../assets/images/smartwatch.png")}
              noItems={"Only 2 left"}
              itemPrice={"USD 260.00"}
            />
            <HomeItems
              source={require("../assets/images/airpod.png")}
              noItems={"15 sold"}
              itemPrice={"USD 30.00"}
            />
            <HomeItems
              source={require("../assets/images/phone2.png")}
              noItems={"33 sold"}
              itemPrice={"USD 869.00"}
            />
          </View>
        </ScrollView>
        <Button
          onPress={() => setSearching(!searching)}
          style={{
            position: "absolute",
            bottom: 0.01 * height,
            alignSelf: "center",
            width: 75,
            height: 40,
            borderRadius: 20,
            borderWidth: 0,
            // position: "fixed",
            backgroundColor: "#5599FB",
          }}
          icon={
            <Image
              style={styles.icon}
              source={
                searching
                  ? require("../assets/images/cancel.png")
                  : require("../assets/images/search.png")
              }
            />
          }
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardtopic: {
    color: "#F9FF00",
    fontFamily: "alexandriaMedium",
    fontSize: 17,
  },

  cardsub: { color: "white", fontFamily: "alexandriaRegular", fontSize: 20 },

  cardtopic2: {
    color: "black",
    fontFamily: "alexandriaLight",
    fontSize: 17,
  },
  icon: {
    height: 24,
    width: 24,
    // position: "relative",
    // left: -50,
    // top: 2,
    // marginBottom: 5,
    // alignSelf: "center",
  },
  cardsub2: { color: "white", fontFamily: "alexandriaRegular", fontSize: 20 },
  numberText: {
    backgroundColor: "#FF4C96",
    borderRadius: 20,
    width: 24,
    height: 24,

    // flexDirection: "row",
    justifyContent: "center",
  },
  subtext: {
    fontFamily: "alexandriaRegular",
    fontSize: 15,
    alignSelf: "center",
    color: "white",
    // textAlign: "center",
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
  },

  scrollContent: {
    // flex: 1,
    paddingBottom: 30,
  },
  horizontalScrollContent: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
export default Home;
