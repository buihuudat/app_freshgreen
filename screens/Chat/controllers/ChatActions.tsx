import {View} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import {Icon, Input} from '@rneui/themed';
import {mainColor} from '../../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {FromType} from '../../../types/messageType';
import {messageActions} from '../../../actions/messageActions';

const ChatActions = (receiver: FromType) => {
  const [text, setText] = useState('');
  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  const handleSendMessage = () => {
    const data = {
      from: user?._id!,
      to: receiver._id,
      message: {
        text,
      },
    };
    dispatch(messageActions.send(data));
    setText('');
  };

  return (
    <View style={styles.actionContainer}>
      <View style={styles.actionWrap}>
        <Icon name="add" color={mainColor} />
        <Input
          onChangeText={setText}
          value={text}
          autoFocus
          placeholder="Viết tin nhắn..."
          containerStyle={styles.inputAction}
        />
        <Icon
          name="send"
          color={text !== '' ? mainColor : '#999'}
          onPress={handleSendMessage}
        />
      </View>
    </View>
  );
};

export default ChatActions;
