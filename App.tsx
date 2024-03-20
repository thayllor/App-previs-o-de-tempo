import React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Configuration, Favorites, MapSelection } from "./src/components";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Button } from "react-native";
import { StorageService } from "./src/services"; // Ajuste o caminho de importação conforme necessário

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
          options={{
            headerShown: true,
            headerRight: () => (
              <Button
                title="Clear Storage"
                onPress={() => {
                  StorageService.clear();
                }}
              />
            ),
          }}
        >
          {(props: TabScreenProps) => <Configuration {...props} />}
        </Tab.Screen>
        {/* icone de casinha */}
        <Tab.Screen
          name="Home"
          options={{
            headerShown: true,
            headerRight: () => (
              <Button
                title="Clear Storage"
                onPress={() => {
                  StorageService.clear();
                }}
              />
            ),
          }}
        >
          {(props: TabScreenProps) => <Home {...props} />}
        </Tab.Screen>
        {/* icone de estrela */}
        <Tab.Screen
          name="Favorites"
          options={{
            headerShown: true,
            headerRight: () => (
              <Button
                title="Clear Storage"
                onPress={() => {
                  StorageService.clear();
                }}
              />
            ),
          }}
        >
          {(props: TabScreenProps) => <Favorites {...props} />}
        </Tab.Screen>
        {/* icone de Lupa */}
        <Tab.Screen
          name="MapSelection"
          options={{
            headerShown: true,
            headerRight: () => (
              <Button
                title="Clear Storage"
                onPress={() => {
                  StorageService.clear();
                }}
              />
            ),
          }}
        >
          {(props: TabScreenProps) => <MapSelection {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
