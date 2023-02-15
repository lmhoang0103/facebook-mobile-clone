import { useNavigation, useRoute } from '@react-navigation/native';
import { BottomSheet, Button, Icon, Input } from '@rneui/themed';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors, emoji } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { SocketProvider } from '../../../plugins/socket';
import { isAuthor } from '../../../utilities/User';
import { selectLoginUser } from '../../auth/reducers/auth.reducer';
import ConversationHeader from '../components/ConversationHeader';
import Message from '../components/Message';
import {
    fetchMessageListByFriend,
    selectMessageList,
    selectSelectedChatDetail,
} from '../reducers/chat.reducer';

function ChatDetail(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { receiver } = route.params;
    const selectedChatDetail = useSelector(selectSelectedChatDetail);
    const messageList = useSelector(selectMessageList);
    const loginUser = useSelector(selectLoginUser);
    const dispatch = useDispatch();
    const [selectedMessageIndex, setSelectedMessageIndex] = useState();
    const [isShowMessageMenu, setIsShowMessageMenu] = useState(false);
    const messageListRef = useRef();
    const initialValues = {
        content: '',
    };

    useEffect(() => {
        if (!isEmpty(receiver)) {
            dispatch(fetchMessageListByFriend(receiver._id));
        }
    }, [receiver]);

    useEffect(() => {
        setTimeout(() => {
            messageListRef.current.scrollToEnd();
        }, 100);
    }, [messageList]);

    useEffect(() => {
        if (!isEmpty(receiver)) {
            navigation.setOptions({
                headerTitle: () => <ConversationHeader user={receiver} />,
                headerRight: () => (
                    <Icon
                        type="font-awesome"
                        name="info-circle"
                        color={colors.grayBlue}
                        onPress={() => {
                            navigation.navigate({
                                name: PageName.CHAT_PERSONAL,
                            });
                        }}
                    />
                ),
            });
        }
    }, [receiver]);

    const sendMessage = ({ content }, { resetForm }) => {
        SocketProvider.emitChatMessage(
            receiver?._id,
            content,
            selectedChatDetail?.chatId,
        );
        dispatch(fetchMessageListByFriend(receiver?._id));
        resetForm();
    };

    const openMessageMenu = (id) => {
        if (
            !(selectedChatDetail?.blockers || []).includes(loginUser._id) &&
            !(selectedChatDetail?.blockers || []).includes(receiver?._id)
        ) {
            setSelectedMessageIndex(id);
            setIsShowMessageMenu(true);
        }
    };

    const recallMessage = () => {
        if (selectedMessageIndex !== undefined)
            SocketProvider.emitRecallMessage(
                receiver?._id,
                selectedMessageIndex,
            );
    };

    return (
        <View style={styles.messagingScreen}>
            <View style={styles.messageList}>
                <FlatList
                    ref={messageListRef}
                    data={messageList}
                    showsVerticalScrollIndicator={false}
                    disableScrollViewPanResponder={true}
                    renderItem={({ item, index }) => (
                        <Pressable
                            onLongPress={() => {
                                if (isAuthor(item.senderId, loginUser))
                                    openMessageMenu(index);
                            }}
                        >
                            <Message
                                sender={item.senderId}
                                content={item.content}
                                time={item.time}
                            />
                        </Pressable>
                    )}
                />
            </View>
            {(selectedChatDetail?.blockers || []).includes(loginUser._id) ? (
                <Text style={styles.blockNotification}>
                    Bạn đã chặn người này
                </Text>
            ) : (selectedChatDetail?.blockers || []).includes(receiver?._id) ? (
                <Text style={styles.blockNotification}>
                    Bạn không thể trả lời cuộc trò chuyện do đã bị chặn
                </Text>
            ) : (
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => {
                        sendMessage(values, { resetForm });
                    }}
                >
                    {({ handleChange, handleSubmit, values, isValid }) => (
                        <Input
                            name="content"
                            inputContainerStyle={styles.messagingInputContainer}
                            inputStyle={styles.messagingInput}
                            renderErrorMessage={false}
                            placeholder="Nhập tin nhắn"
                            multiline
                            onChangeText={(e) => {
                                handleChange('content')(e);
                                const wordList = e.split(' ');
                                for (let i = 0; i < wordList.length; i++) {
                                    const e = emoji.find(
                                        (e) => e.key === wordList[i],
                                    );
                                    if (e) {
                                        wordList[i] = e.value;
                                        handleChange('content')(
                                            wordList.join(' '),
                                        );
                                    }
                                }
                            }}
                            value={values.content}
                            rightIcon={
                                <Icon
                                    style={{ padding: 8 }}
                                    type="material"
                                    name="send"
                                    color={colors.grayBlue}
                                    disabled={!isValid}
                                    onPress={handleSubmit}
                                />
                            }
                        />
                    )}
                </Formik>
            )}

            <BottomSheet
                isVisible={isShowMessageMenu}
                onBackdropPress={() => setIsShowMessageMenu(false)}
            >
                <Button title="Thu hồi" onPress={recallMessage}></Button>
            </BottomSheet>
        </View>
    );
}

const styles = {
    messagingScreen: {
        flex: 1,
        paddingHorizontal: 12,
        paddingBottom: 6,
    },
    messageList: {
        flex: 1,
    },
    messagingInputContainer: {
        borderBottomWidth: 0,
        borderRadius: 20,
    },
    messagingInput: {
        padding: 8,
        maxHeight: 100,
        borderWidth: 1,
        borderRadius: 16,
    },
    blockNotification: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
};

export default ChatDetail;
