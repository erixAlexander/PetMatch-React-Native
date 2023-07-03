import { View, Image, TouchableOpacity } from "react-native";
import { REACT_APP_URL } from "@env";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CustomText from "../../CustomInputs/CustomText";
import useAuth from "../../../hooks/useAuth";

const ActivitiesDisplay = ({ mainActivity, activities, setActivity }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const addActivityToUser = async (userId, activity) => {
    try {
      await axiosPrivate.put(`${REACT_APP_URL}/add-activity`, {
        params: { userId, activity },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => {
            addActivityToUser(auth.user.user_id, mainActivity.name);
            setActivity(mainActivity.name);
          }}
        >
          <View className="bg-black opacity-40 w-10/12 h-60 absolute self-center z-10 rounded-lg"></View>
          <CustomText
            classes="absolute z-20 self-center top-20"
            textToDisplay={`Chilling at home 
with my Hooman!`}
            bold={true}
            customStyles={{ color: "white", fontSize: 22 }}
          />
          <Image
            className="w-10/12 h-60 self-center rounded-lg"
            source={{ uri: mainActivity.img }}
          />
        </TouchableOpacity>
      </View>
      <View className="mt-6 self-center flex-row w-11/12 flex-wrap gap-4 items-center justify-around">
        {activities?.map((act, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                addActivityToUser(auth.user.user_id, act.name);
                setActivity(act.name);
              }}
            >
              <View className="bg-black opacity-40 w-36 h-36 absolute self-center z-10 rounded-lg"></View>
              <CustomText
                classes="absolute z-20 self-center top-20"
                textToDisplay={act.name}
                bold={true}
                customStyles={{ color: "white", fontSize: 20 }}
              />
              <Image
                className="w-36 h-36 self-center rounded-lg"
                source={{ uri: act.img }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default ActivitiesDisplay;
