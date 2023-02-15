import { env } from '@constants';
import {
    Avatar,
    BottomSheet,
    Button,
    Icon,
    ListItem,
    Text,
} from '@rneui/themed';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from 'utilities/Notification';
import { getUserName } from 'utilities/User';
import {
    blockList,
    blockUserDiarySlice,
    selectBlockedUser,
} from '../../reducers/friend.reducer';

function Blocked(props) {
    const [isVisible, setIsVisible] = React.useState(false);
    const dispatch = useDispatch();
    const blockedUser = useSelector(selectBlockedUser);
    const [targetId, setTargetId] = useState();

    const list = [
        {
            title: 'Bỏ chặn',
            iconName: 'add-circle-outline',
            onPress: () => unlockUser(targetId),
        },
        {
            title: 'Hủy',
            iconName: 'highlight-off',
            onPress: () => setIsVisible(false),
        },
    ];

    const unlockUser = async (user_id) => {
        console.log('Unlock user', user_id);
        const response = await dispatch(
            blockUserDiarySlice({
                user_id,
                type: 'unblock',
            }),
        ).unwrap();
        if (response?.success) {
            dispatch(blockList());
            showSuccessMessage(response?.message);
            setIsVisible(false);
            return;
        }
        showErrorMessage(response?.message);
        setIsVisible(false);
    };

    const openBottomSheet = (id) => {
        setTargetId(id);
        setIsVisible(true);
    };

    return (
        <>
            <Text style={styles.label}>Người bị chặn</Text>
            <Text style={styles.text}>
                Khi bạn chặn ai đó, họ sẽ không xem được nội dung bạn đăng trên
                dòng thời gian của mình, bắt đầu cuộc trò chuyện với bạn hay
                thêm bạn làm bạn bè.
            </Text>
            {blockedUser.length === 0 ? (
                <Text>Bạn chưa chặn bất kỳ ai</Text>
            ) : (
                <FlatList
                    data={blockedUser}
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
                                />
                                <Text style={styles.name}>
                                    {getUserName(item)}
                                </Text>
                            </View>
                            <Button
                                type="clear"
                                titleStyle={{ color: '#646464' }}
                                onPress={() => openBottomSheet(item._id)}
                            >
                                Bỏ chặn
                            </Button>
                        </View>
                    )}
                    keyExtractor={(item) => item._id}
                />
            )}

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
    label: {
        fontSize: 18,
        fontWeight: '700',
    },
    text: {
        color: '#9e9b9b',
        fontSize: 12,
        marginBottom: 10,
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

export default Blocked;
