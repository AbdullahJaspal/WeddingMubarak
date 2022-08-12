import React, {useEffect, useState} from 'react';

import {
  View,
  Image,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../Theme/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {savedata} from '../../redux/actions/auth';
import auth from '@react-native-firebase/auth';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';

const SplashScreen = ({navigation}) => {
  const [num, setNum] = useState('');
  const {loggedIn} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      // navigation.replace(loggedIn ? 'BottomTab' : 'Intro');
      // dispatch(
      //   savedata({
      //     uid: '6b3f2480-4e63-42f1-b885-e369bed8f0d2',
      //     user_type: 'USER',
      //     first_name: 'Umair',
      //     last_name: 'Abbas',
      //     nick_name: 'optional',
      //     email: 'umairabbass786@gmail.com',
      //     phone: '03027064542',
      //     looking_for: 'SOCIALIZING',
      //     gender: 'MAN',
      //     date_of_birth: '10/03/2000',
      //     martial_status: 'single',
      //     diet: 'healthy',
      //     height: '163',
      //     state: 'punjab',
      //     city: 'lahore',
      //     country: 'pakistan',
      //     community: 'islamic',
      //     religion: 'islam',
      //     language: 'urdu',
      //     pray: '5',
      //     hobbies: 'none',
      //     qualification: 'cs student',
      //     work_with: 'none',
      //     work_as: 'freelancer',
      //     about: 'api developer',
      //     selfie:
      //       'https://api.zivaj.com/data/images/user_avatars/166003168936748.png',
      //     blocked: false,
      //     created_at: '2022-07-20 05:13:00',
      //   }),
      // );
      navigation.replace('BottomTab');
      // const confirmation = auth().signInWithPhoneNumber('+923006375182');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <LinearGradient
        colors={Theme.colors.gradient}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: (Dimensions.get('window').width / 100) * 80,
          }}
          source={require('../../assets/images/placeholder-logo-1.png')}
          resizeMode="contain"
        />
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;
