import * as Location from "expo-location";
import Constants from "expo-constants";
import axios from "axios";
// const apiKey = Constants.expoConfig?.extra?.GOOGLE_API_KEY;
export default class LocationService {
  static async getCurrentLocation() {
    console.log("getcurrentLocation");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return null;
    }

    for (let i = 0; i < 3; i++) {
      // Try up to 3 times
      try {
        let location: any = await this.withTimeout(
          Location.getCurrentPositionAsync({}),
          2000 // Timeout after 2 seconds
        );
        console.log(
          "getcurrentLocation:" + JSON.stringify(location.coords, null, 2)
        );
        /// acertar a permição da api do google*****************************************
        // pra pegar o nome da cidade em questão****************
        // const response = await fetch(
        //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${apiKey}`
        // );
        // const data = await response.json();
        // console.log("response:" + JSON.stringify(data, null, 2));
        // const cityName = data.results[0].address_components.find(
        //   (component: any) => component.types.includes("locality")
        // ).long_name;

        const cityName = await this.getCityName(
          location.coords.latitude,
          location.coords.longitude
        );
        // const cityName = "Rio Grande"; // teste até configurar a api do google

        return {
          ...location.coords,
          cityName,
        };
      } catch (error) {
        console.log(error);
        console.log(
          `Retrying getCurrentLocation... Remaining attempts: ${2 - i}`
        );
      }
    }

    console.error("Failed to get location within timeout");
    return null;
  }

  static async getCityName(latitude: number, longitude: number) {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );
    return (
      response.data.address.city ||
      response.data.address.town ||
      response.data.address.village
    );
  }

  static withTimeout(promise: Promise<any>, ms: number) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Promise timed out"));
      }, ms);

      promise
        .then((value) => {
          clearTimeout(timer);
          resolve(value);
        })
        .catch((reason) => {
          clearTimeout(timer);
          reject(reason);
        });
    });
  }
}
