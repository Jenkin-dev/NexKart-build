import { Image, Text, TouchableOpacity, View } from "react-native";

const Activities = ({ onPress, activity, activityImage }) => {
  return (
    <TouchableOpacity style={{}} onPress={onPress}>
      <Image
        style={{ width: 30, height: 30, marginBottom: 10 }}
        source={activityImage}
      />
      <Text style={{ fontFamily: "alexandriaLight" }}>{activity}</Text>
    </TouchableOpacity>
  );
};

export default Activities;
