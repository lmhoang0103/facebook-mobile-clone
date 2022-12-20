import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FriendScreen from "./screens/FriendScreen";

const Stack = createStackNavigator();
const screenOption = {
  headerShown: false,
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        // screenOptions={screenOption}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FriendScreen" component={FriendScreen} />
      </Stack.Navigator>
      <SafeAreaProvider></SafeAreaProvider>
    </NavigationContainer>

    // <HomeScreen />
    // <SafeAreaProvider>
    //   <FriendScreen />
    // </SafeAreaProvider>
  );
}
