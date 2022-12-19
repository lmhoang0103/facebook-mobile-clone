import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MiniAvatar from '../MiniAvatar';

const TIME_UNIT = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000,
};

export default function Comment({
  user,
  content,
  timestamps,
  commentAnswereds,
  showCommentAnswered,
}) {
  const [displayTime, setDisplayTime] = useState('');

  const handlePressName = () => {};
  const handlePressReply = () => {};
  const getTimeDifference = (timestamps) => {
    const currentTime = new Date().getTime();
    const timeDiffirence = currentTime - timestamps;
    if (timeDiffirence > TIME_UNIT.DAY) {
      const days = Math.round(timeDiffirence / TIME_UNIT.DAY);
      if (days === 1) {
        setDisplayTime('About 1 day');
      } else {
        setDisplayTime(`About ${days} day`);
      }
    } else if (timeDiffirence > TIME_UNIT.HOUR) {
      const hours = Math.round(timeDiffirence / TIME_UNIT.HOUR);
      if (hours === 1) {
        setDisplayTime('About 1 hour');
      } else {
        setDisplayTime(`About ${hours} hours`);
      }
    } else if (timeDiffirence > TIME_UNIT.MINUTE) {
      const minutes = Math.round(timeDiffirence / TIME_UNIT.MINUTE);
      if (minutes === 1) {
        setDisplayTime('About 1 minute');
      } else {
        setDisplayTime(`About ${minutes} minutes`);
      }
    } else {
      setDisplayTime('Just now');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getTimeDifference();
    }, 60000);
    return () => clearTimeout(timeout);
  }, [timestamps]);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <MiniAvatar userUrl={user.link} imageUrl={user.avatar} />
      </View>
      <View style={styles.comment}>
        <View style={styles.commentBlock}>
          <TouchableWithoutFeedback onPress={handlePressName}>
            <Text style={styles.username}>
              {user.firstName} {user.lastName}
            </Text>
          </TouchableWithoutFeedback>
          <Text style={styles.content}>{content}</Text>
        </View>
        <View style={styles.additionalInfo}>
          <Text>{time}</Text>
          <TouchableOpacity onPress={handlePressReply}>Reply</TouchableOpacity>
        </View>
      </View>
      {showCommentAnswered && commentAnswereds.length > 0 && (
        <View style={styles.commentAnswered}>
          {commentAnswereds.map((comment) => (
            <Comment />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  avatar: {},
  comment: {},
  commentBlock: {},
  username: {},
  content: {},
  additionalInfo: {},
  commentAnswered: {},
});
