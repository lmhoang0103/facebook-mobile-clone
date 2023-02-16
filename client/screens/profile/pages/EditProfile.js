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
                showSuccessMessage('Update avatar successfully');
                return;
            }
            showErrorMessage('Update avatar failed', response?.message);
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
                showSuccessMessage('Update cover image successfully');
                return;
            }
            showErrorMessage('Update cover image failed', response?.message);
        }
    };

    return (
        <View style={styles.container}>
            <Button
                type="clear"
                color={colors.black}
                buttonStyle={styles.button}
                onPress={() =>
                    navigate({
                        name: PageName.EDIT_USER,
                    })
                }
            >
                <Icon name="edit" color="black" />
                <Text style={styles.textButton}> Thông tin cá nhân</Text>
            </Button>
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
            <Button
                type="clear"
                onPress={pickAvatar}
                buttonStyle={styles.btnedit}
            >
                Chỉnh sửa ảnh đại diện
            </Button>

            <View style={{ width: '100%', paddingTop: 50 }}>
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
            <Button
                type="clear"
                onPress={pickCover}
                buttonStyle={styles.btnedit}
            >
                Chỉnh sửa ảnh bìa
            </Button>
        </View>
    );
}

const styles = {
    btnedit: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,

        color: '#000',
    },
    container: {
        paddingHorizontal: '5%',
    },
    avatarContainer: {
        paddingTop: 50,
        alignItems: 'center',
    },
    cover: {
        height: 200,
        width: '100%',
        borderRadius: 5,
    },
    row: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontWeight: '400',
        fontSize: 20,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textButton: {
        fontWeight: '400',
    },
};

export default EditProfile;
