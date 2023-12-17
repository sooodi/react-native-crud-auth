import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigator from "./AuthStackNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getDatas } from "../store/asyncStorage.service";
import { useAppDispatch } from "../store/hooks";
import { LOGIN_SUCCESS } from "../store/types";
import LoadingComponent from "../components/Loadingcomponent";
import Splash from "../components/Splash";
import { isLogin } from "../store/auth/auth.action";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [islogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  function checkUser() {
    getDatas("@userinformation")
      .then((e) => {
        console.log(e);
        if (e && e?.token?.access) {
          setIsLogin(true);
          dispatch(isLogin(e));
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }
  useEffect(() => {
    checkUser();
  }, []);
  if (loading) return <Splash />;
  else
    return (
      <NavigationContainer>
        {!islogin ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Auth"
              options={{
                headerShown: false,
              }}
              component={AuthStackNavigator}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Root"
              component={BottomTabNavigator}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Root"
              component={BottomTabNavigator}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
}
