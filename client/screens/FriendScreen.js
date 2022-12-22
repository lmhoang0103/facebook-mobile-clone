import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarTab from "../components/Home/NavbarTab";
import Header from "../components/Home/Header";
import Friends from "../components/Friends/Friends";

const FriendScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <Header />
      <NavbarTab navigation={navigation} />
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <Friends />
      </ScrollView> */}

      <Friends />
    </SafeAreaView>
  );
};

export default FriendScreen;
