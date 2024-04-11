import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Ionicons as Icon } from "@expo/vector-icons";
import { StorageService } from "../../services";
import { City } from "../../types";
import * as Font from "expo-font";

interface FavoritesProps {
  navigation: BottomTabNavigationProp<any>;
}

export const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  var [favoritesCities, setData] = useState<City[]>([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  //carrega as cidades favoritas
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
  //carrefa a fonte Ionicons
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          ...Icon.font,
        });
        setFontsLoaded(true);
        console.log("Fonte Ionicons carregada com sucesso");
      } catch (error) {
        console.log("Erro ao carregar a fonte Ionicons:", error);
      }
    };

    loadFonts();
  }, []);

  //Mostra o tempo da cidade selecionada
  const handlePress = async (cityName: string) => {
    await StorageService.set("show", cityName);
    navigation.navigate("Home");
  };

  //altera a cidade home
  const changeHome = async (newHomeCityName: string) => {
    const updatedFavorites = favoritesCities.map((city) => {
      if (city.cityName === newHomeCityName) {
        return { ...city, isHome: true };
      }
      if (city.isHome) {
        return { ...city, isHome: false };
      }
      return city;
    });

    favoritesCities = updatedFavorites; // Atualiza o estado com o novo array
    await StorageService.set("favorites", updatedFavorites);
  };
  // renderiza a lista de cidades
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
        <View
          style={{
            flexDirection: "column", // Altere para 'column'
            alignItems: "center", // Alinha os itens ao centro
            justifyContent: "center", // Centraliza os itens
            width: "90%", // Adicione esta linha
          }}
        >
          <Text style={{ color: "black", fontSize: 32 }}>{item.cityName}</Text>
          {!item.isHome && (
            <TouchableOpacity
              onPress={() => changeHome(item.cityName)}
              style={{
                backgroundColor: "blue", // Cor de fundo do botão
                padding: 10, // Espaçamento interno do botão
                borderRadius: 5, // Bordas arredondadas
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Virar Home</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (!fontsLoaded) {
    return <View />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={favoritesCities}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
        />
      </View>
    );
};

export default Favorites;
