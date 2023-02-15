import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { env } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { sliceText } from '../../../utilities/Text';
import { getUserName } from '../../../utilities/User';
function PostSearchItem(props) {
    const { item, type } = props;

    const { _id, author, described } = item;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { navigate } = navigation;

    const goToPostDetail = () => {
        navigate({
            name: PageName.POST_DETAIL_PAGE,
            params: {
                postId: _id,
            },
        });
    };

    return (
        <TouchableOpacity onPress={() => goToPostDetail()}>
            <View style={styles.container}>
                <Avatar
                    rounded
                    size={48}
                    source={
                        author?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${author?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
                <View style={styles.detail}>
                    <Text style={styles.name}>{getUserName(author)}</Text>
                    <Text>{sliceText(described, 40)}</Text>
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

export default PostSearchItem;
