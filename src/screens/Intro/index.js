import React from 'react';
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

const {width, height} = Dimensions.get('window');

const Intro = ({navigation}) => {
  const PaginationComponent = item => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
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
                  width: width / 35,
                  height: width / 35,
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
            fontSize: 13,
            marginTop: 10,
          }}>
          First time on Zivaj.com?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.replace('LookingFor')}
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: (width / 100) * 75,
            backgroundColor: 'white',
            borderRadius: 100,
            marginTop: 15,
          }}>
          <Image
            source={require('../../assets/images/google.png')}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Continue with Google{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('LookingFor')}
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: (width / 100) * 75,
            backgroundColor: '#4267B2',
            borderRadius: 100,
            marginTop: 10,
          }}>
          <Image
            source={require('../../assets/images/facebook-app-symbol.png')}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Continue with Google{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('LookingFor')}
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: (width / 100) * 75,
            backgroundColor: 'white',
            borderRadius: 100,
            marginTop: 10,
            marginBottom: 15,
          }}>
          <Image
            source={require('../../assets/images/call.png')}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
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
            }}
            source={require('../../assets/images/placeholder-logo-1.png')}
          />
          <Text
            style={{
              color: 'white',
              fontSize: width / 7,
              textAlign: 'center',
            }}>
            VIDEO
          </Text>
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
            }}
            source={require('../../assets/images/placeholder-logo-1.png')}
          />
          <Text
            style={{
              color: 'white',
              fontSize: width / 7,
              textAlign: 'center',
            }}>
            VIDEO
          </Text>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '500',
              marginTop: 20,
            }}>
            Making best
          </Text>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            life Partners
          </Text>
        </ImageBackground>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: width,
          }}
          source={require('../../assets/images/3.jpg')}>
          <View style={styles.blur} />
          <Text
            style={{
              color: 'white',
              fontSize: width / 7,
              textAlign: 'center',
              marginTop: 10,
            }}>
            VIDEO
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              paddingHorizontal: (width / 100) * 5,
              marginTop: 20,
            }}>
            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '400',
                }}>
                Find your
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Partner
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '400',
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
