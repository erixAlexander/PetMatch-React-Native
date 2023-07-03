import { TouchableOpacity, Text } from "react-native";

const CustomCheckbox = ({
  name,
  containerClass,
  checkedTextClass,
  uncheckedTextClass,
  isChecked,
  handleCheck,
  value,
  uncheckedColor,
  checkedColor,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      onPress={() => handleCheck(name, value)}
      className={`items-center rounded p-4 border-2 ${
        !isChecked ? "border-" + borderColor : "border-custom-main"
      } ${containerClass} ${!isChecked ? uncheckedColor : checkedColor}`}
    >
      <Text
        className={` ${!isChecked ? uncheckedTextClass : checkedTextClass} `}
      >
        {value && name == "pedigree" ? "pedigree" : value}
        {name == "pedigree" && value === false && "no pedigree"}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

