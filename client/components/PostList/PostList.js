import { Post } from '@/components';
import { screen } from '@/constants';
import { FlatList, Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectPostList } from '../../screens/home/reducers/home.reducer';

function PostList(props) {
    const postList = useSelector(selectPostList);

    return (
        <View style={styles.container}>
            {postList.length ? (
                <FlatList
                    data={postList}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 16 }} />
                    )}
                    renderItem={({ item }) => <Post post={item} />}
                />
            ) : (
                <View style={styles.emptyList}>
                    <Image
                        style={styles.emptyImage}
                        source={{
                            uri: 'https://icon-library.com/images/no-data-icon/no-data-icon-10.jpg',
                        }}
                        resizeMode="contain"
                    />
                </View>
            )}
        </View>
    );
}

const styles = {
    container: {
        width: screen.width,
    },
    emptyList: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: screen.width,
        height: screen.height,
    },
    emptyImage: {
        width: screen.width / 2,
        height: screen.height / 2,
    },
};

export default PostList;
