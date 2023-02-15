import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../plugins/redux-toolkit/store';
import Drawer from './Drawer';

function App(props) {
    return (
        <>
            <StatusBar />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer>
                        <Drawer />
                    </NavigationContainer>
                    <Toast />
                </PersistGate>
            </Provider>
        </>
    );
}
export default App;
