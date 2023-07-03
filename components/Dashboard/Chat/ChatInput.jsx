import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { REACT_APP_URL } from "@env";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ChatInput = ({
  setOrderedMessages,
  userId,
  clickedUserId,
  loading,
  socket,
}) => {
  const [input, setInput] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const message = {
    timestamp: new Date().toISOString(),
    from_user_id: userId,
    to_user_id: clickedUserId,
    message: input.trim(),
  };
  
  const sendMessage = async () => {
    if (message.message === "") {
      setInput("");
      return;
    }

    try {
      setInput("");
      const response = await axiosPrivate.post(`${REACT_APP_URL}/message`, {
        message,
      });
      setOrderedMessages((prev) => [...prev, message]);
      response.status == 200 &&
        (await axiosPrivate.put(`${REACT_APP_URL}/write-message`, {
          myUserId: userId,
          clickedUserId,
        }));

      socket.current?.emit("sendMessage", {
        userId: userId,
        receiverId: clickedUserId,
        message: message.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-row gap-2 items-center justify-around h-20 mx-3">
      <TextInput
        className={"rounded p-3 border-2 border-gray-400 flex-1"}
        value={input}
        onChangeText={(val) => setInput(val)}
      />
      <TouchableOpacity
        disabled={loading || input.trim() == ""}
        onPress={() => sendMessage()}
        className={`${
          loading || input.trim() == ""
            ? "bg-gray-300 border-gray-300"
            : "white"
        } border-2 py-4 px-8 rounded`}
      >
        <Text
          className={`font-bold ${
            loading || input.trim() == "" ? "text-white" : "text-gray-600"
          }`}
        >
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatInput;
