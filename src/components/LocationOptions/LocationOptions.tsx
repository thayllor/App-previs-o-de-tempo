import React from "react";
import { View, Button } from "react-native";
import { StorageService, WeatherService } from "../../services";
import { NavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface LocationOptionsProps {
  latitude: number;
  longitude: number;
  cityName: string;
  onCancel: () => void;
  navigation: BottomTabNavigationProp<any>;
}

const LocationOptions: React.FC<LocationOptionsProps> = ({
  latitude,
  longitude,
  cityName,
  onCancel,
  navigation,
}) => {
  const TravelAndShow = async () => {
    console.log("TravelAndShow");
    await StorageService.set("weathersomewhere", {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      cityName: cityName,
    });
    await StorageService.set("show", "weathersomewhere");
    console.log("show em location: " + (await StorageService.get("show")));
    console.log(
      "weathersomewhere: " + (await StorageService.get("weathersomewhere"))
    );
    console.log("gO HOME");
    navigation.navigate("Home"); // Navega para a tela inicial
  };
  const makeNewFavoriteLocation = async () => {
    await WeatherService.createFavoriteLocation(latitude, longitude, cityName);
    await TravelAndShow();
  };
  const WeatherSomewhere = async () => {
    await TravelAndShow();
  };

  return (
    <View>
      <Button title="cancel" onPress={onCancel} />
      <Button title="favorite" onPress={makeNewFavoriteLocation} />
      <Button title="weathersomewhere" onPress={WeatherSomewhere} />
    </View>
  );
};

export default LocationOptions;
