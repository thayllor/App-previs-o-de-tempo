import React, { useEffect, useState } from "react";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import { WeatherService } from "../../services";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { City } from "../../types";

interface HomeProps {
  navigation: BottomTabNavigationProp<any>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [location, setLocation] = useState<City | undefined | null>(undefined);

  useEffect(() => {
    const fetchLocation = async () => {
      const locationData = await WeatherService.show();
      setLocation(locationData);
    };

    // fetchLocation();

    const unsubscribe = navigation.addListener("focus", fetchLocation);

    return unsubscribe;
  }, [navigation]); // A função fetchLocation será executada quando o componente for montado e sempre que o componente receber foco

  return <>{location && <WeatherDisplay {...location} />}</>;
};
export default Home;
