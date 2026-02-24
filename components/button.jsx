import { TouchableOpacity, Text } from "react-native";

const Button = ({
  text,
  style,
  icon,
  textColor,
  fontfamily,
  onPress,
  bgcolor,
  fontsize,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgcolor ? bgcolor : "#3DBECB",
        height: 55,
        borderRadius: 10,
        justifyContent: "center",
        borderColor: textColor,
        borderWidth: 1,
        ...style,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {icon && icon}

      <Text
        style={{
          alignSelf: "center",
          color: textColor ? textColor : "white",
          fontSize: fontsize ? fontsize : 18,
          fontFamily: fontfamily ? fontfamily : "regular",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
