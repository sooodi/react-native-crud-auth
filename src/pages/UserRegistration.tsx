import React, { FC, ReactElement, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { manipulateAsync } from "expo-image-manipulator";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import Styles from "../utils/Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import ErrorTextComponent from "../components/ErrorTextcomponent";

import AvatarComponent from "../components/AvtarComponent";
import { Base_URL, checkEmail, checkPassword } from "../utils/functionHandler";
import LoadingComponent from "../components/Loadingcomponent";

const INIT_ERROR = {
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
  image: undefined,
};
export const UserRegistration: FC<{}> = ({}): ReactElement => {
  const { goBack } = useNavigation<StackNavigationProp<ParamListBase>>();

  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(INIT_ERROR);

  const validateForm = () => {
    let errors = INIT_ERROR;

    if (!firstname) {
      errors.firstname = "firstame is required.";
    }
    if (!lastname) {
      errors.lastname = "Lastname is required.";
    }

    errors.email = checkEmail(email);
    errors.password = checkPassword(password);

    if (confirmPassword !== password) {
      errors.confirmPassword = "Confirm Password is not same to password.";
    }
    if (!image) {
      errors.image = "Click and Add a Avatar.";
    }
    // Set the errors and update form validity
    setErrors(errors);
    return errors;
  };

  const handleSubmit = async () => {
    let result = validateForm();

    let isFormNotValid = Object.keys(result).some(function (k) {
      return errors[k] !== undefined;
    });

    if (!isFormNotValid) {
      // Form is valid, perform the submission logic

      // dispatch(
      //   register({
      //     email,
      //     first_name: firstname,
      //     last_name: lastname,
      //     password,r
      //     image,
      //   })
      setLoading(true);
      let resizedImage = image;

      if (image.hasOwnProperty("uri")) {
        const manipulateResult = await manipulateAsync(
          image,
          [],
          { compress: 0.2 } // from 0 to 1 "1 for best quality"
        );
        resizedImage = manipulateResult.uri;
      }

      let uriArray = resizedImage.split(".");
      let fileType = uriArray[uriArray.length - 1];

      var formData: any = new FormData();
      const data = {
        uri: resizedImage,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      };
      formData.append("first_name", firstname);
      formData.append("last_name", lastname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", data);

      fetch(Base_URL + "api/user/sign-up/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data ",
        },

        credentials: "include",
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          if (responseJson?.message) goBack();
          else setErrors(responseJson);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    }
  };
  return (
    <View style={Styles.login_wrapper}>
      <Text style={Styles.text_title}>SIGN Up</Text>
      <AvatarComponent
        error={errors?.image}
        setImageFile={(imageFile) => {
          setImage(imageFile);
        }}
      />
      <View style={Styles.form}>
        <TextInput
          style={[Styles.form_input, errors?.firstname && Styles.error_input]}
          value={firstname}
          placeholder={"Username"}
          onChangeText={(text) => setFirstname(text)}
          autoCapitalize={"none"}
        />

        <ErrorTextComponent message={errors?.firstname} />

        <TextInput
          style={[Styles.form_input, errors?.lastname && Styles.error_input]}
          value={lastname}
          placeholder={"Lastname"}
          onChangeText={(text) => setLastname(text)}
        />

        <ErrorTextComponent message={errors?.lastname} />

        <TextInput
          style={[Styles.form_input, errors?.email && Styles.error_input]}
          value={email}
          placeholder={"Email"}
          keyboardType={"email-address"}
          onChangeText={(text) => setEmail(text)}
        />
        <ErrorTextComponent message={errors?.email} />
        <TextInput
          style={[Styles.form_input, errors?.password && Styles.error_input]}
          value={password}
          placeholder={"Password"}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <ErrorTextComponent message={errors?.password} />

        <TextInput
          style={[
            Styles.form_input,
            errors?.confirmPassword && Styles.error_input,
          ]}
          value={confirmPassword}
          placeholder={"Confirm Password"}
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <ErrorTextComponent message={errors?.confirmPassword} />
        {loading && <LoadingComponent />}
        {!loading && (
          <>
            <TouchableOpacity onPress={() => handleSubmit()}>
              <View style={Styles.button}>
                <Text style={Styles.button_label}>{"Sign Up"}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.footer_view}
              onPress={() => goBack()}
            >
              <Text style={Styles.login_footer_text}>
                {"Already have an account? "}
              </Text>
              <Text style={Styles.login_footer_link}>{"Log In"}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};
