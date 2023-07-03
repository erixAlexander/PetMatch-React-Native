import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { REACT_APP_TOMTOM } from "@env";

import * as Location from "expo-location";
import CustomTextInput from "../CustomInputs/CustomTextInput";

export default function CustomAddressSearch({ place, setPlace }) {
  const [location, setLocation] = useState({
    lat: null,
    long: null,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [selecting, setSelecting] = useState(false);

  const getNearbyPlaces = async (
    query,
    lat,
    long,
    API_KEY,
    limit = 100,
    radius = 60000
  ) => {
    const baseUrl = "https://api.tomtom.com/search/2/poiSearch";
    let queryString = `limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&key=${API_KEY}`;
    let response = await axios.get(`${baseUrl}/${query}.json?${queryString}`);
    setPlaces(response.data.results);
  };

  useEffect(() => {
    if (query != "" && location?.lat != null && !selecting) {
      getNearbyPlaces(query, location.lat, location.long, REACT_APP_TOMTOM);
    }
    if (query == "") {
      setPlaces([]);
    }
  }, [query]);

  const changeQuery = (name, value) => {
    setSelecting(false);
    setQuery(value);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View className="w-full">
      {place != "" && (
        <Text className="py-4 font-bold">
          Closest location: <Text className="font-bold">{place.full_name}</Text>
        </Text>
      )}

      <CustomTextInput
        value={query}
        onChangeText={changeQuery}
        placeholder={"Select closest Location"}
        name={null}
      />
      {places?.length > 0 && (
        <View className="border w-2/3">
          <ScrollView
            scrollEnabled={true}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always"
            className="h-60 bg-white"
          >
            {places?.slice(0, 10).map((place, i) => {
              const addressInfo = {
                country: place.address.country,
                name: place.address.localName,
                lat: place.position.lat,
                lon: place.position.lon,
                full_name: place.poi.name,
              };
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setSelecting(true);
                    setQuery(place.poi.name + " " + place.address.localName);
                    setPlace(addressInfo);
                    setPlaces([]);
                  }}
                >
                  <Text className="px-3 py-4 border-b">
                    {place.poi.name + " " + place.address.localName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
