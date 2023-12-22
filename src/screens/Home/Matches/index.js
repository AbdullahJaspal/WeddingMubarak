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
  Linking,
} from 'react-native';
import {moderateScale} from '../../../Theme/Dimensions';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import {CustomButton} from '../../../assets/Components/CustomButton';
import Theme from '../../../Theme/Theme';
import {CustomActivity} from '../../../assets/Components/CustomActivity';
import {useSelector, useDispatch} from 'react-redux';
import {
  checkLikeSubscribtion,
  checkPremiumSubscribtion,
  getAcceptedRequests,
  getLikedProfiles,
  getPassedProfiles,
  getWhoLikedProfiles,
  likeSubs,
  premiumSub,
} from '../../../redux/actions/auth';
import {getAge} from '../EditProfile/EditProfile';
import {useFocusEffect} from '@react-navigation/native';
import {Icon} from '@rneui/base';

const {width, height} = Dimensions.get('window');

const Matches = ({navigation}) => {
  const dispatch = useDispatch();
  const [connect, setConnect] = useState(false);
  const {userData} = useSelector(state => state.auth);
  const [like, setLike] = useState([]);
  const [pass, setPass] = useState([]);
  const [accept, setAccept] = useState([]);
  const [whoLike, setWhoLike] = useState([]);
  const [showActivity, setShowActivity] = useState(false);
  const [tags, setTags] = useState(`My Matches (${accept.length})`);

  useFocusEffect(
    React.useCallback(() => {
      getInfo();
      // checkPremiumSubs();
    }, []),
  );

  const tagData = [
    `New (${whoLike.length})`,
    `Pending Matches (${like.length})`,
    `My Matches (${accept.length})`,
    `More matches (${pass.length})`,
  ];

  ///designing function

  const renderTags = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.tagsCont,
          {
            backgroundColor:
              tags === item ? Theme.colors.primary : 'transparent',
          },
        ]}
        onPress={() => {
          setTags(item);
        }}>
        <Text
          style={{
            fontSize: 12,
            color: tags === item ? 'white' : '#6C6C6C',
            fontFamily: Theme.fontFamily.comics,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => {
    return item !== 'no' ? (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.renderCont}
        onPress={() =>
          connect === index
            ? setConnect('ok')
            : navigation.navigate('PremiumMatches', {
                item: item.user_uid,
              })
        }>
        <ImageBackground
          resizeMode="cover"
          source={{uri: item.profile_picture}}
          // source={require('../../../assets/images/girl.jpeg')}
          style={styles.CardContainer}>
          <View style={styles.backBlurr} />
          <View style={styles.dotIconCont}>
            <Icon
              name="dots-three-horizontal"
              type="entypo"
              color={'white'}
              size={20}
            />
          </View>

          <View style={styles.cardNameContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/checked.png')}
                style={{width: 25, height: 25}}
              />
              <Text numberOfLines={1} style={styles.name}>
                {item.full_name}
              </Text>
              <View style={styles.sentInfo}>
                <Image
                  style={{width: 8, height: 8}}
                  resizeMode="contain"
                  source={require('../../../assets/images/online.png')}
                />
                <Text style={styles.infotext}>Online</Text>
              </View>
              <View style={styles.sentInfo}>
                <Image
                  style={{width: 12, height: 12}}
                  resizeMode="contain"
                  source={require('../../../assets/images/couple.png')}
                />
                <Text style={styles.infotext}>You and her</Text>
              </View>
            </View>
            {connect !== index && (
              <Text style={styles.description}>
                {item.age} yrs, {item.height} • {item.profession}
              </Text>
            )}
            {connect !== index && (
              <Text style={[styles.description, {marginTop: 0}]}>
                Urdu, {item.religion} • {item.address}
              </Text>
            )}
          </View>
          {connect !== index && (
            <TouchableOpacity
              style={styles.connectText}
              onPress={() => {
                setConnect(index);
              }}>
              <Text
                style={{
                  fontFamily: Theme.fontFamily.comics,
                  color: 'white',
                  fontSize: 10,
                }}>
                Do you like this profile?
                <Text
                  style={{fontSize: 14, color: '#8DC73F'}}
                  onPress={() => {
                    setConnect(index);
                  }}>
                  {' '}
                  Connect now{'  '}
                </Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setConnect(index);
                }}>
                <Image
                  source={require('../../../assets/images/checked.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          {connect === index && (
            <View style={{backgroundColor: 'white', paddingVertical: 10}}>
              <View style={styles.contactLineCont}>
                <Text style={styles.contactLine}>
                  To Contact her directly, Updgrade Now
                </Text>
                <Text style={styles.premiumButton}>Let's Go Premium Now</Text>
              </View>
              <View style={styles.socialIConsCont}>
                <TouchableOpacity
                  style={styles.socialIcon}
                  onPress={() => {
                    Linking.openURL(
                      'whatsapp://send?text=' + '' + '&phone=91' + item.phone,
                    );
                  }}>
                  <Image
                    source={require('../../../assets/images/whatsapp.png')}
                    style={{width: 35, height: 35}}
                  />
                  <Text style={styles.socialName}>Whatsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialIcon}
                  onPress={() => {
                    navigation.navigate('Chat', {item: item.uid});
                  }}>
                  <Image
                    source={require('../../../assets/images/weddingChat.png')}
                    style={{width: 35, height: 35}}
                  />
                  <Text style={styles.socialName}>Wedding Mubarik Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialIcon}
                  onPress={() => {
                    Linking.openURL(`tel:${item.phone}`);
                  }}>
                  <Image
                    source={require('../../../assets/images/phone.png')}
                    style={{width: 35, height: 35}}
                  />
                  <Text style={styles.socialName}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialIcon}
                  onPress={() => {
                    Linking.openURL(`sms:${item.phone}`);
                  }}>
                  <Image
                    source={require('../../../assets/images/message.png')}
                    style={{width: 35, height: 35}}
                  />
                  <Text style={styles.socialName}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    ) : (
      <View>
        <CustomButton
          tag="View Plans"
          onPress={() => {
            navigation.navigate('Premium');
          }}
        />
        <Text style={styles.avenalatext}>To get more accurate matches!</Text>
      </View>
    );
  };

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
    dispatch(premiumSub(val.user_subscribed));
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
  const getInfo = () => {
    setShowActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    // formdata.append('user_uid', '6b3f2480-4e63-42f1-b885-e369bed8f0d2');
    console.log(formdata);
    dispatch(getAcceptedRequests(formdata, successAccept, errorAccept));
  };

  const successLike = val => {
    console.log(val);
    setLike(val.all_liked);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    dispatch(getPassedProfiles(formdata, successPass, errorPass));
  };
  const successPass = val => {
    console.log(val);
    setPass(val.all_passed);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    dispatch(getWhoLikedProfiles(formdata, successWhoLike, errorWhoLike));
  };
  const successAccept = val => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    setShowActivity(false);
    console.log('accept');
    console.log(val);
    setAccept(val.all_liking);
    dispatch(getLikedProfiles(formdata, successLike, errorLike));
  };
  const successWhoLike = val => {
    setShowActivity(false);
    console.log(val);
    setWhoLike(val.all_liking);
  };

  const errorLike = val => {
    setShowActivity(false);
    console.log(val);
  };
  const errorPass = val => {
    setShowActivity(false);
    console.log(val);
  };
  const errorWhoLike = val => {
    setShowActivity(false);
    console.log(val);
  };
  const errorAccept = val => {
    setShowActivity(false);
    console.log(val);
  };

  return (
    <View style={styles.mainContainer}>
      <HomeHeader
        Heading={'Premium Matches'}
        SubHeading={`(${
          tags === `New (${whoLike.length})`
            ? whoLike.length
            : `My Matches (${accept.length})`
            ? accept.length
            : `Pending Matches (${like.length})`
            ? like.length
            : pass.length
        } Profiles)`}
        logo={true}
        navigation={navigation}
        optionFalse={false}
      />
      <View
        style={{
          height: 25,
          width: '100%',
          alignSelf: 'center',
          marginVertical: 10,
        }}>
        <FlatList
          data={tagData}
          renderItem={renderTags}
          horizontal={true}
          style={{
            width: '98%',
            alignSelf: 'center',
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={
          tags === `New (${whoLike.length})`
            ? whoLike
            : tags === `My Matches (${accept.length})`
            ? accept
            : tags === `Pending Matches (${like.length})`
            ? like
            : pass
        }
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
  tagsCont: {
    borderRadius: 5,
    borderWidth: 1,
    height: 25,
    marginRight: 10,
    padding: 3,
    paddingHorizontal: 5,
    borderColor: '#CACACA',
  },
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
  cardNameContainer: {
    paddingLeft: moderateScale(20),
    marginTop: 'auto',
    marginBottom: moderateScale(20),
  },
  renderCont: {
    overflow: 'hidden',
    borderRadius: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avenalatext: {
    color: 'black',
    fontSize: moderateScale(17),
    marginTop: moderateScale(10),
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  name: {
    fontSize: 22,
    fontFamily: Theme.fontFamily.comics,
    color: 'white',
    marginLeft: 12,
    width: 120,
  },
  sentInfo: {
    backgroundColor: '#5F5452',
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    flexDirection: 'row',
    height: 17,
    marginLeft: 8,
  },
  infotext: {
    fontSize: 8,
    color: 'white',
    marginLeft: 3,
  },
  description: {
    fontSize: 12,
    fontFamily: Theme.fontFamily.comics,
    color: 'white',
    marginTop: 5,
  },
  connectText: {
    borderTopColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotIconCont: {
    backgroundColor: 'rgba(39,39,39,0.85)',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
    padding: 5,
    borderRadius: 50,
  },
  contactLineCont: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLine: {
    fontFamily: Theme.fontFamily.Poppins_Medium,
    color: 'black',
    fontSize: 12,
  },
  socialIConsCont: {
    width: '75%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  socialIcon: {alignItems: 'center', justifyContent: 'center'},
  socialName: {
    fontFamily: Theme.fontFamily.comics,
    color: 'black',
    fontSize: 8,
    marginTop: 3,
  },
  premiumButton: {
    color: 'white',
    backgroundColor: Theme.colors.yellow,
    fontSize: 9,
    fontFamily: Theme.fontFamily.comics,
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 100,
    marginLeft: 6,
  },
});

// Api functiions

export default Matches;
