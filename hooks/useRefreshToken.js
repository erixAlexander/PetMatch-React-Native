import axios from "axios";
import useAuth from "./useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_URL } from "@env";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  retrieveData = async () => {
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

  const refresh = async () => {
    const value = await retrieveData();
    const config = {
      headers: {
        jwt: value,
      },
    };
    const response = await axios.get(
      `${REACT_APP_URL}/refresh/native-app`,
      config
    );
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
