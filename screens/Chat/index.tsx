import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {Header, Icon, Image} from '@rneui/themed';
import {error, mainColor} from '../../constants/colors';
import {Store} from '../../constants/images';
import {styles} from './styles';
import ChatActions from './controllers/ChatActions';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const ChatScreen = ({route, navigation}: Props) => {
  const receiver = route.params.from;
  const avatarReceiver = receiver.avatar ? {uri: receiver.avatar} : Store;

  const handleViewReciever = () => {
    navigation.goBack();
  };
  const handleRepost = () => {};

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="transparent"
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.navigate('Message')}
          />
        }
        centerComponent={
          <TouchableOpacity
            onPress={handleViewReciever}
            style={styles.reveicerInfor}>
            <Image source={avatarReceiver} style={styles.avatar} />
            <Text style={styles.reveicerName}>{receiver.fullname}</Text>
          </TouchableOpacity>
        }
        rightComponent={
          <Icon name="report" color={error} onPress={handleRepost} />
        }
      />
      <ChatActions {...receiver} />
    </View>
  );
};

export default ChatScreen;
