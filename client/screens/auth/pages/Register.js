import { Button, Image, Input, Text } from '@rneui/themed';
import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { DismissKeyboardView } from '../../../components';
import { colors } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../../utilities/Notification';
import { handleRegister, selectIsLoading } from '../reducers/auth.reducer';
import { registerSchema } from '../schema';

function Register(props) {
    // redux
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    //navigation
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    const initialValues = {
        phonenumber: '',
        username: '',
        password: '',
        confirmationEmail: '',
        firstName: '',
        lastName: '',
    };

    const register = async (body) => {
        const response = await dispatch(handleRegister(body)).unwrap();

        if (response?.success) {
            showSuccessMessage('Đăng ký thành công');
            navigate({
                name: PageName.ACTIVATE_ACCOUNT_PAGE,
                params: {
                    phonenumber: body.phonenumber,
                },
            });
            return;
        }

        showErrorMessage('Đăng ký thất bại', response?.message);
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
                        validationSchema={registerSchema}
                        onSubmit={(values) => register(values)}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            isValid,
                        }) => (
                            <ScrollView style={{ marginBottom: 50 }}>
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
                                ></Input>
                                <Input
                                    name="username"
                                    label="Tên tài khoản"
                                    value={values.username}
                                    placeholder="Nhập tên tài khoản"
                                    onChangeText={handleChange('username')}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.username}
                                ></Input>
                                <Input
                                    name="confirmationEmail"
                                    label="Email xác minh"
                                    value={values.confirmationEmail}
                                    placeholder="Nhập địa chỉ email xác minh"
                                    onChangeText={handleChange(
                                        'confirmationEmail',
                                    )}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.confirmationEmail}
                                ></Input>
                                <Input
                                    name="password"
                                    label="Mật khẩu"
                                    value={values.password}
                                    placeholder="Nhập mật khẩu"
                                    onChangeText={handleChange('password')}
                                    secureTextEntry={true}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.password}
                                ></Input>
                                <Input
                                    name="firstName"
                                    label="Họ"
                                    value={values.firstName}
                                    placeholder="Nhập họ của bạn"
                                    onChangeText={handleChange('firstName')}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.firstName}
                                ></Input>
                                <Input
                                    name="lastName"
                                    label="Tên"
                                    value={values.lastName}
                                    placeholder="Nhập tên của bạn"
                                    onChangeText={handleChange('lastName')}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.lastName}
                                ></Input>
                                <Button
                                    title="Đăng ký"
                                    type="solid"
                                    loading={isLoading}
                                    onPress={handleSubmit}
                                    buttonStyle={styles.button}
                                    disabled={!isValid}
                                ></Button>
                            </ScrollView>
                        )}
                    </Formik>
                </View>
                <View>
                    <Text
                        style={styles.text}
                        onPress={() => navigate({ name: PageName.LOGIN })}
                    >
                        Đã có tài khoản? Đăng nhập
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

export default Register;
