import { Dimensions, Image, Text, View } from "react-native";

const { width } = Dimensions.get("screen");
console.log(`The width of this screen is ${width}`);

const Logohead = ({ pageDescription, style }) => {
  return (
    <View
      style={{
        marginHorizontal: width * 0.02,
        marginTop: 40,
        paddingBottom: 20,
        ...style,
      }}
    >
      <Image
        style={{
          width: 0.2 * width,
          resizeMode: "contain",
          height: 0.2 * width,
          paddingVertical: 60,
        }}
        source={require("../assets/images/Signup_Loginlogo.png")}
      />
      <Text style={{ fontFamily: "alexandriaRegular", fontSize: 25 }}>
        {pageDescription}
      </Text>
    </View>
  );
};

export default Logohead;
