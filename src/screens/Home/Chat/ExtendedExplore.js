import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../../assets/Components/Header';
import {moderateScale} from '../../../Theme/Dimensions';
import Flag from 'react-native-flags';
import MaterailCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Theme from '../../../Theme/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLikedProfiles,
  getPassedProfiles,
  getWhoLikedProfiles,
} from '../../../redux/actions/auth';
import {CustomActivity} from '../../../assets/Components/CustomActivity';

const {width} = Dimensions.get('window');

const ExtendedExplore = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [showActivity, setShowActivity] = useState(false);
  const {type} = route.params;
  useEffect(() => {
    getInfo();
  }, []);
  const {userData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const getInfo = () => {
    setShowActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    // formdata.append('user_uid', '6b3f2480-4e63-42f1-b885-e369bed8f0d2');

    type === 'Liked me'
      ? dispatch(getWhoLikedProfiles(formdata, success, error))
      : type === 'I Liked'
      ? dispatch(getLikedProfiles(formdata, success, error))
      : dispatch(getPassedProfiles(formdata, success, error));
  };

  const success = val => {
    setShowActivity(false);
    setData(
      type === 'Liked me'
        ? val.all_liking
        : type === 'I Liked'
        ? val.all_liked
        : val.all_passed,
    );
    console.log(data);
  };
  const error = val => {
    console.log(val);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 0.6,
          borderRadius: 15,
          elevation: 5,
          borderColor: Theme.colors.gray,
        }}
        onPress={() => {
          navigation.navigate('PremiumMatches', {
            item: item.user_uid,
          });
        }}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: item.profile_picture}}
          borderRadius={moderateScale(15)}
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
              {item.full_name}
              <Text
                style={{
                  fontWeight: 'normal',
                }}>
                {' '}
                {item.age} Yrs
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Flag code="PK" size={16} />
              <Text style={styles.cardAddress}>{item.address}</Text>
            </View>
            <View style={styles.cardRowCharacteristics}>
              <View style={styles.cardCharacteristic}>
                <MaterailCommunityIcons
                  name="human-male-height"
                  color="white"
                  size={moderateScale(12)}
                />
                <Text style={styles.charactericText}>{item.height}</Text>
              </View>

              <View style={styles.cardCharacteristic}>
                <Text style={styles.charactericText}>{item.religion}</Text>
              </View>
            </View>
            <View style={[styles.cardCharacteristic]}>
              <Entypo name="suitcase" color="white" size={moderateScale(12)} />
              <Text style={[styles.charactericText]}>{item.profession}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header leftOPacity={1} leftOnpress={() => navigation.goBack()} />
      <View style={styles.topRow}>
        <Image
          source={
            type === 'Liked me'
              ? require('../../../assets/images/heart.png')
              : type === 'I Liked'
              ? require('../../../assets/images/thumbsup.png')
              : require('../../../assets/images/cross.png')
          }
          style={styles.topImage}
        />
        <Text style={styles.topTag}>{type}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
        }}
        contentContainerStyle={{
          paddingTop: moderateScale(20),
          paddingBottom: moderateScale(100),
        }}
        ItemSeparatorComponent={() => (
          <View style={{marginVertical: moderateScale(5)}} />
        )}
      />
      <CustomActivity show={showActivity} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: (width / 100) * 5,
    marginTop: moderateScale(10),
  },
  topImage: {
    resizeMode: 'contain',
    width: moderateScale(45),
    height: moderateScale(50),
  },
  topTag: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: moderateScale(20),
    marginLeft: moderateScale(10),
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  CardContainer: {
    width: (width / 100) * 46.25,
    height: moderateScale(300),
  },
  backBlurr: {
    backgroundColor: 'white',
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
    backgroundColor: '#1D164C',
    borderTopRightRadius: moderateScale(15),
  },
  premiumText: {
    color: 'white',
    fontSize: moderateScale(10),
    // fontWeight: 'bold',
    marginLeft: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  cardPremiumImage: {
    width: moderateScale(12),
    height: moderateScale(12),
  },
  cardNameContainer: {
    paddingLeft: moderateScale(10),
    marginTop: 'auto',
    marginBottom: moderateScale(10),
  },
  cardName: {
    color: 'white',
    fontSize: moderateScale(13),
    // fontWeight: '600',
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  cardAddress: {
    color: 'white',
    fontSize: moderateScale(10),
    marginLeft: moderateScale(10),
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  cardRowCharacteristics: {
    flexDirection: 'row',
    marginVertical: moderateScale(5),
  },
  cardCharacteristic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(5),
    alignSelf: 'flex-start',
    backgroundColor: '#101012',
    marginRight: moderateScale(5),
  },
  charactericText: {
    color: 'white',
    fontSize: moderateScale(8),
    // fontWeight: '500',
    marginLeft: moderateScale(7),
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
});

export default ExtendedExplore;
