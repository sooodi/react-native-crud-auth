import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import Styles from "../utils/Styles";

type props = { message?: string };

const LoadingComponent = ({ message }: props) => {
  return (
    <View style={Styles.page_container}>
      <ActivityIndicator
        animating
        size="large"
        color="#0000ee"
        style={{ marginTop: 20 }}
      />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    fontWeight: 500,
  },
});

export default LoadingComponent;
