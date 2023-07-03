import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetStorage = async () => {
  let cookies = null;
  const getValue = async () => {
    try {
      const stringvalue = await AsyncStorage.getItem("cookies");
      if (stringvalue !== null) {
        cookies = JSON.parse(cookies);
      } else {
        return "Key not found";
      }
    } catch (error) {
      console.log(error);
    }
  };
  await getValue();

  return cookies;
};

export default useGetStorage;
