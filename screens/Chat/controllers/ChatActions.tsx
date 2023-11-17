import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import {Icon, Input} from '@rneui/themed';
import {mainColor} from '../../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {FromType} from '../../../types/messageType';
import {messageActions} from '../../../actions/messageActions';

interface Props {
  receiver: FromType;
  loading: boolean;
}

const ChatActions = (props: Props) => {
  const {receiver, loading} = props;
  const [text, setText] = useState('');
  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  const handleSendMessage = () => {
    if (receiver._id === 'AI') {
      dispatch(messageActions.ask({userId: user?._id!, message: text}));
      setText('');
    } else {
      const data = {
        user: user!,
        from: user?._id!,
        to: receiver._id,
        message: {
          text,
        },
      };
      user && dispatch(messageActions.send(data));
      setText('');
    }
  };

  const dataMessage = [
    'Gợi ý bánh ít đường',
    'Sản phẩm nào tốt cho người già',
    'Những sản phẩm tốt cơ thể',
    'Sữa ít đường',
    'Rau củ',
  ];

  return (
    <View style={styles.actionContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 5,
          justifyContent: 'center',
        }}>
        {dataMessage.map((data, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              dispatch(messageActions.ask({userId: user?._id!, message: data}))
            }>
            <Text
              style={{
                padding: 2,
                paddingHorizontal: 10,
                borderRadius: 20,
                borderStyle: 'solid',
                borderColor: mainColor,
                borderWidth: 1,
                width: 'auto',
              }}>
              {data}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.actionWrap}>
        <Icon name="add" color={mainColor} />
        <Input
          onChangeText={setText}
          value={text}
          autoFocus
          placeholder="Viết tin nhắn..."
          containerStyle={styles.inputAction}
          style={{paddingBottom: 0}}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Icon
            name="send"
            color={text !== '' ? mainColor : '#999'}
            onPress={handleSendMessage}
          />
        )}
      </View>
    </View>
  );
};

export default ChatActions;
