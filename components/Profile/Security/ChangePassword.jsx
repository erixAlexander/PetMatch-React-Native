import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { REACT_APP_URL } from "@env";
import useAuth from "../../../hooks/useAuth";
import useLogout from "../../../hooks/uselogout";

const ChangePassword = () => {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const logOut = useLogout();

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === confirmedPassword);
    setError("");
  }, [password, confirmedPassword]);

  const handleSubmit = async () => {
    if (!validPassword) {
      setError("The password does not meet the requirements");
      return;
    }
    if (!validMatch) {
      setError("The passwords do not match");
      return;
    }
    try {
      const response = await axiosPrivate.put(`${REACT_APP_URL}/profile`, {
        formData: { user_id: auth.user.user_id, password },
      });

      response.status == 200 && (await logOut()) && navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="w-9/12">
      <View className={validPassword ? "items-end" : "hidden"}>
        <FontAwesomeIcon size={20} color="green" icon={faCheck} />
      </View>
      <View
        className={
          validPassword || !password
            ? "hidden"
            : "items-end flex-row justify-between"
        }
      >
        <View className="flex-row space-x-2 items-center">
          <FontAwesomeIcon icon={faInfoCircle} />
          <Text className={password && !validPassword ? "w-5/6" : "hidden"}>
            8 to 24 characters long, include uppercase and lowercase, a number
            and a special character .!@#$%
          </Text>
        </View>
        <FontAwesomeIcon size={20} color="red" icon={faTimes} />
      </View>
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        className="rounded p-2 border mb-6"
        onChangeText={(val) => {
          setPassword(val);
        }}
        value={password}
      />

      <View
        className={validMatch && confirmedPassword ? "items-end" : "hidden"}
      >
        <FontAwesomeIcon color="green" size={20} icon={faCheck} />
      </View>
      <View
        className={validMatch || !confirmedPassword ? "hidden" : "items-end"}
      >
        <View className="flex-row space-x-2 items-center ">
          <FontAwesomeIcon icon={faInfoCircle} />
          <Text
            className={confirmedPassword && !validMatch ? "w-5/6" : "hidden"}
          >
            Password must match
          </Text>
        </View>
        <FontAwesomeIcon color="red" size={20} icon={faTimes} />
      </View>
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        className="rounded p-2 border mb-6"
        onChangeText={(val) => {
          setConfirmedPassword(val);
        }}
        value={confirmedPassword}
      />
      {error && (
        <Text className="text-red-500 font-bold self-center text-center">
          {error}
        </Text>
      )}
      <TouchableOpacity
        className="bg-custom-main mx-20 items-center justify-center p-4 rounded"
        onPress={handleSubmit}
      >
        <Text className="text-white font-bold text-base">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
