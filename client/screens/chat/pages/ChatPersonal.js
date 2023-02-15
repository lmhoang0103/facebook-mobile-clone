import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, Icon, ListItem } from '@rneui/themed';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors, env } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { SocketProvider } from '../../../plugins/socket';
import { getUserName } from '../../../utilities/User';
import { selectLoginUser } from '../../auth/reducers/auth.reducer';
import {
    fetchChatList,
    selectChatList,
    selectSelectedChatDetail,
    setSelectedChatDetail,
} from '../reducers/chat.reducer';

const ChatPersonal = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const loginUser = useSelector(selectLoginUser);
    const chatList = useSelector(selectChatList);
    const selectedChatDetail = useSelector(selectSelectedChatDetail);
    const {
        chatId,
        lastMessage,
        friend: receiver = {},
        seen = false,
        blockers = [],
    } = selectedChatDetail;
    const dispatch = useDispatch();

    const { navigate } = navigation;
    useEffect(() => {
        navigation.setOptions({
            title: '',
        });
    }, []);

    const goToReceiverProfile = () => {
        navigate({
            name: PageName.FRIEND_PROFILE,
            params: {
                _id: receiver._id,
            },
        });
    };

    const onBlockChat = async () => {
        SocketProvider.emitBlockers(
            loginUser._id,
            blockers.includes(loginUser._id) ? 'unblock' : 'block',
            chatId,
        );
        await dispatch(fetchChatList()).unwrap();
        navigation.goBack();
    };

    useEffect(() => {
        const chat = chatList.find((c) => c.chatId === chatId);
        if (chat) {
            dispatch(setSelectedChatDetail(chat));
        }
    }, [chatList]);

    const list = [
        {
            title: 'Trang cá nhân',
            iconName: 'account-circle',
            color: colors.grayBlue,
            onPress: goToReceiverProfile,
        },
        {
            title: blockers.includes(loginUser._id) ? 'Bỏ chặn' : 'Chặn',
            iconName: 'block',
            color: colors.red,
            onPress: onBlockChat,
        },
    ];

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Avatar
                    rounded
                    size={150}
                    source={
                        receiver?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${receiver?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
                    {getUserName(receiver)}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                {list.map((element, index) => {
                    return (
                        <TouchableHighlight
                            key={index}
                            underlayColor="#DDDDDD"
                            onPress={element.onPress}
                        >
                            <ListItem
                                key={index}
                                containerStyle={{ backgroundColor: 'none' }}
                            >
                                <ListItem.Content style={styles.contentStyle}>
                                    <Icon
                                        name={element.iconName}
                                        size={40}
                                        color={element.color}
                                        type="material"
                                    />
                                    <ListItem.Title style={styles.titleStyle}>
                                        {element.title}
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </TouchableHighlight>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        // textAlign: "center",
        flex: 1,
        // flexDirection: "column",
    },
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontWeight: '700',

        marginHorizontal: 10,
    },
});

export default ChatPersonal;
