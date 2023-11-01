import React, {memo, useState} from 'react';
import {Dialog} from '@rneui/themed';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ActivityIndicator, Image, View} from 'react-native';
import {mainColor} from '../../../constants/colors';
import {useAppDispatch} from '../../../redux/hooks';
import {userChangeAvatar} from '../../../redux/slices/userSlice';
import {UserType} from '../../../types/userType';
import {imageUpload} from '../../../utils/handlers/imageUploadCloud';
import Toast from 'react-native-toast-message';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: UserType;
}

const ModalHandler = memo((props: Props) => {
  const {open, setOpen, user} = props;
  const [loading, setLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState<string>('');
  const [imageUri, setImageUri] = useState('');

  const dispatch = useAppDispatch();

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: true,
  };

  const handleSelectImage = () => {
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('Image selection was canceled');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        setImageSelected('data:image/png;base64,' + selectedImage.base64);
        setImageUri(selectedImage.uri);
        console.log('Selected Image:', selectedImage);
      }
    });
  };
  const handleTakeImage = () => {
    launchCamera(options, (response: any) => {
      if (response.didCancel) {
        console.log('Image selection was canceled');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        setImageSelected('data:image/png;base64,' + selectedImage.base64);
        setImageUri(selectedImage.uri);
      }
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setImageSelected('');
    setImageUri('');
    setLoading(false);
  };

  const handleChangeAvatar = async () => {
    setLoading(true);

    await imageUpload(imageSelected).then(avatar => {
      dispatch(userChangeAvatar({_id: user?._id as string, avatar}));
      Toast.show({type: 'success', text1: 'Cập nhật ảnh đại diện thành công'});
    });

    handleCancel();
  };

  return (
    <Dialog
      style={{borderRadius: 10}}
      statusBarTranslucent
      isVisible={open}
      onBackdropPress={handleCancel}>
      <Dialog.Title
        titleStyle={{textAlign: 'center', fontSize: 22}}
        title="Đổi ảnh đại diện"
      />

      {imageUri !== '' && (
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: imageUri}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              resizeMode: 'cover',
            }}
          />
        </View>
      )}

      {imageSelected === '' && (
        <Dialog.Actions>
          <Dialog.Button color={'success'} onPress={handleTakeImage}>
            Chụp ảnh
          </Dialog.Button>
          <Dialog.Button onPress={handleSelectImage}>
            Chọn ảnh từ thư viên
          </Dialog.Button>
        </Dialog.Actions>
      )}

      {imageSelected !== '' && !loading && (
        <Dialog.Actions>
          <Dialog.Button onPress={handleChangeAvatar}>Cập nhật</Dialog.Button>
          <Dialog.Button color={'success'} onPress={handleCancel}>
            Để sau
          </Dialog.Button>
        </Dialog.Actions>
      )}

      {loading && <ActivityIndicator color={mainColor} />}
    </Dialog>
  );
});

export default ModalHandler;
