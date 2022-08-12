import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {moderateScale} from '../../../Theme/Dimensions';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import Flag from 'react-native-flags';
import MaterailCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {CustomButton} from '../../../assets/Components/CustomButton';
import Theme from '../../../Theme/Theme';
import {CustomActivity} from '../../../assets/Components/CustomActivity';
import {useSelector, useDispatch} from 'react-redux';
import {
  checkLikeSubscribtion,
  checkPremiumSubscribtion,
  checkProfileLike,
  getHomeScreen,
  likeSubs,
  premiumSubs,
} from '../../../redux/actions/auth';
import {getAge} from '../EditProfile/EditProfile';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.auth);

  const renderItem = ({item, index}) => {
    return item !== 'no' ? (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          overflow: 'hidden',
          borderRadius: moderateScale(15),
        }}
        onPress={() =>
          navigation.navigate('PremiumMatches', {
            item: item.user_uid,
          })
        }>
        <ImageBackground
          resizeMode="cover"
          source={{uri: item.profile_picture}}
          style={styles.CardContainer}>
          <View style={styles.backBlurr} />
          <View style={styles.cardPremiumContainer}>
            <Image
              source={require('../../../assets/images/crown.png')}
              resizeMode="contain"
              style={styles.cardPremiumImage}
            />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
          <View style={styles.cardNameContainer}>
            <Text style={styles.cardName}>
              {item.full_name},
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Regular,
                }}>
                {' '}
                {getAge(item.age)} Yrs
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Flag code="PK" size={24} />
              <Text style={styles.cardAddress}>{item.address}</Text>
            </View>

            <View style={styles.cardCharacteristic}>
              <MaterailCommunityIcons
                name="human-male-height"
                color="white"
                size={moderateScale(16)}
              />
              <Text style={styles.charactericText}>Height, {item.height}</Text>
            </View>
            <View style={styles.cardCharacteristic}>
              <Entypo name="suitcase" color="white" size={moderateScale(16)} />
              <Text style={styles.charactericText}>{item.profession}</Text>
            </View>

            <View style={styles.cardCharacteristic}>
              <Text style={styles.charactericText}>{item.religion}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    ) : (
      <View>
        <CustomButton tag="View Plans" />
        <Text style={styles.avenalatext}>To get more accurate matches!</Text>
      </View>
    );
  };

  // const data = [1, 2, 'no', 4, 5, 'no'];
  const [data, setData] = useState([]);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    handleGetData();
    checkPremiumSubs();
  }, []);

  const checkPremiumSubs = () => {
    setShowActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    console.log(formdata);

    dispatch(
      checkPremiumSubscribtion(
        formdata,
        premiumSubscribtionSuccess,
        premiumSubscribtionError,
      ),
    );
    dispatch(
      checkLikeSubscribtion(formdata, subscribtionSuccess, subscribtionError),
    );
  };
  const premiumSubscribtionSuccess = val => {
    setShowActivity(false);
    console.log(val);
    dispatch(premiumSubs(val.user_subscribed));
  };
  const premiumSubscribtionError = val => {
    setShowActivity(false);
    console.log(val);
  };
  const subscribtionSuccess = val => {
    setShowActivity(false);
    console.log('.............val.........  ');
    console.log(val.user_likes_subscribed);
    dispatch(likeSubs(val.user_likes_subscribed));
  };
  const subscribtionError = val => {
    console.log('.............val.........');
    setShowActivity(false);
  };

  const handleGetData = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('looking_for', userData.looking_for.toUpperCase());
    formdata.append('gender', userData.gender.toUpperCase());
    setShowActivity(true);
    console.log(formdata);
    dispatch(getHomeScreen(formdata, onSuccess, onError));
  };

  const onSuccess = res => {
    setShowActivity(false);
    setData(res);
  };

  const onError = err => {
    setShowActivity(false);
  };

  return (
    <View style={styles.mainContainer}>
      <HomeHeader
        Heading={'Premium Matches'}
        SubHeading={`(${data.length} Profiles)`}
        showCrown
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          width: width,
        }}
        contentContainerStyle={{
          paddingTop: moderateScale(20),
          paddingBottom: moderateScale(100),
          alignItems: 'center',
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginVertical: moderateScale(5),
            }}
          />
        )}
        ListFooterComponent={
          <View style={{marginTop: moderateScale(20)}}>
            <CustomButton
              tag="View Plans"
              onPress={() => {
                navigation.navigate('MembershipScreen');
              }}
            />
            <Text style={styles.avenalatext}>
              To get more accurate matches!
            </Text>
          </View>
        }
      />
      <CustomActivity show={showActivity} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  CardContainer: {
    width: (width / 100) * 95,
    height: (width / 100) * 95,
  },
  backBlurr: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
  },
  cardPremiumContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    borderBottomLeftRadius: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.reverseGradient[0],
    borderTopRightRadius: moderateScale(15),
  },
  premiumText: {
    color: 'white',
    fontSize: moderateScale(10),
    // fontWeight: 'bold',
    marginLeft: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
  },
  cardPremiumImage: {
    width: moderateScale(12),
    height: moderateScale(12),
  },
  cardNameContainer: {
    paddingLeft: moderateScale(20),
    marginTop: 'auto',
    marginBottom: moderateScale(20),
  },
  cardName: {
    color: 'white',
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
  },
  cardAddress: {
    color: 'white',
    fontSize: moderateScale(14),
    marginLeft: moderateScale(10),
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  cardCharacteristic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(10),
    alignSelf: 'flex-start',
    backgroundColor: '#101012',
    marginRight: moderateScale(5),
    marginTop: moderateScale(5),
  },
  charactericText: {
    color: 'white',
    fontSize: moderateScale(13),
    marginLeft: moderateScale(7),
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  avenalatext: {
    color: 'black',
    fontSize: moderateScale(17),
    marginTop: moderateScale(10),
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
});

export default HomeScreen;
