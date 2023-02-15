import { useFocusEffect } from '@react-navigation/native';
import { Button, Image, Input, Text } from '@rneui/themed';
import { Formik } from 'formik';
import React, { useCallback } from 'react';
import { BackHandler, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DismissKeyboardView } from '../../../components';
import { colors } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { setAccessToken } from '../../../plugins/axios/axios';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../../utilities/Notification';
import { loginSchema } from '../schema';
import {
    handleLogin,
    selectIsLoading,
    setIsLoggedIn,
} from '../reducers/auth.reducer';
import { SocketProvider } from '../../../plugins/socket';

function Login(props) {
    // redux
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    //navigation
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    const initialValues = {
        phonenumber: '',
        password: '',
    };

    const login = async ({ phonenumber, password }) => {
        const response = await dispatch(
            handleLogin({
                phonenumber,
                password,
            }),
        ).unwrap();

        if (response?.success) {
            showSuccessMessage('Đăng nhập thành công');
            setIsLoggedIn(true);
            setAccessToken(response.token);
            SocketProvider.initialize(response.token);
            navigate({
                name: PageName.TAB_NAVIGATOR,
            });
            return;
        }

        if (response?.isNotVerified) {
            showErrorMessage(response?.message);
            navigate({
                name: PageName.ACTIVATE_ACCOUNT_PAGE,
                params: {
                    phonenumber,
                },
            });
            return;
        }

        showErrorMessage('Đăng nhập thất bại', response?.message);
    };

    useFocusEffect(
        useCallback(() => {
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

    return (
        <>
            <DismissKeyboardView style={styles.layout}>
                <View style={styles.loginForm}>
                    <Image
                        source={require('../../../assets/logo.png')}
                        style={styles.logo}
                        containerStyle={styles.logoContainer}
                    />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => login(values)}
                        validationSchema={loginSchema}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            values,
                            isValid,
                            errors,
                        }) => (
                            <>
                                <Input
                                    name="phonenumber"
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    keyboardType="numeric"
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    onChangeText={handleChange('phonenumber')}
                                    value={values.phonenumber}
                                    errorMessage={errors.phonenumber}
                                />
                                <Input
                                    name="password"
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('password')}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    value={values.password}
                                    errorMessage={errors.password}
                                />
                                <Button
                                    title="Đăng nhập"
                                    type="solid"
                                    onPress={handleSubmit}
                                    loading={isLoading}
                                    buttonStyle={styles.button}
                                    disabled={!isValid}
                                ></Button>
                            </>
                        )}
                    </Formik>
                </View>
                <View>
                    <Text
                        style={styles.text}
                        onPress={() => navigate({ name: PageName.REGISTER })}
                    >
                        Chưa có tài khoản? Đăng ký
                    </Text>
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
    loginForm: {
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
    text: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    input: {
        color: colors.white,
    },
    label: {
        fontSize: 18,
        color: colors.white,
    },
    error: {
        color: '#FFFF00',
        fontWeight: '550',
    },
    errorLayout: {
        alignItems: 'center',
        flexDirection: 'row',
    },
};

export default Login;
