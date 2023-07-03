import Lottie from "lottie-react-native";

export default function Loader() {
  return (
    <Lottie
      source={require("../../assets/loader.json")}
      autoPlay
      loop
      style={{ width: 150, height: 150 }}
    />
  );
}
