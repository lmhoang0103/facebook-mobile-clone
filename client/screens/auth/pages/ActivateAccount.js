import { Button, Image, Input } from '@rneui/themed';
import { Formik } from 'formik';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DismissKeyboardView } from '../../../components';
import { colors } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { setAccessToken } from '../../../plugins/axios/axios';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../../utilities/Notification';
import {
    handleActivateAccount,
    selectIsLoading,
    setIsLoggedIn,
} from '../reducers/auth.reducer';

function ActivateAccount(props) {
    //navigation
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    const { phonenumber } = route.params;

    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    const initialValues = {
        phonenumber,
        token: '',
    };

    const activateAccount = async (body) => {
        const response = await dispatch(handleActivateAccount(body)).unwrap();

        if (response?.success) {
            showSuccessMessage('Xác minh thành công');
            setIsLoggedIn(true);
            setAccessToken(response.token);
            navigate({
                name: PageName.TAB_NAVIGATOR,
            });
            return;
        }

        showErrorMessage('Xác minh thất bại', response?.message);
    };

    return (
        <>
            <DismissKeyboardView style={styles.layout}>
                <View style={styles.registerForm}>
                    <Image
                        source={require('../../../assets/logo.png')}
                        style={styles.logo}
                        containerStyle={styles.logoContainer}
                    />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => activateAccount(values)}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            isValid,
                        }) => (
                            <>
                                <Input
                                    name="phonenumber"
                                    label="Số điện thoại"
                                    value={values.phonenumber}
                                    placeholder="Nhập số điện thoại"
                                    keyboardType="numeric"
                                    onChangeText={handleChange('phonenumber')}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.phonenumber}
                                    disabled={true}
                                />
                                <Input
                                    name="token"
                                    label="Mã xác minh"
                                    value={values.token}
                                    placeholder="Nhập mã xác minh"
                                    keyboardType="numeric"
                                    onChangeText={handleChange('token')}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.token}
                                />
                                <Button
                                    title="Xác minh"
                                    type="solid"
                                    loading={isLoading}
                                    onPress={handleSubmit}
                                    buttonStyle={styles.button}
                                    disabled={!isValid}
                                ></Button>
                            </>
                        )}
                    </Formik>
                </View>
            </DismissKeyboardView>
        </>
    );
}

const styles = {
    layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%',
        height: '100%',
        backgroundColor: colors.facebook,
    },
    registerForm: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        color: colors.white,
    },
    logoContainer: {
        margin: 50,
        alignSelf: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: colors.grayBlue,
    },
    input: {
        color: colors.white,
    },
    label: {
        fontSize: 18,
        color: colors.white,
    },
};

export default ActivateAccount;
