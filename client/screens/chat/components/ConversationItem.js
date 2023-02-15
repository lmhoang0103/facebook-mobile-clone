import { useNavigation } from '@react-navigation/native';
import { Avatar, Divider, Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { env } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { getUserName } from '../../../utilities/User';
import { setSelectedChatDetail } from '../reducers/chat.reducer';

function ConversationItem(props) {
    const { chat, setIsVisibleBlockSheet, setSelectedChat } = props;
    const { chatId, friend: receiver, lastMessage } = chat;
    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            onPress={() => {
                dispatch(setSelectedChatDetail(chat));
                navigate({
                    name: PageName.CHAT_DETAIL,
                    params: {
                        receiver,
                    },
                });
            }}
        >
            <View style={styles.conversationItem}>
                <View style={{ flex: 0.15, paddingHorizontal: 10 }}>
                    <Avatar
                        rounded
                        size={45}
                        source={
                            receiver?.avatar
                                ? {
                                      uri: `${env.FILE_SERVICE_USER}/${receiver?.avatar.fileName}`,
                                  }
                                : require('assets/default_avt.jpg')
                        }
                    />
                </View>
                <View style={{ flex: 0.9 }}>
                    <Text style={styles.namePerson}>
                        {getUserName(receiver)}
                    </Text>
                    <Text
                        ellipsizeMode="clip"
                        numberOfLines={1}
                        style={styles.lastMessage}
                    >
                        {lastMessage.content}
                    </Text>
                    <Divider width={1} />
                </View>
                <View style={{ flex: 0.15, alignItems: 'center' }}>
                    <Icon
                        type="font-awesome"
                        name="ellipsis-h"
                        onPress={() => {
                            setIsVisibleBlockSheet(true);
                            setSelectedChat(chat);
                        }}
                        style={{ padding: 5, borderRadius: 50 }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    namePerson: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    lastMessage: {},
});

export default ConversationItem;
