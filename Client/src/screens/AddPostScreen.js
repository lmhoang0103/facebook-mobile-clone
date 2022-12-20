import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  ScrollView,
} from "react-native";
// import BackButton from '../components/BackButton';
import {
  MaterialIcons,
  Feather,
  Foundation,
  EvilIcons,
} from "@expo/vector-icons";
import InputEmoji from "react-input-emoji-native";

export default function AddPostScreen({ navigation, route }) {
  const [text, setText] = useState("");
  let photos = [];
  let count = 0;
  if (route.params) {
    photos = route.params.photos;
    count = route.params.count;
  }

  const RenderImg = () => {
    if (count == 1) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            padding: 20,
          }}
        >
          <Image
            style={styles.image}
            source={{ uri: photos[0].uri }}
            key={count}
          ></Image>
        </View>
      );
    }
    if (count == 2) {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            padding: 20,
          }}
        >
          <View style={{ width: "50%" }}>
            <Image
              style={styles.image}
              source={{ uri: photos[0].uri }}
              key={1}
            ></Image>
          </View>
          <View style={{ width: "50%" }}>
            <Image
              style={styles.image}
              source={{ uri: photos[1].uri }}
              key={2}
            ></Image>
          </View>
        </View>
      );
    }
    if (count == 3) {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            padding: 20,
          }}
        >
          <View style={{ width: "50%" }}>
            <Image
              style={styles.image}
              source={{ uri: photos[0].uri }}
              key={1}
            ></Image>
          </View>
          <View style={{ width: "50%" }}>
            <View style={{ width: "100%" }}>
              <Image
                style={styles.image2}
                source={{ uri: photos[1].uri }}
                key={2}
              ></Image>
            </View>
            <View style={{ width: "100%" }}>
              <Image
                style={styles.image2}
                source={{ uri: photos[2].uri }}
                key={3}
              ></Image>
            </View>
          </View>
        </View>
      );
    }
    if (count == 4) {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            padding: 20,
          }}
        >
          <View style={{ width: "50%" }}>
            <View style={{ width: "100%" }}>
              <Image
                style={styles.image2}
                source={{ uri: photos[0].uri }}
                key={1}
              ></Image>
            </View>
            <View style={{ width: "100%" }}>
              <Image
                style={styles.image2}
                source={{ uri: photos[1].uri }}
                key={2}
              ></Image>
            </View>
          </View>
          <View style={{ width: "50%" }}>
            <View style={{ width: "100%" }}>
              <Image
                style={styles.image2}
                source={{ uri: photos[2].uri }}
                key={3}
              ></Image>
            </View>
            <View style={{ width: "100%" }}>
              <Image
                style={styles.image2}
                source={{ uri: photos[3].uri }}
                key={4}
              ></Image>
            </View>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  };

  function handleOnEnter(text) {
    // console.log("enter", text);
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        {/* <BackButton style={styles.back_btn} goBack={navigation.goBack} />rr */}
        <Text style={styles.text_head}>Tạo bài viết mới</Text>
        <TouchableOpacity style={styles.post_btn}>
          <Text style={styles.text_btn_post}>Đăng</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 10,
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        <ScrollView style={styles.main}>
          <TextInput
            placeholder={
              route.params ? "Bạn nghĩ gì về bức ảnh này" : "Bạn đang nghĩ gì?"
            }
            style={styles.text_status}
          />
          {/* <EmojiSelector
            category={Categories.symbols}
            onEmojiSelected={(emoji) => console.log(emoji)}
          /> */}
          {/* <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            placeholder="Type a message"
          /> */}

          <RenderImg />
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={{ flexDirection: "row", flex: 7 }}>
          <Text style={styles.text_footer}>Thêm vào bài viết của bạn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", flex: 1 }}>
          <Feather
            style={{ flex: 1 }}
            name="image"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("ImageBrowserScreen");
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", flex: 1 }}
          onPress={() => {
            navigation.navigate("ImageBrowserScreen");
          }}
        >
          <Foundation
            style={{ flex: 1 }}
            name="play-video"
            size={24}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", flex: 1 }}>
          <MaterialIcons
            style={{ flex: 3 }}
            name="insert-emoticon"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  head: {
    // backgroundColor: "#00bfff",
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 20,
    height: 70,
    alignItems: "center",
    height: 65,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },

  back_btn: {
    flex: 1,
  },

  text_head: {
    flex: 4,
    color: "#000000",
    fontSize: 20,
  },

  text_footer: {
    flex: 4,
    color: "#000000",
    fontSize: 20,
    paddingLeft: 5,
  },

  post_btn: {
    flex: 1,
    color: "#0000ff",
  },

  main: {
    flex: 10,
  },

  footer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgb(220,220,220)",
    alignItems: "center",
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "#000000",
    margin: 10,
    paddingRight: 5,
    borderRadius: 10,
  },

  text_btn_post: {
    color: "#0000ff",
    fontSize: 20,
  },

  image: {
    flex: 1,
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "rgb(200,200,200)",
    borderRadius: 10,
    overflow: "hidden",
  },

  image2: {
    flex: 1,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "rgb(200,200,200)",
    borderRadius: 10,
    overflow: "hidden",
  },

  text_status: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: "#dcdcdc",
    borderRadius: 20,
    margin: 10,
  },
});
