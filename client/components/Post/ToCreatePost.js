import {
    View,
    Text,
    StyleSheet
} from "react-native";
import React from "react";
import MiniAvatar from "../MiniAvatar/index";

const user = {
    link: '',
    avatar:
      "https://www.syracuse.com/resizer/LjTbKFiHmJSEJyboi68vnEYh40U=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/EAACMW43EZAVNDPNCAV26JZAFI.jpg"
}

const ToCreatePost = () => {
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <MiniAvatar
                    userUrl={user.link}
                    imageUrl={user.avatar}
                    width= {41}
                    height={41}
                />
            </View>
            <View style={styles.create}>
                <View style={styles.borderCreate}>
                </View>
                <View style={styles.textCreate}>
                    Đăng cập nhật trạng thái
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'inline-block',
        height: 55,
        marginHorizontal: 7,
        marginVertical: 6,
    },
    avatar: {
        display: 'inline-block',
        height: 41,
        width: 41,
        margin: 7,
    },
    create: {
        display: 'inline-block',
        height: 36,
        width: 299,
        top: -16,
        marginLeft: 4,
    },
    borderCreate: {
        width: '100%',
        height: '100%',
        backgroundClip: 'content-box',
        borderStyle: 'solid',
        borderWidth: 0,
        borderColor: 'rgb(240,242,245)',
        borderRadius: 1000,
        backgroundColor: 'rgb(240,242,245)',
    },
    textCreate: {
        marginTop: -28,
        height: 36,
        width: 273,
        marginLeft: 18,
        fontSize: 16,
        color: 'rgb(5, 5, 5)',
    }
});

export default ToCreatePost;