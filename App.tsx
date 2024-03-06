import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import WeatherDisplay from "./components/WeatherDisplay";

export default function App() {
  // const [menuIsVisible, setMenuisvisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* <Menu>
        menuIsVisible = {menuIsVisible}
        setMenuisvisible = {setMenuisvisible}
      </Menu> */}
      <WeatherDisplay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
