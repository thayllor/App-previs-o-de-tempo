import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a4b75",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  ViewText: {
    backgroundColor: "#1e6495",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 250,
  },
});

export { styles };