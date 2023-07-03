import { useEffect, useState } from "react";
import { View, SafeAreaView, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { REACT_APP_URL } from "@env";
import MainDashboard from "../components/Dashboard/Main/MainDashboard";
import ChatDashboard from "../components/Dashboard/Chat/ChatDashboard";
import ActivitiesDashboard from "../components/Dashboard/Activities/ActivitiesDashboard";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardFooter from "../components/Dashboard/DashboardFooter";
import useAuth from "../hooks/useAuth";

const DashboardScreen = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [selectedDashboard, setSelectedDashboard] = useState("main");
  const { setAuth } = useAuth();

  getValue = async (val) => {
    try {
      const value = await AsyncStorage.getItem(val);
      if (value) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const cookies = await getValue("cookies");
      const userId = JSON.parse(cookies).userId;
      const response = await axiosPrivate.get(`${REACT_APP_URL}/user`, {
        params: { userId },
      });
      setAuth((prev) => ({ ...prev, user: response.data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ImageBackground
        resizeMode="cover"
        style={{
          flex: 1,
          width: null,
          height: null,
        }}
        imageStyle={{ opacity: 0.06 }}
        source={require("../assets/images/bgpaws.jpg")}
      >
        <DashboardHeader />

        <View className="flex-1">
          {selectedDashboard == "main" && (
            <MainDashboard loading={loading} setLoading={setLoading} />
          )}
          {selectedDashboard == "chat" && <ChatDashboard getUser={getUser} />}
          {selectedDashboard == "activities" && <ActivitiesDashboard />}
        </View>

        <DashboardFooter
          selectedDashboard={selectedDashboard}
          setSelectedDashboard={setSelectedDashboard}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DashboardScreen;
