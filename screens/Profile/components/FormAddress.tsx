import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UserAddress} from '../../../types/userType';
import FieldInput from '../../../components/FieldInput';
import {styles} from '../style';
import {Picker} from '@react-native-picker/picker';
import {getProvince} from '../../../utils/api/getProvince';
import {AddressProps} from '..';

interface Props {
  edit: boolean;
  dataProps: AddressProps;
  setDataProps: (dataProps: AddressProps) => void;
}

const FormAddress = (props: Props) => {
  const {edit, dataProps, setDataProps} = props;
  const [dataAddress, setDataAddress] = useState([]);

  const [locationData, setLocationData] = useState<{
    provinces: {name: string}[];
    districts: {name: string}[];
    wards: {name: string}[];
  }>({
    provinces: [],
    districts: [],
    wards: [],
  });

  // get provider
  useEffect(() => {
    const getProvinces = async () => {
      try {
        const data = await getProvince();
        setLocationData(prevData => ({
          ...prevData,
          provinces: data,
        }));
        setDataAddress(data);
      } catch (e) {
        throw e;
      }
    };
    getProvinces();
  }, [edit]);

  // get cities, wards, disticts
  useEffect(() => {
    if (dataAddress && dataAddress.length > 0) {
      const matchingDataCity: any = dataAddress.find(
        (data: any) => data.name === dataProps.city,
      );

      if (matchingDataCity) {
        setLocationData(prevData => ({
          ...prevData,
          districts: matchingDataCity.districts,
        }));
      }
    }

    if (locationData.districts && locationData.districts.length > 0) {
      const matchingDataDistrict: any = locationData.districts.find(
        (data: any) => data.name === dataProps.district,
      );

      if (matchingDataDistrict) {
        setLocationData(prevData => ({
          ...prevData,
          wards: matchingDataDistrict.wards,
        }));
      }
    }
  }, [dataProps, dataAddress, locationData.districts]);

  return (
    <View style={styles.address}>
      <FieldInput
        icon="airline-stops"
        label="Tên đường"
        placeholder="Nhập tên đường"
        type="default"
        value={dataProps.street}
        disable={edit}
        setValue={street =>
          setDataProps(prev => ({
            ...prev,
            street,
          }))
        }
        isPasswordShow={false}
        setIsPasswordShow={() => {}}
      />

      <View>
        <Picker
          enabled={edit}
          selectedValue={dataProps['city']}
          onValueChange={city => setDataProps(prev => ({...prev, city}))}>
          {locationData.provinces.map((data: any) => (
            <Picker.Item key={data.code} label={data.name} value={data.name} />
          ))}
        </Picker>
        <Picker
          enabled={edit}
          selectedValue={dataProps['district']}
          onValueChange={district =>
            setDataProps(prev => ({...prev, district}))
          }>
          {locationData.districts.map((data: any) => (
            <Picker.Item key={data.code} label={data.name} value={data.name} />
          ))}
        </Picker>
        <Picker
          enabled={edit}
          selectedValue={dataProps['ward']}
          onValueChange={ward => setDataProps(prev => ({...prev, ward}))}>
          {locationData.wards.map((data: any) => (
            <Picker.Item key={data.code} label={data.name} value={data.name} />
          ))}
        </Picker>

        <FieldInput
          icon="airline-stops"
          label="Thêm"
          placeholder="Thông tin thêm"
          type="default"
          value={dataProps.more}
          disable={edit}
          setValue={more =>
            setDataProps(prev => ({
              ...prev,
              more,
            }))
          }
          isPasswordShow={false}
          setIsPasswordShow={() => {}}
        />
      </View>
    </View>
  );
};

export default FormAddress;
