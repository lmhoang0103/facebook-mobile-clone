import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

const NavbarTab = ({ navigation }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* Home */}
        <TouchableOpacity onPress={() => navigation.push("HomeScreen")}>
          <Image
            source={require("../../assets/NavBarIcon/home2.png")}
            style={{ width: 50, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        {/* Friend */}
        <TouchableOpacity onPress={() => navigation.push("FriendScreen")}>
          <Image
            source={require("../../assets/NavBarIcon/friend.png")}
            style={{ width: 50, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        {/* Message */}
        <TouchableOpacity>
          <Image
            source={require("../../assets/NavBarIcon/message.png")}
            style={{ width: 50, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        {/* Notification */}
        <TouchableOpacity>
          <Image
            source={require("../../assets/NavBarIcon/notification.png")}
            style={{ width: 50, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        {/* Video */}
        <TouchableOpacity>
          <Image
            source={require("../../assets/NavBarIcon/video.png")}
            style={{ width: 50, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavbarTab;
