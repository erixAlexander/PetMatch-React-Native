import React from "react";
import { TextInput } from "react-native";

const CustomTextInput = ({ value, onChangeText, name, placeholder }) => {
  return (
    <TextInput
      value={value}
      onChangeText={(val) => onChangeText(name, val)}
      placeholder={placeholder}
      className={"rounded p-3 border-2 border-gray-400 w-2/3 mt-2"}
    />
  );
};

export default CustomTextInput;
