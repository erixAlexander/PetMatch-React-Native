import { useState, useMemo, useEffect, createRef } from "react";
import { ImageBackground, Text, View } from "react-native";
import TinderCard from "react-tinder-card";
import CardButtons from "./CardButtons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { LinearGradient } from "expo-linear-gradient";
import { REACT_APP_URL } from "@env";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import CustomText from "../../CustomInputs/CustomText";

const MainCardComponent = ({ array, user }) => {
  const [profiles, setProfiles] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [currentindex, setCurrentIndex] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const updateMatches = async (userId, matchedUserId) => {
    try {
      await axiosPrivate.put(`${REACT_APP_URL}/addmatch`, {
        userId,
        matchedUserId,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProfiles(array);
    setCurrentIndex(array.length - 1);
  }, [array]);

  const childRefs = useMemo(
    () =>
      Array(array.length)
        .fill(0)
        .map((i) => createRef()),
    [array]
  );

  const swiped = (direction, matchId) => {
    setLastDirection(direction);
    if (direction === "back") return;
    if (direction === "right") {
      updateMatches(user.user_id, matchId);
    }
    setCurrentIndex((prev) => prev - 1);
  };

  const swipe = async (dir) => {
    if (dir == "back" && currentindex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      await childRefs[currentindex + 1].current.restoreCard();
    } else if (dir != "back" && currentindex > -1) {
      await childRefs[currentindex].current.swipe(dir);
    }
  };

  return (
    <View className="flex-1 items-center justify-center w-full h-full ">
      <View className="w-full h-full">
        {profiles?.map((profile, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={profile.user_id}
            onSwipe={(dir) => swiped(dir, profile.user_id)}
          >
            <View
              style={{ height: 500, alignSelf: "center" }}
              className="absolute w-11/12 shadow-black drop-shadow-md rounded-3xl"
            >
              <ImageBackground
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                }}
                className="overflow-hidden rounded-3xl"
                source={{ uri: profile.images[0].url }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0.9 }}
                  end={{ x: 0, y: 0 }}
                  colors={["rgba(0,0,0,0.7)", "transparent"]}
                  style={{ height: "100%", width: "100%" }}
                >
                  <View className="flex-row justify-start items-center space-x-1 w-full absolute bottom-20 left-12">
                    <FontAwesomeIcon icon={faLocationArrow} color="white" />
                    <Text className="text-white text-base py-1">
                      {Math.round(profile.distanceInKm)}
                      <Text className="text-xs">Km</Text>
                    </Text>
                  </View>

                  <View className="flex-row justify-start items-center space-x-2 w-full absolute bottom-14 left-12">
                    <FontAwesomeIcon icon={faHouse} color="white" size={14} />
                    <Text className="text-white text-base">
                      {profile.address_info.name}
                    </Text>
                  </View>
                  <View className="flex-row justify-around items-center w-full absolute bottom-4">
                    <CustomText
                      textToDisplay={profile.pet_name}
                      bold={true}
                      customStyles={{ color: "white", fontSize: 34 }}
                    />
                    <Text className="font-bold text-white bg-custom-main px-4 py-1 rounded text-lg">
                      {profile.gender_identity}
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          </TinderCard>
        ))}
        <CardButtons swipe={swipe} />
      </View>
    </View>
  );
};

export default MainCardComponent;
