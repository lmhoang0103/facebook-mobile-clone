import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FriendScreen from "./screens/FriendScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenOption = {
  headerShown: false,
};

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={screenOption}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="FriendScreen" component={FriendScreen} />
        </Stack.Navigator>
      </SafeAreaProvider>

      {/* <Tab.Navigator initialRouteName="HomeScreen">
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="FriendScreen" component={FriendScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>

    // <HomeScreen />
    // <SafeAreaProvider>
    //   <FriendScreen />
    // </SafeAreaProvider>
  );
}
