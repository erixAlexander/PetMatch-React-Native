import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, TouchableHighlight } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const CustomDropdown = ({ items, handleChange, name }) => {
  const [selecting, setSelecting] = useState(false);
  const [textColor, setTextColor] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray(items);
  }, []);

  return (
    <View className="w-2/3 mt-2 ">
      <View className="border-2 p-4 rounded border-gray-400 ">
        <TouchableOpacity
          className="flex-row justify-between"
          onPress={() => {
            setSelecting(!selecting);
            setTextColor(true);
          }}
        >
          <Text>{`${selectedItem ? selectedItem : "Select"}`}</Text>
          {selecting ? (
            <FontAwesomeIcon icon={faArrowUp} color="gray" />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} color="gray" />
          )}
        </TouchableOpacity>
      </View>
      <View>
        {selecting && (
          <View className=" border-2 rounded mt-1 border-custom-main items-start justify-center">
            {array.map((item) => {
              return (
                <View key={item} className="w-full hover:bg-black">
                  <TouchableHighlight
                    onPressIn={() => {
                      setTextColor(false);
                    }}
                    onPressOut={() => {
                      setTextColor(true);
                    }}
                    className="p-4"
                    underlayColor="#fe3072"
                    onPress={() => {
                      setSelecting(false);
                      setSelectedItem(item);
                      handleChange(name, item);
                    }}
                  >
                    <Text
                      className={`${
                        !textColor ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {typeof item == "string"
                        ? item.charAt(0).toUpperCase() + item.slice(1)
                        : item}
                    </Text>
                  </TouchableHighlight>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomDropdown;
