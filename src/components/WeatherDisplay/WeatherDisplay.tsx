import React, { useEffect, useState } from "react";
import { styles } from "./style";
import { Text, View } from "react-native";
import WeatherService from "../../services/WeatherService";
import CardList from "../CardList/CardList";

const WeatherDisplay = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await WeatherService.fetchWeather(latitude, longitude);
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
  }, [latitude, longitude]);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return weatherData ? (
    <View style={styles.container}>
      <View style={styles.ViewText}>
        <Text style={styles.Text}>
          Tempo em {weatherData?.address?.[0]?.district}
        </Text>
        <Text style={styles.Text}>{weatherData?.address?.[0]?.region}</Text>
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
