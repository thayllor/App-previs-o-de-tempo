import React from "react";
import { styles } from "./style";
import { View, Text } from "react-native";

const getDayOfWeek = (day) => {
  const date = new Date();
  date.setDate(date.getDate() + day);
  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return day == 0 ? "Hoje" : days[date.getDay()];
};

const TimeDetail = ({ period, temp, feels_like, color }) => (
  <View style={[styles.Daytime, { backgroundColor: color }]}>
    <Text>{period}</Text>
    <Text style={styles.weather}>Temperatura: {Math.floor(temp)}ºC</Text>
    <Text style={styles.weather}>
      Sensação termica: {Math.ceil(feels_like)}ºC
    </Text>
  </View>
);

const CardComponent = ({ day, day_data }) => {
  const dayOfWeek = getDayOfWeek(day);
  const dayOfMonth = new Date().getDate();
  const { weather, humidity, temp, pop, wind_speed, feels_like } = day_data;

  return (
    <View style={styles.card}>
      <View style={styles.dayText}>
        <Text style={styles.dayText}>{`${dayOfWeek}, ${dayOfMonth}`}</Text>
      </View>
      <View style={styles.weatherView}>
        <Text style={styles.weather}>Previsão: {weather[0].description}</Text>
        <Text style={styles.weather}>Humidade Relativa do ar: {humidity}%</Text>
        <Text style={styles.weather}>Maxima: {Math.floor(temp.max)}ºC</Text>
        <Text style={styles.weather}>Minima: {Math.ceil(temp.min)}ºC</Text>
        <Text style={styles.weather}>Probabilidade de chuva: {pop * 100}%</Text>
        <Text style={styles.weather}>Velocidade do vento: {wind_speed}m/s</Text>
      </View>
      <View style={styles.DaytimeView}>
        <TimeDetail
          period="Manha"
          temp={temp.morn}
          feels_like={feels_like.morn}
          color="#fb6f24"
        />
        <TimeDetail
          period="Tarde"
          temp={temp.eve}
          feels_like={feels_like.eve}
          color="#8ca315"
        />
        <TimeDetail
          period="Noite"
          temp={temp.night}
          feels_like={feels_like.night}
          color="#5191c1"
        />
      </View>
    </View>
  );
};

export default CardComponent;
