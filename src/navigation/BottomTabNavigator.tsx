import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../utils/Colors";
import { Posts } from "../pages/Posts";
import { Profile } from "../pages/Profile";
import { AddPosts } from "../pages/AddPost";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Posts"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="MY Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 15,
          },
          tabBarIconStyle: { display: "none" },
        }}
      />
      <BottomTab.Screen
        name="Posts"
        component={TabProfileNavigator}
        options={{
          headerShown: false,
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 15,
          },
          tabBarIconStyle: { display: "none" },
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabProfileStack = createStackNavigator();

function TabProfileNavigator() {
  const colorScheme = useColorScheme();
  return (
    <TabProfileStack.Navigator>
      <TabProfileStack.Screen
        name="PostAll"
        component={Posts}
        options={{ headerShown: false }}
      />
      <TabProfileStack.Screen
        name="Add Post"
        component={AddPosts}
        options={{
          headerTitle: "CREATE POST",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 15,
            color: Colors[colorScheme].tint,
          },
        }}
      />
    </TabProfileStack.Navigator>
  );
}
