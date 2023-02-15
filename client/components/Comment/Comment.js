import { env, screen } from '@/constants';
import { getUserName } from '@/utilities/User';
import { Avatar } from '@rneui/themed';
import { Text, View } from 'react-native';
import ReadMore from 'react-native-read-more-text';

function Comment(props) {
    const { comment } = props;
    const { user, content } = comment;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avatar
                    rounded
                    size={48}
                    source={
                        user?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${user?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.username}>{`${getUserName(user)}`}</Text>
                <ReadMore numberOfLines={3}>
                    <Text>{content}</Text>
                </ReadMore>
            </View>
        </View>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: screen.width,
        backgroundColor: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8,
        padding: 8,
    },
    content: {
        flex: 1,
        padding: 8,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 15,
    },
};

export default Comment;
