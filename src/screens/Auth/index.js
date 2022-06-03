import React from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const LookingFor = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: (width / 100) * 5,
        paddingTop: 20,
      }}>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 17,
        }}>
        I'm Looking For
      </Text>
      <Text
        style={{
          color: 'grey',
          fontSize: 12,
        }}>
        Just select one of the option this selection can be changed later.
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('PersonalDetails')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginTop: 20,
          elevation: 10,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          My Better Half{'\n'}
          <Text
            style={{
              color: 'grey',
              fontSize: 13,
            }}>
            to become my life partner
          </Text>
        </Text>
        <Image
          source={require('../../assets/images/doves.png')}
          style={{
            resizeMode: 'contain',
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('PersonalDetails')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginTop: 20,
          elevation: 10,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Friends{'\n'}
          <Text
            style={{
              color: 'grey',
              fontSize: 13,
            }}>
            of the same gender
          </Text>
        </Text>
        <Image
          source={require('../../assets/images/make-friends.png')}
          style={{
            resizeMode: 'contain',
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('PersonalDetails')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginTop: 20,
          elevation: 10,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Socializing{'\n'}
          <Text
            style={{
              color: 'grey',
              fontSize: 13,
            }}>
            Surfing the internet
          </Text>
        </Text>
        <Image
          source={require('../../assets/images/worldwide.png')}
          style={{
            resizeMode: 'contain',
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LookingFor;
