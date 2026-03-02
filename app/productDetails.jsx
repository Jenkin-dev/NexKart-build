import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { ImageMap } from "../utils/imageMap";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/wishliststore";
import { MaterialIcons } from "@expo/vector-icons";

const ProductDetails = () => {
  const { width, height } = Dimensions.get("screen");
  // Grab the data passed from the clicked card
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [process, setProcess] = useState(false);
  const [adding, setAdding] = useState(false);

  //activating the stores
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleLike = useWishlistStore((state) => state.toggleLike);
  const isLiked = useWishlistStore((state) => state.isLiked(id));

  const [errorFetch, setErrorFetch] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        }
      } catch (error) {
        setErrorFetch(true);
        console.log("Error fetching product,:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      try {
        setAdding(true);
        await addToCart(product);
        Alert.alert(
          "Success",
          `${product.name} quanity has been incremented by 1 in your cart!`,
        );
      } finally {
        setAdding(false);
      }
    }
  };

  const handleLikePress = async () => {
    if (product) {
      try {
        setProcess(true);
        await toggleLike({
          id: product.id,
          source: product.imageKey,
          noItems: product.noItems,
          name: product.name,
          itemPrice: product.itemPrice,
        });
        console.log(product.imageKey);
      } finally {
        setProcess(false);
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#bddcf6",
        }}
      >
        <ActivityIndicator size="100" color="#4C69FF" />
      </SafeAreaView>
    );
  }

  if (errorFetch) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Unable to fetch products details</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={styles.icon}
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Details</Text>
        <View style={{ width: 24 }} />
        <TouchableOpacity onPress={handleLikePress} disabled={process}>
          {isLiked ? (
            <MaterialIcons name="favorite" size={24} color="#ff4c28" />
          ) : (
            <MaterialIcons name="favorite-outline" size={24} color="#ff4c28" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Product Image Area */}
        <View style={styles.imageContainer}>
          {product.imageKey && ImageMap[product.imageKey] ? (
            <Image
              style={styles.productImage}
              source={ImageMap[product.imageKey]}
              resizeMode="contain"
            />
          ) : null}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.itemPrice}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>{product.noItems}</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>⭐ 4.8 Ratings</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            This is a premium high-quality {product.name}. Built with
            industry-leading technology to ensure maximum durability and
            exceptional performance. Get yours today before stock runs out!
          </Text>
        </View>
      </ScrollView>

      {/* Floating Add to Cart Button */}
      <View style={styles.bottomBar}>
        <Button
          onPress={handleAddToCart}
          text={adding ? "Adding product to Cart" : "Add to Cart"}
          bgcolor={adding ? "#bddcf6" : "#4C69FF"}
          textColor={adding ? "grey" : "white"}
          fontfamily="alexandriaBold"
          style={styles.cartButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeview: { flex: 1, backgroundColor: "#bddcf6" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  icon: { width: 24, height: 24, resizeMode: "contain" },
  headerText: { fontFamily: "alexandriaBold", fontSize: 20 },
  imageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "white",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: { width: "70%", height: "70%" },
  infoContainer: { paddingHorizontal: 20, paddingTop: 30 },
  productName: {
    fontFamily: "alexandriaBold",
    fontSize: 26,
    marginBottom: 10,
    color: "#333",
  },
  productPrice: {
    fontFamily: "alexandriaBold",
    fontSize: 22,
    color: "#4C69FF",
    marginBottom: 20,
  },
  statsRow: { flexDirection: "row", gap: 15, marginBottom: 30 },
  statBadge: {
    backgroundColor: "rgba(76, 105, 255, 0.1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statText: { fontFamily: "alexandriaRegular", color: "#4C69FF", fontSize: 13 },
  sectionTitle: {
    fontFamily: "alexandriaBold",
    fontSize: 18,
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: "alexandriaLight",
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#bddcf6",
  },
  cartButton: { width: "100%", height: 55, borderRadius: 30 },
});

export default ProductDetails;
