import axios from "axios";
import Constants from "expo-constants";
import { Alert } from "react-native";
import StorageService from "./StorageService";
import LocationService from "./LocationService";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";
import { City } from "../types";

const API_KEY = Constants.expoConfig?.extra?.WEATHER_API_KEY;
const BASE_URL = Constants.expoConfig?.extra?.WEATHER_API_URL;

const getCurrentLocationAndCityNameFromService = async () => {
  try {
    console.log("getCurrentLocationFromService");
    const currentLocation = await LocationService.getCurrentLocation();
    let locationData;
    if (currentLocation) {
      const { latitude, longitude, cityName } = currentLocation;
      console.log("getCurrentLocationFromService");
      locationData = { latitude, longitude, cityName };
      return locationData;
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Não foi possível obter a localização atual");
  }
};

export default class WeatherService {
  //apartir da latitude e longitude, obtemos os dados do tempo
  static async fetchWeather(latitude: number, longitude: number) {
    try {
      console.log("fetchWeather");
      // criar um cache para os dados do tempo de locais pesquisados em pouco tempo!!!!!!!!
      const get_url = `${BASE_URL}lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&lang=pt_br&appid=${API_KEY}`;
      console.log("dados pegos");

      const response = await axios.get(get_url);
      console.log("fetchWeather Saindo");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  //retorna a City setada como casa, se não existir, cria uma nova
  static async getHomeLocation() {
    try {
      console.log("getHomeLocation");
      let locationData: City | null = null;

      let favorites: City[] = await StorageService.get("favorites");
      if (favorites) {
        console.log("Tem Favorites");
        const homeLocation = favorites.find(
          (favorite: City) => favorite.isHome
        );
        if (homeLocation) {
          console.log("Tem Home Location");
          locationData = homeLocation;
        }
      }

      //não existe home
      if (!locationData) {
        console.log("não existe home");
        const currentLocation =
          await getCurrentLocationAndCityNameFromService();
        console.log("Localização da casa pegos");
        if (currentLocation) {
          const home: City = {
            cityName: currentLocation.cityName,
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            isHome: true,
            key: uuidv4(),
          };

          locationData = home;

          if (!favorites) {
            favorites = [];
          }

          favorites.push(home);
          console.log(JSON.stringify(favorites, null, 2));
          await StorageService.set("favorites", favorites);
        } else {
          Alert.alert("Não foi possível obter a localização atual");
          throw new Error("Não foi possível obter a localização atual");
        }
      }

      console.log("getHomeLocation saindo");
      return locationData;
    } catch (error) {
      console.error(error);
    }
  }
  //criar uma nova localização favorita apartir da latitude e longitude
  static async createFavoriteLocation(
    latitude: number,
    longitude: number,
    cityName: string
  ) {
    try {
      let favorites: City[] = (await StorageService.get("favorites")) || [];

      const newCity: City = {
        cityName: cityName,
        isHome: false,
        latitude: latitude,
        longitude: longitude,
        key: uuidv4(), // Add a unique key for each city
      };

      favorites.push(newCity);

      await StorageService.set("favorites", favorites);
    } catch (error) {
      console.error(error);
    }
  }
  //faz 3 verificações para saber qual localização mostrar
  //1. Se a localização a ser mostrada é a home ou é a primeira execução de show
  //2. Se a localização a ser mostrada é a localização salva em weathersomewhere
  //3. Se a localização a ser mostrada é uma localização favorita
  static async show() {
    console.log("show");
    let locationData: City | undefined | null = null;

    try {
      const show = await StorageService.get("show");
      const favoritesss = await StorageService.get("favorites");
      console.log("favoritesss" + JSON.stringify(favoritesss, null, 2));
      console.log("Valor de show: " + show);

      //1. Se a localização a ser mostrada é a home ou é a primeira execução de show

      if (show === "home" || show === null) {
        console.log("show -- home");
        locationData = await this.getHomeLocation();
        console.log(
          "show: locationData" + JSON.stringify(locationData, null, 2)
        );
      } else if (show === "weathersomewhere") {
        console.log("show -- weathersomewhere");
        const somewhereLocation: City = await StorageService.get(
          "weathersomewhere"
        );
        console.log("tempo em" + somewhereLocation.cityName);
        locationData = somewhereLocation;
      } else {
        console.log("show--------- favorites");
        const favorites: City[] = await StorageService.get("favorites");
        if (favorites) {
          const favoriteLocation = favorites.find(
            (favorite: City) => favorite.cityName === show
          );
          if (favoriteLocation) {
            locationData = favoriteLocation;
          } else {
            Alert.alert("Cidade favorita não encontrada!"); // Para aplicações React Native
            locationData = await this.getHomeLocation();
          }
        }
      }
      return locationData;
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Ocorreu um erro ao buscar a localização. Usando a localização atual."
      );
      const currentLocation = await getCurrentLocationAndCityNameFromService();

      locationData = {
        cityName: currentLocation?.cityName,
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        isHome: true,
        key: uuidv4(),
      } as City;
      console.log("saindo do show");
      return locationData;
    }
  }
}
