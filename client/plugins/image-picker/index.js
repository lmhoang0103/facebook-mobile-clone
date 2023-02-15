import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import '../../plugins/firebase';

const concatBase64 = (base64) => {
    return `data:image/jpg;base64,${base64}`;
};
export const getBase64MediaList = async (options) => {
    const _options = {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        selectionLimit: 4,
        videoMaxDuration: 10,
        aspect: [4, 3],
        base64: true,
        quality: 0.5,
    };

    if (options) {
        Object.assign(_options, options);
    }

    const result = await ImagePicker.launchImageLibraryAsync(_options);

    if (!result.cancelled) {
        if (result.uri) {
            if (result.base64)
                return [
                    {
                        type: result.type,
                        data: concatBase64(result.base64),
                    },
                ];
            else {
                let path = '';
                try {
                    path = await uploadImageAsync(result.uri);
                } catch (err) {
                    console.log(err);
                }

                return [
                    {
                        type: result.type,
                        data: path,
                    },
                ];
            }
        } else {
            const { selected } = result;
            return selected.reduce((base64List, selectedItem) => {
                if (selectedItem.base64)
                    base64List.push(concatBase64(selectedItem.base64));
                return base64List;
            }, []);
        }
    }
    return [];
};

async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), `Videos`);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
}
