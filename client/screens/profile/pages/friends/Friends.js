import { env } from '@constants';
import {
    Avatar,
    BottomSheet,
    Icon,
    Input,
    ListItem,
    Text,
} from '@rneui/themed';
import { debounce } from 'lodash';
import { PageName } from 'navigation/constants';
import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from 'utilities/Notification';
import { getUserName } from 'utilities/User';
import { getFriendProfile } from '../../../../services/friend.api';
import {
    blockUserDiarySlice,
    deleteFriend,
    getListFriends,
    getUserProfile,
    selectFriendList,
} from '../../reducers/friend.reducer';

function Friends({ navigate }) {
    const listFriend = useSelector(selectFriendList);
    const dispatch = useDispatch();
    const [targetId, setTargetId] = React.useState();
    const [isVisible, setIsVisible] = React.useState(false);
    const [keySearch, setKeySearch] = React.useState('');
    const [filteredList, setFilteredList] = React.useState(listFriend);

    useEffect(() => {
        setFilteredList(
            listFriend.filter((e) =>
                getUserName(e).toLowerCase().includes(keySearch.toLowerCase()),
            ),
        );
    }, [keySearch, listFriend]);

    const sendMessage = async () => {
        const response = await getFriendProfile(targetId);
        if (response?.success) {
            navigate({
                name: PageName.CHAT_DETAIL,
                params: {
                    receiver: response?.data,
                },
            });
        }
    };

    const removeFriend = async () => {
        const response = await dispatch(
            deleteFriend({
                user_id: targetId,
            }),
        ).unwrap();

        if (response?.success) {
            dispatch(getListFriends());
            setIsVisible(false);
            showSuccessMessage(response?.message);
            return;
        }
        setIsVisible(false);
        showErrorMessage(response?.message);
    };

    const openBottomSheet = (id) => {
        setTargetId(id);
        setIsVisible(true);
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

    const blockUser = async (user_id) => {
        const response = await dispatch(
            blockUserDiarySlice({
                user_id,
                type: 'block',
            }),
        ).unwrap();
        if (response?.success) {
            dispatch(getListFriends());
            showSuccessMessage(response?.message);
            setIsVisible(false);
            return;
        }
        showErrorMessage(response?.message);
        setIsVisible(false);
    };

    const list = [
        {
            title: 'Nhắn tin',
            iconName: 'message',
            onPress: () => sendMessage(),
        },
        {
            title: 'Chặn',
            iconName: 'block',
            onPress: () => blockUser(targetId),
        },
        {
            title: 'Hủy kết bạn',
            iconName: 'highlight-off',
            onPress: () => removeFriend(),
        },
    ];

    const searchDebounce = debounce((text) => setKeySearch(text), 500);

    return (
        <>
            <Input
                returnKeyType="search"
                placeholder="Search"
                leftIcon={<Icon name="search" />}
                inputStyle={{ fontSize: 17 }}
                containerStyle={{ height: 55 }}
                inputContainerStyle={styles.inputSearchContainer}
                onChangeText={searchDebounce}
            />
            <Text style={[styles.name, { fontSize: 20, paddingBottom: 10 }]}>
                {filteredList.length} người bạn
            </Text>
            <FlatList
                data={filteredList}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Avatar
                                size={75}
                                rounded
                                source={
                                    item?.avatar
                                        ? {
                                              uri: `${env.FILE_SERVICE_USER}/${item?.avatar.fileName}`,
                                          }
                                        : require('assets/default_avt.jpg')
                                }
                                onPress={() => gotoFriendProfile(item)}
                            />
                            <Text
                                style={styles.name}
                                onPress={() => gotoFriendProfile(item)}
                            >
                                {getUserName(item)}
                            </Text>
                        </View>
                        <Icon
                            type="material"
                            name="more-horiz"
                            style={{ padding: 8 }}
                            onPress={() => openBottomSheet(item._id)}
                        />
                    </View>
                )}
                keyExtractor={(item) => item._id}
            />

            <BottomSheet
                isVisible={isVisible}
                modalProps={{
                    animationType: 'fade',
                }}
                onBackdropPress={() => setIsVisible(false)}
            >
                {list.map((l, i) => (
                    <ListItem key={i} onPress={l.onPress}>
                        <ListItem.Content style={styles.contentStyle}>
                            <Icon name={l.iconName} type="material" />
                            <ListItem.Title style={styles.titleStyle}>
                                {l.title}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 17,
        padding: 10,
    },
    inputSearchContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 0,
    },
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    titleStyle: {
        fontWeight: '700',
        marginHorizontal: 10,
    },
};

export default Friends;
