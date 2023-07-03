import { View, TouchableOpacity, Text } from "react-native";

const CustomSubmitButton = ({ handleSubmit }) => {
  return (
    <View className="w-full items-center justify-center p-4 mt-6 bg-gray-200">
      <TouchableOpacity
        className="w-full items-center justify-center"
        onPress={() => handleSubmit()}
      >
        <Text className="font-bold ">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSubmitButton;
