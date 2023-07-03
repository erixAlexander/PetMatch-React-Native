import { useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import ChatInput from "./ChatInput";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ChatBubbleIncoming from "./ChatBubbleIncoming";
import ChatBubbleOutgoing from "./ChatBubbleOutgoing";
import { REACT_APP_URL } from "@env";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../CustomLoader/CustomLoader";
import useAuth from "../../../hooks/useAuth";

const ChatDisplay = ({ setClickedUser, clickedUser, socket }) => {
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState([]);
  const [orderedMessages, setOrderedMessages] = useState([]);
  const lastRef = useRef();
  const isFirstrender = useRef(0);
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  const getMessages = async (fromUserId, touserId) => {
    try {
      const sentMessages = await axiosPrivate.get(`${REACT_APP_URL}/messages`, {
        params: {
          userId: fromUserId,
          correspondingUserId: touserId,
        },
      });

      const receivedMessages = await axiosPrivate.get(
        `${REACT_APP_URL}/messages`,
        {
          params: {
            userId: touserId,
            correspondingUserId: fromUserId,
          },
        }
      );

      setMessages([...sentMessages.data, ...receivedMessages.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const readMessage = async (match_id, userId) => {
    try {
      await axiosPrivate.put(`${REACT_APP_URL}/read-message`, {
        match_id,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function scrollViewSizeChanged(height) {
    lastRef.current?.scrollTo({ y: height, animated: true });
  }

  const newMessage = ({ userId, message }) => {
    userId == clickedUser.user_id &&
      setOrderedMessages((prev) => [
        ...prev,
        {
          from_user_id: userId,
          message: message,
          timestamp: new Date().toISOString(),
          to_user_id: auth.user.user_id,
        },
      ]);
  };

  useEffect(() => {
    const isMessageRead = auth.user?.user_matches.find((match) => {
      return match.user_id == clickedUser?.user_id;
    }).read;
    !isMessageRead && readMessage(clickedUser.user_id, auth.user.user_id);
    getMessages(auth.user.user_id, clickedUser.user_id);
  }, []);

  useEffect(() => {
    setOrderedMessages(
      messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    );
  }, [messages]);

  useEffect(() => {
    messages.length &&
      messages.length == orderedMessages.length &&
      setTimeout(() => {
        setLoading(false);
      }, 400);

    isFirstrender.current > 1 &&
      !messages.length &&
      setTimeout(() => {
        setLoading(false);
      }, 400);
  }, [orderedMessages]);

  useEffect(() => {
    isFirstrender.current += 1;
  }, [messages]);

  useEffect(() => {
    socket.current?.on("newMessage", newMessage);
    return () => {
      socket.current.off("newMessage", newMessage);
    };
  }, []);

  return (
    <>
      <View className="absolute z-10 p-4 bg-gray-100 rounded-full top-2 right-4">
        <TouchableOpacity
          onPress={() => {
            setClickedUser(null);
            setAuth((prev) => {
              const updatedUserMatches = prev.user.user_matches.map((match) => {
                return match.user_id == clickedUser.user_id
                  ? { ...match, read: true }
                  : match;
              });
              return {
                ...prev,
                user: { ...prev.user, user_matches: updatedUserMatches },
              };
            });
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={18} />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={lastRef}
        onContentSizeChange={(width, height) => {
          scrollViewSizeChanged(height);
        }}
        className="bg-white border-b-2"
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 4,
          paddingBottom: 12,
          marginLeft: 2,
          gap: 14,
        }}
      >
        <View className="h-10"></View>
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Loader />
          </View>
        ) : (
          orderedMessages?.map((mssg, index) => {
            if (mssg.from_user_id == auth.user.user_id) {
              return (
                <ChatBubbleOutgoing
                  key={index}
                  user={auth.user}
                  message={mssg.message}
                />
              );
            } else {
              return (
                <ChatBubbleIncoming
                  key={index}
                  user={clickedUser}
                  message={mssg.message}
                />
              );
            }
          })
        )}
      </ScrollView>
      <ChatInput
        setOrderedMessages={setOrderedMessages}
        userId={auth.user?.user_id}
        clickedUserId={clickedUser?.user_id}
        loading={loading}
        socket={socket}
      />
    </>
  );
};

export default ChatDisplay;
