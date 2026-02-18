import { router, usePathname } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Toptab = ({ style }) => {
  //   const [active, setActive] = useState("Login");
  const pathname = usePathname();
  return (
    <View>
      <View
        style={{
          backgroundColor: "white",
          ...style,
        }}
      >
        <View>
          <Image
            style={styles.logo}
            source={require("../assets/images/Signup_Loginlogo.png")}
          />
        </View>

        <View style={styles.textView}>
          <Pressable
            style={[
              styles.press,
              { borderBottomWidth: pathname === "/Login" ? 4 : 0 },
            ]}
            onPress={() => {
              router.push("/Login");
              // setActive("Login");
            }}
          >
            <Text style={styles.text}>Login</Text>
          </Pressable>
          <Pressable
            style={[
              styles.press,
              { borderBottomWidth: pathname === "/Signup" ? 4 : 0 },
            ]}
            onPress={() => {
              router.push("/Signup");
              // setActive("Sign Up");
            }}
          >
            <Text style={styles.text}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 56,
    width: 56,
    alignSelf: "center",
    marginTop: 30,
    resizeMode: "cover",
  },

  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 40,
  },

  text: {
    fontFamily: "alexandriaRegular",
    fontSize: 22,
    alignSelf: "center",
    // marginBottomWidth: 20,
  },

  press: {
    // borderBottomWidth: 2,
    borderBottomColor: "#4C69FF",
    paddingBottom: 10,
    width: "45%",
  },
});

export default Toptab;
