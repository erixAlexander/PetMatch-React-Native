import {
  faFireAlt,
  faList,
  faMessage,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, TouchableOpacity } from "react-native";

const DashboardFooter = ({ selectedDashboard, setSelectedDashboard }) => {
  return (
    <View className="h-20 flex-row bg-custom-main items-center justify-between px-8">
      <TouchableOpacity className="p-6" onPress={() => setSelectedDashboard("main")}>
        <FontAwesomeIcon
          color={`${selectedDashboard == "main" ? "#000" : "#fff"}`}
          icon={faFireAlt}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity className="p-6" onPress={() => setSelectedDashboard("activities")}>
        <FontAwesomeIcon
          color={`${selectedDashboard == "activities" ? "#000" : "#fff"}`}
          icon={faList}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity className="p-6">
        <FontAwesomeIcon icon={faSearch} size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity className="p-6" onPress={() => setSelectedDashboard("chat")}>
        <FontAwesomeIcon
          color={`${selectedDashboard == "chat" ? "#000" : "#fff"}`}
          icon={faMessage}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardFooter;
