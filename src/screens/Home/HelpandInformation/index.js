import {Icon} from '@rneui/base';
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {moderateScale} from '../../../Theme/Dimensions';

const HelpInformation = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={Styles.header}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Icon
            name="caretleft"
            type="ant-design"
            size={20}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{fontSize: 22}}>Feedback and Review</Text>
        </View>
        <Image
          style={{height: 30, width: '25%', marginBottom: 5}}
          source={require('../../../assets/images/homeLogo.png')}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  header: {
    height: moderateScale(45),
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});
export default HelpInformation;
