import * as React from "react";
import { Dimensions, Text, View, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import promos from "../../utils/promos";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PromoSlider = () => {
  const carouselRef = React.useRef();
  const width = Dimensions.get("window").width;
  return (
    <View className="w-9/12">
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={100}
        autoPlay={false}
        data={promos}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View className="gap-2 w-full items-center justify-center">
            <Text className="text-center font-bold text-2xl text-custom-main">
              {item.name}
            </Text>
            <Text className="text-center font-bold w-9/12">{item.info}</Text>
          </View>
        )}
      />
      <View className="flex-row w-full items-center justify-center space-x-10">
        <TouchableOpacity
          className="bg-custom-main p-4 rounded-full"
          onPress={() => {
            carouselRef.current.prev();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className=" p-4 rounded-full bg-custom-main"
          onPress={() => carouselRef.current.next()}
        >
          <FontAwesomeIcon icon={faArrowRight} color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-row space-x-2"></View>
    </View>
  );
};

export default PromoSlider;
