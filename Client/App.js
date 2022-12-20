import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPostScreen from "./src/components/AddPostScreen";
import ImageBrowserScreen from "./src/components/ImageBrowserScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddPostScreen">
        <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
        <Stack.Screen
          name="ImageBrowserScreen"
          component={ImageBrowserScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
