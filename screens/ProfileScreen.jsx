import { useState } from "react";
import { ImageBackground, View } from "react-native";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileSecurity from "../components/Profile/ProfileSecurity";
import ProfileSettings from "../components/Profile/ProfileSettings";
import ProfileImages from "../components/Profile/ProfileImages";

const ProfileScreen = () => {
  const [profileScreen, setProfileScreen] = useState("info");
  return (
    <View className="flex-1 bg-white">
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
        {profileScreen === "info" && (
          <ProfileInfo setProfileScreen={setProfileScreen} />
        )}
        {profileScreen === "security" && (
          <ProfileSecurity setProfileScreen={setProfileScreen} />
        )}
        {profileScreen === "settings" && (
          <ProfileSettings setProfileScreen={setProfileScreen} />
        )}
        {profileScreen === "images" && (
          <ProfileImages setProfileScreen={setProfileScreen} />
        )}
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
