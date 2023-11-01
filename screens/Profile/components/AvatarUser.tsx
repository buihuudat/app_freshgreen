import {View, Image, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import {UserType} from '../../../types/userType';
import {styles} from '../style';
import {Icon} from '@rneui/themed';
import {UserImage} from '../../../constants/images';

interface Props {
  user: UserType;
  setOpenModal: (modal: boolean) => void;
}

const AvatarUser = (props: Props) => {
  const {user, setOpenModal} = props;
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);

  const userAvatar = useMemo(() => {
    if (user.avatar !== '') {
      return {uri: user.avatar};
    }
    return UserImage;
  }, [user]);

  return (
    <View style={styles.avatar}>
      {avatarBase64 ? (
        <Image style={styles.image} source={{uri: avatarBase64}} />
      ) : (
        <Image style={styles.image} source={userAvatar} />
      )}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => setOpenModal(true)}>
        <Icon name="auto-fix-high" style={{padding: 2}} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default AvatarUser;
