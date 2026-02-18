// import { SafeAreaView } from "react-native-safe-area-context";

import Onboarding from "../components/onboarding";

const Onboarding1 = () => {
  return (
    <Onboarding
      nextPage="/Onboarding2"
      picture={require("../assets/images/onboarding_image.png")}
    />
  );
};

export default Onboarding1;
