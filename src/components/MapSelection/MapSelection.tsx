import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { WeatherService } from "../../services";
import LocationOptions from "../LocationOptions/LocationOptions";
import * as Location from "expo-location";
import LocationService from "../../services/LocationService";
import { MapPressEvent } from "react-native-maps";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface Location {
  latitude: number;
  longitude: number;
  cityName: string;
}

interface MapSelectionProps {
  navigation: BottomTabNavigationProp<any>;
}

export const MapSelection: React.FC<MapSelectionProps> = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const [showOptions, setShowOptions] = useState(false);

  const handleCancel = () => {
    setSelectedLocation(null);
    setShowOptions(false);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const homeLocation = await WeatherService.getHomeLocation();
      if (homeLocation) {
        setSelectedLocation({
          latitude: homeLocation.latitude,
          longitude: homeLocation.longitude,
          cityName: homeLocation.cityName,
        });
      }
    };

    fetchLocation();
  }, []);

  const handlePress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const cityName = await LocationService.getCityName(latitude, longitude);

    setSelectedLocation({
      latitude,
      longitude,
      cityName,
    });

    setShowOptions(true);
  };

  return (
    <>
      <MapView style={{ flex: 1 }} onPress={handlePress}>
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      {showOptions && selectedLocation && (
        <LocationOptions
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
          cityName={selectedLocation.cityName}
          onCancel={handleCancel}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default MapSelection;
