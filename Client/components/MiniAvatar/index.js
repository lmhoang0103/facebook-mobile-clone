import { Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MiniAvatar({ imageUrl, userUrl, height, width }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(userUrl);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View>
        <Image source={{ uri: imageUrl }} />
      </View>
    </TouchableWithoutFeedback>
  );
}
