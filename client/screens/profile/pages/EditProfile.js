import { colors, env } from '@/constants';
import { Avatar, Button, Divider, Icon, Image, Text } from '@rneui/themed';
import { PageName } from 'navigation/constants';
import { getBase64MediaList } from 'plugins/image-picker';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from 'utilities/Notification';
import {
    handleEditSelfProfile,
    selectLoginUser,
} from '../../auth/reducers/auth.reducer';

const avatarOptions = {
    aspect: [1, 1],
    allowsMultipleSelection: false,
    allowsEditing: true,
};

const coverOptions = {
    allowsMultipleSelection: false,
    allowsEditing: true,
};

function EditProfile(props) {
    const loginUser = useSelector(selectLoginUser);
    const dispatch = useDispatch();
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;

    const pickAvatar = async () => {
        const avatar = await getBase64MediaList(avatarOptions);

        if (avatar.length) {
            const response = await dispatch(
                handleEditSelfProfile({
                    avatar: avatar[0],
                }),
            ).unwrap();
            if (response?.success) {
                showSuccessMessage('Đổi ảnh đại diện thành công');
                return;
            }
            showErrorMessage('Đổi ảnh đại diện thất bại', response?.message);
        }
    };

    const pickCover = async () => {
        const cover = await getBase64MediaList(coverOptions);

        if (cover.length) {
            const response = await dispatch(
                handleEditSelfProfile({
                    cover_image: cover[0],
                }),
            ).unwrap();
            if (response?.success) {
                showSuccessMessage('Đổi ảnh bìa thành công');
                return;
            }
            showErrorMessage('Đổi ảnh bìa thất bại', response?.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Ảnh đại diện</Text>
                <Button type="clear" onPress={pickAvatar}>
                    Chỉnh sửa
                </Button>
            </View>
            <View style={styles.avatarContainer}>
                <Avatar
                    size={130}
                    rounded
                    source={
                        loginUser?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${loginUser?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
            </View>
            <Divider
                width={1}
                color={colors.gray}
                style={{ marginVertical: 14 }}
            />
            <View style={styles.row}>
                <Text style={styles.label}>Ảnh bìa</Text>
                <Button type="clear" onPress={pickCover}>
                    Chỉnh sửa
                </Button>
            </View>
            <View style={{ width: '100%' }}>
                <Image
                    style={styles.cover}
                    source={
                        loginUser?.cover_image
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${loginUser?.cover_image.fileName}`,
                              }
                            : require('assets/default_cover.jpg')
                    }
                />
            </View>
            <Divider
                width={1}
                color={colors.gray}
                style={{ marginVertical: 14 }}
            />
            <Button
                type="solid"
                color={colors.gray}
                buttonStyle={styles.button}
                onPress={() =>
                    navigate({
                        name: PageName.EDIT_USER,
                    })
                }
            >
                <Icon name="edit" color="black" />
                <Text style={styles.textButton}>
                    {' '}
                    Chỉnh sửa thông tin cá nhân
                </Text>
            </Button>
        </View>
    );
}

const styles = {
    container: {
        paddingHorizontal: '5%',
    },
    avatarContainer: {
        alignItems: 'center',
    },
    cover: {
        height: 200,
        width: '100%',
        borderRadius: 5,
    },
    row: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontWeight: '700',
        fontSize: 17,
    },
    button: {
        borderRadius: 5,
        marginVertical: 10,
    },
    textButton: {
        fontWeight: '700',
    },
};

export default EditProfile;
