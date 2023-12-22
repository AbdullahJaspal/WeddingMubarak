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
  Share,
  Alert,
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
import {getAge} from '../EditProfile/EditProfile';

const {width, height} = Dimensions.get('screen');

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const MyProfile = ({navigation}) => {
  const {userData, premiumSubs} = useSelector(state => state.auth);
  const [showActivity, setShowActivity] = useState(false);

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      checkPremiumSubs();
    }, []),
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Check out this profile',
        message: `Check out this profile https://weddingmubbarak.com/?user=${userData.uid}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
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
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={Styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Icon
              name="caretleft"
              type="ant-design"
              size={20}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text
              style={{
                fontSize: 24,
                fontFamily: Theme.fontFamily.Poppins_Regular,
              }}>
              My Profile
            </Text>
          </View>
          <Image
            style={{height: 30, width: '25%', marginBottom: 5}}
            source={require('../../../assets/images/homeLogo.png')}
            resizeMode={'contain'}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: moderateScale(30),
          }}>
          <View style={Styles.topCont}>
            <View style={Styles.photoCont}>
              <Image
                style={{width: '90%', height: '90%', borderRadius: 100}}
                source={{uri: userData.selfie}}
              />
            </View>
            <View>
              <Text style={Styles.name}>
                {userData.first_name} {userData.last_name}
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('EditProfile')}
                style={Styles.editButton}>
                <Text style={Styles.editText}>View/Edit</Text>
                <Icon name="pencil" type="font-awesome" size={12} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  Styles.editButton,
                  {backgroundColor: Theme.colors.primary},
                ]}
                onPress={() => navigation.navigate('Account')}>
                <Text
                  style={[
                    Styles.editText,
                    {
                      fontSize: moderateScale(14),
                      color: 'white',
                    },
                  ]}>
                  Setting
                </Text>
                <Icon
                  name="gear"
                  type="font-awesome"
                  size={12}
                  color={'white'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  Styles.editButton,
                  {backgroundColor: 'black', borderColor: 'black'},
                ]}
                onPress={onShare}>
                <Text
                  style={[
                    Styles.editText,
                    {
                      fontSize: moderateScale(14),
                      color: 'white',
                    },
                  ]}>
                  Share
                </Text>
                <Icon name="share" type="entypo" size={12} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={Styles.secondCont}>
            <Text style={Styles.settingText}>Settings</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Preferences')}
              style={Styles.bottomTab}>
              <View style={Styles.leftIcon}>
                <Icon
                  name="filter-list"
                  type="material-icons"
                  color={'white'}
                  size={16}
                />
              </View>
              <Text style={Styles.bottomTabName}> Preferences</Text>
              <Icon
                name="chevron-right"
                type="material-icons"
                color={Theme.colors.gray}
              />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.bottomTab}>
              <View style={Styles.leftIcon}>
                <Icon
                  name="security"
                  type="material-icons"
                  color={'white'}
                  size={16}
                />
              </View>
              <Text style={Styles.bottomTabName}> {'Privacy & Policies'}</Text>
              <Icon
                name="chevron-right"
                type="material-icons"
                color={Theme.colors.gray}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('FeedBack')}
              style={Styles.bottomTab}>
              <View style={Styles.leftIcon}>
                <Icon
                  name="commenting"
                  type="fontisto"
                  color={'white'}
                  size={16}
                />
              </View>
              <Text style={Styles.bottomTabName}>
                {' '}
                {'Feedback and Reviews'}
              </Text>
              <Icon
                name="chevron-right"
                type="material-icons"
                color={Theme.colors.gray}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('HelpInformation')}
              style={Styles.bottomTab}>
              <View style={Styles.leftIcon}>
                <Icon
                  name="help-circle"
                  type="feather"
                  color={'white'}
                  size={16}
                />
              </View>
              <Text style={Styles.bottomTabName}>
                {' '}
                {'Help and Information'}
              </Text>
              <Icon
                name="chevron-right"
                type="material-icons"
                color={Theme.colors.gray}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Account')}
              style={Styles.bottomTab}>
              <View style={Styles.leftIcon}>
                <Icon
                  name="gear"
                  type="font-awesome"
                  color={'white'}
                  size={16}
                />
              </View>
              <Text style={Styles.bottomTabName}> {'Accounts'}</Text>
              <Icon
                name="chevron-right"
                type="material-icons"
                color={Theme.colors.gray}
              />
            </TouchableOpacity>
          </View>
          <View style={Styles.secondCont}>
            <Text style={Styles.settingText}>Basic Info</Text>
            <View style={Styles.BasicCont}>
              <Text style={{width: '50%'}}>Posted by</Text>
              <Text style={{width: '40%'}}>Self</Text>
            </View>
            <View style={Styles.BasicCont}>
              <Text style={{width: '50%'}}>Age</Text>
              <Text style={{width: '40%'}}>
                {getAge(userData.date_of_birth)}
              </Text>
            </View>
            <View style={Styles.BasicCont}>
              <Text style={{width: '50%'}}>Martial Status</Text>
              <Text style={{width: '40%'}}>{userData.martial_status}</Text>
            </View>
            <View style={Styles.BasicCont}>
              <Text style={{width: '50%'}}>Height</Text>
              <Text style={{width: '40%'}}>{userData.height}</Text>
            </View>
            <View style={Styles.BasicCont}>
              <Text style={{width: '50%'}}>Health Information</Text>
              <Text style={{width: '40%'}}>{userData.diet}</Text>
            </View>
          </View>

          <View style={Styles.secondCont}>
            <Text style={Styles.settingText}>More About Yourself</Text>
            <Text style={{}}>{userData.about}</Text>
          </View>
          <Image
            style={Styles.bottomLogo}
            source={require('../../../assets/images/bottomLogo.png')}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginTop: -40,
              color: Theme.colors.gray,
              fontFamily: Theme.fontFamily.Poppins_Regular,
            }}>
            Follow Us on the Social Media
          </Text>
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.facebook.com/');
              }}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../../assets/images/facebook.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.instagram.com/');
              }}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../../assets/images/instagram.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.tiktok.com/');
              }}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../../assets/images/tiktok.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={{height: 80}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  imageBG: {
    width: width,
    height: height,
  },
  header: {
    height: moderateScale(45),
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  topCont: {
    width: Theme.size.width,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  photoCont: {
    height: (width / 100) * 35,
    width: (width / 100) * 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: moderateScale(100),
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: Theme.colors.border,
    overflow: 'hidden',
  },
  cameraIcon: {
    padding: 3,
    borderRadius: moderateScale(100),
    alignSelf: 'flex-end',
    zIndex: 21,
    width: moderateScale(30),
    height: moderateScale(30),
    position: 'absolute',
    bottom: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondCont: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    width: Theme.size.width,
    alignSelf: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 30,
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  editButton: {
    borderColor: Theme.colors.primary,

    borderWidth: moderateScale(1),
    alignSelf: 'center',
    borderRadius: moderateScale(100),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
    width: moderateScale(130),
    justifyContent: 'center',
    padding: 5,
  },
  editText: {
    fontSize: Theme.fontSize.regular,
    marginRight: moderateScale(6),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: 'black',
  },
  container: {flex: 1, backgroundColor: 'white', borderRadius: 10},
  child: {width: Theme.size.width, justifyContent: 'center', borderRadius: 10},
  text: {textAlign: 'center'},
  swiperCont: {
    width: Theme.size.width,
    alignSelf: 'center',
    height: moderateScale(130),
    borderRadius: moderateScale(10),
  },
  parentCont: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: Theme.size.width,
  },
  swiperChild: {
    width: Theme.size.width,
    backgroundColor: Theme.colors.swiper,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: 120,
    justifyContent: 'center',
  },
  premium: {
    fontSize: Theme.fontSize.title,
    // fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  premiumDes: {
    fontSize: Theme.fontSize.title,
    marginTop: 5,
    width: '80%',
    textAlign: 'center',
    // fontWeight: '100',
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  premiumButton: {
    width: Theme.size.width,
    alignSelf: 'center',
    height: moderateScale(50),
    backgroundColor: Theme.colors.orange,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  settingText: {
    fontSize: moderateScale(24),
    // fontWeight: 'bold',
    color: Theme.colors.primary,
    fontFamily: Theme.fontFamily.Poppins_Medium,
    marginBottom: 10,
  },
  BasicCont: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  bottomTab: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    borderColor: Theme.colors.gray,
  },
  leftIcon: {
    backgroundColor: Theme.colors.gray,
    borderRadius: 100,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabName: {
    width: '70%',
    color: 'black',
    fontSize: 16,
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  bottomLogo: {
    width: width / 1.7,
    height: width / 2,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default MyProfile;
