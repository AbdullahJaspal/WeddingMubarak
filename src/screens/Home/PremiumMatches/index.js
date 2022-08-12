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
  checkLikeSubscribtion,
  checkPremiumSubscribtion,
  checkProfileLike,
  checkProfilePass,
  likeProfile,
  passProfile,
  userGetProfile,
} from '../../../redux/actions/auth';
import {getAge} from '../EditProfile/EditProfile';

const {width} = Dimensions.get('window');

const PremiumMatches = ({navigation, route}) => {
  const {item} = route.params;

  console.log(item);
  const dispatch = useDispatch();
  const [showActivity, setShowActivity] = useState(false);
  const [data, setData] = useState({});
  const [passLikeCheck, setPassLikeCheck] = useState('');
  const [premium, setPremium] = useState(false);

  const {userData, premiumSubs, likeSubs} = useSelector(state => state.auth);

  useFocusEffect(
    React.useCallback(() => {
      handleGetDetail();
      checkProfiles();
      // checkPremiumSubs();
    }, []),
  );

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
    if (likeSubs) {
      setShowActivity(true);
      var formdata = new FormData();
      formdata.append('__api_key__', 'secret key');
      formdata.append('user_uid', userData.uid);
      formdata.append('passing_uid', data.uid);
      console.log(formdata);
      dispatch(passProfile(formdata, passSuccess, passError));
    } else {
      navigation.navigate('LikeSubscribtion');
    }
  };

  const passSuccess = res => {
    setShowActivity(false);
    setPassLikeCheck('passed');
  };

  const passError = err => {
    setShowActivity(false);
  };

  const likeSuccess = res => {
    setShowActivity(false);
    setPassLikeCheck('liked');
  };

  const likeerrr = err => {
    setShowActivity(false);
  };

  const checkProfiles = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    formdata.append('liking_uid', item);
    formdata.append('passing_uid', item);
    dispatch(checkProfileLike(formdata, likecheckSuccess, checkError));
  };

  const likecheckSuccess = res => {
    setShowActivity(false);
    setPassLikeCheck(res?.user_liked ? 'liked' : '');
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

  const handleGetDetail = () => {
    setShowActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', item);
    dispatch(userGetProfile(formdata, onSuccessProfile, onErrorProfile));
  };

  const onSuccessProfile = res => {
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeHeader
        showCrown={true}
        Heading="Premium Matches"
        showLeftIcon
        leftPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={Styles.CardContainer}>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: data.selfie,
            }}
            style={{width: '100%', height: '100%'}}>
            <View style={Styles.backBlurr} />
            <View style={Styles.cardPremiumContainer}>
              <Image
                source={require('../../../assets/images/crown.png')}
                resizeMode="contain"
                style={Styles.cardPremiumImage}
              />
              <Text style={Styles.premiumText}>Premium</Text>
            </View>
            <View style={Styles.cardNameContainer}>
              <Text style={Styles.cardName}>
                {data.first_name} {data.last_name},
                <Text
                  style={{
                    fontWeight: 'normal',
                  }}>
                  {' '}
                  {getAge(data.date_of_birth)} Yrs
                </Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Flag code="PK" size={24} />
                <Text style={Styles.cardAddress}>
                  {data.city}, {data.state},{data.country}
                </Text>
              </View>
              <View style={Styles.cardCharacteristic}>
                <MaterailCommunityIcons
                  name="human-male-height"
                  color="white"
                  size={moderateScale(16)}
                />
                <Text style={Styles.charactericText}>
                  Height, {data.height}
                </Text>
              </View>
              <View style={Styles.cardCharacteristic}>
                <Entypo
                  name="suitcase"
                  color="white"
                  size={moderateScale(16)}
                />
                <Text style={Styles.charactericText}>{data.work_as}</Text>
              </View>

              <View style={Styles.cardCharacteristic}>
                <Text style={Styles.charactericText}>{data.religion}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        {passLikeCheck === '' ? (
          <View style={Styles.likeProfile}>
            <Text style={Styles.likeText}>Like this profile</Text>
            <Icon
              style={Styles.checkIcon}
              name="check"
              type="entypo"
              color={'white'}
              size={moderateScale(18)}
              onPress={() => {
                likeUser();
              }}
            />
            <Icon
              style={Styles.crossIcon}
              name="cross"
              type="entypo"
              color={'red'}
              size={moderateScale(32)}
              onPress={() => {
                passUser();
              }}
            />
          </View>
        ) : passLikeCheck === 'passed' ? (
          <View style={Styles.likeProfile}>
            <Icon
              style={Styles.crossIcon}
              name="cross"
              type="entypo"
              color={'red'}
              size={moderateScale(32)}
              onPress={() => {}}
            />
            <Text style={Styles.likeText}> {'  '}You Passed this Profile</Text>
          </View>
        ) : (
          <View style={Styles.likeProfile}>
            <View style={Styles.likeProfile}>
              <Icon
                style={Styles.checkIcon}
                name="check"
                type="entypo"
                color={'white'}
                size={moderateScale(18)}
                onPress={() => {}}
              />
              <Text style={Styles.likeText}> {'  '}You Liked this Profile</Text>
            </View>
          </View>
        )}

        <FlatList
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
        />

        <View style={Styles.aboutCont}>
          <Text style={Styles.title}>
            About {data.first_name} {data.last_name}
          </Text>
          <Text style={Styles.about}>{data.bio}</Text>
        </View>

        <View style={Styles.contactCont}>
          <View style={Styles.contactTop}>
            <Text style={Styles.title}>Contact Detail</Text>
            {!premiumSubs && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MembershipScreen');
                }}>
                <Image
                  style={Styles.crown}
                  source={require('../../../assets/images/crown.png')}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={Styles.contactTab}
            onPress={() => {
              Linking.openURL(`tel:${+123456789}`);
            }}>
            <View style={Styles.contactIconCont}>
              <Icon name="phone" type="entypo" color={'white'} size={22} />
            </View>
            <View style={Styles.numCont}>
              <Text style={Styles.phoneTitle}>Phone</Text>
              <Text style={Styles.num}>
                {premiumSubs
                  ? data.phone
                  : data.phone?.[0] + data.phone?.[1] + data.phone?.[2]}
                {premiumSubs ? '' : '******'}
                {premiumSubs
                  ? ''
                  : data.phone?.[data.phone.length - 2] +
                    data.phone?.[data.phone.length - 1]}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.contactTab}
            onPress={() => {
              Linking.openURL('mailto:support@example.com');
            }}>
            <View style={Styles.contactIconCont}>
              <Icon name="mail" type="entypo" color={'white'} size={22} />
            </View>
            <View style={Styles.numCont}>
              <Text style={Styles.phoneTitle}>Email</Text>
              <Text style={Styles.num}>
                {premiumSubs ? data.email : '*******@'}
                {premiumSubs ? '' : data?.email?.split('@')?.[1]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.basicDetailCont}>
          <View style={Styles.contactTop}>
            <Text style={Styles.title}>Basic Detail</Text>
            <Text
              style={[
                Styles.title,
                {fontWeight: '300', fontSize: moderateScale(16)},
              ]}>
              Profile ID SH8726387
            </Text>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Basic Info</Text>
              <Text style={Styles.num}>Born on {data.date_of_birth}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Martial Status</Text>
              <Text style={Styles.num}>{data.martial_status}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Lives in</Text>
              <Text style={Styles.num}>
                {data.city}, {data.state}, {data.country}
              </Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Community</Text>
              <Text style={Styles.num}>{data.community}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Diet Preference</Text>
              <Text style={Styles.num}>{data.diet}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Height and Age</Text>
              <Text style={Styles.num}>
                {data.height} ({getAge(data.date_of_birth)} yrs)
              </Text>
            </View>
          </View>
        </View>

        <View style={Styles.basicDetailCont}>
          <View style={Styles.contactTop}>
            <Text style={Styles.title}>{'Carrer & Education'}</Text>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: '#F1592A'}]}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Profession</Text>
              <Text style={Styles.num}>{data.work_as}</Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: '#F1592A'}]}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Company Name</Text>
              <Text style={Styles.num}>{data.work_with}</Text>
            </View>
          </View>
          {/* <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: '#F1592A'}]}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Annual Income</Text>
              <Text style={[Styles.phoneTitle, {fontWeight: '300'}]}>
                Earn upto 40k annually
              </Text>
            </View>
          </View> */}
          <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: '#F1592A'}]}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Higest Qualification</Text>
              <Text style={Styles.num}>{data.qualification}</Text>
            </View>
          </View>
          {/* <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: '#F1592A'}]}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Educational Field</Text>
              <Text style={[Styles.phoneTitle, {fontWeight: '300'}]}>
                Finance/Commerce
              </Text>
            </View>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={[Styles.dot, {backgroundColor: '#F1592A'}]}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>College Name</Text>
              <Text style={[Styles.phoneTitle, {fontWeight: '300'}]}>
                Hill Crest College Abbottabad
              </Text>
            </View>
          </View> */}
        </View>

        <View style={Styles.basicDetailCont}>
          <View style={Styles.contactTop}>
            <Text style={Styles.title}>Marriage</Text>
          </View>
          <View style={Styles.basicInfoCont}>
            <View style={Styles.dot}></View>
            <View style={{marginLeft: 10}}>
              <Text style={Styles.phoneTitle}>Willing to Relocate?</Text>
              <Text style={Styles.num}>
                {data.relocate === 'null'
                  ? `didn't answered to that yet`
                  : data.relocate}
              </Text>
            </View>
          </View>
        </View>

        <Text style={Styles.bottomText}>Upgrade your Premium Plan!</Text>
        <CustomButton
          tag="View Plans"
          onPress={() => {
            navigation.navigate('MembershipScreen');
          }}
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
    width: (width / 100) * 95,
    height: (width / 100) * 95,
    alignSelf: 'center',
    marginTop: moderateScale(10),
    borderRadius: moderateScale(15),
    overflow: 'hidden',
    elevation: moderateScale(2),
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
    // fontWeight: '600',
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

  likeProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: moderateScale(10),
  },
  likeText: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: Theme.fontFamily.Poppins_Bold,
    color: 'black',
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
    color: Theme.colors.title,
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  about: {
    fontSize: Theme.fontSize.regular,
    marginTop: 2,
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: 'black',
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
    backgroundColor: '#ED157A',
    padding: 4,
    borderRadius: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numCont: {
    marginLeft: 10,
  },
  phoneTitle: {
    fontSize: Theme.fontSize.regular,
    color: Theme.colors.title,
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  num: {
    color: Theme.colors.title,
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(14),
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
    backgroundColor: Theme.colors.darkgreen,
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(100),
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
});

export default PremiumMatches;
