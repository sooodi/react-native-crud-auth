import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import Styles from "../utils/Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import { login } from "../store/auth/auth.action";
import { useAppDispatch } from "../store/hooks";
import LoadingComponent from "../components/Loadingcomponent";
import ErrorTextComponent from "../components/ErrorTextcomponent";
import { checkEmail, checkPassword } from "../utils/functionHandler";

const INIT_ERROR = {
  Email: undefined,
  Password: undefined,
};

export const UserLogIn: FC<{}> = ({}): ReactElement => {
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(INIT_ERROR);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  let data = useSelector((state) => state?.auth);

  useEffect(() => {
    if (data?.error) setLoading(false);
    if (data?.userInfo) {
      navigate("Root", { screen: "Posts" });
    }
  }, [data]);

  const validateForm = () => {
    let errors = INIT_ERROR;

    errors.Email = checkEmail(email);
    errors.Password = checkPassword(password);

    setErrors(errors);

    return errors;
  };

  const handleSubmit = async () => {
    let result = validateForm();

    let isFormNotValid = Object.keys(result).some(function (k) {
      return errors[k] !== undefined;
    });

    if (!isFormNotValid) {
      setLoading(true);
      dispatch(login(email, password, isChecked));
    } else setLoading(false);
  };

  const handleOnChange = (value, key) => {
    let error = undefined;
    if (value.length === 0) {
      error = `${key} is required.`;
    }
    setErrors({ ...errors, [key]: error });
  };

  return (
    <>
      <View style={Styles.login_wrapper}>
        <Text style={Styles.text_title}>SIGN IN</Text>
        <View style={Styles.form}>
          <TextInput
            style={[Styles.form_input, errors?.Email && Styles.error_input]}
            value={email}
            placeholder={"Email"}
            onChangeText={(value) => {
              setEmail(value);
              handleOnChange(value, "Email");
            }}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />
          <ErrorTextComponent message={errors?.Email} />
          <TextInput
            style={[Styles.form_input, errors?.Password && Styles.error_input]}
            value={password}
            placeholder={"Password"}
            secureTextEntry
            onChangeText={(value) => {
              setPassword(value);
              handleOnChange(value, "password");
            }}
          />
          <ErrorTextComponent message={errors?.Password} />
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#28A4DA" : undefined}
            />
            <Text style={styles.paragraph}>Remember me</Text>
          </View>
          {loading && <LoadingComponent />}
          {!loading && (
            <>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <View style={Styles.button}>
                  <Text style={Styles.button_label}>{"Sign in"}</Text>
                </View>
              </TouchableOpacity>
              {data?.error && !loading && (
                <View style={styles.error_view}>
                  <ErrorTextComponent
                    message={"Wrong username or password !"}
                  />
                </View>
              )}
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.link_button}
          onPress={() => navigate("Sign up")}
        >
          <Text style={Styles.login_footer_text}>
            {"Don't have an account? "}
            <Text style={Styles.login_footer_link}>{"Sign up"}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  link_button: {
    marginTop: 20,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    marginHorizontal: 8,
    borderColor: "#28A4DA",
  },
  error_view: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
