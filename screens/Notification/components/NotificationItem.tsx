import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useMemo} from 'react';
import {Notification} from '../../../constants/images';
import {Image} from '@rneui/themed';
import {styles} from '../styles';
import {mainColor} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';
import {NotificationType} from '../../../types/NotificationType';
import {useAppDispatch} from '../../../redux/hooks';
import {notificationActions} from '../../../actions/notificationActions';
import moment from 'moment';

const NotificationItem = memo((notification: NotificationType) => {
  const navigaiton =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const time = moment(notification.createdAt).format('MMMM D, YYYY h:mm:ss a');

  const image = useMemo(() => {
    if (typeof notification.auth !== 'string' && notification.auth?.avatar) {
      return {uri: notification.auth?.avatar};
    } else {
      return Notification;
    }
  }, [notification.auth]);

  const handleSeen = () => {
    const screenName = Array.isArray(notification.path)
      ? notification.path[0]
      : notification.path;
    navigaiton.navigate(screenName);
    dispatch(notificationActions.seen(notification._id!));
  };

  return (
    <TouchableOpacity
      onPress={handleSeen}
      style={{
        ...styles.notificationIcon,
        elevation: notification.seen ? 0 : 10,
        shadowColor: notification.seen ? '#fff' : mainColor,
        borderWidth: notification.seen ? 0 : 1,
        borderColor: notification.seen ? '#fff' : mainColor,
      }}>
      <Text style={styles.date}>{time}</Text>
      <Image source={image} style={styles.image} />
      <View style={styles.textItem}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.description}>{notification.description}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default NotificationItem;
