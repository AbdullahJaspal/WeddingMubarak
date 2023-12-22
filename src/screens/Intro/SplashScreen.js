import React, {useEffect, useState} from 'react';

import {View, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {savedata, setFilters} from '../../redux/actions/auth';

const SplashScreen = ({navigation}) => {
  const [num, setNum] = useState('');
  const {loggedIn} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(loggedIn ? 'BottomTab' : 'Intro');
      const params = {
        martial_status: 'empty',
        religion: 'empty',
        community: 'empty',
        language: 'empty',
      };
      dispatch(setFilters(params));
      // dispatch(
      //   savedata({
      //     uid: '9a258666-884b-49b0-b460-872b1bf54a20',
      //     user_type: 'USER',
      //     first_name: 'Umair',
      //     last_name: 'Abbas',
      //     nick_name: 'optional',
      //     email: 'umairabbass786@gmail.com',
      //     phone: '03027064542',
      //     looking_for: 'men',
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
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <LinearGradient
        colors={['#C2272D', '#C2272D']}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: (Dimensions.get('window').width / 100) * 40,
          }}
          source={require('../../assets/images/splashLogo.png')}
          resizeMode="contain"
        />
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;
