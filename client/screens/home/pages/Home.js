import { PostList } from '@/components';
import { screen } from '@constants';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef } from 'react';
import { BackHandler, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { DismissKeyboardView } from '../../../components';
import CreatePost from '../components/CreatePost';
import { fetchPostList, selectIsLoading } from '../reducers/home.reducer';

function Home(props) {
    const dispatch = useDispatch();
    const { navigation, route } = props;
    const isLoading = useSelector(selectIsLoading);
    const scrollRef = useRef();

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchPostList());

            BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    backAction,
                );
            };
        }, []),
    );

    const backAction = async () => {
        BackHandler.exitApp();
    };

    useEffect(() => {
        navigation.addListener('tabPress', (e) => {
            scrollRef.current.scrollTo({ animated: true, y: 0 });
        });
    }, []);

    const onRefresh = () => {
        dispatch(fetchPostList());
    };

    return (
        <DismissKeyboardView style={styles.container}>
            <ScrollView
                ref={scrollRef}
                horizontal={false}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={onRefresh} />
                }
            >
                <View style={styles.createPost}>
                    <CreatePost style={{ backgroundColor: 'white' }} />
                </View>
                <ScrollView horizontal={true} style={styles.postList}>
                    <PostList />
                </ScrollView>
            </ScrollView>
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
    },
    createPost: {
        marginBottom: 16,
        width: screen.width,
    },
    postList: {
        flex: 1,
    },
};

export default Home;
