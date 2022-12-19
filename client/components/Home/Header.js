import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
      }}
    >
      <View>
        <TouchableOpacity>
          <Image
            source={require("../../assets/logo.jpg")}
            style={{
              width: 100,
              height: 50,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity>
          <Image
            source={require("../../assets/search.jpg")}
            style={{
              height: 50,
              width: 50,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/navbar.jpg")}
            style={{
              height: 50,
              width: 50,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
