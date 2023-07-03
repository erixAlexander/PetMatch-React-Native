import { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { REACT_APP_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../hooks/useAuth";
import CustomText from "../CustomInputs/CustomText";

const SignIn = ({ isSignUp, setIsSignUp }) => {
  const { setAuth } = useAuth();
  const USER_REGEX = /.+@.+\.[A-Za-z]{1,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [error, setError] = useState("");
  const navigation = useNavigation();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(error);
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(USER_REGEX.test(email));
    setError("");
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === confirmedPassword);
    setError("");
  }, [password, confirmedPassword]);

  const handleSubmit = async () => {
    try {
      if (!validEmail) {
        setError("You need to enter a valid Email address");
        return;
      }
      if (!validPassword) {
        setError(
          `Password must be 8 to 24 characters long. Must include uppercase and lowercase letters, a number and a special character .!@#$%`
        );
        return;
      }
      if (isSignUp && !validMatch) {
        setError("Passwords need to match");
        return;
      }

      const response = await axios.post(
        `${REACT_APP_URL}/${isSignUp ? "signup" : "login"}/native-app`,
        { email, password },
        { withCredentials: true }
      );
      if (!response) console.log("No response from server");
      storeData(
        "cookies",
        JSON.stringify({
          userId: response.data.userId,
          jwt: response.data.jwt,
          accessToken: response.data.token,
          date: new Date(Date.now() + 3600 * 1000 * 24),
        })
      );
      setAuth((prev) => ({ ...prev, accessToken: response.data.token }));
      const success = response.status === 201;
      if (success && isSignUp) navigation.navigate("Onboarding");
      if (success && !isSignUp) navigation.navigate("Dashboard");
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="w-full bg-gray-100 h-full items-center justify-center">
      <View className="bg-white rounded px-10 pt-10 w-11/12 h-5/6 min-h-1000 relative">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="absolute top-3 right-5"
        >
          <FontAwesomeIcon icon={faXmarkCircle} size={32} color="black" />
        </TouchableOpacity>

        <CustomText
          textToDisplay={isSignUp ? "Create an Account" : "Log In"}
          classes="text-center mb-10 text-3xl mt-4"
          bold={true}
        />

        <ScrollView>
          <View>
            <View className={validEmail ? "flex-1 items-end" : "hidden"}>
              <FontAwesomeIcon size={20} color="green" icon={faCheck} />
            </View>
            <View
              className={
                validEmail || !email
                  ? "hidden"
                  : "flex-1 items-center justify-between flex-row"
              }
            >
              <View className="flex-row space-x-2 items-center">
                <FontAwesomeIcon icon={faInfoCircle} />
                <CustomText
                  textToDisplay={"Please enter a valid Email"}
                  classes={email && !validEmail ? "ml-2" : "hidden"}
                />
              </View>
              <FontAwesomeIcon size={20} color="red" icon={faTimes} />
            </View>
            <TextInput
              ref={emailRef}
              placeholder="Email"
              className="rounded p-2 border mb-6"
              onChangeText={(val) => setEmail(val)}
              value={email}
            />

            <View className={validPassword ? "flex-1 items-end" : "hidden"}>
              <FontAwesomeIcon size={20} color="green" icon={faCheck} />
            </View>
            <View
              className={
                validPassword || !password
                  ? "hidden"
                  : "flex-1 items-end flex-row justify-between"
              }
            >
              <View className="flex-row space-x-2 items-center ">
                <FontAwesomeIcon icon={faInfoCircle} />
                <CustomText
                  textToDisplay={`Must be 8 to 24 characters long, include uppercase and lowercase letters, a number and a special character .!@#$%`}
                  classes={password && !validPassword ? "w-5/6 ml-2" : "hidden"}
                />
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
            {isSignUp && (
              <>
                <View
                  className={
                    validMatch && confirmedPassword
                      ? "flex-1 items-end"
                      : "hidden"
                  }
                >
                  <FontAwesomeIcon color="green" size={20} icon={faCheck} />
                </View>
                <View
                  className={
                    validMatch || !confirmedPassword
                      ? "hidden"
                      : "flex-1 items-end"
                  }
                >
                  <View className="w-full flex-row items-center justify-start">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <CustomText
                      classes={
                        confirmedPassword && !validMatch
                          ? "w-5/6 ml-2"
                          : "hidden"
                      }
                      textToDisplay={"Password must match"}
                    />
                    <FontAwesomeIcon color="red" size={20} icon={faTimes} />
                  </View>
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
              </>
            )}
            <TouchableOpacity
              className="bg-custom-main mx-20 items-center justify-center p-4 rounded"
              onPress={handleSubmit}
            >
              <CustomText
                className=""
                textToDisplay={"Submit"}
                customStyles={{ color: "white", fontSize: 15 }}
                bold={true}
              />
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-between">
            <View className="items-center  mt-6">
              {isSignUp ? (
                <TouchableOpacity
                  className=""
                  onPress={() => setIsSignUp(false)}
                >
                  <CustomText
                    textToDisplay={"Already have an account?"}
                    bold={true}
                    classes=""
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setIsSignUp(true)}>
                  <CustomText
                    textToDisplay={"Don't have an account yet?"}
                    bold={true}
                    classes=""
                  />
                </TouchableOpacity>
              )}
            </View>
            <View>
              <Text className="text-center text-red-600">{error}</Text>
              <CustomText
                textToDisplay={"PetM@tch"}
                classes={"text-center"}
                bold={true}
                customStyles={{ fontSize: 34 }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
