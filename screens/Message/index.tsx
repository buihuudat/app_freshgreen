import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {AI} from '../../constants/images';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {messageActions} from '../../actions/messageActions';
import {RootState} from '../../redux/store';

const Message = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.user.user);

  const handleChat = () => {
    dispatch(
      messageActions.get({from: user?._id!, to: '654367fa7a19c5bddd7a1edb'}),
    )
      .unwrap()
      .then(() => {
        navigation.navigate('Chat', {
          from: {
            _id: '654367fa7a19c5bddd7a1edb',
            fullname: 'Hỗ trợ',
            avatar:
              'https://e7.pngegg.com/pngimages/381/746/png-clipart-customer-service-technical-support-help-desk-customer-support-management-miscellaneous-service-thumbnail.png',
          },
        });
      });
  };

  return (
    <View>
      <Header
        backgroundColor="transparent"
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
      />

      <View
        style={{padding: 5, display: 'flex', flexDirection: 'column', gap: 15}}>
        <TouchableOpacity
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            padding: 1,
          }}>
          <Image
            source={AI}
            style={{width: 50, height: 50, resizeMode: 'cover'}}
          />
          <View>
            <Text style={{fontSize: 20, fontWeight: '600', color: mainColor}}>
              AI
            </Text>
            <Text>Chat ngay</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChat}
          style={{
            elevation: 5,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            padding: 1,
            gap: 10,
          }}>
          <Image
            source={{
              uri: 'https://e7.pngegg.com/pngimages/381/746/png-clipart-customer-service-technical-support-help-desk-customer-support-management-miscellaneous-service-thumbnail.png',
            }}
            style={{width: 50, height: 50, resizeMode: 'cover'}}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: mainColor,
              }}>
              Hỗ trợ
            </Text>
            <Text>Hỗ trợ 24/7</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Message;
