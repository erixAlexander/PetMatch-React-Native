import {
  faArrowAltCircleLeft,
  faCamera,
  faPencil,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Image, TouchableOpacity, Text } from "react-native";
import useAuth from "../../hooks/useAuth";
import PromoSlider from "./PromoSlider";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ProfileInfo = ({ setProfileScreen }) => {
  const { auth } = useAuth();
  const [user] = useState(auth.user);
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center gap-24 items-center">
      <View className="absolute top-12 left-4 z-10">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
          <FontAwesomeIcon
            color="#fe3072"
            size={36}
            icon={faArrowAltCircleLeft}
          />
        </TouchableOpacity>
      </View>
      <View className="items-center space-y-4">
        <Image
          className="w-40 h-40 rounded-full"
          source={{ uri: user.images[0].url }}
        />
        <Text className="font-bold text-3xl">{user.pet_name}</Text>
        <TouchableOpacity
          onPress={() => {
            setProfileScreen("images");
          }}
          className="absolute bottom-10 -right-1 bg-custom-main p-3 rounded-full"
        >
          <FontAwesomeIcon icon={faCamera} color="white" size={26} />
        </TouchableOpacity>
      </View>
      <View className="flex-row w-full  items-center justify-center space-x-12">
        <TouchableOpacity
          onPress={() => {
            setProfileScreen("settings");
          }}
          className="items-center gap-1 justify-center w-20 h-20 bg-gray-100 rounded-full -mt-8"
        >
          <FontAwesomeIcon icon={faPencil} size={20} />
          <Text className="text-xs">Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setProfileScreen("security");
          }}
          className="items-center gap-1 justify-center  w-20 h-20 bg-gray-100 rounded-full"
        >
          <FontAwesomeIcon icon={faShield} size={20} />
          <Text className="text-xs">Security</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setProfileScreen("images");
          }}
          className="items-center gap-1 justify-center  w-20 h-20 bg-gray-100 rounded-full -mt-8"
        >
          <FontAwesomeIcon icon={faCamera} size={20} />
          <Text className="text-xs">Images</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full items-center">
        <PromoSlider />
      </View>
    </View>
  );
};

export default ProfileInfo;
