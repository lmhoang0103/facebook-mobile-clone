import { UIImage } from '@/components';
import { env, screen } from '@/constants';
import { PageName } from '@/navigation/constants';
import dayjs from '@/plugins/dayjs';
import { getUserName } from '@/utilities/User';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Avatar,
    BottomSheet,
    Button,
    Divider,
    Icon,
    ListItem,
    Text,
} from '@rneui/themed';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ReadMore from 'react-native-read-more-text';
import { useDispatch, useSelector } from 'react-redux';
import { SocketProvider } from '../../plugins/socket';
import { selectLoginUser } from '../../screens/auth/reducers/auth.reducer';

import {
    fetchPostList,
    likePost,
} from '../../screens/home/reducers/home.reducer';
import { deletePost } from '../../services/post.api';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../utilities/Notification';
import { isAuthor } from '../../utilities/User';
import UIVideo from '../UIVideo/UIVideo';
import ReportDialog from './ReportDialog';

function Post(props) {
    const { post, onLike } = props;
    const navigation = useNavigation();
    const route = useRoute();
    const [isShowPostMenu, setIsShowPostMenu] = useState(false);
    const [isShowReportDialog, setIsShowReportDialog] = useState(false);

    const dispatch = useDispatch();
    const loginUser = useSelector(selectLoginUser);

    const {
        _id,
        author,
        described,
        images,
        videos,
        createdAt,
        isLike,
        like,
        countComments,
    } = post;

    const { navigate, goBack } = navigation;

    const actionLike = async () => {
        if (!isLike) {
            SocketProvider.emitUserLike(_id, 'Posts');
        }
        SocketProvider.emitNotifyUpdatePost(_id);
        await dispatch(likePost(_id)).unwrap();
        dispatch(fetchPostList());
        if (onLike) {
            onLike(_id);
        }
    };

    const actionComment = () => {
        navigate({
            name: PageName.POST_DETAIL_PAGE,
            params: {
                postId: _id,
            },
        });
    };

    const onReportPost = () => {
        setIsShowPostMenu(false);
        setIsShowReportDialog(!isShowReportDialog);
    };

    const onEditPost = () => {
        setIsShowPostMenu(false);
        navigate({
            name: PageName.EDIT_POST_PAGE,
            params: {
                id: _id,
            },
        });
    };

    const onDeletePost = async () => {
        setIsShowPostMenu(false);
        const response = await deletePost(_id);
        if (response?.success) {
            showSuccessMessage('Xóa bài viết thành công');
            dispatch(fetchPostList());
            if (route.name === PageName.POST_DETAIL_PAGE) {
                goBack();
            }
        } else {
            showErrorMessage(
                'Có lỗi xảy ra khi xóa bài viết',
                response?.message,
            );
        }
    };

    const gotoProfile = async (friend) => {
        if (isAuthor(author, loginUser)) {
            navigate({
                name: PageName.PROFILE,
            });
            return;
        }

        navigate({
            name: PageName.FRIEND_PROFILE,
            params: friend,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => gotoProfile(author)}>
                    <View style={styles.headerItem}>
                        <Avatar
                            rounded
                            size={60}
                            source={
                                author?.avatar
                                    ? {
                                          uri: `${env.FILE_SERVICE_USER}/${author?.avatar.fileName}`,
                                      }
                                    : require('assets/default_avt.jpg')
                            }
                        />
                        <View style={styles.detail}>
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text
                                        style={styles.username}
                                    >{`${getUserName(author)}`}</Text>
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    <Text>{`${dayjs(
                                        createdAt,
                                    ).fmHHmmDDMMYYYY()}`}</Text>
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.headerItem}>
                    <Button
                        title="..."
                        type="clear"
                        onPress={() => setIsShowPostMenu(true)}
                    ></Button>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.contentText}>
                    <ReadMore numberOfLines={5}>{described}</ReadMore>
                </View>

                {images && images.length ? (
                    <FlatList
                        data={images}
                        renderItem={({ item }) => (
                            <UIImage
                                source={{
                                    uri: `${env.FILE_SERVICE_USER}/${item.fileName}`,
                                }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <FlatList
                        data={videos}
                        renderItem={({ item }) => (
                            <UIVideo
                                source={{
                                    uri: item,
                                }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
            <View style={styles.statisticGroup}>
                <View style={styles.statisticItem}>
                    <Icon
                        name={'thumb-up'}
                        size={14}
                        style={{ marginRight: 4 }}
                    />
                    <Text>{like?.length || 0}</Text>
                </View>
                <View style={styles.statisticItem}>
                    <Text>{countComments} bình luận</Text>
                </View>
            </View>
            <Divider />
            <View style={styles.buttonGroup}>
                <Button
                    type="solid"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    title="Thích"
                    icon={
                        <Icon name={isLike ? 'thumb-up' : 'thumb-up-off-alt'} />
                    }
                    titleStyle={{
                        ...styles.title,
                    }}
                    onPress={actionLike}
                />
                <Button
                    type="solid"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    title="Bình luận"
                    icon={<Icon name="chat-bubble" />}
                    titleStyle={styles.title}
                    onPress={actionComment}
                />
            </View>
            <BottomSheet
                isVisible={isShowPostMenu}
                onBackdropPress={() => setIsShowPostMenu(false)}
            >
                <Button title="Báo cáo" onPress={onReportPost}></Button>
                {isAuthor(post.author, loginUser) && (
                    <>
                        <Button title="Chỉnh sửa" onPress={onEditPost}></Button>
                        <Button title="Xóa" onPress={onDeletePost}></Button>
                    </>
                )}
            </BottomSheet>
            <ReportDialog
                postId={_id}
                isVisible={isShowReportDialog}
                onBackdropPress={onReportPost}
                onSubmit={() => setIsShowReportDialog(false)}
            />
        </View>
    );
}
const styles = {
    container: {
        width: screen.width,
        backgroundColor: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        padding: 8,
    },
    headerItem: {
        display: 'flex',
        flexDirection: 'row',
        width: screen.width - 50,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 8,
        padding: 8,
    },
    content: {
        marginBottom: 8,
    },
    contentText: {
        padding: 8,
    },
    statisticGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
    },
    statisticItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        padding: 8,
    },
    buttonStyle: {
        backgroundColor: '#E5E5E5',
    },
    title: {
        marginLeft: 8,
        color: 'black',
    },
};

export default Post;
