import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Icon} from '@rneui/base';
import {moderateScale} from '../../../Theme/Dimensions';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Theme from '../../../Theme/Theme';
import {Header} from '../../../assets/Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  checkLikeSubscribtion,
  checkPremiumSubscribtion,
  likeSubs,
  premiumSub,
} from '../../../redux/actions/auth';

const {width, height} = Dimensions.get('screen');

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const Premium = ({navigation}) => {
  const {userData, premiumSubs} = useSelector(state => state.auth);
  const [showActivity, setShowActivity] = useState(false);

  const dispatch = useDispatch();
  useFocusEffect(React.useCallback(() => {}, []));

  return <View></View>;
};

const Styles = StyleSheet.create({});

export default Premium;
