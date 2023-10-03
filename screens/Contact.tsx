import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import MapView from 'react-native-maps';

// const region = {
//   latitude: 10.824556800004814,
//   longitude: 106.70232931779839,
//   latitudeDelta: 0,
//   longitudeDelta: 0,
// };

const Contact = () => {
  const navigation = useNavigation();

  const handleSend = () => {};

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
      <View style={styles.form}>
        <Text style={styles.title}>Gửi mail đến chúng tôi</Text>
        <View style={styles.group}>
          <TextInput style={styles.input} placeholder="Tên" />
          <TextInput style={styles.input} placeholder="Email" />
        </View>
        <View style={styles.group}>
          <TextInput style={styles.input} placeholder="Địa chỉ" />
          <TextInput style={styles.input} placeholder="Số điện thoại" />
        </View>
        <TextInput
          style={{...styles.input, width: '100%'}}
          placeholder="Chủ đề"
        />
        <TextInput
          style={styles.content}
          placeholder="Nội dung"
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  form: {
    width: '100%',
    margin: 0,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 25,
    padding: 8,
    textAlign: 'center',
    paddingBottom: 20,
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    width: '45%',
  },
  content: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginVertical: 16,
    width: '100%',
  },

  button: {
    padding: 10,
    backgroundColor: mainColor,
    width: '100%',
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
