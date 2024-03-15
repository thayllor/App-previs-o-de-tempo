import React, { useEffect, useState } from "react";
import { styles } from "./style";
import { Text, View } from "react-native";
import { WeatherService } from "../../services";
import CardList from "../CardList/CardList";

const WeatherDisplay = ({
  latitude,
  longitude,
  cityName,
}: {
  latitude: number;
  longitude: number;
  cityName: string;
}) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await WeatherService.fetchWeather(
          latitude,
          longitude,
          cityName
        );
        setWeatherData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, cityName]);

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  console.log("cityName");
  console.log(cityName);
  return weatherData ? (
    <View style={styles.container}>
      <View style={styles.ViewText}>
        <Text style={styles.Text}>Tempo em</Text>
        <Text style={styles.Text}>{cityName}</Text>
      </View>
      <View>
        <CardList initialWeatherData={weatherData} />
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default WeatherDisplay;
