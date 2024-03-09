jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => null),
}));

jest.mock("expo-constants", () => ({
  expoConfig: {
    extra: {
      WEATHER_API_KEY: "WEATHER_API_KEY",
      WEATHER_API_URL: "WEATHER_API_URL"
    }
  }
}));

jest.mock("expo-location", () => ({
  requestPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })

  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 0,
        longitude: 0,
      },
    })
  ),
}));