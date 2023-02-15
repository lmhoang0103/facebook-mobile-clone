import { Overlay } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

function UIVideo(props) {
    const { source, ...args } = props;
    const [modalVisibleStatus, setModalVisibleStatus] = useState(false);

    return (
        <>
            <View style={styles.videoContainerStyle}>
                <Video
                    style={styles.videoStyle}
                    source={source}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
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
                <Video
                    style={styles.fullVideoStyle}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    source={source}
                    {...args}
                />
            </Overlay>
        </>
    );
}

const styles = {
    videoContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
    },
    videoStyle: {
        width: '100%',
        aspectRatio: 1,
    },
    fullVideoStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        aspectRatio: 1,
    },
    modelStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        width: '100%',
        height: 0,
    },
};

export default UIVideo;
