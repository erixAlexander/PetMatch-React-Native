import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

const CustomSlider = ({ setDistance, distance }) => {
  return (
    <View className="w-full mt-6">
      <Text className="font-bold">
        Only pets in this range: 
        <Text className="text-custom-main"> {distance}</Text>Km
      </Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={20}
        maximumValue={180}
        minimumTrackTintColor="#fe3072"
        maximumTrackTintColor="#000000"
        thumbTintColor="#fe3072"
        onValueChange={(val) => setDistance(val)}
        step={20}
      />
    </View>
  );
};

export default CustomSlider;
