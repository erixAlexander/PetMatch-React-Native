import { useState } from "react";
import { View, Text } from "react-native";
import useAuth from "../../../hooks/useAuth";
import CustomTextInput from "../../CustomInputs/CustomTextInput";
import CustomDropdown from "../../CustomInputs/CustomDropdown";
import yearsList from "../../../utils/yearsList";
import petList from "../../../utils/petList";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { REACT_APP_URL } from "@env";
import { TouchableOpacity } from "react-native";

const ChangePersonalInfo = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState({
    user_id: auth.user.user_id,
    pet_name: auth.user.pet_name,
    about: auth.user.about,
    dob_year: auth.user.dob_year,
    type_of_pet: auth.user.type_of_pet,
  });

  const [response, setResponse] = useState(false);

  const onChangeText = (name, value) => {
    setResponse(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivate.put(`${REACT_APP_URL}/profile`, {
        formData,
      });
      // Noted
      setAuth((prev) => {
        return {
          ...prev,
          user: {
            ...prev.user,
            pet_name: formData.pet_name,
            about: formData.about,
            dob_year: formData.dob_year,
            type_of_pet: formData.type_of_pet,
          },
        };
      });

      response.status == 200 && setResponse(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="w-full  items-center">
      <View className="w-full ml-32 mt-2">
        <Text className="font-bold">Pet Name:</Text>
        <CustomTextInput
          value={formData.pet_name}
          name={"pet_name"}
          placeholder={"Pet Name"}
          onChangeText={onChangeText}
        />
      </View>
      <View className="w-full ml-32 mt-2">
        <Text className="font-bold">About:</Text>
        <CustomTextInput
          value={formData.about}
          name={"about"}
          placeholder={"About"}
          onChangeText={onChangeText}
        />
      </View>
      <View className="w-full ml-32 mt-2">
        <Text className="font-bold">Year of birth:</Text>
        <CustomDropdown
          items={yearsList}
          handleChange={onChangeText}
          name={"dob_year"}
        />
      </View>
      <View className="w-full ml-32 mt-2">
        <Text className="font-bold">Type of pet:</Text>
        <CustomDropdown
          items={petList}
          handleChange={onChangeText}
          name={"type_of_pet"}
        />
      </View>
      {response && (
        <Text className="text-green-600 font-bold">
          Profile updated succesfully!
        </Text>
      )}
      <TouchableOpacity
        className="bg-custom-main items-center justify-center py-4 px-8 rounded mt-6"
        onPress={handleSubmit}
      >
        <Text className="text-white font-bold text-base">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePersonalInfo;
