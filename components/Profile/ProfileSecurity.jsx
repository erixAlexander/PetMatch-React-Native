import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import security from "../../utils/security";
import { Transition, Transitioning } from "react-native-reanimated";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={300} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

export default function ProfileSecurity({ setProfileScreen }) {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();

  return (
    <View className="flex-1 justify-end">
      <View className="absolute top-12 left-4 z-10">
        <TouchableOpacity
          onPress={() => {
            setProfileScreen("info");
          }}
        >
          <FontAwesomeIcon
            color="#fe3072"
            size={36}
            icon={faArrowAltCircleLeft}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center mt-4">
        <Text className="text-2xl font-bold">Security Information</Text>
      </View>
      <Transitioning.View
        className="h-4/5"
        ref={ref}
        transition={transition}
        style={styles.container}
      >
        {security.map(({ category, component }, index) => {
          return (
            <TouchableOpacity
              key={category}
              onPress={() => {
                ref.current.animateNextTransition();
                setCurrentIndex(index === currentIndex ? null : index);
              }}
              style={styles.cardContainer}
              activeOpacity={0.9}
            >
              <View style={[styles.card]}>
                <Text style={[styles.heading]}>{category}</Text>
                {index === currentIndex && component}
              </View>
            </TouchableOpacity>
          );
        })}
      </Transitioning.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(243 244 246)",
    justifyContent: "center",
  },
  cardContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    borderTopWidth: 8,
    borderColor: "rgb(243 244 246)",
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fe3072",
    marginBottom: 10,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  subCategoriesList: {
    marginTop: 20,
  },
});
