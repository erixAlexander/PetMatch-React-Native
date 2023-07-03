import { Text, TouchableOpacity, View } from "react-native";
import MainCardComponent from "../Main/MainCardComponent";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { REACT_APP_URL } from "@env";
import { useEffect, useState } from "react";
import useCheckDistanceAndShuffle from "../../../hooks/useCheckDistanceAndShuffle";
import Loader from "../../CustomLoader/CustomLoader";
import useAuth from "../../../hooks/useAuth";

const ActivitiesCards = ({ activity, setActivity }) => {
  const [activityUsers, setActivityUsers] = useState([]);
  const [shuffledUsers, setShuffledUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const { auth } = useAuth();

  const getActivityUsers = async (userId) => {
    try {
      const response = await axiosPrivate.get(`${REACT_APP_URL}/add-activity`, {
        params: { userId, activity },
      });
      setActivityUsers(response?.data);
      setStatus(response?.status);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth.user && getActivityUsers(auth.user.user_id, activity);
  }, []);

  useEffect(() => {
    activityUsers.length &&
      (async () => {
        const checkDistance = useCheckDistanceAndShuffle(
          auth.user,
          activityUsers
        );
        const usersByDistanceShuffled = await checkDistance();
        setShuffledUsers(usersByDistanceShuffled);
        setLoading(false);
      })();
  }, [activityUsers]);

  useEffect(() => {
    status == 201 && !activityUsers.length && setLoading(false);
  }, [status]);

  return (
    <>
      <TouchableOpacity
        className="bg-blue-600 opacity-80 w-32 h-10 rounded absolute z-10 -top-3 right-5 items-center justify-center"
        onPress={() => {
          setActivity(null);
        }}
      >
        <Text className="text-white font-bold text-sm opacity-100 z-20">
          Back to activities
        </Text>
      </TouchableOpacity>
      {loading ? (
        <View className="h-full flex-1 items-center justify-center">
          <Loader />
        </View>
      ) : shuffledUsers.length ? (
        <MainCardComponent user={auth.user} array={shuffledUsers} />
      ) : (
        <View className="h-full flex-1 items-center justify-center">
          <Text className="font-bold self-center text-3xl">
            No users in your area yet...
          </Text>
        </View>
      )}
    </>
  );
};

export default ActivitiesCards;
