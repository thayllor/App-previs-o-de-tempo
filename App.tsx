import React, { useEffect } from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Configuration, Favorites, MapSelection } from "./src/components";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Button } from "react-native";
import { StorageService } from "./src/services"; // Ajuste o caminho de importação conforme necessário
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

Font.loadAsync({
  // This is the font that we are using for our tab bar
  ...Ionicons.font,
  // We include SpaceMono because we use it in HomeScreen.js. Feel free
  // to remove this if you are not using it in your app
  EB_Garamond: require("./assets/fonts/EB_Garamond/static/EBGaramond-Regular.ttf"),
});
const Tab = createBottomTabNavigator();

interface TabScreenProps {
  navigation: BottomTabNavigationProp<any>;
  route: RouteProp<any>;
}

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
      .then(() => loadFonts())
      .catch(console.warn);
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      ...Ionicons.font,
    });

    SplashScreen.hideAsync().catch(console.warn);
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 24 },
          // headerRight: () => (
          //   <Button
          //     title="Clear Storage"
          //     onPress={() => {
          //       StorageService.clear();
          //     }}
          //   />
          // )
        }}
      >
        {/* icone de engrenagem
        <Tab.Screen
          name="Configuration"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="build" color={color} size={size} />
            ),
          }}
        >
          {(props: TabScreenProps) => <Configuration {...props} />}
        </Tab.Screen> */}
        {/* Home */}
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-home" color={color} size={size} />
            ),
          }}
        >
          {(props: TabScreenProps) => <Home {...props} />}
        </Tab.Screen>
        {/* Favorites */}
        <Tab.Screen
          name="Favorites"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="star" color={color} size={size} />
            ),
          }}
        >
          {(props: TabScreenProps) => <Favorites {...props} />}
        </Tab.Screen>
        {/* icone de Lupa */}
        <Tab.Screen
          name="MapSelection"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" color={color} size={size} />
            ),
          }}
        >
          {(props: TabScreenProps) => <MapSelection {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
