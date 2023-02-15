import { Button, Dialog, Input } from '@rneui/themed';
import { Formik } from 'formik';
import { colors } from '../../constants';
import { reportPost } from '../../services/post.api';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../utilities/Notification';

function ReportDialog(props) {
    const { postId, isVisible, onBackdropPress, onSubmit } = props;

    const initialValues = {
        subject: '',
        details: '',
    };

    const report = async (body) => {
        const response = await reportPost(postId, body);
        if (response?.success) {
            showSuccessMessage('Báo cáo bài viết thành công');
            if (onSubmit) {
                onSubmit();
            }
        } else {
            showErrorMessage(
                'Có lỗi xảy ra khi báo cáo bài viết',
                response?.message,
            );
        }
    };

    return (
        <>
            <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
                <Dialog.Title title="Lý do báo cáo:" />
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => report(values)}
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
                                name="subject"
                                label="Tiêu đề"
                                placeholder="Nhập tiêu đề"
                                placeholderTextColor={colors.gray}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                onChangeText={handleChange('subject')}
                                value={values.subject}
                                errorMessage={errors.subject}
                            />
                            <Input
                                name="details"
                                label="Chi tiết"
                                placeholder="Nhập thông tin chi tiết"
                                placeholderTextColor={colors.gray}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                onChangeText={handleChange('details')}
                                value={values.details}
                                errorMessage={errors.details}
                                multiline={true}
                                numberOfLines={3}
                            />
                            <Button
                                title="Báo cáo"
                                type="solid"
                                onPress={handleSubmit}
                                buttonStyle={styles.button}
                                disabled={!isValid}
                            ></Button>
                        </>
                    )}
                </Formik>
            </Dialog>
        </>
    );
}

const styles = {
    input: {
        color: colors.text,
    },
    label: {
        fontSize: 18,
        color: colors.text,
    },
    button: {
        backgroundColor: colors.grayBlue,
    },
};
export default ReportDialog;
