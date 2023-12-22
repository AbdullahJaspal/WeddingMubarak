import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Header} from '../../assets/Components/Header';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {moderateScale} from '../../Theme/Dimensions';
import Theme from '../../Theme/Theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import auth from '@react-native-firebase/auth';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import {DotIndicator} from 'react-native-indicators';
import {useDispatch} from 'react-redux';
import {userLogin} from '../../redux/actions/auth';
import OTPTextInput from 'react-native-otp-textinput';
import {Button} from '@rneui/base';

const {width, height} = Dimensions.get('window');

const VerifyPhone = ({navigation, route}) => {
  const {number} = route.params;
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(null);
  const [otp, setOtp] = useState('');
  const [showActivity, setShowActivity] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const keyborad = useRef();

  useEffect(() => {
    sendOTP(number);
  }, []);

  // useEffect(() => {
  //   if (confirm !== null) {
  //     setTimeout(() => {
  //       keyborad.current.focus();
  //     }, 200);
  //   }
  // }, [confirm]);

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };
  const sendOTP = async number => {
    const confirmation = await auth().signInWithPhoneNumber(number);
    await setConfirm(confirmation);
  };

  const confirmCode = async code => {
    try {
      await confirm.confirm(code);
      setShowActivity(true);
      var formdata = new FormData();
      formdata.append('__api_key__', 'secret key');
      formdata.append('phone', number);
      const data = number;
      const link = 'login_user_with_phone';
      dispatch(userLogin(link, formdata, onSuccessLogin, onErrorLogin, data));
    } catch (error) {
      ShowSnackBar('Entered Code did not match...', 'red');
    }
  };

  const onSuccessLogin = (res, data) => {
    setShowActivity(false);

    navigation.replace(res, {field: 'Email', data: data});
  };

  const onErrorLogin = err => {
    setShowActivity(false);
    ShowSnackBar('There was some error...', 'red');
  };

  return (
    <View style={styles.mainContainer}>
      <Header leftOPacity={0} />
      {confirm === null ? (
        <>
          <Text style={styles.topText}>Sending on OTP...</Text>
          <Text style={styles.detailText}>
            We are sending an OTP on {number[0] + number[1] + number[2]}******
            {number[number.length - 2] + number[number.length - 1]},{'\n'}To
            verify your identity
          </Text>
          <DotIndicator
            color={Theme.colors.reverseGradient[0]}
            size={(width / 100) * 4}
          />
        </>
      ) : (
        <>
          <Text style={styles.topText}>Enter OTP here...</Text>
          <Text style={styles.detailText}>
            We have sent an OTP on {number[0] + number[1] + number[2]}******
            {number[number.length - 2] + number[number.length - 1]},{'\n'}Please
            verify that its you...
          </Text>
          {/* <OTPInputView
            ref={keyborad}
            style={styles.otpInputView}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            placeholderCharacter="#"
            autoFocusOnLoad={val => {
              setOtp(val);
            }}
            onCodeChanged={val => {}}
            onCodeFilled={confirmCode}
          /> */}
          <OTPTextInput
            ref={e => (otpInput = e)}
            containerStyle={styles.otpInputView}
            textInputStyle={styles.underlineStyleBase}
            inputCount={6}
            tintColor={Theme.colors.reverseGradient[0]}
            handleTextChange={code => {
              code.length === 6 && confirmCode(code);
            }}
            // containerStyle={styles.underlineStyleHighLighted}
          />
          <Text
            style={{width: '90%', alignSelf: 'center', textAlign: 'center'}}
            onPress={() => {
              // sendOTP(number);
              confirmCode('527594');
            }}>
            Resend Otp
          </Text>
        </>
      )}
      <CustomActivity show={showActivity} />
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
  },
  detailText: {
    marginLeft: (width / 100) * 5,
    color: 'grey',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(10),
  },
  otpInputView: {
    width: (width / 100) * 90,
    height: moderateScale(70),
    alignSelf: 'center',
    marginTop: moderateScale(30),
    borderColor: Theme.colors.reverseGradient[0],
  },
  underlineStyleBase: {
    borderColor: Theme.colors.reverseGradient[0],
    borderRadius: moderateScale(10),
    color: 'black',
  },
  underlineStyleHighLighted: {
    borderWidth: moderateScale(2),
    color: 'black',
  },
});

export default VerifyPhone;
