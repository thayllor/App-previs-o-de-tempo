import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StorageService } from "../../services";
import { City } from "../../types";

interface FavoritesProps {
  navigation: BottomTabNavigationProp<any>;
}

export const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  const [data, setData] = useState<City[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const cities: City[] = await StorageService.get("favorites");
      // Sort cities so that home city is always first
      cities.sort((a: City, b: City) => {
        if (b.isHome && !a.isHome) {
          return -1;
        }
        if (a.isHome && !b.isHome) {
          return 1;
        }
        return 0;
      });
      setData(cities);
    };

    fetchCities();
  }, []);

  const renderItem = ({ item }: { item: City }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "black", fontSize: 32 }}>{item.cityName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: City, index: number) =>
          `draggable-item-${item.key}`
        }
      />
    </View>
  );
};

export default Favorites;
