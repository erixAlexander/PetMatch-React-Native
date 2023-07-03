import { useState } from "react";
import { View, Text } from "react-native";
import useAuth from "../../../hooks/useAuth";
import CustomCheckbox from "../../CustomInputs/CustomCheckbox";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { REACT_APP_URL } from "@env";
import { TouchableOpacity } from "react-native";

const ChangePreferences = () => {
  const { auth, setAuth } = useAuth();
  const [formData, setFormData] = useState({
    user_id: auth.user.user_id,
    pedigree: auth.user.pedigree,
    gender_interest: auth.user.gender_interest,
    gender_identity: auth.user.gender_identity,
    looking_for: {
      mate: auth.user.looking_for.mate,
      friend: auth.user.looking_for.friend,
      adopt: auth.user.looking_for.adopt,
      give_for_adoption: auth.user.looking_for.give_for_adoption,
    },
  });
  const axiosPrivate = useAxiosPrivate();
  const [response, setResponse] = useState(false);

  const handleChange = (name, value) => {
    setResponse(false);
    if (name == "looking_for") {
      setFormData((prev) => ({
        ...prev,
        [name]: { ...prev[name], [value]: !prev[name][value] },
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivate.put(`${REACT_APP_URL}/profile`, {
        formData,
      });

      setAuth((prev) => {
        return {
          ...prev,
          user: {
            ...prev.user,
            ...formData,
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
      <View className="w-full ml-32 mt-2 flex-wrap">
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

      <View className="w-full ml-32 mt-2">
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

      <View className="w-full ml-32 mt-2">
        <Text className="font-bold">My pet's gender:</Text>
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
      <View className="w-full ml-32 mt-2">
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

export default ChangePreferences;
