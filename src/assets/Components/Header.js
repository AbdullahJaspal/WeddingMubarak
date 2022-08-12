import React from 'react';

import {TouchableOpacity, Image, Dimensions, View, Text} from 'react-native';
import {moderateScale} from '../../Theme/Dimensions';
import Theme from '../../Theme/Theme';

export const Header = ({
  leftOnpress,
  rightOnPress,
  leftOPacity,
  title = '',
  rightOPacity,
}) => {
  return (
    <View
      style={{
        height: moderateScale(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: (Dimensions.get('window').width / 100) * 5,
        width: '100%',
        backgroundColor: 'white',
      }}>
      {leftOPacity !== 0 && (
        <TouchableOpacity activeOpacity={1} onPress={leftOnpress}>
          <Image
            source={require('../../assets/images/backKey.png')}
            resizeMode="contain"
            style={{
              height: moderateScale(30),
              width: moderateScale(30),
              opacity: leftOPacity,
            }}
          />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: moderateScale(20),
          fontFamily: Theme.fontFamily.Poppins_Bold,
          color: 'black',
          marginLeft: leftOPacity !== 0 ? moderateScale(45) : 0,
        }}>
        {title}
      </Text>
      <TouchableOpacity activeOpacity={1} onPress={rightOnPress}>
        <Image
          source={require('../../assets/images/headerImage.png')}
          resizeMode="contain"
          style={{
            height: moderateScale(50),
            width: moderateScale(75),
            opacity: rightOPacity,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
