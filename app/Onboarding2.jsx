// import { SafeAreaView } from "react-native-safe-area-context";

import Onboarding from "../components/onboarding";

const Onboarding2 = () => {
  return (
    <Onboarding
      style={styles.nextButton}
      text1="Immerse in a seamless online shopping experienxe"
      text2="We promise that you'll have the mist fuss-free time with us forever"
      text3="Get started"
      nextPage="/(tabs)/Login"
      picture={require("../assets/images/onboarding_image2.png")}
      color={{ color: "white" }}
    />
  );
};

const styles = {
  nextButton: {
    backgroundColor: "#3DBECB",
    borderWidth: 1,
    borderColor: "#3DBECB",
    alignSelf: "center",
    marginTop: 50,
  },
};

export default Onboarding2;
