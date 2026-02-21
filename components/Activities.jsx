import { Image, Text, TouchableOpacity, View } from "react-native";

const Activities = ({ activity, activityImage }) => {
  return (
    <TouchableOpacity style={{}}>
      <Image
        style={{ width: 30, height: 30, marginBottom: 10 }}
        source={activityImage}
      />
      <Text style={{ fontFamily: "alexandriaLight" }}>{activity}</Text>
    </TouchableOpacity>
  );
};

export default Activities;
