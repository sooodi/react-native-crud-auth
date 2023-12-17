import { ActivityIndicator, Text, View, Image, StyleSheet } from "react-native";
import Styles from "../utils/Styles";

const SPLASH_IMAGE = require("../../assets/crud.png");

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={SPLASH_IMAGE} style={styles.image} />
      <Text style={Styles.text_title}>Welcome</Text>
      <ActivityIndicator
        animating
        size="large"
        color="#28A4DA"
        style={{ marginTop: 30 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "50%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Splash;
