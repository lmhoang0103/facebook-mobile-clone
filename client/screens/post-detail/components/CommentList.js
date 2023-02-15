import { screen } from '@/constants';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Comment } from '@/components';

function CommentList(props) {
    const { comments, ...rest } = props;

    return (
        <View style={styles.container} {...rest}>
            <FlatList
                data={comments}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                renderItem={({ item }) => <Comment comment={item} />}
            />
        </View>
    );
}

const styles = {
    container: {
        width: screen.width,
        backgroundColor: 'white',
    },
};

export default CommentList;
