import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from '../../Theme/Dimensions';
import Theme from '../../Theme/Theme';

export const HomeHeader = ({
  leftPress,
  Heading,
  SubHeading,
  showCrown,
  showLeftIcon,
}) => {
  return (
    <View
      style={{
        height: moderateScale(60),
        width: Dimensions.get('window').width,
      }}>
      <LinearGradient
        colors={Theme.colors.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          paddingHorizontal: (Dimensions.get('window').width / 100) * 5,
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        {showLeftIcon ? (
          <FontAwesome
            name="arrow-left"
            color="white"
            size={moderateScale(30)}
            onPress={leftPress}
          />
        ) : null}
        {showCrown ? (
          <Image
            source={require('../../assets/images/crown.png')}
            resizeMode="contain"
            style={{
              width: moderateScale(40),
              height: moderateScale(40),
              marginLeft: moderateScale(10),
            }}
          />
        ) : null}
        <View
          style={{
            marginLeft: moderateScale(10),
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: moderateScale(18),
              fontFamily: Theme.fontFamily.Poppins_Bold,
              top: moderateScale(5),
            }}>
            {Heading}
          </Text>
          {SubHeading ? (
            <Text
              style={{
                color: 'white',
                fontSize: moderateScale(12),
                fontFamily: Theme.fontFamily.Poppins_Regular,
              }}>
              {SubHeading}
            </Text>
          ) : null}
        </View>
      </LinearGradient>
    </View>
  );
};
