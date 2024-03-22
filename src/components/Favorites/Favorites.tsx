import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { StorageService } from "../../services";
import { City } from "../../types";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

interface FavoritesProps {
  navigation: BottomTabNavigationProp<any>;
}

export const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  const [favoritesCities, setData] = useState<City[]>([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      const storageFavoriteCities: City[] = await StorageService.get(
        "favorites"
      );
      // Sort cities so that home city is always first
      storageFavoriteCities.sort((a: City, b: City) => {
        if (b.isHome && !a.isHome) {
          return 1;
        }
        if (a.isHome && !b.isHome) {
          return -1;
        }
        return 0;
      });
      setData(storageFavoriteCities);
    };

    fetchCities();
  });

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }
  const handlePress = async (cityName: string) => {
    await StorageService.set("show", cityName);
    navigation.navigate("Home");
  };

  const renderItem = ({ item }: { item: City }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => handlePress(item.cityName)}
      >
        <Text style={{ color: "black", fontSize: 32 }}>{item.cityName}</Text>
        <Icon name="reorder-four" size={30} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favoritesCities}
        renderItem={renderItem}
        keyExtractor={(item: City, index: number) =>
          `draggable-item-${item.key}`
        }
      />
    </View>
  );
};

export default Favorites;
