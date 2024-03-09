import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { WeatherService } from "../../services";
import { LocationOptions } from "../";
import { NavigationProp } from "@react-navigation/native";
import MapEvent from "react-native-maps";
import { MapPressEvent } from "react-native-maps";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface Location {
  latitude: number;
  longitude: number;
}

interface MapSelectionProps {
  navigation: BottomTabNavigationProp<any>;
}

export const MapSelection: React.FC<MapSelectionProps> = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    const fetchLocation = async () => {
      const homeLocation = await WeatherService.getHomeLocation();
      if (homeLocation) {
        setSelectedLocation({
          latitude: homeLocation.latitude,
          longitude: homeLocation.longitude,
        });
      }
    };

    fetchLocation();
  }, []);

  const handlePress = (event: MapPressEvent) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    setShowOptions(true);
  };

  const handleCancel = () => {
    setShowOptions(false);
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
          onCancel={handleCancel}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default MapSelection;
