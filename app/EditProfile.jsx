import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import Button from "../components/button";

import { auth, db } from "../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCurrentDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUsername(docSnap.data().username || "");
            setPhoneNumber(docSnap.data().phoneNumber || "");
          }
        } catch (error) {
          console.error("Error fetching profile for edit:", error);
          Alert.alert("Error", "Could not load profile details.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCurrentDetails();
  }, []);

  const handleSave = async () => {
    if (!username.trim() || !phoneNumber.trim()) {
      Alert.alert(
        "Invalid Input",
        "Username and Phone Number cannot be empty.",
      );
      return;
    }

    setSaving(true);
    const user = auth.currentUser;

    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          username: username.trim(),
          phoneNumber: phoneNumber.trim(),
        });
        await AsyncStorage.setItem("savedUsername", username);

        Alert.alert("Success", `${username} Your profile has been updated!`);
        router.back();
      } catch (error) {
        console.error("Error updating profile:", error);
        Alert.alert("Error", "Could not save changes. Please try again.");
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.safeview,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#4C69FF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeview}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={styles.icon}
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter new username"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter new phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      {/* Save Button */}
      <Button
        onPress={handleSave}
        text={saving ? "Saving..." : "Save Changes"}
        bgcolor={saving ? "#888" : "#4C69FF"}
        textColor="white"
        fontfamily="alexandriaBold"
        disabled={saving}
      />
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
    marginBottom: 40,
  },
  icon: { width: 24, height: 24, resizeMode: "contain" },
  headerText: { fontFamily: "alexandriaBold", fontSize: 22 },
  formContainer: { marginBottom: 40 },
  label: {
    fontFamily: "alexandriaMedium",
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontFamily: "alexandriaRegular",
    fontSize: 16,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
});

export default EditProfile;
