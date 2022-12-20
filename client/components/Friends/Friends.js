import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import { USERS } from "../../Data/Users";

const FRIENDS = [
  {
    profile_img:
      "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg",
    time: "1year ago",
  },
  {
    profile_img:
      "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg",
    username: "Hasib Rahman",
    time: "1week ago",
  },
  {
    profile_img:
      "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg",
    username: "Ayondrila Maria",
    time: "1day ago",
  },
  {
    profile_img:
      "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg",
    username: "Fatima Hussain",
    time: "1year ago",
  },
  {
    profile_img:
      "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg",
    username: "Tanmi Akand",
    time: "2hr ago",
  },
  {
    profile_img:
      "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg",
    username: "Hasib Rahman",
    time: "1week ago",
  },
  {
    profile_img:
      "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg",
    username: "Faysal Ahmed",
    time: "1year ago",
  },
];

const Friends = () => {
  return (
    <View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingRight: 20,
          paddingTop: 5,
        }}
      >
        <Text
          style={{
            paddingLeft: 20,
            fontSize: 20,
            fontWeight: "900",
          }}
        >
          Friends
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: "blue",
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {FRIENDS.map((friend, index) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <View
            style={{
              paddingVertical: 5,
              paddingLeft: 10,
            }}
          >
            <Image
              source={{ uri: friend.profile_img }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 50,
              }}
            />
          </View>
          {/* Right */}
          <View
            style={{
              flexDirection: "column",
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
                paddingHorizontal: 10,
              }}
            >
              <View>
                <Text>{friend.username}</Text>
              </View>
              <View>
                <Text>{friend.time}</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 10,
                }}
              >
                <View>
                  <Pressable titleSize={15}>
                    <Text
                      style={{
                        backgroundColor: "#1A6ED8",
                        paddingHorizontal: 20,
                        paddingVertical: 8,
                        color: "#fff",
                        borderRadius: 8,
                        fontSize: 15,
                      }}
                    >
                      Confirm
                    </Text>
                  </Pressable>
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Pressable titleSize={15}>
                    <Text
                      style={{
                        backgroundColor: "#D8DADF",
                        paddingHorizontal: 20,
                        paddingVertical: 8,
                        color: "#000",
                        borderRadius: 8,
                        fontSize: 15,
                      }}
                    >
                      Delete
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Friends;
