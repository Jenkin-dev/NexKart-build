import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logohead from "../components/logohead";
import SafeView from "../components/safe-view";
import Button from "../components/button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Terms = () => {
  const { width } = Dimensions.get("screen");
  return (
    <SafeAreaView
      style={{ marginHorizontal: width * 0.02, paddingHorizontal: 20, flex: 1 }}
    >
      <Logohead pageDescription={"Welcome to Nexkart!"} />
      <Text style={styles.descriptionText}>
        By continuing you agree to the Terms of Use and Privacy Policy
      </Text>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={styles.topic}>Terms of Use</Text>
        <Text style={styles.terms}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Perspiciatis, voluptas maiores, iusto quibusdam incidunt eaque
          provident molestias, velit dolorem vel doloribus temporibus error
          laborum delectus unde perferendis eum in. Dolor doloremque
          consequuntur vel autem corporis minima sed nobis ullam commodi
          repellendus, quibusdam magni, temporibus iste provident perspiciatis
          illo! Sit expedita, optio hic officiis sequi facere. Ex mollitia
          tenetur maxime voluptate magnam culpa doloremque, soluta recusandae
          cumque repellat vero perferendis officiis beatae fugit adipisci ipsam
          vitae! Doloremque at pariatur dolor dolore sunt, architecto esse
          repellendus quis quasi quos cupiditate necessitatibus, porro natus
          voluptate, recusandae molestiae. Veniam maxime libero impedit ea quasi
          ab voluptatum a quidem! Quod cum qui doloremque eligendi quaerat,
          incidunt maxime minus non nam quo vero quisquam ipsam. Laudantium
          porro vel dolore veniam earum odio repudiandae. Facere accusantium
          dolorem temporibus quaerat eligendi. Veniam at velit aliquam culpa
          perspiciatis quis deleniti nemo qui quae atque, error eaque officia
          ducimus placeat repellat excepturi quibusdam consectetur ipsa
          repudiandae illo delectus harum inventore ullam. Amet natus, ab
          ducimus temporibus consectetur quibusdam autem, voluptatibus unde est
          quo accusantium! Magni distinctio magnam, debitis, saepe aliquam
          temporibus suscipit, exercitationem voluptates laboriosam deserunt
          eligendi porro sed consectetur impedit accusantium dolorem facere
          doloribus tempora. Fugiat accusamus sequi nobis sunt voluptate dolorum
          deleniti nostrum possimus dolorem doloribus. Possimus quo sed
          quibusdam sit quos a deserunt amet praesentium ipsam voluptates
          aliquid, doloremque rerum impedit dolores repudiandae sint nisi esse
          ratione architecto illum accusantium labore aspernatur. Quas iusto,
          molestias nobis repellendus eos vel provident soluta fugit. Vero
          aperiam ea velit aut totam dolor, nisi laboriosam esse sed quibusdam
          vel, alias nesciunt dicta autem! Nulla voluptatem ipsa distinctio
          quibusdam fugiat. Sint laboriosam nostrum saepe odit, veritatis esse
          illum eligendi inventore quia natus quo velit quam aperiam
          voluptatibus pariatur doloribus hic. Labore doloribus culpa, eum quos
          earum, natus beatae aliquam esse repellendus atque amet mollitia
          corrupti! Id sint quibusdam, quisquam dolorem atque voluptatibus quasi
          vel sapiente eos ad! Commodi nisi dignissimos expedita ea vitae
          dolorum sint natus, facere porro officia eveniet tenetur minima qui
          saepe fuga corporis illo vel doloribus at ad dolore. Error sapiente
          porro dolorum vel perferendis voluptates deleniti unde incidunt fugit,
          non adipisci voluptatibus nisi recusandae veritatis doloribus dolores!
          Officia ipsum corporis voluptatem, unde aut veritatis voluptate
          obcaecati ad quasi consectetur, soluta enim laborum nostrum porro ea
          recusandae iste quisquam amet fugiat nesciunt, ut tenetur eaque culpa
          animi! Vero, ad blanditiis. Ut magnam rem ipsa impedit, cupiditate
          quis, sint vitae velit veniam possimus numquam tempore minima?
          Corrupti rem, tempore itaque libero officiis ullam, voluptates
          voluptatibus ex aperiam praesentium doloribus quibusdam architecto
          deserunt sed numquam repellendus nostrum, dolor inventore pariatur
          incidunt expedita est quidem odit. Reprehenderit, quod. Voluptatum
          dicta laboriosam asperiores eum dolor, tenetur sint accusamus? Dolore
          nostrum quisquam error vel vero quibusdam perspiciatis repudiandae
          numquam molestias officiis magnam ullam deserunt praesentium velit
          dolorum ipsam laborum labore ex quasi, odio incidunt. Consequuntur
          architecto aut quia enim reiciendis mollitia porro voluptate non
          deserunt repudiandae officiis assumenda possimus molestiae ad totam
          sequi tempore libero laudantium, dolorem quod, voluptatum provident
          sit magnam? Explicabo, harum.
        </Text>
      </ScrollView>
      <Button
        style={{ marginBottom: 20 }}
        text={"I Agree"}
        textColor={"white"}
        onPress={() => router.push("./Home")}
      />
    </SafeAreaView>
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
