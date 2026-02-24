import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const SpecialDeals = ({
  source,
  linearstart,
  linearend,
  linearcolors,
  cardTopic,
  cardSub,
  styleTopic,
  styleSub,
}) => {
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={linearcolors}
        start={linearstart}
        end={linearend}
        style={styles.card}
      >
        <Image style={styles.image} source={source} resizeMode="stretch" />
        <View style={styles.cardcontent}>
          <Text style={{ ...styleTopic }}>{cardTopic}</Text>
          <Text style={{ ...styleSub }}>{cardSub}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "red",
    width: 240,
    borderRadius: 20,
    // marginRight: 20,
  },
  cardcontent: { paddingTop: 20, paddingLeft: 20 },
  image: {
    width: 233,
    height: 152,
    // alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 20,
    opacity: 0.8,
  },
});

export default SpecialDeals;
