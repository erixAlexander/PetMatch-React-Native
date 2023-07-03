import { Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavButtons from "./NavButtons";
import useAuth from "../../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_URL } from "@env";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Navbar = () => {
  const navigation = useNavigation();
  const { setIsSignUp, auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleSignUp = () => {
    navigation.navigate("Login");
    setIsSignUp(true);
  };

  const handleLogIn = () => {
    navigation.navigate("Login");
    setIsSignUp(false);
  };

  const goToDashboard = () => {
    navigation.navigate("Dashboard");
  };

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-row mt-8 mx-6 items-center justify-between">
      <Image className="w-20 h-20" source={require("../../assets/logo.png")} />
      <View className="flex-row space-x-4">
        {auth.accessToken == null ? (
          <NavButtons
            firstText={"Log In"}
            secondText={"Sign Up"}
            handleFirstButton={handleLogIn}
            handleSecondButton={handleSignUp}
          />
        ) : (
          <NavButtons
            firstText={"Dashboard"}
            secondText={"Log Out"}
            handleFirstButton={goToDashboard}
            handleSecondButton={logOut}
          />
        )}
      </View>
    </View>
  );
};

export default Navbar;
