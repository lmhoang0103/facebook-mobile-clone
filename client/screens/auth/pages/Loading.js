import * as Font from 'expo-font';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { PageName } from '../../../navigation/constants';
import { getAccessToken } from '../../../plugins/axios/axios';

function Loading(props) {
    const { navigation } = props;
    useEffect(() => {
        async function load() {
            await loadFonts();
            await checkLoggedIn();
        }
        load();
    });

    const loadFonts = async () => {
        await Font.loadAsync({
            MaterialIcons: require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),
            FontAwesome: require('react-native-vector-icons/Fonts/FontAwesome.ttf'),
        });
    };
    const checkLoggedIn = async () => {
        const accessToken = await getAccessToken();
        if (isEmpty(accessToken)) {
            navigation.navigate({ name: PageName.LOGIN });
        } else {
            navigation.navigate({ name: PageName.TAB_NAVIGATOR });
        }
    };
    return null;
}

export default Loading;
