import { PostList } from '@/components';
import { colors, env, screen, status } from '@constants';
import { Avatar, Button, Divider, Icon, Image, Text } from '@rneui/themed';
import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from 'utilities/Notification';
import { getUserName } from 'utilities/User';
import { PageName } from '../../../navigation/constants';
import { SocketProvider } from '../../../plugins/socket';
import {
    selectChatList,
    setSelectedChatDetail,
} from '../../chat/reducers/chat.reducer';
import { fetchPostList } from '../../home/reducers/home.reducer';
import {
    acceptRequestFriend,
    blockUserDiarySlice,
    cancelRequestFriend,
    deleteFriend,
    getStatusFriend,
    getUserProfile,
    selectFriendLength,
    selectFriendProfile,
    selectIsLoading,
    sendRequest,
} from '../reducers/friend.reducer';

function FriendProfile(props) {
    const { navigation, route } = props;
    const dispatch = useDispatch();
    const { navigate, goBack } = navigation;

    const friendId = route?.params?._id;
    const friend = useSelector(selectFriendProfile);
    const refreshing = useSelector(selectIsLoading);
    const userFriendLength = useSelector(selectFriendLength);
    const chatList = useSelector(selectChatList);

    useEffect(() => {
        dispatch(getUserProfile(friendId));
        dispatch(getStatusFriend(friendId));
        dispatch(fetchPostList(friendId));
    }, [friendId]);

    const onRefresh = React.useCallback(() => {
        dispatch(getUserProfile(friendId));
        dispatch(getStatusFriend(friendId));
    }, []);

    useEffect(() => {
        dispatch(getStatusFriend(friendId));
    }, [friend?.status]);

    const requestFriend = async () => {
        if (userFriendLength >= 500) {
            showErrorMessage('Bạn đã có hơn 500 bạn bè');
            return;
        }

        const response = await dispatch(
            sendRequest({
                user_id: friendId,
            }),
        ).unwrap();

        if (response?.success) {
            SocketProvider.emitUserSendRequest(friendId, 'Friends');
            onRefresh();
            showSuccessMessage(response?.message);
            return;
        }
        showErrorMessage(response?.message);
    };

    const removeFriend = async () => {
        const response = await dispatch(
            deleteFriend({
                user_id: friendId,
            }),
        ).unwrap();

        if (response?.success) {
            onRefresh();
            showSuccessMessage(response?.message);
            return;
        }
        showErrorMessage(response?.message);
    };

    const cancelRequest = async () => {
        const response = await dispatch(
            cancelRequestFriend({
                user_id: friendId,
            }),
        ).unwrap();

        if (response?.success) {
            onRefresh();
            showSuccessMessage(response?.message);
            return;
        }
        showErrorMessage(response?.message);
    };

    const acceptRequest = async () => {
        const response = await dispatch(
            acceptRequestFriend({
                user_id: friendId,
                is_accept: '1',
            }),
        ).unwrap();

        if (response?.success) {
            onRefresh();
            showSuccessMessage(response?.message);
            return;
        }
        showErrorMessage(response?.message);
    };

    const getStatusButton = (friendStatus) => {
        let button;
        switch (friendStatus) {
            case status.FRIEND:
                button = (
                    <Button
                        color={colors.grayBlue}
                        buttonStyle={styles.button}
                        onPress={removeFriend}
                    >
                        <Icon name="person-remove" color="white" />
                        <Text style={[styles.textButton, { color: 'white' }]}>
                            {' '}
                            Xóa kết bạn
                        </Text>
                    </Button>
                );
                break;
            case status.NOT_FRIEND:
                button = (
                    <Button
                        color={colors.grayBlue}
                        buttonStyle={styles.button}
                        onPress={requestFriend}
                    >
                        <Icon name="person-add-alt-1" color="white" />
                        <Text style={[styles.textButton, { color: 'white' }]}>
                            Thêm bạn bè
                        </Text>
                    </Button>
                );
                break;

            case status.SENT:
                button = (
                    <Button
                        color={colors.grayBlue}
                        buttonStyle={styles.button}
                        onPress={cancelRequest}
                    >
                        <Icon name="person-add-alt-1" color="white" />
                        <Text style={[styles.textButton, { color: 'white' }]}>
                            Hủy lời mời
                        </Text>
                    </Button>
                );
                break;

            case status.RECEIVED:
                button = (
                    <Button
                        color={colors.grayBlue}
                        buttonStyle={styles.button}
                        onPress={acceptRequest}
                    >
                        <Icon name="person-add-alt-1" color="white" />
                        <Text style={[styles.textButton, { color: 'white' }]}>
                            Chấp nhận
                        </Text>
                    </Button>
                );
                break;
        }
        return button;
    };

    const openChatDetailScreen = () => {
        const chat = chatList.find((c) => c.friend._id === friend._id);
        dispatch(setSelectedChatDetail(chat));
        navigate({
            name: PageName.CHAT_DETAIL,
            params: {
                receiver: friend,
            },
        });
    };

    const blockUser = async () => {
        const response = await dispatch(
            blockUserDiarySlice({
                user_id: friendId,
                type: 'block',
            }),
        ).unwrap();
        if (response?.success) {
            goBack();
            showSuccessMessage(response?.message);
            return;
        }
        showErrorMessage(response?.message);
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Image
                style={styles.cover}
                source={
                    friend?.cover_image
                        ? {
                              uri: `${env.FILE_SERVICE_USER}/${friend?.cover_image.fileName}`,
                          }
                        : require('assets/default_cover.jpg')
                }
                containerStyle={styles.coverContainer}
            />
            <View style={styles.header}>
                <Avatar
                    size={130}
                    rounded
                    source={
                        friend?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${friend?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                    containerStyle={{
                        borderWidth: 4,
                        borderColor: colors.white,
                    }}
                />
                <Text style={styles.name}>{getUserName(friend)}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {getStatusButton(friend?.status)}
                    <Button
                        color={colors.gray}
                        buttonStyle={styles.button}
                        onPress={openChatDetailScreen}
                    >
                        <Icon name="message" color="black" />
                        <Text style={styles.textButton}> Nhắn tin</Text>
                    </Button>
                    <Button
                        color={colors.gray}
                        buttonStyle={styles.button}
                        onPress={blockUser}
                    >
                        <Icon name="block" color="black" />
                        <Text style={styles.textButton}> Chặn</Text>
                    </Button>
                </View>
            </View>
            <Divider
                width={10}
                color={colors.gray}
                style={{ marginVertical: 14 }}
            />
            <ScrollView horizontal={true}>
                <PostList />
            </ScrollView>
        </ScrollView>
    );
}

const styles = {
    header: {
        paddingHorizontal: '5%',
        marginTop: 100,
    },
    cover: {
        height: 200,
        width: screen.width,
    },
    coverContainer: {
        position: 'absolute',
    },
    name: {
        fontSize: 25,
        color: colors.text,
        fontWeight: '700',
        marginBottom: 10,
    },
    button: {
        borderRadius: 5,
    },
    textButton: {
        fontWeight: '700',
    },
};

export default FriendProfile;
