import * as React from "react";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function useImageLoad() {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const _pickImage = async () => {
    await _askPermission(
      "We need the camera-roll permission to read pictures from your phone..."
    );

    ImagePicker.launchImageLibraryAsync({
      // mediaTypes: 'All',
      // base64: true,
      quality: 0.3,
    })
      .then((response) => {
        if (response) {
          _handleImagePicked(response);
        }
      })
      .catch((error) => console.log(error));
  };

  const _askPermission = async (failureMessage: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "denied") {
      alert(failureMessage);
    }
  };

  const _handleImagePicked = async (pickerResult: any) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        setImage(`${pickerResult.assets[0].uri}`);
      }
    } catch (e) {
      alert("Upload failed, sorry ");
    } finally {
      setUploading(false);
    }
  };

  return { uploading, image, _pickImage };
}
