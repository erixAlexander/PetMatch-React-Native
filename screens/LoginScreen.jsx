import { View } from "react-native";
import useAuth from "../hooks/useAuth";
import SignIn from "../components/SignIn/SignIn";

const LoginScreen = () => {
  const { isSignUp, setIsSignUp } = useAuth();

  return (
    <View>
      <SignIn isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </View>
  );
};

export default LoginScreen;
