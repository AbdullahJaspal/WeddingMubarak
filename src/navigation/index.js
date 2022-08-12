import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Intro from '../screens/Intro';
import Auth from '../screens/Auth';
import ExtendedExplore from '../screens/Home/ExploreScreen/ExtendedExplore';
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

const Stack = createNativeStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="PhoneNumberInput" component={PhoneNumberInput} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="ExtendedExplore" component={ExtendedExplore} />
      <Stack.Screen name="PremiumMatches" component={PremiumMatches} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="HelpInformation" component={HelpInformation} />
      <Stack.Screen name="FeedBack" component={FeedBack} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MembershipScreen" component={MembershipScreen} />
      <Stack.Screen name="LikeSubscribtion" component={LikeSubscribtion} />
    </Stack.Navigator>
  );
};

export default MainNav;
