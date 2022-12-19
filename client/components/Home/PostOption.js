import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const PostOption = () => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
      }}
    >
      <View>
        <View>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg",
              }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostOption;
