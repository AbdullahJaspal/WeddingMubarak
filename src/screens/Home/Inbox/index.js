import React, {useEffect, useState, useRef} from 'react';

import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import {moderateScale} from '../../../Theme/Dimensions';
import Theme from '../../../Theme/Theme';
import {CustomButton} from '../../../assets/Components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAcceptedRequests,
  getLikedProfiles,
  getPassedProfiles,
  getWhoLikedProfiles,
} from '../../../redux/actions/auth';
import {CustomActivity} from '../../../assets/Components/CustomActivity';
import {useFocusEffect} from '@react-navigation/native';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import {Icon} from '@rneui/base';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const tagData = [
  'Accepted Requests',
  'Liked Users',
  'Passed users',
  'Who liked me',
];
const Inbox = ({navigation}) => {
  const [showActivity, setShowActivity] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [tags, setTags] = useState('Accepted Requests');
  const [like, setLike] = useState([]);
  const [pass, setPass] = useState([]);
  const [accept, setAccept] = useState([]);
  const [whoLike, setWhoLike] = useState([]);
  const bottomSheet = useRef();
  const {userData, premiumSubs, likeSubs} = useSelector(state => state.auth);

  useEffect(() => {
    // hanldeAnimation();
  });

  useFocusEffect(
    React.useCallback(() => {
      getInfo();
    }, []),
  );
  const dispatch = useDispatch();
  const hanldeAnimation = () => {
    setTimeout(() => {
      setAnimate(!animate);
    }, 500);
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

  const successWhoLike = val => {
    setShowActivity(false);
    console.log(val);
    setWhoLike(val.all_liking);
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

  ///    Designing Functions
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
          style={{fontSize: 12, color: tags === item ? 'white' : '#6C6C6C'}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => {
    return tags === 'Passed users' ? (
      <TouchableOpacity
        style={styles.OuterCardContainer}
        onPress={() => {
          navigation.navigate('PremiumMatches', {
            item: item.user_uid,
          });
        }}>
        <View style={styles.CardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 10,
            }}>
            <ImageBackground
              style={{
                width: 140,
                height: 35,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 5,
                paddingRight: 5,
              }}
              resizeMode={'cover'}
              source={require('../../../assets/images/premium.png')}>
              <Icon
                type="font-awesome-5"
                name="crown"
                size={13}
                color="white"
              />
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Medium,
                  color: 'white',
                  marginLeft: 5,
                }}>
                PREMIUM +
              </Text>
            </ImageBackground>
            <Text
              style={{
                fontFamily: Theme.fontFamily.comics,
                fontSize: 12,
                marginTop: 5,
              }}>
              {moment(item.created_at).format('MMM Do YY')}
            </Text>
          </View>
          <View style={styles.declinedInfo}>
            <Image
              style={{width: 90, height: 90, borderRadius: 100}}
              source={{uri: item.profile_picture}}
            />
            <View style={{width: '65%'}}>
              <Text style={styles.declinedname}>{item.full_name}</Text>
              <Text style={styles.declinedDescription}>
                {item.age} yrs, {item.height} •{item.profession}
              </Text>
              <Text style={styles.declinedDescription}>{item.address}</Text>
              <Text style={styles.declinedDescription}>{item.religion}</Text>
            </View>
          </View>

          <Image
            style={styles.grayline}
            resizeMode={'stretch'}
            source={require('../../../assets/images/line.png')}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <Image
              style={{width: 12, height: 12, marginTop: 5, marginRight: 10}}
              resizeMode={'contain'}
              source={require('../../../assets/images/warning.png')}
            />
            <View>
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Medium,
                  color: Theme.colors.gray,
                }}>
                You passed this user.
              </Text>
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Medium,
                  color: Theme.colors.gray,
                }}>
                This member cannot be contacted.
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PremiumMatches', {
            item: item.user_uid,
          });
        }}
        style={styles.outerSentCont}>
        <Text style={styles.sentTopText}>
          All Requests (
          {tags === 'Liked User'
            ? like.length
            : tags === 'Who liked me'
            ? like.length
            : like.length}
          )
        </Text>
        <View style={styles.sentCont}>
          <View style={styles.contactInfo}>
            <Image
              style={{width: 80, height: 80, borderRadius: 100}}
              source={require('../../../assets/images/1.jpeg')}
            />
            <View style={{width: '75%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              <Text style={styles.description}>
                {item.age} yrs, {item.height} • {item.profession}
              </Text>
              <Text style={[styles.description, {marginTop: 0}]}>
                {item.religion} {item.address}
              </Text>
            </View>
          </View>
          <Image
            style={styles.line}
            resizeMode={'stretch'}
            source={require('../../../assets/images/blackLine.png')}
          />
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
            <View style={styles.socialIcon}>
              <Image
                source={require('../../../assets/images/weddingChat.png')}
                style={{width: 35, height: 35}}
              />
              <Text style={styles.socialName}>Wedding Mubarik Chat</Text>
            </View>
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
              <Text style={styles.socialName}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <HomeHeader navigation={navigation} />
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
            width: '90%',
            alignSelf: 'center',
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={
          tags === 'Liked Users'
            ? like
            : tags === 'Passed users'
            ? pass
            : tags === 'Who liked me'
            ? whoLike
            : accept
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
          (tags === 'Liked Users' && like.length === 0) ||
          (tags === 'Passed users' && pass.length === 0) ||
          (tags === 'Who liked me' && whoLike.length === 0) ||
          (tags === 'Accepted Requests' && accept.length === 0) ? (
            <View style={{marginTop: moderateScale(50), alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/noRequest.png')}
                style={{width: 200, height: 200}}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontFamily: Theme.fontFamily.Poppins_Medium,
                  marginTop: 10,
                }}>
                No Pending Requests
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontFamily: Theme.fontFamily.comics,
                  marginTop: 5,
                  textAlign: 'center',
                  marginBottom: 20,
                }}>
                Check out Profile to continue your {'\n'}Partner search.
              </Text>
              <CustomButton
                radius={50}
                tag={'View my Match'}
                width={width / 1.8}
                fontFamily={Theme.fontFamily.comics}
                fontSize={14}
              />
            </View>
          ) : (
            <View style={{marginTop: moderateScale(50), alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/checkIcon.png')}
                style={{width: 40, height: 40}}
              />
              <Text style={styles.avenalatext}>
                You have Viewed all
                {'\n'}
                Requests
              </Text>
            </View>
          )
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
  tagsCont: {
    borderRadius: 5,
    borderWidth: 1,
    height: 25,
    marginRight: 10,
    padding: 3,
    paddingHorizontal: 5,
    borderColor: '#CACACA',
  },
  OuterCardContainer: {
    width: (width / 100) * 95,
    height: (width / 100) * 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#FF5A61',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },

  CardContainer: {
    height: (width / 100) * 58,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    width: '100%',
  },
  declinedInfo: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
  },
  declinedname: {
    fontSize: 16,
    fontFamily: Theme.fontFamily.comics,
    color: Theme.colors.darkgray,
    marginBottom: 5,
  },
  grayline: {
    width: '90%',
    height: 2,
    marginTop: 20,
    alignSelf: 'center',
  },
  declinedDescription: {
    fontSize: 12,
    fontFamily: Theme.fontFamily.comics,
    color: Theme.colors.gray,
    marginTop: 2,
  },
  outerSentCont: {
    width: (width / 100) * 95,
    height: (width / 100) * 60,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  sentCont: {
    width: (width / 100) * 95,
    height: (width / 100) * 55,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 10,
    borderColor: Theme.colors.gray,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  contactInfo: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontFamily: Theme.fontFamily.comics,
    color: Theme.colors.darkgray,
    marginLeft: 12,
    width: 120,
  },
  sentInfo: {
    backgroundColor: '#717171',
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
    color: Theme.colors.gray,
    marginTop: 5,
    marginLeft: 20,
  },
  sentTopText: {
    fontFamily: Theme.fontFamily.Poppins_Medium,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  socialIConsCont: {
    width: '75%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  premiumButton: {
    color: 'white',
    backgroundColor: '#E7BB40',
    fontSize: 9,
    fontFamily: Theme.fontFamily.comics,
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 100,
    marginLeft: 6,
  },
  socialIcon: {alignItems: 'center', justifyContent: 'center'},
  socialName: {
    fontFamily: Theme.fontFamily.comics,
    color: 'black',
    fontSize: 8,
    marginTop: 3,
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
  line: {
    width: '90%',
    height: 2,
    alignSelf: 'center',
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
    alignSelf: 'flex-start',
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
    fontFamily: Theme.fontFamily.Poppins_Bold,
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
    fontFamily: Theme.fontFamily.Poppins_Bold,
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
    fontSize: moderateScale(12),
    marginTop: moderateScale(10),
    fontFamily: Theme.fontFamily.Poppins_Medium,
    textAlign: 'center',
  },
});

export default Inbox;
