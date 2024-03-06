import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, _Text } from "react-native";
import { fetchWeather } from "../services/WeatherService";
import CardList from "./CardList/CardList";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await fetchWeather();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeatherData();
  }, []);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return weatherData ? (
    <View style={styles.container}>
      <View style={styles.ViewText}>
        <Text style={styles.Text}>
          Tempo em {weatherData.adress[0].district}
        </Text>
        <Text style={styles.Text}>{weatherData.adress[0].region}</Text>
      </View>
      <View>
        <CardList initialWeatherData={weatherData} />
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a4b75",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
  },
  ViewText: {
    backgroundColor: "#1e6495",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 250,
  },
});

export default WeatherDisplay;
