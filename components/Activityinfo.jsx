import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Activityinfo = ({ icon, icon2, topic, subtext }) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 20, marginBottom: 30 }}
    >
      {icon && icon}
      <View style={{ flex: 1 }}>
        <Text style={styles.topic}>{topic}</Text>
        <Text style={styles.subtext}>{subtext}</Text>
      </View>
      {icon2 && icon2}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topic: {
    fontFamily: "alexandriaMedium",
    fontSize: 13,
  },

  subtext: {
    fontFamily: "alexandriaLight",
    fontSize: 13,
  },
});

export default Activityinfo;
