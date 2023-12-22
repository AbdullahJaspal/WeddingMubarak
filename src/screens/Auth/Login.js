import React, {useState} from 'react';
import {moderateScale} from '../../Theme/Dimensions';

import {
  Image,
  Text,
  TextInput,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Customback from '../../assets/Components/CustomBack';
import LinearGradient from 'react-native-linear-gradient';
import {CustomButton} from '../../assets/Components/CustomButton';
import {useDispatch} from 'react-redux';
import {userLoginMail} from '../../redux/actions/auth';
import {CustomActivity} from '../../assets/Components/CustomActivity';
const {width, height} = Dimensions.get('window');
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showActivity, setShowActivity] = useState(false);
  const dispatch = useDispatch();
  const handleButtonPress = () => {
    navigation.replace('BottomTab');

    // setShowActivity(true);
    // var formdata = new FormData();
    // formdata.append('__api_key__', 'secret key');
    // formdata.append('email', email);
    // formdata.append('password', password);
    // dispatch(userLoginMail(formdata, onSuccessLogin, onErrorLogin));
  };

  const onSuccessLogin = res => {
    setShowActivity(false);
    navigation.replace('BottomTab');
  };

  const onErrorLogin = err => {
    setShowActivity(false);
    ShowSnackBar('There was some error...', 'red');
  };

  return (
    <LinearGradient
      colors={['#F5F5EB', '#DB9391']}
      style={{
        flex: 1,
      }}>
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            navigation.navigate('Intro');
          }}
        />
        <Image
          style={{width: 100, height: 100}}
          resizeMode={'contain'}
          source={require('../../assets/images/squareLogo.png')}
        />
        <Text style={[styles.topHeading, {marginTop: 10}]}>
          Enter your email
        </Text>
        <TextInput
          style={[
            styles.inputFieldText,
            {
              borderWidth: 1,
              width: (width / 100) * 85,
              borderRadius: 10,
              height: moderateScale(40),
              padding: 0,
              paddingHorizontal: 10,
              fontSize: moderateScale(16),
              marginTop: 30,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={'#7E7F82'}
          keyboardType={'email-address'}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={[
            styles.inputFieldText,
            {
              borderWidth: 1,
              width: (width / 100) * 85,
              borderRadius: 10,
              height: moderateScale(40),
              padding: 0,
              paddingHorizontal: 10,
              fontSize: moderateScale(16),
              marginTop: 20,
            },
          ]}
          placeholder="Password"
          placeholderTextColor={'#7E7F82'}
          keyboardType={'email-address'}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <CustomButton
        tag={'Login'}
        radius={50}
        stylees={{position: 'absolute', bottom: 10}}
        onPress={() => {
          navigation.replace('BottomTab');
        }}
      />
      <CustomActivity show={showActivity} />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  innerViewCont: {
    paddingHorizontal: (width / 100) * 8,
  },
  topHeading: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(30),
  },

  inputFieldText: {
    backgroundColor: 'transparent',
    paddingHorizontal: moderateScale(5),
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginTop: 10,
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(22),
    height: moderateScale(50),
    alignItems: 'flex-start',
    width: '50%',
  },
});
export default Login;
