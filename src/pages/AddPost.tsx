import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Styles from "../utils/Styles";
import ErrorTextComponent from "../components/ErrorTextcomponent";

import Categories from "../components/Categories";
import PostImageComponent from "../components/PostImageComponent";
import {
  clearFlagNewPost,
  createPost,
  getPosts,
} from "../store/post/post.action";
import { useAppDispatch } from "../store/hooks";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { categoryDropdownObj } from "../store/post/post.types";
import LoadingComponent from "../components/Loadingcomponent";

const INIT_ERROR = {
  title: undefined,
  description: undefined,
  Category: undefined,
};
export const AddPosts: FC<{}> = ({}): ReactElement => {
  let postState = useSelector((state) => state?.post);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<categoryDropdownObj>();
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState(INIT_ERROR);

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (postState?.postCreated === true) {
      setTimeout(() => {
        setLoading(false);
        dispatch(clearFlagNewPost());
        goBack();
      }, 1000);
    }
  }, [postState]);

  const handlerDescription = (value) => {
    setDescription(value);
    let error = undefined;
    if (value.length === 0) {
      error = "description is required.";
    }
    setErrors({ ...errors, description: error });
  };

  const handlerTitle = (value) => {
    setTitle(value);
    let error = undefined;
    if (value.length === 0) {
      error = "description is required.";
    }
    setErrors({ ...errors, title: error });
  };

  const handlerCategory = (value) => {
    setCategory(value);
    let error = undefined;
    if (value.length === 0) {
      error = "Select a category";
    }
    setErrors({ ...errors, Category: error });
  };

  const validateForm = () => {
    let errors = INIT_ERROR;

    if (title.length === 0) {
      errors.title = "Title is required.";
    }
    if (description.length === 0) {
      errors.description = "description is required.";
    }
    if (!category) {
      errors.Category = "Select a category";
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
      setLoading(true);
      dispatch(
        createPost({
          title,
          description,
          category: parseInt(category?.key),
          image,
        })
      );
    }
  };

  return (
    <View style={Styles.page_container}>
      <PostImageComponent
        // error={errors?.image}
        error={""}
        setImageFile={(imageFile) => {
          console.log("imageFile", imageFile);
          setImage(imageFile);
        }}
      />

      <View style={Styles.form}>
        <Text style={styles.message}>{"Do not select a large size image"}</Text>
        <TextInput
          style={[Styles.form_input, errors?.title && Styles.error_input]}
          value={title}
          placeholder={"Title"}
          onChangeText={(text) => handlerTitle(text)}
          keyboardType="default"
        />
        <ErrorTextComponent message={errors?.title} />
        <TextInput
          style={[
            Styles.form_input,
            errors?.description !== undefined && Styles.error_input,
          ]}
          value={description}
          placeholder="Description"
          onChangeText={(text: string) => handlerDescription(text)}
        />
        {errors?.description !== undefined && (
          <ErrorTextComponent message={errors?.description} />
        )}
        <Categories setCategory={(value) => handlerCategory(value)} />
        <ErrorTextComponent message={errors?.Category} />
        {loading && (
          <View style={Styles.loading_view}>
            <LoadingComponent message={"Please wait to add this post ... "} />{" "}
          </View>
        )}
        {!loading && (
          <TouchableOpacity onPress={handleSubmit}>
            <View style={Styles.button}>
              <Text style={Styles.button_label}>{"Create"}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "blue",
    fontWeight: 500,
  },
});
