import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import useAuth from "../../../hooks/useAuth";
import CustomAddressSearch from "../../CustomInputs/CustomAddressSearch";
import CustomSlider from "../../CustomInputs/CustomSlider";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { REACT_APP_URL } from "@env";

const ChangeAddressInfo = () => {
  const { auth, setAuth } = useAuth();
  const [formData, setFormData] = useState({
    user_id: auth.user.user_id,
    address_info: {
      country: auth.user.address_info.country,
      name: auth.user.address_info.name,
      lat: auth.user.address_info.lat,
      lon: auth.user.address_info.lon,
      full_name: auth.user.address_info.full_name,
    },
    distance: auth.user.distance,
  });
  const axiosPrivate = useAxiosPrivate();
  const [response, setResponse] = useState(false);

  const setPlace = (adressInfo) => {
    response && setResponse(false);
    setFormData((prev) => ({ ...prev, address_info: adressInfo }));
  };

  const setDistance = (val) => {
    response && setResponse(false);
    setFormData((prev) => ({ ...prev, distance: val }));
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
        <CustomAddressSearch
          place={formData.address_info}
          setPlace={setPlace}
        />
      </View>

      <View className="w-full ml-32 mt-2">
        <CustomSlider distance={formData.distance} setDistance={setDistance} />
      </View>

      <View className="w-9/12 mb-2">
        {response && (
          <Text className="text-green-600 font-bold self-center">
            Address updated succesfully!
          </Text>
        )}
        <TouchableOpacity
          className="bg-custom-main items-center justify-center py-4 px-8 rounded mt-6"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-base">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeAddressInfo;
