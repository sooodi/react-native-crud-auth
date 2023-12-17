import React, { FC, ReactElement, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  DevSettings,
} from "react-native";

import Styles from "../utils/Styles";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/auth/auth.action";
import { getData, removeData } from "../store/asyncStorage.service";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const imageb = require("../../assets/avatar.png");

export const Profile: FC<{}> = ({}): ReactElement => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

  let data = useSelector((state) => state?.auth?.userInfo);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    dispatch(logout(data?.token?.refresh));

    getData("@userinformation").then((e) => {
      removeData("@userinformation")
        .then((e) => {
          DevSettings.reload();
        })
        .catch((error) => {});
    });
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.top_view}>
          {data?.user?.image != "" ? (
            <Image source={{ uri: data?.user?.image }} style={styles.image} />
          ) : (
            <Image style={styles.image} source={imageb} />
          )}

          <Text style={styles.text_name}>{"Jhon Due"}</Text>
        </View>
        <TouchableOpacity
          style={[Styles.button, styles.logout_button]}
          onPress={handleSubmit}
        >
          <Text style={Styles.button_label}>{"Logout"}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "90%",
  },
  top_view: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 65,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 40,
  },
  logout_button: {
    backgroundColor: "#DA2828",
    width: "50%",
  },
  text_name: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 60,
  },
});
