import {
  faArrowRotateLeft,
  faHeart,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, TouchableOpacity } from "react-native";

const CardButtons = ({ swipe }) => {
  return (
    <View className="absolute bottom-4 flex-row w-full items-center justify-around">
      <TouchableOpacity
        className="bg-gray-100 p-5 rounded-full"
        onPress={() => {
          swipe("left");
        }}
      >
        <FontAwesomeIcon icon={faX} size={18} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-gray-100 p-5 rounded-full"
        onPress={() => {
          swipe("back");
        }}
      >
        <FontAwesomeIcon icon={faArrowRotateLeft} size={18} color="green" />
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-gray-100 p-5 rounded-full"
        onPress={() => {
          swipe("right");
        }}
      >
        <FontAwesomeIcon icon={faHeart} size={18} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

export default CardButtons;
