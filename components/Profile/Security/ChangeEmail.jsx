import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useRef, useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { REACT_APP_URL } from "@env";
import useAuth from "../../../hooks/useAuth";
import useLogout from "../../../hooks/uselogout";
import { useNavigation } from "@react-navigation/native";

const ChangeEmail = () => {
  const { auth } = useAuth();
  const USER_REGEX = /.+@.+\.[A-Za-z]{1,23}$/;
  const emailRef = useRef();
  const [email, setEmail] = useState(auth.user.email);
  const [validEmail, setValidEmail] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const logOut = useLogout();
  const navigation = useNavigation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(USER_REGEX.test(email));
    setError("");
  }, [email]);

  const handleSubmit = async () => {
    try {
      if (!validEmail) {
        setError("This is not a valid email");
        return;
      }
      const response = await axiosPrivate.put(`${REACT_APP_URL}/profile`, {
        formData: { user_id: auth.user.user_id, email },
      });
      // Noted
      response.status == 200 && (await logOut()) && navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="w-9/12">
      <View className={validEmail ? "items-end justify-end" : "hidden"}>
        <FontAwesomeIcon size={20} color="green" icon={faCheck} />
      </View>
      <View
        className={
          validEmail || !email
            ? "hidden"
            : "items-center justify-between flex-row"
        }
      >
        <View className="flex-row space-x-2 items-center">
          <FontAwesomeIcon icon={faInfoCircle} />
          <Text className={email && !validEmail ? "" : "hidden"}>
            Please enter a valid Email
          </Text>
        </View>
        <FontAwesomeIcon size={20} color="red" icon={faTimes} />
      </View>
      <TextInput
        ref={emailRef}
        placeholder="Email"
        className="rounded p-2 border"
        onChangeText={(val) => setEmail(val)}
        value={email}
      />
      {error && (
        <Text className="text-red-500 font-bold self-center text-center">
          {error}
        </Text>
      )}

      <TouchableOpacity
        className="bg-custom-main mx-20 items-center justify-center p-4 rounded mt-6"
        onPress={handleSubmit}
      >
        <Text className="text-white font-bold text-base">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeEmail;
