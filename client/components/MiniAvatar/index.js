import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MiniAvatar({
  imageUrl,
  userUrl,
  height = 48,
  width = 48,
}) {
  const navigation = useNavigation();

  const handlePress = () => {
    // navigation.navigate(userUrl);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View>
        <Image
          source={{ uri: imageUrl }}
          style={{ width, height, borderRadius: 10 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
