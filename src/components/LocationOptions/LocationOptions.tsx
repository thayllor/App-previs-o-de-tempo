import React from "react";
import { View, Button } from "react-native";
import { StorageService, WeatherService } from "../../services";
import { NavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface LocationOptionsProps {
  latitude: number;
  longitude: number;
  onCancel: () => void;
  navigation: BottomTabNavigationProp<any>;
}

const LocationOptions: React.FC<LocationOptionsProps> = ({
  latitude,
  longitude,
  onCancel,
  navigation,
}) => {
  const TravelAndShow = () => {
    StorageService.set("weathersomewhere", {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    });
    StorageService.set("show", "weathersomewhere");
    navigation.navigate("home"); // Navega para a tela inicial
  };
  const makeNewFavoriteLocation = async () => {
    await WeatherService.createFavoriteLocation(latitude, longitude);
    TravelAndShow();
  };
  const WeatherSomewhere = () => {
    TravelAndShow();
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
