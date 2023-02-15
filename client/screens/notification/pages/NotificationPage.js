import AsyncStorage from '@react-native-async-storage/async-storage';
import { Badge } from '@rneui/themed';
import { useCallback, useEffect } from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { screen } from '../../../constants';
import dayjs from '../../../plugins/dayjs';
import { SocketProvider } from '../../../plugins/socket';
import {
    generateNotificationDetail,
    schedulePushNotification,
} from '../../../utilities/Notification';
import NotificationItem from '../components/NotificationItem';
import {
    fetchNotificationList,
    selectIsLoading,
    selectNotificationList,
    selectUnreadNotificationCount,
} from '../reducers/notification.reducer';

function NotificationPage(props) {
    const { navigation } = props;
    const notificationList = useSelector(selectNotificationList);
    const unreadNotificationCount = useSelector(selectUnreadNotificationCount);
    const refreshing = useSelector(selectIsLoading);

    useEffect(() => {
        navigation.setOptions({
            tabBarBadge: () =>
                unreadNotificationCount ? (
                    <Badge
                        status="error"
                        value={unreadNotificationCount}
                        badgeStyle={{ position: 'absolute', right: 25, top: 5 }}
                    />
                ) : null,
        });
    }, [unreadNotificationCount]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchNotificationList());
        setTimeout(() => {
            SocketProvider.onNotification(async (notification) => {
                const { sender, action, module, updatedAt } = notification;
                const [like, comment, addFriend] = await Promise.all([
                    AsyncStorage.getItem('noti-like'),
                    AsyncStorage.getItem('noti-comment'),
                    AsyncStorage.getItem('noti-addFriend'),
                ]);
                let isPushNotification = false;
                switch (action) {
                    case 'like':
                        isPushNotification = like;
                        break;
                    case 'comment':
                        isPushNotification = comment;
                        break;
                    case 'send_request':
                        isPushNotification = addFriend;
                }

                if (isPushNotification === true) {
                    schedulePushNotification(
                        generateNotificationDetail(sender, action, module),
                        dayjs(updatedAt).fmHHmmDDMMYYYY(),
                        notification,
                    );
                }

                dispatch(fetchNotificationList());
            });
        }, 100);
    }, []);

    const onRefresh = useCallback(() => {
        dispatch(fetchNotificationList());
    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <ScrollView horizontal={true}>
                <FlatList
                    data={notificationList}
                    renderItem={({ item }) => <NotificationItem item={item} />}
                    style={{ width: screen.width }}
                />
            </ScrollView>
        </ScrollView>
    );
}

export default NotificationPage;
