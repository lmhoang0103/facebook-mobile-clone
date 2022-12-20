import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Home/Header";
import NavbarTab from "../components/Home/NavbarTab";
import PostOption from "../components/Home/PostOption";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <Header />
      <NavbarTab navigation={navigation} />
      {/* <PostOption /> */}
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
