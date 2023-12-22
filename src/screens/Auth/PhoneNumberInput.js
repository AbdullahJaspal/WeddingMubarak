import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {CustomButton} from '../../assets/Components/CustomButton';
import {Header} from '../../assets/Components/Header';
import {moderateScale} from '../../Theme/Dimensions';
import Theme from '../../Theme/Theme';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {Icon} from '@rneui/base';

const {width} = Dimensions.get('window');

const PhoneNumberInput = ({navigation}) => {
  const [value, setVlaue] = useState('');

  const inputPhone = useRef();

  // const handle = () => {
  //   if (inputPhone.current?.isValidNumber(value) === true) {
  //     navigation.replace('VerifyPhone', {
  //       number: value,
  //     });
  //   } else {
  //     ShowSnackBar('Invalid Number...', 'red');
  //   }
  // };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
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
          <Text style={{fontSize: 24}}>Phone Number</Text>
        </View>
        <Image
          style={{height: 30, width: '25%', marginBottom: 5}}
          source={require('../../assets/images/homeLogo.png')}
          resizeMode={'contain'}
        />
      </View>

      <Text style={styles.topText}>Please enter your Phone Number</Text>

      <PhoneInput
        containerStyle={styles.containerStyle}
        textContainerStyle={styles.textContainerStyle}
        textInputStyle={{
          height: moderateScale(30),
          padding: 0,
        }}
        codeTextStyle={{
          height: moderateScale(25),
          textAlignVertical: 'center',
        }}
        ref={inputPhone}
        defaultValue={value}
        defaultCode="PK"
        layout="first"
        onChangeFormattedText={text => {
          setVlaue(text);
        }}
        withShadow
        autoFocus
      />
      <View style={styles.buttonWrapper}>
        <CustomButton tag={'Continue'} onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  topText: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    marginLeft: (width / 100) * 5,
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
  },
  containerStyle: {
    // backfaceVisibility: 'red',
    width: (width / 100) * 90,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    borderWidth: 1,
    borderColor: 'grey',
    elevation: 10,
  },
  textContainerStyle: {
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  buttonWrapper: {
    marginTop: 'auto',
    marginBottom: moderateScale(20),
  },
  header: {
    height: moderateScale(45),
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export default PhoneNumberInput;
