import AsyncStorage from "@react-native-async-storage/async-storage";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { REACT_APP_URL } from "@env";

export default function useLogout() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();

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
      console.log("Success");

      await AsyncStorage.removeItem(
        "cookies",
        (err) => err && console.log("cookies, removeItem", err)
      );
      setAuth((prev) => ({ ...prev, accessToken: null }));
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  return logOut;
}
