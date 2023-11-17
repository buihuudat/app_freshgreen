import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {Header, Icon, Image} from '@rneui/themed';
import {error, mainColor} from '../../constants/colors';
import {Store} from '../../constants/images';
import {styles} from './styles';
import ChatActions from './controllers/ChatActions';
import {useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import MessageItem from './controllers/MessageItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const ChatScreen = ({route, navigation}: Props) => {
  const receiver = route.params.from;
  const avatarReceiver = receiver.avatar ? {uri: receiver.avatar} : Store;

  const flatListRef = useRef<FlatList | null>(null);
  const {userChat, loading, aiChat} = useAppSelector(
    (state: RootState) => state.messages,
  );
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [userChat]);

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
      <View style={{flex: 1}}>
        <FlatList
          style={{marginBottom: 40}}
          ref={ref => (flatListRef.current = ref)}
          data={receiver._id === 'AI' ? aiChat : userChat}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <MessageItem {...item} />}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        />
      </View>

      <ChatActions loading={loading} receiver={receiver} />
    </View>
  );
};

export default ChatScreen;
