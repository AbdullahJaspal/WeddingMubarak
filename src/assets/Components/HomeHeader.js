import {Icon} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, Dimensions, TextInput} from 'react-native';
import {moderateScale} from '../../Theme/Dimensions';

export const HomeHeader = ({navigation, optionFalse, search = true}) => {
  const [option, setOpention] = useState(optionFalse);
  useEffect(() => {});

  return (
    <View
      style={{
        height: moderateScale(45),
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>
      <Image
        style={{height: 30, width: '25%'}}
        source={require('../images/homeLogo.png')}
        resizeMode={'contain'}
      />
      <Icon
        name="search1"
        type="ant-design"
        style={{marginBottom: 3}}
        onPress={() => {
          search && navigation.navigate('Search');
        }}
        color={search ? 'black' : 'transparent'}
      />
    </View>
  );
};
