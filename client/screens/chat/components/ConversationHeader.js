import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { env } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { getUserName } from '../../../utilities/User';
import { getUserProfile } from '../../profile/reducers/friend.reducer';

const ConversationHeader = (props) => {
    const { user } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const goToFriendProfile = async () => {
        const response = await dispatch(getUserProfile(user?._id)).unwrap();

        if (response?.success) {
            navigation.navigate({
                name: PageName.FRIEND_PROFILE,
                params: user,
            });
            return;
        }
    };
    return (
        <View style={styles.conversationItem}>
            <View style={{ flex: 0.5 }}>
                <Pressable onPress={() => goToFriendProfile()}>
                    <Avatar
                        rounded
                        size={40}
                        source={
                            user?.avatar
                                ? {
                                      uri: `${env.FILE_SERVICE_USER}/${user?.avatar.fileName}`,
                                  }
                                : require('assets/default_avt.jpg')
                        }
                    />
                </Pressable>
            </View>
            <View style={{ flex: 3 }}>
                <Pressable onPress={() => goToFriendProfile()}>
                    <Text style={styles.namePerson}>{getUserName(user)}</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    conversationItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        // marginVertical: 8,
    },
    namePerson: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default ConversationHeader;
