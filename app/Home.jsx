import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import SpecialDeals from "../components/specialdeals";
import HomeItems from "../components/homeitem";
import Button from "../components/button";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../components/input";
import { useWishlistStore } from "../store/wishliststore";
import { auth, db } from "../services/firebase";
import { ImageMap } from "../utils/imageMap";
import { doc, getDoc } from "firebase/firestore";
import { fetchProducts } from "../services/firebaseFetchProducts";
import { Feather, MaterialCommunityIcons, Zocial } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [incoming, setIncoming] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [searching, setSearching] = useState(false);
  const { height } = Dimensions.get("screen");
  const [homeitems, setHomeitems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const loadWishlist = useWishlistStore((state) => state.loadWishlist);
  const [greetingName, setGreetingName] = useState("Loading...");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setHomeitems(products);
      } catch (err) {
        console.error("Error fetching products:", err);
        Alert.alert(
          `Error`,
          `An error occured while trying to fetch products ${err}`,
        );
      } finally {
        setFetchingProducts(false);
      }
    };
    loadProducts();

    const loadName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().username) {
            const fetchedName = docSnap.data().username;
            setGreetingName(fetchedName);

            // Save it locally immediately so we never have to fetch it again!
            await AsyncStorage.setItem("savedUsername", fetchedName);
          } else {
            setGreetingName("User");
          }
        }
      } catch (error) {
        console.error("Error loading username:", error);
        setGreetingName("User");
      }
    };

    loadName();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadWishlist();
      }
    });

    return () => unsubscribe();
  }, []);

  const displayedItems = homeitems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
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
          zIndex: 10,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Input
          inputtype={"Search for a product"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Feather
          name="search"
          size={24}
          color="whitesmoke"
          style={{ alignSelf: "center" }}
          onPress={() => {
            setSearching(!searching);
          }}
        />
      </LinearGradient>

      <SafeAreaView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          flex: 1,
          backgroundColor: "#bddcf6",
        }}
      >
        <View style={[styles.top, { display: searching ? "none" : undefined }]}>
          <TouchableOpacity
            onPress={() => {
              router.push("/Sidemenu");
            }}
          >
            <Image
              style={{ width: 20, height: 20, resizeMode: "center" }}
              source={
                incoming
                  ? require("../assets/images/menu-incoming.png")
                  : require("../assets/images/menu.png")
              }
            />
          </TouchableOpacity>
          <Text style={styles.greeting}>Welcome, {greetingName}</Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              paddingHorizontal: 0,
            }}
            onPress={() => router.push("/carts")}
          >
            <MaterialCommunityIcons
              name="cart-variant"
              size={24}
              color="black"
            />
          </TouchableOpacity>
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
            </ScrollView>
          </View>
          {fetchingProducts && (
            <Text style={{ color: "grey", fontFamily: "alexandriaBold" }}>
              Fetching products...
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              display: searching ? "none" : undefined,
            }}
          >
            {displayedItems.length === 0 && !fetchingProducts ? (
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginTop: 20,
                  color: "gray",
                  fontFamily: "alexandriaRegular",
                }}
              >
                No products found matching "{searchQuery}"
              </Text>
            ) : (
              displayedItems.map((item) => (
                <HomeItems
                  key={item.id}
                  id={item.id}
                  source={item.imageKey}
                  noItems={item.noItems}
                  itemPrice={item.itemPrice}
                  name={item.name}
                />
              ))
            )}
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
  cardtopic: { color: "#F9FF00", fontFamily: "alexandriaMedium", fontSize: 17 },
  cardsub: { color: "white", fontFamily: "alexandriaRegular", fontSize: 20 },
  cardtopic2: { color: "black", fontFamily: "alexandriaLight", fontSize: 17 },
  icon: { height: 24, width: 24 },
  cardsub2: { color: "white", fontFamily: "alexandriaRegular", fontSize: 20 },
  numberText: {
    backgroundColor: "#FF4C96",
    borderRadius: 20,
    width: 24,
    height: 24,
    justifyContent: "center",
  },
  subtext: {
    fontFamily: "alexandriaRegular",
    fontSize: 15,
    alignSelf: "center",
    color: "white",
  },

  greeting: {
    fontFamily: "alexandriaBold",
    fontSize: 25,
    color: "#4C69FF",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  scrollContent: { paddingBottom: 30 },
  horizontalScrollContent: { paddingHorizontal: 10, gap: 10 },
});

export default Home;
