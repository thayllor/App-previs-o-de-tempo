import AsyncStorage from "@react-native-async-storage/async-storage";

export default class StorageService {
  static async set(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key.toLowerCase(), jsonValue);
    } catch (e) {
      console.error("Error storing data", e);
    }
  }

  static async get(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key.toLowerCase());
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Error fetching data", e);
    }
  }
  static async clear() {
    try {
      await AsyncStorage.clear();
      console.log("Storage successfully cleared!");
    } catch (e) {
      console.error("Error clearing storage", e);
    }
  }
}
