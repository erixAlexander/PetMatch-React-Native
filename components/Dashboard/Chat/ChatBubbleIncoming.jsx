import { Image, Text, View } from "react-native";
import CustomText from "../../CustomInputs/CustomText";

const ChatBubbleIncoming = ({ user, message }) => {
  return (
    <View className="flex-row w-10/12  gap-2 items-center">
      <View className="pt-2 pl-1 items-center">
        <Image
          className="w-10 h-10 rounded-full"
          source={{
            uri: user?.images[0].url,
          }}
        />
        <Text className="font-bold text-xs">{user.pet_name}</Text>
      </View>
      <View className="flex-1 bg-gray-200 rounded-md pb-3 pl-2 justify-start items-start gap-2">
        <CustomText
          bold={true}
          classes={"pt-2"}
          customStyles={{ color: "black" }}
          textToDisplay={message}
        />
      </View>
    </View>
  );
};

export default ChatBubbleIncoming;
