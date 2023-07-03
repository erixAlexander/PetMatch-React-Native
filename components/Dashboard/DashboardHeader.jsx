import { View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_URL } from "@env";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../CustomInputs/CustomText";

const DashboardHeader = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigation();

  const getJWTFromStorage = async () => {
    try {
      const cookies = await AsyncStorage.getItem("cookies");
      if (cookies !== null) {
        const value = JSON.parse(cookies);
        return value.jwt;
      } else {
        console.log("Key not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      const jwt = await getJWTFromStorage();
      await axiosPrivate.get(`${REACT_APP_URL}/logout/native-app`, {
        headers: {
          jwt: jwt,
        },
      });

      await AsyncStorage.removeItem(
        "cookies",
        (err) => err && console.log("cookies, removeItem", err)
      );
      setAuth((prev) => ({ ...prev, accessToken: null }));
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="h-1/6 justify-end items-end p-4">
      <View className="flex-row items-center w-11/12 self-center justify-between">
        <TouchableOpacity onPress={logOut}>
          <FontAwesomeIcon icon={faSignOut} size={24} color="gray" />
        </TouchableOpacity>
        <CustomText
          textToDisplay={"PetM@tch"}
          classes={"text-center"}
          bold={true}
          customStyles={{ fontSize: 28, color: "#fe3072" }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            className="w-14 h-14 rounded-full"
            source={{
              uri: auth.user?.images[0].url,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;
