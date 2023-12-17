import * as React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

import useImageLoad from "../utils/useImageLoad";

const POST_EMPTY = require("../../assets/post.png");
import Styles from "../utils/Styles";
import { useEffect } from "react";
import LoadingComponent from "./Loadingcomponent";
import ErrorTextComponent from "./ErrorTextcomponent";
type Props = { setImageFile(imageFile: any): void; error: string };

const AvatarComponent = ({ setImageFile, error }: Props) => {
  const { uploading, image, _pickImage } = useImageLoad();

  const _maybeRenderUploadingIndicator = () => {
    if (uploading) {
      return <LoadingComponent />;
    }
  };

  const _maybeRenderImage = () => {
    const getImage = async () => {
      !uploading && _pickImage();
    };
    function handleParent() {
      setImageFile(image);
    }
    useEffect(() => {
      handleParent();
    }, [image]);

    return (
      <TouchableOpacity style={Styles.login_header} onPress={getImage}>
        <Image
          source={image != "" ? { uri: image } : POST_EMPTY}
          style={Styles.login_header_logo}
        />
        <View style={styles.text}>
          <ErrorTextComponent message={error} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.container]}>
      {_maybeRenderUploadingIndicator()}
      {_maybeRenderImage()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AvatarComponent;
