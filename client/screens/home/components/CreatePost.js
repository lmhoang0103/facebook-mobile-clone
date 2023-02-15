import { env, screen } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Text } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { PageName } from '../../../navigation/constants';
import { selectLoginUser } from '../../auth/reducers/auth.reducer';

function CreatePost(props) {
    const { style, ...rest } = props;
    const loginUser = useSelector(selectLoginUser);

    const { navigate } = useNavigation();

    const onPress = () => {
        navigate({
            name: PageName.CREATE_POST_PAGE,
        });
    };

    return (
        <View style={{ ...styles.container, ...style }} {...rest}>
            <Avatar
                rounded
                size={48}
                source={
                    loginUser?.avatar
                        ? {
                              uri: `${env.FILE_SERVICE_USER}/${loginUser?.avatar.fileName}`,
                          }
                        : require('assets/default_avt.jpg')
                }
            />
            <TouchableOpacity style={styles.content} onPress={onPress}>
                <View>
                    <Text>Bạn đang nghĩ gì?</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: screen.width,
        padding: 8,
    },
    content: {
        marginLeft: 8,
        height: 56,
        flex: 1,
        backgroundColor: '#E5E5E5',
        padding: 16,
    },
};

export default CreatePost;
