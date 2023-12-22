import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  Share,
} from 'react-native';
import Theme from '../../../Theme/Theme';
import {Icon} from '@rneui/base';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import {moderateScale} from '../../../Theme/Dimensions';
import Flag from 'react-native-flags';
import MaterailCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {CustomButton} from '../../../assets/Components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {CustomActivity} from '../../../assets/Components/CustomActivity';
import {
  checkHide,
  checkLikeSubscribtion,
  checkPremiumSubscribtion,
  checkProfileLike,
  checkProfilePass,
  likeProfile,
  passProfile,
  unHideProfile,
  userGetProfile,
} from '../../../redux/actions/auth';
import {getAge} from '../EditProfile/EditProfile';
import ShowSnackBar from '../../../assets/Components/ShowSnackBar';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const PremiumMatches = ({navigation, route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const [showActivity, setShowActivity] = useState(false);
  const [data, setData] = useState([]);
  const [passLikeCheck, setPassLikeCheck] = useState('');
  const [unhide, setUnHide] = useState(true);
  const [premium, setPremium] = useState(false);
  console.log(item);
  const {userData, premiumSubs, likeSubs} = useSelector(state => state.auth);

  useFocusEffect(
    React.useCallback(() => {
      handleGetDetail();
      // checkProfiles();
      // checkPremiumSubs();
    }, []),
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Check out this profile',
        message: `Check out this profile https://weddingmubbarak.com/?user=${item}`,
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

  const likeUser = () => {
    if (likeSubs) {
      setShowActivity(true);
      var formdata = new FormData();
      formdata.append('__api_key__', 'secret key');
      formdata.append('user_uid', userData.uid);
      formdata.append('liking_uid', item);
      console.log(formdata);
      dispatch(likeProfile(formdata, likeSuccess, likeerrr));
    } else {
      navigation.navigate('LikeSubscribtion');
    }
  };

  const passUser = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    formdata.append('passing_uid', data.uid);
    console.log(formdata);
    dispatch(passProfile(formdata, passSuccess, passError));
  };

  const passSuccess = res => {
    setShowActivity(false);
    setPassLikeCheck('passed');
    ShowSnackBar('User passed succesfully', 'green');
  };

  const passError = err => {
    setShowActivity(false);
  };

  const likeSuccess = res => {
    setShowActivity(false);
    setPassLikeCheck('liked');
    ShowSnackBar('User liked succesfully', 'green');
  };

  const likeerrr = err => {
    setShowActivity(false);
  };

  const checkProfiles = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    formdata.append('liking_uid', item);
    formdata.append('other_user_uid', item);
    formdata.append('passing_uid', item);
    dispatch(checkProfileLike(formdata, likecheckSuccess, checkError));
    dispatch(checkHide(formdata, hideCheckSuccess, hideCheckError));
  };

  const likecheckSuccess = res => {
    console.log(res);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    formdata.append('liking_uid', item);
    formdata.append('passing_uid', item);
    setShowActivity(false);
    res.user_liked
      ? setPassLikeCheck('liked')
      : dispatch(checkProfilePass(formdata, passcheckSuccess, checkError));
  };

  const passcheckSuccess = res => {
    setShowActivity(false);
    setPassLikeCheck(res.user_passed ? 'passed' : '');
    console.log(res.user_liked);
    console.log(passLikeCheck);
  };

  const checkError = err => {
    setShowActivity(false);
    dispatch(checkProfilePass(formdata, passcheckSuccess, checkError));
  };

  const hideCheckSuccess = res => {
    console.log('....................es');
    console.log(res);
    setShowActivity(false);
    setUnHide(res.hide);
  };

  console.log(unhide);

  const hideCheckError = err => {
    setShowActivity(false);
  };

  const handleGetDetail = () => {
    setShowActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', item);
    console.log(formdata);
    dispatch(userGetProfile(formdata, onSuccessProfile, onErrorProfile));
  };

  const onSuccessProfile = res => {
    console.log('res');
    console.log(res);
    setData(res);
    setShowActivity(false);
  };

  const onErrorProfile = err => {
    setShowActivity(false);
  };

  const imagesRenderItem = ({item, index}) => {
    return (
      <View style={Styles.picCont}>
        <Image
          style={Styles.pic}
          source={{
            uri: item,
          }}
        />
      </View>
    );
  };

  const unhideUser = () => {
    setShowActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    formdata.append('other_user_uid', item);
    dispatch(unHideProfile(formdata, unHideSuccess, unHideError));
  };
  const unHideSuccess = res => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    formdata.append('other_user_uid', item);
    setShowActivity(false);
    dispatch(checkHide(formdata, hideCheckSuccess, hideCheckError));
    console.log('unHide Response');
    console.log(res.data);
    res.data.count_remaining === 0
      ? ShowSnackBar(
          `You have ${res.data.count_remaining} counts remaining.`,
          'red',
        )
      : ShowSnackBar(
          `You have ${res.data.count_remaining} counts remaining.`,
          'green',
        );
  };

  const unHideError = err => {
    setShowActivity(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={Styles.CardContainer}>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: data.selfie,
            }}
            // source={require('../../../assets/images/girl.jpeg')}
            style={{width: '100%', height: '100%'}}>
            <View style={Styles.backBlurr} />
            <View style={Styles.topArrow}>
              <Icon
                name="arrowleft"
                type="ant-design"
                size={30}
                color="white"
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <TouchableOpacity style={Styles.dotIconCont} onPress={onShare}>
                <Icon name="share" type="entypo" color={'white'} size={20} />
              </TouchableOpacity>
            </View>
            <View style={Styles.cardNameContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/checked.png')}
                  style={{width: 30, height: 30}}
                />
                <Text style={Styles.name}>
                  {data.first_name} {data.last_name}
                </Text>
                <View style={Styles.sentInfo}>
                  <Image
                    style={{width: 8, height: 8}}
                    resizeMode="contain"
                    source={require('../../../assets/images/online.png')}
                  />
                  <Text style={Styles.infotext}>Online</Text>
                </View>
                <View style={Styles.sentInfo}>
                  <Image
                    style={{width: 12, height: 12}}
                    resizeMode="contain"
                    source={require('../../../assets/images/couple.png')}
                  />
                  <Text style={Styles.infotext}>You and her</Text>
                </View>
              </View>
              <Text style={Styles.description}>
                {getAge(data.date_of_birth)} yrs, {data.height} •{' '}
                {data.profession}
              </Text>
              <Text style={[Styles.description, {marginTop: 0}]}>
                {data.language}, {data.religion} • {data.country}
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* <FlatList
          data={data.images}
          renderItem={imagesRenderItem}
          numColumns={2}
          contentContainerStyle={{
            paddingLeft: '2.5%',
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: moderateScale(10),
              }}
            />
          )}
        /> */}

        <View style={Styles.aboutCont}>
          <Text style={Styles.title}>
            About {data.first_name} {data.last_name}
          </Text>
          <Text style={Styles.about}>{data.bio}</Text>
        </View>

        <View style={Styles.basicDetailCont}>
          <Text style={Styles.title}>Basic Detail</Text>
          <View
            style={{
              backgroundColor: Theme.colors.primary,
              alignSelf: 'flex-start',
              padding: 6,
              borderRadius: 5,
              marginTop: 5,
            }}>
            <Text
              numberOfLines={1}
              style={[
                Styles.title,
                {
                  fontWeight: '300',
                  fontSize: moderateScale(10),
                  color: 'white',
                  width: 150,
                },
              ]}>
              Profile ID : {data.uid}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={Styles.optionsCont}>
              <Text
                style={{
                  fontWeight: '300',
                  fontSize: moderateScale(10),
                  fontFamily: Theme.fontFamily.comics,
                }}>
                Created by Self
              </Text>
            </View>
            <View style={Styles.optionsCont}>
              <Text
                style={{
                  fontWeight: '300',
                  fontSize: moderateScale(10),
                  fontFamily: Theme.fontFamily.comics,
                }}>
                {getAge(data.age)} Years old
              </Text>
            </View>
            <View style={Styles.optionsCont}>
              <Text
                style={{
                  fontWeight: '300',
                  fontSize: moderateScale(10),
                  fontFamily: Theme.fontFamily.comics,
                }}>
                Height - {data.height}
              </Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../assets/images/birthday-cake.png')}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Date of birth</Text>
              <Text style={Styles.num}>Born on {data.date_of_birth}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../assets/images/wedding-rings.png')}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Martial Status</Text>
              <Text style={Styles.num}>{data.martial_status}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../assets/images/location-pin.png')}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Lives in</Text>
              <Text style={Styles.num}>
                {data.city}, {data.state}, {data.country}
              </Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../assets/images/group-users.png')}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Community</Text>
              <Text style={Styles.num}>{data.community}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../assets/images/healthy-food.png')}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Diet Preference</Text>
              <Text style={Styles.num}>{data.diet}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../assets/images/height1.png')}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Height and Age</Text>
              <Text style={Styles.num}>
                {data.height} ({getAge(data.date_of_birth)} yrs)
              </Text>
            </View>
          </View>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={Theme.colors.blueGradient}
          // colors={['#FC9200', '#DA5B06']}
          style={{
            width: Theme.size.width,
            borderRadius: 10,
            paddingVertical: 5,
            alignSelf: 'center',
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: Theme.fontFamily.comics,
              alignSelf: 'center',
              marginVertical: 5,
              color: 'white',
              fontSize: 14,
            }}>
            To unlock her birth date and Contact details
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Theme.colors.yellow,
              alignSelf: 'center',
              padding: 10,
              borderRadius: 100,
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: Theme.fontFamily.comics,
                alignSelf: 'center',
                color: 'white',
                fontSize: 12,
              }}>
              Let's Go Premium Now
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: Theme.fontFamily.comics,
              alignSelf: 'center',
              marginVertical: 5,
              color: 'white',
              fontSize: 12,
            }}>
            To unlock her birth date and Contact details
          </Text>
        </LinearGradient>
        <View style={Styles.contactCont}>
          <View style={Styles.contactTop}>
            <Text style={Styles.title}>Contact Detail</Text>
            {!premiumSubs ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MembershipScreen');
                }}>
                <Image
                  style={Styles.crown}
                  source={require('../../../assets/images/crown.png')}
                />
              </TouchableOpacity>
            ) : unhide ? (
              <Icon
                name="eye"
                type="entypo"
                onPress={() => {
                  unhideUser();
                }}
              />
            ) : null}
          </View>
          <TouchableOpacity
            style={Styles.contactTab}
            onPress={() => {
              premiumSubs && !unhide
                ? Linking.openURL(`tel:${data.phone}`)
                : ShowSnackBar(`You have to unhide the user.`, 'red');
            }}>
            <View style={Styles.contactIconCont}>
              <Icon name="phone" type="entypo" color={'white'} size={22} />
            </View>
            <View style={Styles.numCont}>
              <Text style={Styles.phoneTitle}>Phone</Text>
              <Text style={Styles.num}>
                {premiumSubs && !unhide
                  ? data.phone
                  : data.phone?.[0] + data.phone?.[1] + data.phone?.[2]}
                {premiumSubs && !unhide ? '' : '******'}
                {premiumSubs && !unhide
                  ? ''
                  : data.phone?.[data.phone.length - 2] +
                    data.phone?.[data.phone.length - 1]}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.contactTab}
            onPress={() => {
              premiumSubs && !unhide
                ? Linking.openURL('mailto:support@example.com')
                : ShowSnackBar(`You have to unhide the user.`, 'red');
            }}>
            <View style={Styles.contactIconCont}>
              <Icon name="mail" type="entypo" color={'white'} size={22} />
            </View>
            <View style={Styles.numCont}>
              <Text style={Styles.phoneTitle}>Email</Text>
              <Text style={Styles.num}>
                {premiumSubs && !unhide ? data.email : '*******@'}
                {premiumSubs && !unhide ? '' : data?.email?.split('@')?.[1]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.basicDetailCont}>
          <View style={Styles.contactTop}>
            <Text style={Styles.title}>{'Carrer & Education'}</Text>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: Theme.colors.yellow}]}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../assets/images/profession.png')}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Profession</Text>
              <Text style={Styles.num}>{data.work_as}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: Theme.colors.yellow}]}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../assets/images/business-and-trade.png')}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Company Name</Text>
              <Text style={Styles.num}>{data.work_with}</Text>
            </View>
          </View>
          {/* <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: Theme.colors.yellow}]}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Annual Income</Text>
              <Text style={[Styles.phoneTitle, {fontWeight: '300'}]}>
                Earn upto 40k annually
              </Text>
            </View>
          </View> */}
          <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: Theme.colors.yellow}]}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../assets/images/guarantee.png')}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Higest Qualification</Text>
              <Text style={Styles.num}>{data.qualification}</Text>
            </View>
          </View>
          {/* <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: Theme.colors.yellow}]}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Educational Field</Text>
              <Text style={[Styles.phoneTitle, {fontWeight: '300'}]}>
                Finance/Commerce
              </Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: Theme.colors.yellow}]}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>College Name</Text>
              <Text style={[Styles.phoneTitle, {fontWeight: '300'}]}>
                Hill Crest College Abbottabad
              </Text>
            </View>
          </View> */}
        </View>

        <View
          style={[
            Styles.basicDetailCont,
            {
              padding: 0,
            },
          ]}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={Theme.colors.orangeGradient}
            style={{
              width: '100%',
              borderRadius: 10,
              alignSelf: 'center',
              alignItems: 'center',
              paddingVertical: 15,
            }}>
            <Text style={{fontFamily: Theme.fontFamily.comics, color: 'white'}}>
              Your Matched Preferences
            </Text>
          </LinearGradient>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Image
              style={{width: 70, height: 70, borderRadius: 100}}
              source={{uri: userData.selfie}}
            />
            <View style={Styles.heart}>
              <Image
                resizeMode="contain"
                style={{
                  width: 10,
                  height: 10,
                }}
                source={require('../../../assets/images/heartt.png')}
              />
            </View>
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
              }}
              source={{uri: data.selfie}}
            />
          </View>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: Theme.fontFamily.comics,
              color: 'black',
            }}>
            You and her
          </Text>
          <View style={{marginLeft: 10, marginTop: 6}}>
            <Text style={Styles.phoneTitle}>Age</Text>
            <Text style={Styles.num}>{getAge(data.date_of_birth)}</Text>
          </View>
          <View style={{marginLeft: 10, marginTop: 6}}>
            <Text style={Styles.phoneTitle}>Height</Text>
            <Text style={Styles.num}>{data.height}</Text>
          </View>
          <View style={{marginLeft: 10, marginTop: 6}}>
            <Text style={Styles.phoneTitle}>Martial Status</Text>
            <Text style={Styles.num}>{data.martial_status}</Text>
          </View>
          <View style={{marginLeft: 10, marginTop: 6}}>
            <Text style={Styles.phoneTitle}>Religion / Community</Text>
            <Text style={Styles.num}>{data.religion}</Text>
          </View>
          <View style={{marginLeft: 10, marginTop: 6, marginBottom: 20}}>
            <Text style={Styles.phoneTitle}>Country living in</Text>
            <Text style={Styles.num}>{data.country}</Text>
          </View>
          {/* <View style={{marginLeft: 10, marginTop: 6, }}>
            <Text style={Styles.phoneTitle}>Country living in</Text>
            <Text style={Styles.num}>Upto PKR 30 Lakhs</Text>
          </View> */}
        </View>
        <View
          style={[
            Styles.basicDetailCont,
            {
              padding: 0,
              paddingBottom: 20,
              marginBottom: 20,
            },
          ]}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={Theme.colors.orangeGradient}
            style={{
              width: '100%',
              borderRadius: 10,
              alignSelf: 'center',
              alignItems: 'center',
              paddingVertical: 15,
              marginBottom: 10,
            }}>
            <Text style={{fontFamily: Theme.fontFamily.comics, color: 'white'}}>
              Common between the both of you
            </Text>
          </LinearGradient>
          <View style={Styles.basicInfoCont}>
            <LinearGradient
              style={[Styles.dot1, {}]}
              colors={Theme.colors.orangeGradient}
            />
            <View style={{marginLeft: 10}}>
              <Text style={Styles.num}>She is a vegetarian as well</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <LinearGradient
              style={[Styles.dot1, {}]}
              colors={Theme.colors.orangeGradient}
            />
            <View style={{marginLeft: 10}}>
              <Text style={Styles.num}>
                She is a from Urdu community as well
              </Text>
            </View>
          </View>
        </View>
        <CustomButton
          tag="Connect Now"
          width={'40%'}
          fontFamily={Theme.fontFamily.comics}
          textSize={12}
          onPress={() => {
            navigation.navigate('MembershipScreen');
          }}
          padding={20}
          radius={100}
          color={Theme.colors.blueGradient}
        />
        <View
          style={{
            height: moderateScale(100),
          }}
        />
      </ScrollView>
      <CustomActivity show={showActivity} />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  header: {
    width: width,
  },
  CardContainer: {
    width: width,
    height: (width / 100) * 75,
    alignSelf: 'center',
    overflow: 'hidden',
    elevation: moderateScale(2),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  topArrow: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  name: {
    fontSize: 22,
    fontFamily: Theme.fontFamily.comics,
    color: 'white',
    marginLeft: 12,
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
  optionsCont: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    padding: 6,
    borderRadius: 5,
    borderWidth: 0.5,
    marginTop: 6,
    marginRight: 10,
    borderColor: Theme.colors.gray,
  },

  likeProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: moderateScale(10),
  },
  heart: {
    backgroundColor: 'white',
    borderRadius: 100,
    position: 'absolute',
    width: 16,
    height: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    backgroundColor: Theme.colors.green,
    marginLeft: 8,
    padding: moderateScale(3),
    borderRadius: moderateScale(100),
  },
  crossIcon: {},
  picCont: {
    width: ((width / 100) * 95 - moderateScale(10)) / 2,
    height: moderateScale(150),
    borderRadius: moderateScale(10),
    marginRight: moderateScale(5),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    elevation: moderateScale(2),
  },
  pic: {width: '100%', height: '100%'},
  aboutCont: {
    width: Theme.size.width,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Theme.colors.border,
    padding: moderateScale(10),
    marginTop: moderateScale(10),
  },
  title: {
    fontSize: Theme.fontSize.title,
    color: 'black',

    fontFamily: Theme.fontFamily.comics,
  },
  about: {
    fontSize: Theme.fontSize.regular,
    marginTop: 2,
    fontFamily: Theme.fontFamily.comics,
    color: Theme.colors.gray,
  },

  contactCont: {
    width: Theme.size.width,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Theme.colors.border,
    padding: moderateScale(10),
    marginTop: moderateScale(10),
  },
  contactTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  crown: {
    width: moderateScale(35),
    height: moderateScale(35),
    marginLeft: moderateScale(10),
  },
  contactTab: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  contactIconCont: {
    backgroundColor: Theme.colors.darkgreen,
    padding: 4,
    borderRadius: 5,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numCont: {
    marginLeft: 10,
  },
  phoneTitle: {
    fontSize: Theme.fontSize.regular,
    color: Theme.colors.title,
    fontFamily: Theme.fontFamily.comics,
  },
  num: {
    color: 'black',
    fontFamily: Theme.fontFamily.comics,
    fontSize: moderateScale(13),
  },
  basicDetailCont: {
    width: Theme.size.width,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Theme.colors.border,
    padding: moderateScale(10),
    marginTop: moderateScale(10),
  },
  basicInfoCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    backgroundColor: Theme.colors.primary,
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot1: {
    backgroundColor: Theme.colors.primary,
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  bottomText: {
    fontSize: Theme.fontSize.title,
    // fontWeight: 'bold',
    color: 'black',
    width: width / 1.1,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 30,
    fontFamily: Theme.fontFamily.Poppins_Bold,
    marginBottom: moderateScale(20),
  },
  dotIconCont: {
    backgroundColor: 'rgba(39,39,39,0.85)',
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 5,
    borderRadius: 50,
  },
});

export default PremiumMatches;
