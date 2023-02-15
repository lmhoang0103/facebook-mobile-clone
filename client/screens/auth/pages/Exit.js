import { useEffect } from 'react';
import { BackHandler } from 'react-native';

function Exit(props) {
    useEffect(() => {
        BackHandler.exitApp();
    }, []);

    return null;
}

export default Exit;
