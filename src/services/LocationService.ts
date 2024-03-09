import * as Location from "expo-location";

export default class LocationService {
  static async getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
  }
}
