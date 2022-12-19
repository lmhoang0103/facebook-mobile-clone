import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FriendScreen from "./screens/FriendScreen";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
