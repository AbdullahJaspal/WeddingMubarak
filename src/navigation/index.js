import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Intro from '../screens/Intro';
import Auth from '../screens/Auth';
import ExtendedExplore from '../screens/Home/Chat/ExtendedExplore';
import PremiumMatches from '../screens/Home/PremiumMatches';
import BottomTab from './BottomTab';
import SplashScreen from '../screens/Intro/SplashScreen';
import Preferences from '../screens/Home/Preferences';
import Account from '../screens/Home/Account';
import HelpInformation from '../screens/Home/HelpandInformation';
import FeedBack from '../screens/Home/FeedBackAndReview';
import EditProfile from '../screens/Home/EditProfile/EditProfile';
import PhoneNumberInput from '../screens/Auth/PhoneNumberInput';
import VerifyPhone from '../screens/Auth/VerifyPhone';
import MembershipScreen from '../screens/Home/membershipScreen/membershipScreen';
import LikeSubscribtion from '../screens/Home/likeSubs/likeSubscription';
import ChatApp from '../screens/Home/chatScreen/chatScreen';
import StripeScreen from '../screens/Home/StripeScreen/StripeScreen';
import Search from '../screens/Home/Search/Search';
import Login from '../screens/Auth/Login';
import {saveToken, updateToken} from '../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  const dispatch = useDispatch();
  const {userData, token} = useSelector(state => state.auth);

  useEffect(() => {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(x => {
        var FormData = require('form-data');
        var data = new FormData();
        data.append('__api_key__', 'secret key');
        data.append('user_uid', userData.uid);
        data.append('token', x);
        dispatch(updateToken(data));
        dispatch(saveToken(x));
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PhoneNumberInput" component={PhoneNumberInput} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="ExtendedExplore" component={ExtendedExplore} />
      <Stack.Screen name="PremiumMatches" component={PremiumMatches} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="HelpInformation" component={HelpInformation} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="FeedBack" component={FeedBack} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MembershipScreen" component={MembershipScreen} />
      <Stack.Screen name="LikeSubscribtion" component={LikeSubscribtion} />
      <Stack.Screen name="ChatApp" component={ChatApp} />
      <Stack.Screen name="StripeScreen" component={StripeScreen} />
    </Stack.Navigator>
  );
};

export default MainNav;
