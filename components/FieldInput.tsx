import {Icon} from '@rneui/themed';
import React, {memo} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {mainColor} from '../constants/colors';

interface InputProps {
  label: string;
  placeholder: string;
  type?: KeyboardTypeOptions | undefined;
  secure?: boolean;
  value: string;
  setValue: (value: string) => void;
  autoCap?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  isPasswordShow: boolean;
  setIsPasswordShow: (isPasswordShow: boolean) => void;
  icon: string;
  errorMsg?: string;
  disable?: boolean;
}

const FieldInput = memo((props: InputProps) => {
  const {
    icon,
    label,
    placeholder,
    type,
    secure,
    value = 'default',
    setValue,
    autoCap = 'none',
    isPasswordShow,
    setIsPasswordShow,
    errorMsg,
    disable = true,
  } = props;

  const handleChangeInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setValue(event.nativeEvent.text);
  };

  return (
    <View>
      <Text>{label}</Text>
      <View style={{marginBottom: 10, paddingTop: 5}}>
        <View style={styles.inputSubContainer}>
          <Icon
            name={icon}
            size={22}
            color={!disable ? '#888' : mainColor}
            style={{paddingRight: 5}}
          />

          <TextInput
            placeholderTextColor={'#888'}
            selectionColor={'#888'}
            style={{...styles.inputText, color: disable ? '#000' : '#999'}}
            placeholder={placeholder}
            keyboardType={type}
            secureTextEntry={isPasswordShow}
            aria-label={label}
            value={value}
            autoCapitalize={autoCap}
            onChange={handleChangeInput}
            editable={disable}
          />
          {secure && (
            <Icon
              name={!isPasswordShow ? 'visibility' : 'visibility-off'}
              size={22}
              color={'#888'}
              style={{marginRight: 10}}
              onPress={() => setIsPasswordShow(!isPasswordShow)}
            />
          )}
        </View>
        {errorMsg && <Text style={{color: 'red'}}>{errorMsg}</Text>}
      </View>
    </View>
  );
});

export default FieldInput;

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '45%',
    height: 50,
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: '100%',
    width: '100%',
    color: 'black',
    flex: 1,
  },
});
