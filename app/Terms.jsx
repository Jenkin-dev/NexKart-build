import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Logohead from "../components/logohead";
import SafeView from "../components/safe-view";
import Button from "../components/button";
import { router } from "expo-router";

const Terms = () => {
  return (
    <SafeView style={{ paddingHorizontal: 20 }}>
      <Logohead pageDescription={"Welcome to Nexkart!"} />
      <Text style={styles.descriptionText}>
        By continuing you agree to the Terms of Use and Privacy Policy
      </Text>
      <ScrollView>
        <Text style={styles.topic}>Terms of Use</Text>
        <Text style={styles.terms}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum
          repellendus illum ea nulla fuga eveniet vitae perspiciatis esse ipsa
          ducimus facilis eum ex, tempore voluptate, velit maxime possimus sit
          fugit dolorum laboriosam. Eligendi incidunt laudantium delectus ver
          aspernatur cu fugit doloremque, consequatur odit quis impedit rem
          aperiam laborum repudiandae nulla non odio magni consectetur autem
          debitis sint accusamus! Eum vel ipsam debitis sequi officia. Voluptas,
          adipisci a aut porro aliquam quibusdam ex consequatur blanditiis
          corrupti officiis voluptatem distinctio voluptatum rerum qui quam
          doloribus illo necessitatibus expedita. Repellendus aut ullam iste
          sint quibusdam dolorem rerum ducimus cumque voluptas. Sit nam
          asperiores omnis possimus tempore aspernatur distinctio a ipsam nulla
          iure provident tenetur velit quasi ad repellat mollitia, sed assumenda
          minima, at, magnam officiis. Nulla fuga deserunt dolore non!
          Cupiditate illum iste nulla quae qui necessitatibus pariatur similique
          excepturi illo hic.
        </Text>
      </ScrollView>
      <Button
        style={{ marginBottom: 20 }}
        text={"I Agree"}
        textColor={"white"}
        onPress={() => router.push("./Home")}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    fontFamily: "alexandriaLight",
    fontSize: 19,
  },

  topic: {
    fontFamily: "alexandriaMedium",
    paddingBottom: 2,
  },

  terms: {
    fontFamily: "alexandriaRegular",
    textAlign: "justify",
  },
});

export default Terms;
