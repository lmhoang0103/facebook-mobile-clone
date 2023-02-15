import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';
import { getUserName } from './User';

export const showSuccessMessage = (title = 'Thành công', message = '') => {
    Toast.show({
        type: 'success',
        text1: title,
        text2: message,
    });
};

export const showErrorMessage = (title = 'Lỗi', message = '') => {
    Toast.show({
        type: 'error',
        text1: title,
        text2: message,
    });
};

export const generateNotificationDetail = (sender, action, module) => {
    const senderName = getUserName(sender);
    let actionString = '';
    let moduleString = '';
    switch (action) {
        case 'like':
            actionString = 'thích';
            break;
        case 'comment':
            actionString = 'bình luận';
            break;
        case 'send_request':
            actionString = 'gửi cho bạn';
    }

    switch (module) {
        case 'Posts':
            moduleString = 'bài viết của bạn';
            break;
        case 'PostComment':
            moduleString = 'bình luận của bạn';
            break;
        case 'Friends':
            moduleString = 'lời mời kết bạn';
    }
    return `${senderName} đã ${actionString} một ${moduleString}`;
};

export const getShortString = (str) => {
    const stringLength = 40;
    if (str.length < stringLength) return str;
    return str.slice(0, stringLength) + '...';
};

export const generateContent = (module, target) => {
    let content = '';
    switch (module) {
        case 'Posts':
            content = getShortString(target.described);
            break;
        case 'PostComment':
            content = getShortString(target.content);
            break;
        case 'Friends':
            content = '';
    }

    return content;
};

export const schedulePushNotification = (title, body, notification) => {
    return Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            data: { notification },
            sound: 'noti.wav',
        },
        trigger: { seconds: 2 },
    });
};
