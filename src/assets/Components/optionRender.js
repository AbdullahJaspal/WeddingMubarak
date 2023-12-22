import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from '../../Theme/Dimensions';
import Theme from '../../Theme/Theme';

const Options = ({title, onPress, color = '#4D4D4D'}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        justifyContent: 'flex-start',
        borderRadius: 100,
        alignItems: 'center',
        paddingLeft: moderateScale(10),
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'transparent',
        flex: 1,
        marginVertical: moderateScale(4),
        marginRight: moderateScale(5),
        flexDirection: 'row',
        paddingVertical: 3,
        alignSelf: 'flex-start',
      }}>
      <View
        style={{
          width: moderateScale(17),
          height: moderateScale(17),
          borderRadius: 100,
          padding: moderateScale(1),
          marginRight: moderateScale(10),
        }}>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: color,
              borderRadius: 100,
            },
          ]}
        />
      </View>
      <Text
        numberOfLines={1}
        style={[
          {
            color: 'black',
            fontSize: moderateScale(14),
            fontFamily: Theme.fontFamily.Poppins_Regular,
          },
          {
            fontSize: 12,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default Options;
