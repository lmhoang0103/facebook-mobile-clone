import { Post } from '@/components';
import { screen } from '@/constants';
import { Divider, Icon, Input } from '@rneui/themed';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { emoji } from '../../../constants';
import { SocketProvider } from '../../../plugins/socket';
import { fetchPostList } from '../../home/reducers/home.reducer';
import CommentList from '../components/CommentList';
import {
    createPostComment,
    getPostComments,
    getPostDetail,
    selectIsLoading,
    selectPostComments,
    selectPostDetail,
} from '../reducers/post-detail.reducer';
import { commentSchema } from '../schema';

function PostDetailPage(props) {
    const { route } = props;
    const { postId } = route.params;

    const dispatch = useDispatch();

    const initialValues = {
        comment: '',
    };

    const post = useSelector(selectPostDetail);
    const comments = useSelector(selectPostComments);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        setTimeout(() => {
            SocketProvider.emitRequestFollowPost(postId);

            SocketProvider.onUpdatePost(({ postId }) => {
                _getDetail(postId);
            });
        }, 100);
        return () => {
            SocketProvider.emitRequestUnfollowPost(postId);
        };
    }, []);

    const onRefresh = () => {
        _getDetail(postId);
    };

    const _getDetail = (postId) => {
        dispatch(getPostDetail(postId));
        dispatch(getPostComments(postId));
    };

    const onLike = async (id) => {
        _getDetail(id);
    };

    const sendComment = async ({ comment }, { resetForm }) => {
        await dispatch(
            createPostComment({
                postId,
                body: {
                    content: comment,
                },
            }),
        ).unwrap();
        SocketProvider.emitUserComment(postId, 'Posts');
        SocketProvider.emitNotifyUpdatePost(postId);
        resetForm();
        _getDetail(postId);
        dispatch(fetchPostList());
    };

    useEffect(() => {
        _getDetail(postId);
    }, [postId]);

    return (
        <ScrollView
            horizontal={false}
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
        >
            <ScrollView horizontal={true}>
                <Post post={post} style={{ height: '100%' }} onLike={onLike} />
            </ScrollView>
            <Divider />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    sendComment(values, { resetForm });
                }}
                validationSchema={commentSchema}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    isValid,
                    errors,
                    resetForm,
                }) => (
                    <Input
                        name="comment"
                        value={values.comment}
                        containerStyle={{ backgroundColor: 'white' }}
                        multiline={true}
                        placeholder="Nhập bình luận..."
                        rightIcon={
                            <Icon
                                name="send"
                                onPress={handleSubmit}
                                style={{ padding: 4 }}
                            />
                        }
                        onChangeText={(e) => {
                            handleChange('comment')(e);
                            const wordList = e.split(' ');
                            for (let i = 0; i < wordList.length; i++) {
                                const e = emoji.find(
                                    (e) => e.key === wordList[i],
                                );
                                if (e) {
                                    wordList[i] = e.value;
                                    handleChange('comment')(wordList.join(' '));
                                }
                            }
                        }}
                        errorMessage={errors.comment}
                    />
                )}
            </Formik>
            <Divider />
            <ScrollView horizontal={true}>
                <CommentList comments={comments} />
            </ScrollView>
        </ScrollView>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',

        width: screen.width,
        height: screen.height,
        backgroundColor: '#D9D9D9',
        flex: 1,
    },
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
};

export default PostDetailPage;
