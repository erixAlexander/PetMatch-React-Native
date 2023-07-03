import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { io } from "socket.io-client";
import ChatDisplay from "./ChatDisplay";
import MatchesDisplay from "./MatchesDisplay";
import { REACT_APP_SOCKET2 } from "@env";
import useAuth from "../../../hooks/useAuth";

const ChatDashboard = () => {
  const [clickedUser, setClickedUser] = useState(null);
  const { auth } = useAuth();
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(REACT_APP_SOCKET2);
    socket.current?.emit("addUserToSocketArray", auth.user?.user_id);
    return () => {
      socket.current.off("usersSocketsArray");
    };
  }, []);

  return (
    <View className="flex-1 relative">
      {!clickedUser ? (
        <MatchesDisplay setClickedUser={setClickedUser} socket={socket} />
      ) : (
        <ChatDisplay
          setClickedUser={setClickedUser}
          clickedUser={clickedUser}
          socket={socket}
        />
      )}
    </View>
  );
};

export default ChatDashboard;
