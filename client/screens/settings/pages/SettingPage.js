import { screen } from '@constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Switch, Text } from '@rneui/themed';
import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { DismissKeyboardView } from '../../../components';
import {
    fetchSettings,
    selectSettingsState,
} from '../reducers/settings.reducer';

function SettingPage(props) {
    const dispatch = useDispatch();
    const { navigation, route } = props;
    const settingState = useSelector(selectSettingsState);

    const settings = useMemo(() => {
        return [
            {
                title: 'Tin nhắn',
                value: settingState.message ?? true,
                onChange: (value) => {
                    AsyncStorage.setItem('noti-message', JSON.stringify(value));
                    dispatch(fetchSettings());
                },
            },
            {
                title: 'Thích bài viết',
                value: settingState.like ?? true,
                onChange: (value) => {
                    AsyncStorage.setItem('noti-like', JSON.stringify(value));
                    dispatch(fetchSettings());
                },
            },
            {
                title: 'Bình luận bài viết',
                value: settingState.comment ?? true,
                onChange: (value) => {
                    AsyncStorage.setItem('noti-comment', JSON.stringify(value));
                    dispatch(fetchSettings());
                },
            },
            {
                title: 'Lời mời kêt bạn',
                value: settingState.addFriend ?? true,
                onChange: (value) => {
                    AsyncStorage.setItem(
                        'noti-addFriend',
                        JSON.stringify(value),
                    );
                    dispatch(fetchSettings());
                },
            },
        ];
    }, [settingState]);

    useEffect(() => {
        dispatch(fetchSettings());
    }, [settings]);

    return (
        <DismissKeyboardView style={styles.container}>
            <Text
                style={{
                    paddingLeft: 16,
                    width: '100%',
                    fontSize: 24,
                    fontWeight: 'bold',
                }}
            >
                Cài đặt thông báo
            </Text>
            <FlatList
                style={{ width: '100%', padding: 16 }}
                data={settings}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.item}>
                            <Text>{item.title}</Text>
                            <Switch
                                value={item.value}
                                onValueChange={item.onChange}
                            />
                        </View>
                    );
                }}
            />
        </DismissKeyboardView>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screen.width,
        height: screen.height,
        backgroundColor: '#D9D9D9',
        flex: 1,
        paddingTop: 20,
    },
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
};

export default SettingPage;
