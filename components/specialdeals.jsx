import { StyleSheet, Text, View } from "react-native";
import { ImageBackground } from "react-native-web";

const SpecialDeals = () => {
  return (
    <View>
      <View style={styles.card}>
        <Text>NEW MONTH, NEW ME</Text>
        <Text>BEST DEALS UP TO 80% OFF</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: "red", width: 280 },
});

export default SpecialDeals;
