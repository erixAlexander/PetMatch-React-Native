import React from "react";
import { Text, TouchableOpacity } from "react-native";

const NavButtons = ({
  firstText,
  secondText,
  handleFirstButton,
  handleSecondButton,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={handleFirstButton}
        className="py-4 px-6 bg-custom-main rounded mr-4"
      >
        <Text className="text-white font-bold">{firstText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSecondButton}
        className="py-4 px-6 bg-custom-main rounded"
      >
        <Text className="text-white font-bold">{secondText}</Text>
      </TouchableOpacity>
    </>
  );
};

export default NavButtons;
