import { useNavigation } from '@react-navigation/native';
import { Avatar, Text } from '@rneui/themed';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { env } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import dayjs from '../../../plugins/dayjs';
import { setReadNotification } from '../../../services/notification.api';
import {
    generateContent,
    generateNotificationDetail,
    showErrorMessage,
} from '../../../utilities/Notification';
import { fetchNotificationList } from '../reducers/notification.reducer';

function NotificationItem(props) {
    const { item } = props;
    const { _id, sender, action, module, updatedAt, target, isRead } = item;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { navigate } = navigation;

    const readNotification = async () => {
        const response = await setReadNotification(_id);
        if (!response?.success) {
            showErrorMessage('An error occurred!');
        }
        let name = '';
        let params = {};
        switch (module) {
            case 'Posts':
                name = PageName.POST_DETAIL_PAGE;
                params = {
                    postId: target._id,
                };
                break;
            case 'PostComment':
                name = PageName.POST_DETAIL_PAGE;
                params = {
                    postId: target.post,
                };
                break;
            case 'Friends':
                name = PageName.FRIEND_PROFILE;
                params = {
                    _id: target.sender,
                };
                break;
        }

        dispatch(fetchNotificationList());

        navigate({
            name,
            params,
        });
    };

    return (
        <TouchableOpacity onPress={() => readNotification()}>
            <View
                style={{
                    ...styles.container,
                    ...(!isRead && { backgroundColor: '#D9E4EC' }),
                }}
            >
                <View style={styles.sender}>
                    <Avatar
                        rounded
                        size={48}
                        source={
                            sender?.avatar
                                ? {
                                      uri: `${env.FILE_SERVICE_USER}/${sender?.avatar.fileName}`,
                                  }
                                : require('assets/default_avt.jpg')
                        }
                    />
                </View>
                <View style={styles.detail}>
                    <Text style={styles.name}>
                        {generateNotificationDetail(sender, action, module)}
                    </Text>
                    <Text>{generateContent(module, target)}</Text>
                    <Text style={styles.date}>
                        {dayjs(updatedAt).fmHHmmDDMMYYYY()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
    },
    sender: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detail: {
        display: 'flex',
        marginLeft: 8,
    },
    name: {
        fontWeight: 'bold',
    },
};

export default NotificationItem;
