import { Text } from "react-native";
import { useFonts } from "expo-font";

export default function CustomText({
  textToDisplay,
  classes,
  bold,
  customStyles,
}) {
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text
      className={classes}
      style={{
        fontFamily: `${bold ? "Nunito-Bold" : "Nunito-Regular"}`,
        ...customStyles,
      }}
    >
      {textToDisplay}
    </Text>
  );
}
