import { useState } from "react";
import { SafeAreaView } from "react-native";
import activities, { mainActivity } from "../../../utils/activities";
import ActivitiesDisplay from "./ActivitiesDisplay";
import ActivitiesCards from "./ActivitiesCards";

const ActivitiesDashboard = () => {
  const [activity, setActivity] = useState(null);

  return (
    <SafeAreaView className="flex-1 justify-around">
      {!activity ? (
        <ActivitiesDisplay
          activities={activities}
          mainActivity={mainActivity}
          setActivity={setActivity}
        />
      ) : (
        <ActivitiesCards setActivity={setActivity} activity={activity} />
      )}
    </SafeAreaView>
  );
};

export default ActivitiesDashboard;
