import {View, FlatList, Text, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import NotificationItem from './components/NotificationItem';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import {notificationActions} from '../../actions/notificationActions';

const Notification = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const notifications = useAppSelector(
    (state: RootState) => state.notification.notifications,
  );

  const dispatch = useAppDispatch();

  const fetchNotification = async () => {
    setRefreshing(true);
    await dispatch(notificationActions.gets()).then(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const handleRefresh = () => {
    fetchNotification();
  };

  return (
    <View>
      <Header
        backgroundColor="transparent"
        barStyle="dark-content"
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View>
        {notifications.length ? (
          <FlatList
            data={notifications}
            keyExtractor={item => item._id!}
            renderItem={({item}) => <NotificationItem {...item} />}
            refreshControl={
              <RefreshControl
                tintColor={mainColor}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        ) : (
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '600'}}>
            Không có thông báo
          </Text>
        )}
      </View>
    </View>
  );
};

export default Notification;
