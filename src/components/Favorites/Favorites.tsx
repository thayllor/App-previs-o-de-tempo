import { Text } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface FavoritesProps {
  navigation: BottomTabNavigationProp<any>;
}
export const Favorites: React.FC<FavoritesProps> = (navigation) => {
  return <Text>Tela de Favorites</Text>;
};
export default Favorites;
