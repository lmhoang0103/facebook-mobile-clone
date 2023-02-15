import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { env } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { getUserName } from '../../../utilities/User';
import {
    selectChatList,
    setSelectedChatDetail,
} from '../../chat/reducers/chat.reducer';
function MessageSearchItem(props) {
    const { item, type } = props;

    const { chatId, friend, content } = item;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { navigate } = navigation;

    const chatList = useSelector(selectChatList);

    const goToChatDetail = () => {
        const chat = chatList.find((c) => c._id === chatId);
        dispatch(setSelectedChatDetail(chat));
        navigate({
            name: PageName.CHAT_DETAIL,
            params: {
                receiver: friend,
            },
        });
    };

    return (
        <TouchableOpacity onPress={() => goToChatDetail()}>
            <View style={styles.container}>
                <Avatar
                    rounded
                    size={48}
                    source={
                        friend?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${friend?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
                <View style={styles.detail}>
                    <Text style={styles.name}>{getUserName(friend)}</Text>
                    <Text>{content}</Text>
                    <Text>{type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    detail: {
        display: 'flex',
        marginLeft: 24,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
};

export default MessageSearchItem;
