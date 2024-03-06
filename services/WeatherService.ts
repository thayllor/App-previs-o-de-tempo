import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig.extra.WEATHER_API_KEY;
const BASE_URL = Constants.expoConfig.extra.WEATHER_API_URL;

export const fetchWeather = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const get_url = `${BASE_URL}lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude=hourly,minutely&units=metric&lang=pt_br&appid=${API_KEY}`;
    console.log(get_url);

    const response = await axios.get(get_url);
    console.log(response.data);

    const adress = await Location.reverseGeocodeAsync(location.coords);
    response.data.adress = adress;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
