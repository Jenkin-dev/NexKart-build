import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SettingRow = ({ icon, title, onPress, rightElement }) => (
    <TouchableOpacity style={styles.row} onPress={onPress} disabled={!onPress}>
      <View style={styles.rowLeft}>
        {icon}
        <Text style={styles.rowTitle}>{title}</Text>
      </View>
      {rightElement ? (
        rightElement
      ) : (
        <AntDesign name="right" size={20} color="grey" />
      )}
    </TouchableOpacity>
  );

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedValue = await AsyncStorage.getItem("push_notifications");
        if (savedValue !== null) {
          setNotifications(JSON.parse(savedValue));
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    };
    loadSettings();
  }, []);

  const toggleNotifications = async (value) => {
    setNotifications(value);
    try {
      await AsyncStorage.setItem("push_notifications", JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  };
  return (
    <SafeAreaView style={styles.safeview}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={{ width: 24, height: 24, resizeMode: "contain" }}
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Section 1: Account */}
        <Text style={styles.sectionHeader}>Account</Text>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon={<AntDesign name="user" size={22} color="#4C69FF" />}
            title="Edit Profile"
            onPress={() => router.push("/EditProfile")}
          />
          <SettingRow
            icon={<AntDesign name="lock" size={22} color="#4C69FF" />}
            title="Change Password"
            onPress={() => {
              router.push("/ChangePassword");
            }}
          />
        </View>

        {/* Section 2: Preferences */}
        <Text style={styles.sectionHeader}>Preferences</Text>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon={
              <MaterialIcons
                name="notifications-none"
                size={24}
                color="#4C69FF"
              />
            }
            title="Push Notifications"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={toggleNotifications}
                trackColor={{ true: "#4C69FF" }}
              />
            }
          />
          {/* <SettingRow
            icon={<MaterialIcons name="dark-mode" size={24} color="#4C69FF" />}
            title="Dark Mode"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ true: "#4C69FF" }}
              />
            }
          /> */}
        </View>

        {/* Section 3: About */}
        <Text style={styles.sectionHeader}>Support & Legal</Text>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon={
              <MaterialIcons name="contact-support" size={24} color="#4C69FF" />
            }
            title="Contact Support"
            onPress={() =>
              Alert.alert("Contact Chat", "Contact nearest NexKart office")
            }
          />
          <SettingRow
            icon={<AntDesign name="audit" size={22} color="#4C69FF" />}
            title="Terms of Service"
            onPress={() => router.push("/Terms")}
          />
        </View>

        {/* Section 4: Danger Zone */}
        <Text style={[styles.sectionHeader, { color: "#FF4C96" }]}>
          Danger Zone
        </Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]}>
            <View style={styles.rowLeft}>
              <AntDesign name="delete" size={22} color="#FF4C96" />
              <Text style={[styles.rowTitle, { color: "#FF4C96" }]}>
                Delete Account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
  sectionHeader: {
    fontFamily: "alexandriaBold",
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    marginLeft: 5,
  },
  sectionContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 25,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  rowTitle: {
    fontFamily: "alexandriaMedium",
    fontSize: 16,
    color: "#333333",
    marginLeft: 15,
  },
});

export default Settings;
