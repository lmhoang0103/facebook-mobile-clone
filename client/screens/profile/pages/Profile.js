import { PostList } from '@/components';
import { colors, env, screen } from '@constants';
import { useFocusEffect } from '@react-navigation/native';
import { Avatar, Button, Divider, Icon, Image, Text } from '@rneui/themed';
import { PageName } from 'navigation/constants';
import React, { useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelfDetail } from 'screens/auth/reducers/auth.reducer';
import CreatePost from 'screens/home/components/CreatePost';
import { showErrorMessage } from 'utilities/Notification';
import { getUserName } from 'utilities/User';
import {
    selectIsLoading,
    selectLoginUser,
} from '../../auth/reducers/auth.reducer';
import { fetchPostList } from '../../home/reducers/home.reducer';
import {
    getListFriends,
    getUserProfile,
    selectFriendList,
} from '../reducers/friend.reducer';

function Profile(props) {
    const loginUser = useSelector(selectLoginUser);
    const refreshing = useSelector(selectIsLoading);
    const listFriend = useSelector(selectFriendList);

    const dispatch = useDispatch();
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;

    const onRefresh = React.useCallback(() => {
        dispatch(fetchSelfDetail());
        dispatch(getListFriends());
    }, []);

    useEffect(() => {
        dispatch(fetchPostList(loginUser?._id));
    }, [loginUser]);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchSelfDetail());
            dispatch(getListFriends());
        }, []),
    );

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
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Image
                style={styles.cover}
                source={
                    loginUser?.cover_image
                        ? {
                              uri: `${env.FILE_SERVICE_USER}/${loginUser?.cover_image.fileName}`,
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
                        loginUser?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${loginUser?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                    containerStyle={{
                        borderWidth: 4,
                        borderColor: colors.white,
                    }}
                />
                <Text style={styles.name}>{getUserName(loginUser)}</Text>
                <View>
                    <Button
                        color={colors.gray}
                        buttonStyle={styles.button}
                        onPress={() =>
                            navigate({
                                name: PageName.EDIT_PROFILE,
                            })
                        }
                    >
                        <Icon name="edit" color="black" />
                        <Text style={styles.textButton}>
                            {' '}
                            Chỉnh sửa trang cá nhân
                        </Text>
                    </Button>
                </View>
            </View>
            <Divider
                width={10}
                color={colors.gray}
                style={{ marginVertical: 14 }}
            />
            <View style={styles.friend}>
                <Text style={styles.label}>Bạn bè</Text>
                {listFriend.length ? (
                    <>
                        <Text style={{ color: colors.placeholder }}>
                            {listFriend.length} người bạn
                        </Text>
                        <View style={styles.preview}>
                            {listFriend.slice(0, 6).map((f) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                        key={f._id}
                                    >
                                        <Avatar
                                            size={screen.width / 3.9}
                                            source={
                                                f?.avatar
                                                    ? {
                                                          uri: `${env.FILE_SERVICE_USER}/${f?.avatar.fileName}`,
                                                      }
                                                    : require('assets/default_avt.jpg')
                                            }
                                            containerStyle={styles.friendAvatar}
                                            onPress={() => gotoFriendProfile(f)}
                                        />
                                        <Text
                                            style={styles.friendName}
                                            onPress={() => gotoFriendProfile(f)}
                                        >
                                            {getUserName(f)}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </>
                ) : (
                    <>
                        <Text
                            style={{
                                color: colors.placeholder,
                                marginBottom: 10,
                            }}
                        >
                            Bạn không có người bạn nào
                        </Text>
                    </>
                )}
                <Button
                    color={colors.gray}
                    buttonStyle={styles.button}
                    onPress={() => navigate({ name: PageName.LIST_FRIENDS })}
                >
                    <Text style={styles.textButton}>Xem tất cả bạn bè</Text>
                </Button>
            </View>
            <Divider
                width={10}
                color={colors.gray}
                style={{ marginVertical: 14 }}
            />
            <View>
                <Text style={[styles.label, { paddingHorizontal: '5%' }]}>
                    Đăng bài
                </Text>
                <CreatePost />
            </View>
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
    friend: {
        paddingHorizontal: '5%',
    },
    preview: {
        marginVertical: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    friendAvatar: {
        marginVertical: 5,
        marginHorizontal: '1.8%',
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
    },
    friendName: {
        fontWeight: '700',
        maxWidth: screen.width / 3.9,
        marginBottom: 5,
    },
};

export default Profile;
