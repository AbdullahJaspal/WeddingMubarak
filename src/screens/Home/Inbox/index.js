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
} from 'react-native';
import {moderateScale} from '../../../Theme/Dimensions';
import Theme from '../../../Theme/Theme';
import {Header} from '../../../assets/Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScalableImage} from './ScalableImage';
import Entypo from 'react-native-vector-icons/Entypo';
import {CustomButton} from '../../../assets/Components/CustomButton';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Inbox = ({navigation}) => {
  const [animate, setAnimate] = useState(false);
  const bottomSheet = useRef();
  const {premiumSubs, likeSubs} = useSelector(state => state.auth);
  useEffect(() => {
    hanldeAnimation();
  });

  const hanldeAnimation = () => {
    setTimeout(() => {
      setAnimate(!animate);
    }, 500);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.sideContainer}>
            <Image
              style={styles.cardImage}
              source={{
                uri: 'https://fashion360.pk/wp-content/uploads/2021/09/Alizeh-2.jpg',
              }}
            />
            <Text style={styles.cardName}>Musab Khan</Text>
          </View>
          <View style={styles.middleContainer} />
          <View
            style={[
              styles.sideContainer,
              {
                paddingLeft: '5%',
              },
            ]}>
            <View
              style={{
                marginTop: moderateScale(20),
              }}>
              <Text style={styles.cardDetailTag}>21 Years</Text>
              <Text style={styles.cardDetailTag}>5'9"</Text>
              <Text style={styles.cardDetailTag}>Not Working</Text>
              <Text style={styles.cardDetailTag}>Urdu, Hindko</Text>
              <Text style={styles.cardDetailTag}>Sheea</Text>
              <Text style={styles.cardDetailTag}>Lahore, Pakistan</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => bottomSheet.current.open()}
            style={[
              styles.cardButton,
              {
                backgroundColor: animate ? 'red' : '#F7C63B',
              },
            ]}>
            <Image
              source={require('../../../assets/images/diamond.png')}
              style={styles.cardDiamond}
            />
            <Text style={[styles.cardButtonTag]}>Connect Now</Text>
          </TouchableOpacity>

          <Text style={styles.cardLastTag}>To contact her directly</Text>
        </View>

        <FontAwesome
          name="bars"
          color="#CF1E54"
          size={moderateScale(30)}
          style={{
            position: 'absolute',
            top: moderateScale(5),
            right: moderateScale(10),
          }}
        />
      </View>
    );
  };

  const data = [1, 2, 3, 4, 5, 66];

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../assets/images/exploreBG.jpeg')}
      style={styles.mainContainer}>
      <Header leftOPacity={0} />
      <Text style={styles.topTag}>Accepted Requests (26)</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginVertical: moderateScale(5),
            }}
          />
        )}
        contentContainerStyle={{
          paddingTop: moderateScale(5),
          paddingBottom: moderateScale(100),
        }}
        style={{
          marginTop: moderateScale(5),
        }}
      />
      <RBSheet
        ref={bottomSheet}
        height={moderateScale(500)}
        customStyles={{
          container: {
            borderTopRightRadius: 100,
          },
        }}>
        <LinearGradient
          colors={Theme.colors.reverseGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              width: width,
              //   height: moderateScale(250),
              position: 'absolute',
              bottom: 0,
            }}>
            <ScalableImage
              source={require('../../../assets/images/bottomSheet.png')}
            />
          </View>
          <Entypo
            onPress={() => bottomSheet.current.close()}
            name="cross"
            color="white"
            size={moderateScale(30)}
            style={{
              marginTop: moderateScale(10),
              marginLeft: moderateScale(10),
            }}
          />
          <View style={styles.bottomCard}>
            <Image
              style={styles.bottomImage}
              source={{
                uri: 'https://fashion360.pk/wp-content/uploads/2021/09/Alizeh-2.jpg',
              }}
            />
            <Text style={styles.bottomTopText}>
              Upgrade now to contact her directly, and get full access
            </Text>
          </View>
          <View style={styles.bottomInfoCard}>
            <View style={styles.bottomInfoCardContainer}>
              <Text style={styles.bottomCardInfoTag}>+32006*******</Text>
              <FontAwesome
                name="lock"
                color={'#6E6F71'}
                size={moderateScale(25)}
              />
            </View>
            <View style={styles.bottomInfoCardContainer}>
              <Text style={styles.bottomCardInfoTag}>Whatsapp Chat</Text>
              <FontAwesome
                name="lock"
                color={'#6E6F71'}
                size={moderateScale(25)}
              />
            </View>
            <View style={styles.bottomInfoCardContainer}>
              <Text style={styles.bottomCardInfoTag}>Message via chat</Text>
              <FontAwesome
                name="lock"
                color={'#6E6F71'}
                size={moderateScale(25)}
              />
            </View>
            <View
              style={[
                styles.bottomInfoCardContainer,
                {
                  borderBottomWidth: 0,
                },
              ]}>
              <Text style={styles.bottomCardInfoTag}>*******@gmail.com</Text>
              <FontAwesome
                name="lock"
                color={'#6E6F71'}
                size={moderateScale(25)}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: moderateScale(20),
            }}>
            <CustomButton
              tag="Go Premium Now"
              onPress={() => {
                bottomSheet.current.close();
                navigation.navigate('MembershipScreen');
              }}
            />
            <Text style={styles.bottomBottomText}>
              Save upto{' '}
              <Text
                style={{
                  color: '#FC9618',
                }}>
                70%
              </Text>{' '}
              today!
            </Text>
          </View>
        </LinearGradient>
      </RBSheet>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  topTag: {
    marginLeft: (width / 100) * 5,
    marginTop: moderateScale(5),
    // fontWeight: 'bold',
    color: 'black',
    fontSize: moderateScale(20),
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  cardContainer: {
    width: (width / 100) * 90,
    alignSelf: 'center',
    backgroundColor: '#F9FAFC',
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: 'grey',
    alignSelf: 'center',
    paddingVertical: moderateScale(15),
    elevation: moderateScale(2),
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideContainer: {
    width: '49%',
    height: '100%',
  },
  middleContainer: {
    borderLeftWidth: moderateScale(1),
    borderRightWidth: moderateScale(1),
    borderColor: '#E19194',
    height: '100%',
    width: '2%',
  },
  cardImage: {
    width: (width / 100) * 37,
    height: (width / 100) * 37,
    resizeMode: 'cover',
    borderRadius: moderateScale(15),
    alignSelf: 'center',
  },
  cardName: {
    color: 'black',
    // fontWeight: '500',
    textAlign: 'center',
    marginTop: moderateScale(5),
    fontSize: moderateScale(17),
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  cardDetailTag: {
    color: '#C1C2C4',
    fontSize: moderateScale(16),
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  cardButton: {
    width: '90%',
    height: moderateScale(45),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginTop: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardDiamond: {
    resizeMode: 'contain',
    width: moderateScale(20),
    height: moderateScale(20),
  },
  cardButtonTag: {
    color: 'white',
    fontSize: moderateScale(14),
    marginLeft: moderateScale(10),
    // fontWeight: '500',
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  cardLastTag: {
    color: 'black',
    fontSize: moderateScale(13),
    marginTop: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  bottomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: (width / 100) * 5,
  },
  bottomImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: 'white',
    resizeMode: 'cover',
  },
  bottomTopText: {
    color: 'white',
    fontSize: moderateScale(16),
    // fontWeight: '500',
    marginLeft: moderateScale(20),
    width: width - moderateScale(160),
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  bottomInfoCard: {
    backgroundColor: 'white',
    width: (width / 100) * 90,
    borderRadius: moderateScale(10),
    elevation: moderateScale(10),
    borderWidth: 0.5,
    borderColor: '#D2D3D5',
    marginTop: moderateScale(10),
    alignSelf: 'center',
  },
  bottomInfoCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: moderateScale(15),
    borderBottomWidth: 0.5,
    borderColor: '#D2D3D5',
  },
  bottomCardInfoTag: {
    color: 'black',
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  bottomBottomText: {
    color: 'black',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: moderateScale(27),
    marginTop: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
});

export default Inbox;
