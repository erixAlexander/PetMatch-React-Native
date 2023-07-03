import useAxiosPrivate from "./useAxiosPrivate";
import { REACT_APP_URL } from "@env";
import * as ImagePicker from "expo-image-picker";
const extensions = ["jpg", "jpeg", "png"];

async function selectImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
  });

  const extension = result.assets[0].uri.split(".").at(-1);

  if (!extensions.includes(extension.toLowerCase())) {
    return "You can only upload files with these extensions: jpg, jpeg, png";
  }

  const base64Str = result.assets[0].base64.length * 2;

  var fileSizeInByte = Math.ceil(base64Str / 4) * 3;

  if (fileSizeInByte > 11e5) {
    return "File exceeds maximun size";
  }

  return { result, extension };
}

export function useAddImage() {
  const axiosPrivate = useAxiosPrivate();
  const addImage = async (userId) => {
    try {
      const selected = await selectImage();
      if (typeof selected === "string") {
        return selected;
      }
      if (!selected.result.canceled) {
        const response = await axiosPrivate.put(`${REACT_APP_URL}/add-images`, {
          params: {
            user_id: userId,
            image: `data:image/${selected?.extension.toLowerCase()};base64,${
              selected.result.assets[0].base64
            }`,
          },
        });
        return response.data.image;
      }
      return "No Image selected";
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };
  return addImage;
}

export function useUpdateImage() {
  const axiosPrivate = useAxiosPrivate();
  const updateImage = async (userId, id) => {
    const selected = await selectImage();
    if (typeof selected === "string") {
      return selected;
    }
    try {
      if (!selected.result.canceled) {
        const response = await axiosPrivate.put(
          `${REACT_APP_URL}/update-images`,
          {
            params: {
              user_id: userId,
              image: `data:image/${selected?.extension.toLowerCase()};base64,${
                selected.result.assets[0].base64
              }`,
              id,
            },
          }
        );
        return response.data.image;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return updateImage;
}

export function useDeleteImage() {
  const axiosPrivate = useAxiosPrivate();
  const deleteImage = async (userId, id) => {
    try {
      const response = await axiosPrivate.put(
        `${REACT_APP_URL}/delete-images`,
        {
          params: {
            user_id: userId,
            id,
          },
        }
      );
      return response.data.response.modifiedCount == 1;
    } catch (error) {
      console.log(error);
    }
  };
  return deleteImage;
}
