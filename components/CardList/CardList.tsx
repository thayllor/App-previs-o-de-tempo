import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CardComponent from "../CardComponent/CardComponent";

const CardList = ({ initialWeatherData }) => {
  const [weatherData, setWeatherData] = useState(initialWeatherData);

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
