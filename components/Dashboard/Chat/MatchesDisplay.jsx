import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { REACT_APP_URL } from "@env";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import CustomText from "../../CustomInputs/CustomText";
import Loader from "../../CustomLoader/CustomLoader";
import useAuth from "../../../hooks/useAuth";

const MatchesDisplay = ({ setClickedUser, socket }) => {
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState([]);
  const [orderedMessages, setOrderedMessages] = useState("loading");
  const [matchedUsers, setMatchedUsers] = useState([]);
  const { auth, setAuth } = useAuth();
  const renderTimes = useRef(0);

  const getMatches = async (likedUsersIds) => {
    try {
      const response = await axiosPrivate.get(`${REACT_APP_URL}/users`, {
        params: { userIds: JSON.stringify(likedUsersIds) },
      });
      setMatchedUsers(
        response.data.filter((match) =>
          match.user_matches.some(
            (profile) => profile.user_id == auth.user.user_id
          )
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getLastMessages = async (fromUserId, touserId) => {
    try {
      const response = await axiosPrivate.get(
        `${REACT_APP_URL}/messages/native`,
        {
          params: {
            userId: fromUserId,
            correspondingUserId: touserId,
          },
        }
      );
      setMessages((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const newNotification = ({ userId, message }) => {
    setAuth((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        user_matches: prev.user.user_matches.map((match) =>
          match.user_id == userId ? { ...match, read: false } : match
        ),
      },
    }));

    setOrderedMessages((prev) => {
      return prev.map((mssg) =>
        mssg.from_user_id == userId || mssg.to_user_id == userId
          ? { ...mssg, message }
          : mssg
      );
    });
  };

  useEffect(() => {
    const likedUsersIds = auth.user?.user_matches?.map(
      (match) => match.user_id
    );
    getMatches(likedUsersIds);
  }, []);

  useEffect(() => {
    matchedUsers?.length &&
      matchedUsers?.forEach((match) => {
        getLastMessages(auth.user.user_id, match?.user_id);
      });
    renderTimes.current > 0 && !matchedUsers?.length && setOrderedMessages([]);
  }, [matchedUsers]);

  useEffect(() => {
    messages.length &&
      setOrderedMessages(
        messages?.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      );
  }, [messages]);

  useEffect(() => {
    socket.current?.on("newMessage", newNotification);
    return () => {
      socket.current.off("newMessage", newNotification);
    };
  }, []);

  useEffect(() => {
    renderTimes.current += 1;
  });

  return (
    <View className="flex-1 bg-white">
      <View className="h-60 p-4">
        <CustomText
          textToDisplay={"Matches"}
          bold={true}
          customStyles={{ fontSize: 24 }}
        />
        <ScrollView className="space-x-3" horizontal={true}>
          {matchedUsers.map((match) => (
            <TouchableOpacity
              onPress={() => setClickedUser(match)}
              key={match.user_id}
            >
              <View className="w-full h-full">
                <ImageBackground
                  style={{ backgroundColor: "rgb(0,0,0)" }}
                  imageStyle={{ opacity: 0.5, borderRadius: 5 }}
                  className="w-24 h-32 rounded"
                  source={{ uri: match.images[0].url }}
                  resizeMode="cover"
                >
                  <Text className="text-white font-bold text-xs absolute bottom-2 left-2">
                    {match.pet_name}
                  </Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View className="bg-white flex-1">
        <CustomText
          classes={"px-4"}
          textToDisplay={"Chats"}
          bold={true}
          customStyles={{ fontSize: 24 }}
        />
        <ScrollView contentContainerStyle={{ gap: 8, marginTop: 8 }}>
          {orderedMessages == "loading" ? (
            <View className="flex-1 items-center justify-center">
              <Loader />
            </View>
          ) : orderedMessages.length > 0 &&
            orderedMessages.length == messages.length ? (
            orderedMessages?.map((mssg, i) => {
              const matchInfo = matchedUsers.find(
                (match) =>
                  match.user_id == mssg.from_user_id ||
                  match.user_id == mssg.to_user_id
              );

              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setClickedUser(matchInfo);
                  }}
                >
                  <View
                    className={`flex-row items-center justify-center w-12/12  ml-4 `}
                  >
                    <Image
                      className="ml-4 w-14 h-14 rounded-full"
                      source={{ uri: matchInfo.images[0].url }}
                    />
                    <View
                      className={`flex-1 bg-white p-4 rounded items-start justify-center gap-1`}
                    >
                      <View className="flex-row space-x-2 items-center">
                        <Text className="font-bold text-base">
                          {matchInfo.pet_name}
                        </Text>
                        <View>
                          {!auth.user?.user_matches.find(
                            (item) => item.user_id === matchInfo.user_id
                          ).read && (
                            <FontAwesomeIcon
                              icon={faCircle}
                              size={12}
                              color="green"
                            />
                          )}
                        </View>
                      </View>
                      <CustomText
                        classes={"ml-1"}
                        customStyles={{ color: "gray" }}
                        textToDisplay={`${mssg.message.substring(0, 40)}...`}
                      ></CustomText>
                    </View>
                    <Text className="w-10">
                      {mssg.from_user_id == matchInfo.user_id ? (
                        <FontAwesomeIcon icon={faArrowLeft} color="green" />
                      ) : (
                        <FontAwesomeIcon icon={faArrowRight} color="red" />
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>You have no messages at the moment</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MatchesDisplay;
