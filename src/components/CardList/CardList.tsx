import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CardComponent from "../CardComponent/CardComponent";

interface WeatherData {
  daily: Array<{
    weather: { description: string }[];
    humidity: number;
    temp: {
      max: number;
      min: number;
      morn: number;
      eve: number;
      night: number;
    };
    pop: number;
    wind_speed: number;
    feels_like: {
      morn: number;
      eve: number;
      night: number;
    };
  }>;
}

interface CardListProps {
  initialWeatherData: WeatherData;
}

const CardList: React.FC<CardListProps> = ({ initialWeatherData }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(initialWeatherData);

  useEffect(() => {
    setWeatherData(initialWeatherData);
  }, [initialWeatherData]);

  if (!weatherData || !weatherData.daily) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView} horizontal>
      {weatherData.daily.map((data, index) => (
        <CardComponent key={index} day={index} day_data={data} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardList;