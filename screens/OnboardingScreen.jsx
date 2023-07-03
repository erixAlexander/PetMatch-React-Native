import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../components/CustomInputs/CustomTextInput";
import CustomCheckbox from "../components/CustomInputs/CustomCheckbox";
import CustomDropdown from "../components/CustomInputs/CustomDropdown";
import petList from "../utils/petList";
import yearsList from "../utils/yearsList";
import CustomImageInput from "../components/CustomInputs/CustomImageInput";
import CustomAddressSearch from "../components/CustomInputs/CustomAddressSearch";
import CustomSlider from "../components/CustomInputs/CustomSlider";
import CustomSubmitButton from "../components/CustomInputs/CustomSubmitButton";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { REACT_APP_URL } from "@env";

const OnboardingScreen = () => {
  const [locationError, setLocationError] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const [formData, setFormData] = useState({
    user_id: "",
    pet_name: "",
    dob_year: "",
    gender_identity: "",
    type_of_pet: "",
    gender_interest: "",
    about: "",
    looking_for: {
      mate: false,
      friend: false,
      adopt: false,
      give_for_adoption: false,
    },
    user_matches: [],
    images: [],
    pedigree: false,
    address_info: {
      country: "",
      name: "",
      lat: "",
      lon: "",
      full_name: "",
    },
    distance: 40,
    activity: "",
  });
  const navigation = useNavigation();

  const retrieveValue = async () => {
    try {
      const cookies = await AsyncStorage.getItem("cookies");
      if (cookies !== null) {
        const value = JSON.parse(cookies);
        return value;
      } else {
        console.log("Key not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setPlace = (adressInfo) => {
    setFormData((prev) => ({ ...prev, address_info: adressInfo }));
  };

  const setDistance = (val) => {
    setFormData((prev) => ({ ...prev, distance: val }));
  };

  useEffect(() => {
    const getAsyncValue = async () => {
      const val = await retrieveValue();
      setFormData((prev) => ({ ...prev, user_id: val.userId }));
    };
    getAsyncValue();
  }, []);

  const handleChange = (name, val) => {
    if (name == "looking_for") {
      setFormData((prev) => ({
        ...prev,
        [name]: { ...prev[name], [val]: !prev[name][val] },
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async () => {
    if (!formData.address_info.country) {
      setLocationError(
        "You need to select your nearest Location before Submitting"
      );
      return;
    }

    setLocationError(false);
    try {
      const response = await axiosPrivate.put(`${REACT_APP_URL}/user`, {
        formData,
      });
      // Check
      if (response.status == 200) {
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 p-4 relative">
      <ScrollView className="w-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-6 left-2"
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <View className="space-y-4 items-center mt-10">
          <Text className="text-2xl text-center font-bold my-2">
            Create Your Account
          </Text>

          <View className="w-full items-start">
            <Text className="font-bold mb-2">Pet Name</Text>
            <CustomTextInput
              placeholder="Pet Name"
              onChangeText={handleChange}
              value={formData.pet_name}
              name={"pet_name"}
            />
          </View>
          <View className="w-full items-start">
            <Text className="font-bold mb-2">About my pet:</Text>
            <CustomTextInput
              placeholder="About"
              onChangeText={handleChange}
              value={formData.about}
              name={"about"}
            />
          </View>

          <View className="w-full ">
            <Text className="font-bold">My pet is a:</Text>
            <CustomDropdown
              items={petList}
              handleChange={handleChange}
              name={"type_of_pet"}
            />
          </View>
          <View className="w-full ">
            <Text className="font-bold">My pet was born in:</Text>
            <CustomDropdown
              items={yearsList}
              handleChange={handleChange}
              name={"dob_year"}
            />
          </View>

          <View className="items-start justify-start">
            <Text className="font-bold">Looking for:</Text>
            <View className="flex-row flex-wrap items-center">
              <CustomCheckbox
                containerClass={"mr-2 my-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"looking_for"}
                value={"mate"}
                isChecked={formData.looking_for.mate}
                borderColor={"gray-400"}
              />
              <CustomCheckbox
                containerClass={"mr-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"looking_for"}
                value={"friend"}
                isChecked={formData.looking_for.friend}
                borderColor={"gray-400"}
              />
              <CustomCheckbox
                containerClass={"mr-2 w-40"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                handleCheck={handleChange}
                name={"looking_for"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                value={"give_for_adoption"}
                isChecked={formData.looking_for.give_for_adoption}
                borderColor={"gray-400"}
              />
              <CustomCheckbox
                containerClass={"mr-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"looking_for"}
                value={"adopt"}
                isChecked={formData.looking_for.adopt}
                borderColor={"gray-400"}
              />
            </View>
          </View>

          <View className="flex-wrap w-full  justify-start">
            <Text className="font-bold">Gender:</Text>
            <View className="flex-row items-center">
              <CustomCheckbox
                containerClass={"mr-2 my-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"gender_identity"}
                value={"male"}
                isChecked={formData.gender_identity == "male"}
                borderColor={"gray-400"}
              />
              <CustomCheckbox
                containerClass={"mr-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"gender_identity"}
                value={"female"}
                isChecked={formData.gender_identity == "female"}
                borderColor={"gray-400"}
              />
            </View>
          </View>

          <View className="items-start w-full">
            <Text className="font-bold">We like to play with:</Text>
            <View className="flex-row items-center flex-wrap">
              <CustomCheckbox
                containerClass={"mr-2 my-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"gender_interest"}
                value={"male"}
                isChecked={formData.gender_interest == "male"}
                borderColor={"gray-400"}
              />
              <CustomCheckbox
                containerClass={"mr-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"gender_interest"}
                value={"female"}
                isChecked={formData.gender_interest == "female"}
                borderColor={"gray-400"}
              />
              <CustomCheckbox
                containerClass={"mr-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"gender_interest"}
                value={"any"}
                isChecked={formData.gender_interest == "any"}
                borderColor={"gray-400"}
              />
            </View>
          </View>

          <View className="flex-wrap w-full  justify-start">
            <Text className="font-bold">Pedigree:</Text>
            <View className="flex-row items-center">
              <CustomCheckbox
                containerClass={"mr-2 my-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"pedigree"}
                value={true}
                isChecked={formData.pedigree}
                borderColor={"gray-400"}
              />
              <CustomCheckbox
                containerClass={"mr-2"}
                checkedColor={"bg-custom-main"}
                uncheckedColor={"white"}
                uncheckedTextClass={"text-gray-600"}
                checkedTextClass={"font-bold text-white"}
                handleCheck={handleChange}
                name={"pedigree"}
                value={false}
                isChecked={formData.pedigree == false}
                borderColor={"gray-400"}
              />
            </View>
          </View>

          <CustomImageInput formData={formData} setFormData={setFormData} />
          <CustomAddressSearch
            place={formData.address_info}
            setPlace={setPlace}
          />
          <CustomSlider
            distance={formData.distance}
            setDistance={setDistance}
          />

          <CustomSubmitButton handleSubmit={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
