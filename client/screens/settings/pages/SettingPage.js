import { screen } from '@constants';
import { Button } from '@rneui/themed';
import { View } from 'react-native';
import { PageName } from '@/navigation/constants';
import { DismissKeyboardView } from '../../../components';
import { handleLogout, setIsLoggedIn } from '../../auth/reducers/auth.reducer';
import { useDispatch } from 'react-redux';

function SettingPage(props) {
    const { navigation } = props;
    const { navigate } = navigation;
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(handleLogout());
        navigate({
            name: PageName.LOGIN,
        });
    }

    return (
        <DismissKeyboardView style={styles.container}>
            <View
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    width: '100%',
                    fontSize: 24,
                    fontWeight: 'bold',
                    position: 'absolute',
                    bottom: 40,
                }}
            >
            <Button 
                type="solid"
                containerStyle={styles.buttonContainer}
                title="Đăng xuất"
                titleStyle={{
                    ...styles.item,
                }}
                onPress={logout}
            />
            </View>
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
        paddingTop: 20,
    },
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
};

export default SettingPage;
