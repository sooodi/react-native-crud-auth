import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";

import { UserRegistration } from "../pages/UserRegistration";
import { UserLogIn } from "../pages/UserLogIn";
import Styles from "../utils/Styles";
import Colors from "../utils/Colors";

const AuthAtack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthAtack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Sign in"
    >
      <AuthAtack.Screen name="Sign in" component={UserLogInScreen} />
      <AuthAtack.Screen name="Sign up" component={UserRegistrationScreen} />
    </AuthAtack.Navigator>
  );
}

function UserRegistrationScreen() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <UserRegistration />
      </SafeAreaView>
    </>
  );
}
function UserLogInScreen() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <UserLogIn />
      </SafeAreaView>
    </>
  );
}
