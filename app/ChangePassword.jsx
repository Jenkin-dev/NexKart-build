import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import Passwordinput from "../components/passwordInput";
import Button from "../components/button";
import { auth } from "../services/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const user = auth.currentUser;

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      Alert.alert("Success", "Your password has been changed successfully!");
      router.back();
    } catch (error) {
      console.error("Password update error:", error);

      if (error.code === "auth/invalid-credential") {
        Alert.alert("Error", "Your current password is incorrect.");
      } else if (error.code === "auth/too-many-requests") {
        Alert.alert("Error", "Too many attempts. Please try again later.");
      } else {
        Alert.alert("Error", "Failed to change password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={{ width: 24, height: 24, resizeMode: "contain" }}
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.instruction}>
          Your new password must be at least 6 characters long and different
          from your previous password.
        </Text>

        <View style={styles.form}>
          <Passwordinput
            head="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <View style={styles.divider} />

          <Passwordinput
            head="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Passwordinput
            head="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <Button
          onPress={handleChangePassword}
          text={loading ? "Updating..." : "Update Password"}
          bgcolor={loading ? "#888" : "#4C69FF"}
          textColor="white"
          fontfamily="alexandriaBold"
          disabled={loading}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: "#bddcf6",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerText: { fontFamily: "alexandriaBold", fontSize: 22 },
  instruction: {
    fontFamily: "alexandriaRegular",
    fontSize: 15,
    color: "#555",
    marginBottom: 30,
    lineHeight: 22,
  },
  form: { marginBottom: 20 },
  divider: { height: 1, backgroundColor: "#a7c9f9", marginVertical: 20 },
});

export default ChangePassword;
