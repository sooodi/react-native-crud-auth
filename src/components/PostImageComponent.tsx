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
import LoadingComponent from "./Loadingcomponent";
import { useEffect } from "react";

const POST_EMPTY = require("../../assets/post.png");

type Props = { setImageFile(imageFile: any): void; error: string };
export default function PostImageComponent({ setImageFile, error }: Props) {
  const { uploading, image, _pickImage } = useImageLoad();

  const _maybeRenderUploadingIndicator = () => {
    if (uploading) {
      return <LoadingComponent />;
    }
  };
  function handleParent() {
    setImageFile(image);
  }
  useEffect(() => {
    handleParent();
  }, [image]);

  const _maybeRenderImage = () => {
    const run = async () => {
      !uploading && _pickImage();
    };

    return (
      <TouchableOpacity onPress={run}>
        {image != "" ? (
          <Image source={{ uri: image }} style={stylesPostImage.image} />
        ) : (
          <Image style={stylesPostImage.image} source={POST_EMPTY} />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={[{}, stylesPostImage.container]}>
      {_maybeRenderUploadingIndicator()}
      {_maybeRenderImage()}
    </View>
  );
}
const stylesPostImage = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 40,
  },
});
