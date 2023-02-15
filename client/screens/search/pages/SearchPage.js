import { debounce } from 'lodash';
import { useEffect } from 'react';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { screen } from '../../../constants';
import MessageSearchItem from '../components/MessageSearchItem';
import PostSearchItem from '../components/PostSearchItem';
import UserSearchItem from '../components/UserSearchItem';
import { fetchSearchData, selectSearchState } from '../reducers/search.reducer';

function SearchPage(props) {
    const { navigation } = props;
    const dispatch = useDispatch();
    const searchState = useSelector(selectSearchState);

    const search = (text) => {
        dispatch(fetchSearchData(text));
    };
    const searchDebounce = debounce((text) => search(text), 500);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TextInput
                    style={{ width: '100%' }}
                    placeholder="Nhập để tìm kiếm"
                    onChangeText={(text) => searchDebounce(text)}
                />
            ),
        });

        search(''); // reset search
    }, []);

    return (
        <ScrollView>
            <ScrollView horizontal={true}>
                <FlatList
                    data={searchState.friendList}
                    renderItem={({ item }) => (
                        <UserSearchItem item={item} type="Friend" />
                    )}
                />
            </ScrollView>
            <ScrollView horizontal={true}>
                <FlatList
                    style={{ width: screen.width }}
                    data={searchState.peopleList}
                    renderItem={({ item }) => (
                        <UserSearchItem
                            item={item}
                            type="People you may know"
                        />
                    )}
                />
            </ScrollView>
            <ScrollView horizontal={true}>
                <FlatList
                    style={{ width: screen.width }}
                    data={searchState.postList}
                    renderItem={({ item }) => (
                        <PostSearchItem item={item} type="Post" />
                    )}
                />
            </ScrollView>
            <ScrollView horizontal={true}>
                <FlatList
                    style={{ width: screen.width }}
                    data={searchState.messageList}
                    renderItem={({ item }) => (
                        <MessageSearchItem item={item} type="Message" />
                    )}
                />
            </ScrollView>
        </ScrollView>
    );
}

const styles = {};

export default SearchPage;
