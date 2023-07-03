import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { REACT_APP_URL } from "@env";
import useCheckDistanceAndShuffle from "../../../hooks/useCheckDistanceAndShuffle";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import MainCardComponent from "./MainCardComponent";
import Loader from "../../CustomLoader/CustomLoader";
import useAuth from "../../../hooks/useAuth";

const MainDashboard = ({ loading, setLoading }) => {
  const [genderedUsers, setGenderedUsers] = useState([]);
  const [cardsArray, setCardsArray] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const checkDistance = useCheckDistanceAndShuffle(user, genderedUsers);

  const getGenderedUsers = async () => {
    try {
      const response = await axiosPrivate.get(
        `${REACT_APP_URL}/gendered-users`,
        {
          params: {
            gender: user?.gender_interest,
            type: user?.type_of_pet,
            userId: user?.user_id,
          },
        }
      );
      setGenderedUsers(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  useEffect(() => {
    user && getGenderedUsers();
  }, [user]);

  useEffect(() => {
    genderedUsers.length &&
      (async () => {
        const usersByDistanceShuffled = await checkDistance();
        setCardsArray(usersByDistanceShuffled);
        setLoading(false);
      })();
  }, [genderedUsers]);

  return loading ? (
    <View className="flex-1 h-full items-center justify-center">
      <Loader />
    </View>
  ) : (
    user && (
      <SafeAreaView className="flex-1">
        <MainCardComponent array={cardsArray} user={user} />
      </SafeAreaView>
    )
  );
};

export default MainDashboard;
