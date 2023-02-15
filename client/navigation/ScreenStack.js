import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PageName } from './constants';
import { routes } from './routers';
const Stack = createNativeStackNavigator();

function ScreenStack(props) {
    return (
        <Stack.Navigator initialRouteName={PageName.LOADING}>
            {routes.map((router) => {
                return (
                    <Stack.Screen
                        name={router.name}
                        component={router.component}
                        key={router.name}
                        options={{
                            headerShown: router.headerShown,
                        }}
                    />
                );
            })}
        </Stack.Navigator>
    );
}

export default ScreenStack;
