import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";

const Passwordinput = ({ head, onChangeText, value }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const hideIcon = passwordVisible
    ? require("../assets/images/reveal.png")
    : require("../assets/images/hide.png");

  const styles = StyleSheet.create({
    inputView: {
      backgroundColor: "whitesmoke",
      borderWidth: 0,
      borderRadius: 10,
      width: "100%",
      marginBottom: 15,
    },
    inputText: {
      color: "grey",
      fontFamily: "light",
      fontSize: 15,
      marginBottom: 5,
    },

    input: {
      paddingHorizontal: 20,
      height: 56,

      width: "90%",
    },

    hide: {
      height: 30,
      width: 24,
    },
  });
  return (
    <View>
      <Text style={styles.inputText}>{head}</Text>
      <View
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"whitesmoke"}
        style={styles.inputView}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={head}
          placeholderTextColor={"#a4b2f5"}
          secureTextEntry={!passwordVisible}
          color="#4C69FF"
        />

        <Pressable
          onPress={() => {
            {
              setPasswordVisible(!passwordVisible);
            }
          }}
        >
          <Image style={styles.hide} source={hideIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default Passwordinput;
