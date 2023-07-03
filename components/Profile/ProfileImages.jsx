import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowAltCircleLeft,
  faCamera,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  useAddImage,
  useDeleteImage,
  useUpdateImage,
} from "../../hooks/useImageHandler";
import Loader from "../CustomLoader/CustomLoader";

const ProfileImages = ({ setProfileScreen }) => {
  const { auth, setAuth } = useAuth();
  const addImage = useAddImage();
  const updateImage = useUpdateImage();
  const deleteImage = useDeleteImage();
  const [loading, setLoading] = useState(null);

  const [images, setImages] = useState([
    ...auth?.user?.images,
    ...new Array(5 - auth?.user?.images?.length).keys(),
  ]);
  const [overlay, setOverlay] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImages([
      ...auth?.user?.images,
      ...new Array(5 - auth?.user?.images?.length).keys(),
    ]);
    setOverlay(null);
  }, [auth]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <TouchableOpacity
        className="absolute top-12 left-4"
        onPress={() => {
          setProfileScreen("info");
        }}
      >
        <FontAwesomeIcon
          color="#fe3072"
          size={36}
          icon={faArrowAltCircleLeft}
        />
      </TouchableOpacity>
      <Text className="mt-24 font-bold text-2xl">Edit Your Pictures</Text>
      <View className="flex-1 flex-row flex-wrap gap-6 w-full items-center justify-center mt-12">
        {images?.map((image, i) => {
          return (
            <View key={i} className="items-start flex-row flex-wrap">
              <TouchableOpacity
                className={`border-2 border-gray-200 rounded ${
                  i == 0 && "mr-2"
                }`}
                onPress={() => {
                  if (i === overlay) {
                    setOverlay(null);
                  } else if (i !== overlay) {
                    setOverlay(i);
                  }
                }}
              >
                <Image
                  className={i == 0 ? "w-40 h-40 " : "w-32 h-32 "}
                  source={
                    image.url
                      ? { uri: image.url }
                      : require("../../assets/images/user.jpg")
                  }
                />

                {overlay == i && (
                  <View
                    style={{ backgroundColor: "#00000080" }}
                    className={`bg-gray-800 absolute flex-1 ${
                      i == 0 ? "w-40 h-40" : "w-32 h-32"
                    } flex-row items-center justify-center space-x-1`}
                  >
                    {image?.id ? (
                      loading == i ? (
                        <Loader />
                      ) : (
                        <>
                          <TouchableOpacity
                            onPress={async () => {
                              setLoading(i);
                              const result = await updateImage(
                                auth?.user.user_id,
                                image.id
                              );

                              setAuth((prev) => {
                                prev.user.images.splice(i, 1, result);
                                return {
                                  ...prev,
                                  user: {
                                    ...prev.user,
                                    images: prev.user.images,
                                  },
                                };
                              });
                              setLoading(null);
                            }}
                            className="z-20 bg-gray-800 p-4 rounded"
                          >
                            <FontAwesomeIcon
                              icon={faPencil}
                              color="white"
                              size={20}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={async () => {
                              setLoading(i);
                              const deleted = await deleteImage(
                                auth.user.user_id,
                                image.id
                              );

                              if (deleted) {
                                setAuth((prev) => {
                                  return {
                                    ...prev,
                                    user: {
                                      ...prev.user,
                                      images: prev.user.images.filter(
                                        (img) => img.id !== image.id
                                      ),
                                    },
                                  };
                                });
                              } else {
                                setError({
                                  index: i,
                                  result: "Something went wrong.",
                                });
                              }
                              setLoading(null);
                            }}
                            className="bg-white p-4 rounded"
                          >
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              color="black"
                              size={20}
                            />
                          </TouchableOpacity>
                        </>
                      )
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={async () => {
                            setLoading(i);
                            setError(null);
                            const result = await addImage(auth.user.user_id);
                            result?.id
                              ? setAuth((prev) => {
                                  return {
                                    ...prev,
                                    user: {
                                      ...prev.user,
                                      images: [...prev.user.images, result],
                                    },
                                  };
                                })
                              : setError({ index: i, result });
                            setLoading(null);
                          }}
                          className="bg-white p-4 rounded"
                        >
                          {loading == i ? (
                            <Loader />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCamera}
                              color="black"
                              size={26}
                            />
                          )}
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                )}
              </TouchableOpacity>
              {i == 0 && (
                <View>
                  <Text className="font-bold text-lg mb-2 text-custom-main">
                    Profile Picture
                  </Text>
                  <Text>
                    <Text className="font-bold">Name: </Text>
                    {auth.user.pet_name}
                  </Text>
                  <Text>
                    <Text className="font-bold">Gender: </Text>
                    {auth.user.gender_identity}
                  </Text>
                </View>
              )}
              {error?.index === i && (
                <Text className="text-red-500 font-bold text-xs">
                  {error?.result}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default ProfileImages;
