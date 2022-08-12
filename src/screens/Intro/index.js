import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {moderateScale} from '../../Theme/Dimensions';
import Theme from '../../Theme/Theme';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import {userLogin} from '../../redux/actions/auth';

const {width, height} = Dimensions.get('window');

const Intro = ({navigation}) => {
  const dispatch = useDispatch();
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '900226588142-i6fndb394e8258sojg9tafm7jouf1fc9.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const handleGoogleSignIn = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log('_____userinfo', userInfo);
    // } catch (error) {
    //   console.log('error');
    //   console.log(error);
    // }
    // Get the users ID token
    const result = await GoogleSignin.signIn();

    // console.log(result);

    handleLogin(result.user.email);

    // alert(`name : ${result.user.name}\nemail: ${result.user.email}`);

    // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);

    // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log(result);
      // If the user cancels the login process, the result will have a
      // isCancelled boolean set to true. We can use that to break out of this function.
      if (result.isCancelled) {
        console.log('User cancelled the login process');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        console.log(data.accessToken.toString());
        getInfoFromToken(data.accessToken.toString());
      }
      // Get the Access Token

      // If we don’t get the access token, then something has gone wrong.
      if (!data) {
        console.log('Something went wrong obtaining access token');
      }
      // Use the Access Token to create a facebook credential.
      // const facebookCredential = auth.FacebookAuthProvider.credential(
      // data.accessToken,
      // );
      // console.log(facebookCredential);
      // Use the facebook credential to sign in to the application.
      // return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  };

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name,email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
          console.log(error);
        } else {
          // this.setState({userInfo: result});
          handleLogin(result.email);
          // console.log('result:', result.email);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const handleLogin = email => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('email', email);
    const data = email;
    const link = 'login_user';
    setShowActivity(true);
    dispatch(userLogin(link, formdata, onSuccessLogin, onErrorLogin, data));
  };

  const onSuccessLogin = (res, data) => {
    setShowActivity(false);
    navigation.replace(res, {field: 'Phone', data: data});
  };

  const onErrorLogin = err => {
    setShowActivity(false);
    ShowSnackBar('There was some error...', 'red');
  };

  const PaginationComponent = item => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          height: moderateScale(260),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
          }}>
          {[0, 1, 2].map(k => {
            return (
              <View
                style={{
                  width: moderateScale(15),
                  height: moderateScale(15),
                  backgroundColor:
                    item.paginationIndex === k ? 'white' : 'grey',
                  marginHorizontal: 5,
                  borderRadius: 100,
                }}
              />
            );
          })}
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(13),
            marginTop: 10,
            fontFamily: Theme.fontFamily.Poppins_Medium,
          }}>
          First time on Zivaj.com?
        </Text>
        <TouchableOpacity
          onPress={() => handleGoogleSignIn()}
          // onPress={() => navigation.replace('Auth', {field: `Phone`})}
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: moderateScale(50),
            width: (width / 100) * 75,
            backgroundColor: 'white',
            borderRadius: 100,
            marginTop: 15,
          }}>
          <Image
            source={require('../../assets/images/google.png')}
            style={{
              width: moderateScale(25),
              height: moderateScale(25),
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: moderateScale(15),
              fontFamily: Theme.fontFamily.Poppins_SemiBold,
            }}>
            Continue with Google{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFacebookSignIn()}
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: moderateScale(50),

            width: (width / 100) * 75,
            backgroundColor: '#4267B2',
            borderRadius: 100,
            marginTop: 10,
          }}>
          <Image
            source={require('../../assets/images/facebook-app-symbol.png')}
            style={{
              width: moderateScale(25),
              height: moderateScale(25),
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: moderateScale(15),
              fontFamily: Theme.fontFamily.Poppins_SemiBold,
            }}>
            Continue with facebook{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PhoneNumberInput')}
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: moderateScale(50),

            width: (width / 100) * 75,
            backgroundColor: 'white',
            borderRadius: 100,
            marginTop: 10,
            marginBottom: 15,
          }}>
          <Image
            source={require('../../assets/images/call.png')}
            style={{
              width: moderateScale(25),
              height: moderateScale(25),
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: moderateScale(15),
              fontFamily: Theme.fontFamily.Poppins_SemiBold,
            }}>
            Continue with Number
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <SwiperFlatList
        autoPlay={true}
        autoplayDelay={3}
        showPagination
        PaginationComponent={PaginationComponent}>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: width,
          }}
          source={require('../../assets/images/1.jpg')}>
          <View style={styles.blur} />
          <Image
            style={{
              width: width / 2,
              resizeMode: 'contain',
              alignSelf: 'center',
              height: moderateScale(150),
            }}
            source={require('../../assets/images/placeholder-logo-1.png')}
          />
        </ImageBackground>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: width,
          }}
          source={require('../../assets/images/2.jpg')}>
          <View style={styles.blur} />
          <Image
            style={{
              width: width / 2,
              resizeMode: 'contain',
              alignSelf: 'center',
              height: moderateScale(150),
            }}
            source={require('../../assets/images/placeholder-logo-1.png')}
          />

          <View
            style={{
              marginTop: 'auto',
              marginBottom: moderateScale(290),
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: moderateScale(15),
                // fontWeight: '500',
                marginTop: 20,
                fontFamily: Theme.fontFamily.Poppins_Medium,
              }}>
              Making best
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: moderateScale(16),
                // fontWeight: 'bold',
                fontFamily: Theme.fontFamily.Poppins_Bold,
              }}>
              life Partners
            </Text>
          </View>
        </ImageBackground>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: width,
          }}
          source={require('../../assets/images/3.jpg')}>
          <View style={styles.blur} />
          <Image
            style={{
              width: width / 2,
              resizeMode: 'contain',
              alignSelf: 'center',
              height: moderateScale(150),
            }}
            source={require('../../assets/images/placeholder-logo-1.png')}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              paddingHorizontal: (width / 100) * 5,
              marginTop: 'auto',
              marginBottom: moderateScale(290),
            }}>
            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: moderateScale(15),
                  fontFamily: Theme.fontFamily.Poppins_Regular,
                }}>
                Find your
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: moderateScale(16),
                  fontFamily: Theme.fontFamily.Poppins_Bold,
                }}>
                Partner
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: moderateScale(15),
                  fontFamily: Theme.fontFamily.Poppins_Regular,
                }}>
                Now!
              </Text>
            </View>
            <Image
              source={require('../../assets/images/3.jpg')}
              style={{
                width: width / 2.2,
                height: height / 3.2,
                borderWidth: 1,
                borderColor: 'white',
              }}
            />
          </View>
        </ImageBackground>
      </SwiperFlatList>
      <CustomActivity show={showActivity} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.4,
  },
});

export default Intro;
