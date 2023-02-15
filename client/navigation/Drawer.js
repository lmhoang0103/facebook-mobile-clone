import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { DEFAULT_ACTION_IDENTIFIER } from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import Exit from '../screens/auth/pages/Exit';
import Logout from '../screens/auth/pages/Logout';
import { fetchNotificationList } from '../screens/notification/reducers/notification.reducer';
import { setReadNotification } from '../services/notification.api';
import { showErrorMessage } from '../utilities/Notification';
import { PageName } from './constants';
import ScreenStack from './ScreenStack';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const DrawerNavigator = createDrawerNavigator();

function Drawer(props) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const readNotification = async (notification) => {
        const { _id, module, target } = notification;
        const response = await setReadNotification(_id);
        if (!response?.success) {
            showErrorMessage('An error occurred!', response?.message);
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

        navigation.navigate({
            name,
            params,
        });
    };

    useEffect(() => {
        registerForPushNotificationsAsync();

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    if (
                        response.actionIdentifier === DEFAULT_ACTION_IDENTIFIER
                    ) {
                        const { notification } =
                            response.notification.request.content.data;
                        readNotification(notification);
                    }
                },
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current,
            );
            Notifications.removeNotificationSubscription(
                responseListener.current,
            );
        };
    }, []);
    return (
        <DrawerNavigator.Navigator
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
        >
            <DrawerNavigator.Screen
                name={PageName.ROOT}
                component={ScreenStack}
            />
            <DrawerNavigator.Screen name={PageName.LOGOUT} component={Logout} />
            <DrawerNavigator.Screen name={PageName.EXIT} component={Exit} />
        </DrawerNavigator.Navigator>
    );
}

export default Drawer;

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
