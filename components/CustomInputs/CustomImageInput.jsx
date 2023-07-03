import { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CustomImageInput({ formData, setFormData }) {
  const [images, setImages] = useState([]);
  const [getNewImage, setGetNewImage] = useState("first");
  const [error, setError] = useState(null);
  const extensions = ["jpg", "jpeg", "png"];

  const pickImage = async () => {
    setError(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    const extension = result.assets[0].uri.split(".").at(-1);

    if (!extensions.includes(extension.toLowerCase())) {
      setError(
        "You can only upload files with these extensions: jpg, jpeg, png"
      );
      return;
    }

    const base64Str = result.assets[0].base64.length * 2;

    var fileSizeInByte = Math.ceil(base64Str / 4) * 3;

    if (fileSizeInByte > 11e5) {
      setError("File exceeds maximun size");
      return;
    }

    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0].uri]);

      setFormData((prev) => {
        return {
          ...prev,
          images: [
            ...prev.images,
            `data:image/${extension.toLowerCase()};base64,${
              result.assets[0].base64
            }`,
          ],
        };
      });
    }
  };

  useEffect(() => {
    if (images.length < 5 && images.length > 0) {
      setGetNewImage("another");
      return;
    }
    if (images.length > 4) {
      setGetNewImage("maxed");
      return;
    }
  }, [images]);

  return (
    <View className="w-full mt-6 relative space-y-2 items-start justify-start">
      <View className="space-y-2">
        <TouchableOpacity
          className="p-4 w-2/3 bg-custom-main rounded items-center justify-center"
          onPress={
            getNewImage !== "maxed"
              ? pickImage
              : () => {
                  setImages([]);
                  setGetNewImage("first");
                }
          }
        >
          <Text className="text-white font-bold">
            {getNewImage === "first"
              ? `Upload an image of your pet`
              : getNewImage === "another"
              ? "Upload another image?"
              : "Clear Images and upload again?"}
          </Text>
        </TouchableOpacity>
        <Text
          className={`font-bold ${
            getNewImage === "maxed" ? "text-red-500" : "text-black"
          }`}
        >
          {getNewImage === "maxed"
            ? "You already uploaded 5 images"
            : "You can upload up to 5 images"}
        </Text>
      </View>
      <View className="w-2/3 items-center justify-center">
        {error && (
          <Text className="font-bold text-red-500 text-center">{error}</Text>
        )}
      </View>
      <View className="flex-row flex-wrap space-x-2 space-y-3 items-center justify-center">
        {images &&
          images.map((image, i) => (
            <Image
              key={i}
              className="rounded"
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          ))}
      </View>
    </View>
  );
}
