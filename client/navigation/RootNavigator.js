import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import FriendScreen from "../screens/FriendScreen";
const Stack = createStackNavigator();

const screenOption = {
  headerShown: false,
};

const RootNavigator = () => {
  <NavigationContainer>
    <SafeAreaProvider>
      <HomeScreen />
      {/* <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={screenOption}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FriendScreen" component={FriendScreen} />
      </Stack.Navigator> */}
    </SafeAreaProvider>
  </NavigationContainer>;
};

export default RootNavigator;
