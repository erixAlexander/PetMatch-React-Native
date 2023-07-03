import { REACT_APP_TOMTOM } from "@env";
import axios from "axios";

const useCheckDistanceAndShuffle = (user, arrayToCheckDistance) => {
  const checkDistance = async (userlat, userlon, matchlat, matchlon) => {
    try {
      if (!matchlat || !matchlon) return false;
      const response = await axios.get(
        `https://api.tomtom.com/routing/1/calculateRoute/${userlat}%2C${userlon}%3A${matchlat}%2C${matchlon}/json?key=${REACT_APP_TOMTOM}`
      );
      const distanceInKm =
        response.data.routes[0].summary.lengthInMeters / 1000;
      return { inDistance: distanceInKm < user.distance, distanceInKm };
    } catch (error) {
      console.log(error);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const allMatchedUsersId = user?.user_matches?.map(({ user_id }) => user_id);

  const usersNotMatched = arrayToCheckDistance?.filter(
    (genderedUser) => !allMatchedUsersId?.includes(genderedUser.user_id)
  );

  const checkDistanceAndShuffle = async () => {
    const usersInDistance = await Promise.all(
      usersNotMatched?.map(async (match) => {
        return await checkDistance(
          user?.address_info?.lat,
          user?.address_info?.lon,
          match?.address_info?.lat,
          match?.address_info?.lon
        );
      })
    );

    const filteredUsersByDistance = usersNotMatched
      .map((user, i) => ({
        ...user,
        distanceInKm: usersInDistance[i]?.distanceInKm,
      }))
      .filter((e, i) => usersInDistance[i]?.inDistance);
    const shuffledArray = shuffleArray(filteredUsersByDistance);

    return shuffledArray;
  };

  return checkDistanceAndShuffle;
};

export default useCheckDistanceAndShuffle;
