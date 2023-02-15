import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => {
        props.style = props?.style || {};
        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{
                        flex: 1,
                    }}
                >
                    <Comp {...Object.assign(props.style, { flex: 1 })}>
                        {children}
                    </Comp>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    };
};
export default DismissKeyboardHOC(View);
