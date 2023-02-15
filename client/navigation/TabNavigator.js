import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon, Text } from '@rneui/themed';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { colors, fontSizes } from '../constants';
import { getAccessToken, getAccessTokenCb } from '../plugins/axios/axios';
import { SocketProvider } from '../plugins/socket';
import { fetchSelfDetail } from '../screens/auth/reducers/auth.reducer';
import { PageName } from './constants';
import { tabNavigatorRoutes } from './routers';

const Tab = createMaterialTopTabNavigator();

const screenOptions = ({ route }) => ({
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: colors.inactive,
    tabBarStyle: { backgroundColor: colors.primary, height: 50 },
    tabBarShowLabel: false,

    tabBarBackground: () => (
        <View style={{ backgroundColor: colors.primary, flex: 1 }}></View>
    ),
});

function TabNavigator(props) {
    const dispatch = useDispatch();

    const { navigation } = props;
    const { navigate } = navigation;
    useEffect(() => {
        dispatch(fetchSelfDetail());
        getAccessTokenCb((err, accessToken) => {
            if (!err) {
                SocketProvider.initialize(accessToken);
            }
        });
    }, []);

    const navigateToSearchScreen = async () => {
        navigate({
            name: PageName.SEARCH_PAGE,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 8,
                }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>MyApp</Text>
                <Icon
                    name="search"
                    onPress={navigateToSearchScreen}
                    style={{ padding: 8 }}
                />
            </View>
            <Tab.Navigator
                screenOptions={screenOptions}
                initialRouteName={PageName.HOME}
                backBehavior="initialRoute"
            >
                {tabNavigatorRoutes.map((route) => {
                    return (
                        <Tab.Screen
                            name={route.name}
                            component={route.component}
                            key={route.name}
                            options={{
                                tabBarLabel: route.name,
                                tabBarLabelStyle: {
                                    fontSize: fontSizes.h6,
                                },
                                tabBarIcon: route.icon,
                            }}
                        />
                    );
                })}
            </Tab.Navigator>
        </SafeAreaView>
    );
}

export default TabNavigator;
