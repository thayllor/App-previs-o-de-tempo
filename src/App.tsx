import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Configuration, Favorites, MapSelection } from "./components";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

interface TabScreenProps {
  navigation: BottomTabNavigationProp<any>;
  route: RouteProp<any>;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        {/* icone de engrenagem */}
        <Tab.Screen
          name="Configuration"
          component={(props: TabScreenProps) => <Configuration {...props} />}
        />
        {/* icone de casinha */}
        <Tab.Screen
          name="Home"
          component={(props: TabScreenProps) => <Home {...props} />}
        />
        {/* icone de estrela */}
        <Tab.Screen
          name="Favorites"
          component={(props: TabScreenProps) => <Favorites {...props} />}
        />
        {/* icone de Lupa */}
        <Tab.Screen
          name="MapSelection"
          component={(props: TabScreenProps) => <MapSelection {...props} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
