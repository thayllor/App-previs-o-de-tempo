import { Text } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React from "react";

interface ConfigurationProps {
  navigation: BottomTabNavigationProp<any>;
}

export const Configuration: React.FC<ConfigurationProps> = (navigation) => {
  return <Text>Tela de Configurações</Text>;
};

export default Configuration;
