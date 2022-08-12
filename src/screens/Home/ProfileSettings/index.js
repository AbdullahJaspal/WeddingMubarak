import React from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from '@rneui/base';
import {moderateScale} from '../../../Theme/Dimensions';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Theme from '../../../Theme/Theme';
import {Header} from '../../../assets/Components/Header';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('screen');

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const ProfileSettings = ({navigation}) => {
  const {userData} = useSelector(state => state.auth);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        style={Styles.imageBG}
        source={require('../../../assets/images/bgImage.jpeg')}>
        <Header leftOPacity={0} title="Profile Settings" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: moderateScale(60),
          }}>
          <View style={Styles.topCont}>
            <View style={Styles.photoCont}>
              <Image
                style={{width: '90%', height: '90%', borderRadius: 100}}
                source={{
                  uri: userData.selfie,
                }}
              />
            </View>
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
                {backgroundColor: Theme.colors.orange},
              ]}>
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
              <Icon name="gear" type="font-awesome" size={12} color={'white'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Theme.size.width,
              alignSelf: 'center',
              marginTop: moderateScale(10),
            }}>
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              index={2}
              data={colors}
              showPagination
              paginationDefaultColor={Theme.colors.swiper}
              paginationActiveColor={Theme.colors.orange}
              style={{height: 180}}
              paginationStyleItem={{width: 10, height: 10}}
              renderItem={({item}) => (
                <View style={Styles.parentCont}>
                  <View style={Styles.swiperChild}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../../../assets/images/crown.png')}
                      />
                      <Text style={Styles.premium}>Premium</Text>
                    </View>
                    <Text style={Styles.premiumDes}>
                      Unlock more features with the Premium Version
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>

          <View style={Styles.premiumButton}>
            <Icon name="star" color="white" />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: Theme.fontFamily.Poppins_Regular,
              }}>
              Upgrade to Premium
            </Text>
            <Icon name="star" color="white" />
          </View>

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
            <Text style={Styles.bottomTabName}> {'Feedback and Reviews'}</Text>
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
            <Text style={Styles.bottomTabName}> {'Help and Information'}</Text>
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
              <Icon name="gear" type="font-awesome" color={'white'} size={16} />
            </View>
            <Text style={Styles.bottomTabName}> {'Accounts'}</Text>
            <Icon
              name="chevron-right"
              type="material-icons"
              color={Theme.colors.gray}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 40,
              color: Theme.colors.gray,
              fontFamily: Theme.fontFamily.Poppins_Regular,
            }}>
            Follow Us on the Social Media
          </Text>
          <View
            style={{
              width: '40%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.facebook.com/');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../assets/images/facebook.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.instagram.com/');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../assets/images/instagram.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.tiktok.com/');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../assets/images/tiktok.png')}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={Styles.bottomLogo}
            source={require('../../../assets/images/logoo.png')}
          />
          <View style={{height: 80}}></View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  imageBG: {
    width: width,
    height: height,
  },
  topCont: {
    width: Theme.size.width,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: moderateScale(40),
    borderRadius: 10,
  },
  photoCont: {
    height: (width / 100) * 35,
    width: (width / 100) * 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: moderateScale(100),
    alignSelf: 'center',
    marginTop: moderateScale(-70),
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
  name: {
    fontSize: Theme.fontSize.title,
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  editButton: {
    borderColor: Theme.colors.orange,

    borderWidth: moderateScale(1),
    alignSelf: 'center',
    borderRadius: moderateScale(100),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
    width: moderateScale(130),
    justifyContent: 'center',
    padding: 1,
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
    color: Theme.colors.orange,
    width: Theme.size.width,
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  bottomTab: {
    width: Theme.size.width,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginTop: 12,
    paddingBottom: moderateScale(5),
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
    fontSize: 14,
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  bottomLogo: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default ProfileSettings;
