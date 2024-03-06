import { StyleSheet } from "react-native";
const colors = {
  cardBackground: "#1e6495",
  weatherViewBackground: "#1e7d95",
  daytimeViewBackground: "#174f75",
  daytimeBackground: "#e8e8e8",
  daytimeColors: ["#fb6f24", "#8ca315", "#5191c1"],
};

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 5,
};

const layoutStyle = {
  justifyContent: "center",
  alignItems: "center",
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 500,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    margin: 20,
    marginBottom: 200,
    ...shadowStyle,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    marginBottom: 5,
  },
  weatherView: {
    backgroundColor: colors.weatherViewBackground,
    height: 200,
    borderRadius: 10,
    ...shadowStyle,
    ...layoutStyle,
  },
  weather: {
    fontSize: 14,
    marginBottom: 5,
  },
  DaytimeView: {
    flex: 1,
    marginTop: 10,
    backgroundColor: colors.daytimeViewBackground,
    borderRadius: 10,
    ...layoutStyle,
  },
  Daytime: {
    color: "red",
    flex: 1,
    padding: 5,
    margin: 5,
    backgroundColor: colors.daytimeBackground,
    borderRadius: 5,
    ...layoutStyle,
  },
});
export { styles, colors, shadowStyle, layoutStyle };