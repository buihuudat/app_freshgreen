import {View, Text, Image} from 'react-native';
import React, {useMemo} from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {UserImage} from '../../../constants/images';
import {fullnameOfUser} from '../../../types/userType';

const MessageItem = (props: {fromSelf: boolean; message: string}) => {
  const sender = {
    _id: '654367fa7a19c5bddd7a1edb',
    fullname: 'Hỗ trợ',
    avatar:
      'https://e7.pngegg.com/pngimages/381/746/png-clipart-customer-service-technical-support-help-desk-customer-support-management-miscellaneous-service-thumbnail.png',
  };
  const user = useAppSelector((state: RootState) => state.user.user);

  const avatar = useMemo(() => {
    if (props.fromSelf) {
      if (user?.avatar || user?.avatar !== '') {
        return {uri: user?.avatar!};
      } else return UserImage;
    } else return {uri: sender.avatar};
  }, []);

  return (
    <View
      style={{
        elevation: 7,
        width: '100%',
        display: 'flex',
        flexDirection: props.fromSelf ? 'row-reverse' : 'row',
        marginVertical: 10,
        paddingHorizontal: 30,
        gap: 10,
      }}>
      <Image
        source={avatar}
        style={{width: 40, height: 40, resizeMode: 'cover'}}
      />
      <View style={{width: '100%', flex: 1}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            textAlign: props.fromSelf ? 'right' : 'left',
          }}>
          {props.fromSelf ? fullnameOfUser(user?.fullname!) : sender.fullname}
        </Text>
        <Text
          style={{
            flexWrap: 'wrap',
            textAlign: props.fromSelf ? 'right' : 'left',
          }}>
          {props.message}
        </Text>
      </View>
    </View>
  );
};

export default MessageItem;
