import { View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar/Navbar";
import CustomText from "../components/CustomInputs/CustomText";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={{
          uri: "https://res.cloudinary.com/dhttotcxc/image/upload/v1680999924/karsten-winegeart-7vhqnO-sT88-unsplash_hui2jv.jpg",
        }}
        style={{
          flex: 1,
          width: null,
          height: null,
        }}
      >
        <Navbar />
        <View className="flex-1 items-center justify-end mb-4">
          <View className="p-4 rounded">
            <CustomText
              textToDisplay={"PetM@tch"}
              classes={""}
              bold={true}
              customStyles={{ fontSize: 52 }}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
