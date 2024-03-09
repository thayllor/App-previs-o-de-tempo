import axios from "axios";
import Constants from "expo-constants";
import { Alert } from "react-native";
import { StorageService, LocationService } from "./";
import { error } from "console";

const API_KEY = Constants.expoConfig?.extra?.WEATHER_API_KEY;
const BASE_URL = Constants.expoConfig?.extra?.WEATHER_API_URL;

const getcurrentLocation = async () => {
  try {
    const currentLocation = await LocationService.getCurrentLocation();
    let locationData;
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      locationData = { latitude, longitude };
      return locationData;
    }
  } catch (error) {
    Alert.alert("Não foi possível obter a localização atual");
  }
};

export default class WeatherService {
  //apartir da latitude e longitude, obtemos os dados do tempo
  static async fetchWeather(latitude: number, longitude: number) {
    try {
      // criar um cache para os dados do tempo de locais pesquisados em pouco tempo!!!!!!!!
      const get_url = `${BASE_URL}lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&lang=pt_br&appid=${API_KEY}`;
      console.log(get_url);

      const response = await axios.get(get_url);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  //pegar a localização setada como home no array de favoritos
  //caso não exista, pegar a localização atual e salvar como home
  static async getHomeLocation() {
    let locationData;

    let favorites = await StorageService.get("favorites");
    if (favorites) {
      const homeLocation = favorites.find((favorite: any) => favorite.isHome);
      if (homeLocation) {
        locationData = {
          latitude: homeLocation.latitude,
          longitude: homeLocation.longitude,
        };
      }
    }
    //não existe home
    if (!locationData) {
      const currentLocation = await getcurrentLocation();
      if (currentLocation) {
        const { latitude, longitude } = currentLocation;
        locationData = { latitude, longitude };

        const weatherData = await this.fetchWeather(latitude, longitude);
        const cityName = weatherData.adress[0].district; // Obtenha o nome da cidade dos dados do tempo

        if (!favorites) {
          favorites = [];
        }

        favorites.push({ name: cityName, latitude, longitude, isHome: true });
        await StorageService.set("favorites", favorites);
      }
    }

    return locationData;
  }
  //criar uma nova localização favorita apartir da latitude e longitude
  static async createFavoriteLocation(latitude: number, longitude: number) {
    try {
      const weatherData = await this.fetchWeather(latitude, longitude);
      const cityName = weatherData.adress[0].district; // Obtenha o nome da cidade dos dados do tempo

      let favorites = await StorageService.get("favorites");
      if (!favorites) {
        favorites = [];
      }

      favorites.push({ name: cityName, isHome: false, latitude, longitude });
      await StorageService.set("favorites", favorites);
    } catch (error) {
      console.error(error);
    }
  }
  //faz 3 verificações para saber qual localização mostrar
  //1. Se a localização a ser mostrada é a home
  //2. Se a localização a ser mostrada é a localização salva em weathersomewhere
  //3. Se a localização a ser mostrada é uma localização favorita
  static async show() {
    let locationData;

    try {
      const show = await StorageService.get("show");

      if (show === "home") {
        locationData = await this.getHomeLocation();
      } else if (show === "weathersomewhere") {
        const somewhereLocation = await StorageService.get("somewhereLocation");
        const { latitude, longitude } = somewhereLocation;
        locationData = { latitude, longitude };
      } else {
        const favorites = await StorageService.get("favorites");
        if (favorites) {
          const favoriteLocation = favorites.find(
            (favorite: any) => favorite.name === show
          );
          if (favoriteLocation) {
            locationData = {
              latitude: favoriteLocation.latitude,
              longitude: favoriteLocation.longitude,
            };
          } else {
            Alert.alert("Cidade favorita não encontrada!"); // Para aplicações React Native
            locationData = await this.getHomeLocation();
          }
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Ocorreu um erro ao buscar a localização. Usando a localização atual."
      );
      locationData = await getcurrentLocation();

      return locationData;
    }
  }
}
