import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PageName } from '../../../navigation/constants';
import { setAccessToken } from '../../../plugins/axios/axios';
import { handleLogout } from '../reducers/auth.reducer';

function Logout(props) {
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    const dispatch = useDispatch();

    useEffect(() => {
        setAccessToken('');
        dispatch(handleLogout());

        navigate(PageName.ROOT, {
            screen: PageName.LOGIN,
        });
    }, []);

    return null;
}

export default Logout;
