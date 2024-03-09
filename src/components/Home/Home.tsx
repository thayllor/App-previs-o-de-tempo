import React, { useEffect, useState } from "react";
import { WeatherService } from "../../services";
import { WeatherDisplay } from "../";
import { NavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface HomeProps {
  navigation: BottomTabNavigationProp<any>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | undefined
  >(undefined);

  useEffect(() => {
    const fetchLocation = async () => {
      const locationData = await WeatherService.show();
      setLocation(locationData);
    };

    fetchLocation();

    const unsubscribe = navigation.addListener("focus", fetchLocation);

    return unsubscribe;
  }, [navigation]); // A função fetchLocation será executada quando o componente for montado e sempre que o componente receber foco

  return (
    <>
      {location && (
        <WeatherDisplay
          latitude={location.latitude}
          longitude={location.longitude}
        />
      )}
    </>
  );
};
