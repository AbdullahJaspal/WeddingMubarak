import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';

export const CustomButton = ({
  tag,
  onPress,
  height = 45,
  textSize = 16,
  fontFamily = Theme.fontFamily.Poppins_Bold,
  padding = 50,
  radius=13
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        alignSelf: 'center',
        height: moderateScale(height),
        borderRadius: moderateScale(radius),
        overflow: 'hidden',
      }}>
      <LinearGradient
        colors={Theme.colors.reverseGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: moderateScale(padding),
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(textSize),
            fontFamily: fontFamily,
          }}>
          {tag}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
