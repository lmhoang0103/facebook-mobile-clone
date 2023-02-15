import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { env } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { showErrorMessage } from '../../../utilities/Notification';
import { getUserName } from '../../../utilities/User';
import { getUserProfile } from '../../profile/reducers/friend.reducer';
function UserSearchItem(props) {
    const { item, type } = props;

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { navigate } = navigation;

    const gotoFriendProfile = async (friend) => {
        const response = await dispatch(getUserProfile(friend?._id)).unwrap();

        if (response?.success) {
            navigate({
                name: PageName.FRIEND_PROFILE,
                params: friend,
            });
            return;
        }

        showErrorMessage(response?.message);
    };

    return (
        <TouchableOpacity onPress={() => gotoFriendProfile(item)}>
            <View style={styles.container}>
                <Avatar
                    rounded
                    size={48}
                    source={
                        item?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${item?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
                <View style={styles.detail}>
                    <Text style={styles.name}>{getUserName(item)}</Text>
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

export default UserSearchItem;
