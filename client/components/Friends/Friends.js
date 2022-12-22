import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import React from "react";

const FRIENDS = [
  {
    profile_img:
      "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg",
    time: "1year ago",
  },
  {
    profile_img:
      "https://cdn.dribbble.com/users/2638821/screenshots/9213234/media/d51ac680af06d6c9642b145ebe24633f.jpg?compress=1&resize=400x300",
    username: "Hasib Rahman",
    time: "1week ago",
  },
  {
    profile_img:
      "https://img.buzzfeed.com/buzzfeed-static/static/2022-05/11/16/asset/1333f72ca85c/sub-buzz-467-1652286288-16.jpg",
    username: "Ayondrila Maria",
    time: "1day ago",
  },
  {
    profile_img:
      "https://i2-prod.walesonline.co.uk/news/uk-news/article23927263.ece/ALTERNATES/s1200/0_F038F02A-D11F-11EC-A042-0A2111BCB09D.jpg",
    username: "Fatima Hussain",
    time: "1year ago",
  },
  {
    profile_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7hvx8aXtImDO0TMr0FsZPkLVI1tIDZ4yyew&usqp=CAU",
    username: "Tanmi Akand",
    time: "2hr ago",
  },
  {
    profile_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ0w-JholY70i-SCbLPTXh1wY7bJFiAF_WGA&usqp=CAU",
    username: "Hasib Rahman",
    time: "1week ago",
  },
  {
    profile_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGrR1QgdaFVmP3uVbCdkh13ZEa6o8Zt4UY9A&usqp=CAU",
    username: "Faysal Ahmed",
    time: "1year ago",
  },
];

const Friends = () => {
  return (
    <View>
      <View>
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
          {/* LEFT */}
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
            />{" "}
          </View>
          {/* RIGHT */}
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
