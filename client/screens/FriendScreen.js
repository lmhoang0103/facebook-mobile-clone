import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarTab from "../components/Home/NavbarTab";
import Header from "../components/Home/Header";

const FriendScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <Header />
      <NavbarTab navigation={navigation} />
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <Friends />
      </ScrollView> */}
      {/* <Friends /> */}

      <Text>FriendScreen</Text>
    </SafeAreaView>
  );
};

export default FriendScreen;
