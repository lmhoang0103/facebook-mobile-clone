import { Image, Overlay } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';

function UIImage(props) {
    const { source, ...args } = props;
    const [modalVisibleStatus, setModalVisibleStatus] = useState(false);

    return (
        <>
            <View style={styles.imageContainerStyle}>
                <Image
                    containerStyle={styles.imageStyle}
                    source={source}
                    {...args}
                    onPress={() => setModalVisibleStatus(!modalVisibleStatus)}
                />
            </View>
            <Overlay
                isVisible={modalVisibleStatus}
                onBackdropPress={() =>
                    setModalVisibleStatus(!modalVisibleStatus)
                }
                overlayStyle={styles.modelStyle}
            >
                <Image
                    containerStyle={styles.fullImageStyle}
                    source={source}
                    resizeMode="contain"
                    {...args}
                />
            </Overlay>
        </>
    );
}

const styles = {
    imageContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
    },
    imageStyle: {
        width: '100%',
        aspectRatio: 1,
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    modelStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        width: '100%',
        height: 0,
    },
};

export default UIImage;
