import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text, Icon, Button, Avatar } from '@rneui/themed';
import { PageName } from 'navigation/constants';
import { env, colors, screen } from '@constants';
import { useDispatch, useSelector } from 'react-redux';
import {
    listRequest,
    selectReceivedList,
    acceptRequestFriend,
    getListFriends,
    getUserProfile,
    selectFriendLength,
    blockList,
} from '../../reducers/friend.reducer';
import { getUserName } from 'utilities/User';
import { useFocusEffect } from '@react-navigation/native';
import { showErrorMessage, showSuccessMessage } from 'utilities/Notification';

function Request({ navigate }) {
    const dispatch = useDispatch();
    const userFriendLength = useSelector(selectFriendLength);

    const receivedList = useSelector(selectReceivedList);

    useFocusEffect(
        useCallback(() => {
            dispatch(listRequest());
            dispatch(blockList());
        }, []),
    );

    const acceptRequest = async (user_id) => {
        if (userFriendLength >= 500) {
            showErrorMessage('Bạn đã có hơn 500 bạn bè');
            return;
        }
        const response = await dispatch(
            acceptRequestFriend({
                user_id,
                is_accept: '1',
            }),
        ).unwrap();

        if (response?.success) {
            dispatch(listRequest());
            dispatch(getListFriends());
            showSuccessMessage(response?.message);
            return;
        }
        showErrorMessage(response?.message);
    };

    const cancelRequest = async (user_id) => {
        const response = await dispatch(
            acceptRequestFriend({
                user_id,
                is_accept: '2',
            }),
        ).unwrap();

        if (response?.success) {
            dispatch(listRequest());
            showSuccessMessage(response?.message);
            return;
        }
        showErrorMessage(response?.message);
    };

    const gotoFriendProfile = async (friend) => {
        const response = await dispatch(getUserProfile(friend?._id)).unwrap();

        if (response?.success) {
            navigate({
                name: PageName.FRIEND_PROFILE,
                params: friend,
            });
            return;
        }
        showErrorMessage(response?.message);
    };

    return (
        <>
            <Text style={[styles.name, { fontSize: 20, paddingBottom: 10 }]}>
                {receivedList.length} lời mời
            </Text>
            <FlatList
                data={receivedList}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Avatar
                            size={75}
                            rounded
                            source={
                                item?.sender?.avatar
                                    ? {
                                          uri: `${env.FILE_SERVICE_USER}/${item?.sender?.avatar.fileName}`,
                                      }
                                    : require('assets/default_avt.jpg')
                            }
                            onPress={() => gotoFriendProfile(item?.sender)}
                        />
                        <View>
                            <Text
                                style={styles.name}
                                onPress={() => gotoFriendProfile(item?.sender)}
                            >
                                {getUserName(item?.sender)}
                            </Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    buttonStyle={styles.buttonAccept}
                                    color={colors.grayBlue}
                                    onPress={() =>
                                        acceptRequest(item?.sender._id)
                                    }
                                >
                                    Chấp nhận
                                </Button>
                                <Button
                                    buttonStyle={styles.buttonReject}
                                    color={colors.gray}
                                    titleStyle={{ color: 'black' }}
                                    onPress={() =>
                                        cancelRequest(item?.sender._id)
                                    }
                                >
                                    Từ chối
                                </Button>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item._id}
            />
        </>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    buttonAccept: {
        borderRadius: 5,
        paddingHorizontal: 15,
    },
    buttonReject: {
        borderRadius: 5,
        marginLeft: 8,
        paddingHorizontal: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
    },
};

export default Request;
