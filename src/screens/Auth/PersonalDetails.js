import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const PersonalDetails = ({navigation}) => {
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
        My Personal Details
      </Text>

      <TextInput
        placeholder="First Name"
        style={{
          backgroundColor: 'white',
          borderRadius: 100,
          paddingHorizontal: 20,
          borderWidth: 1,
          borderColor: 'grey',
          elevation: 10,
          marginTop: 20,
        }}
      />
      <TextInput
        placeholder="Last Name"
        style={{
          backgroundColor: 'white',
          borderRadius: 100,
          paddingHorizontal: 20,
          borderWidth: 1,
          borderColor: 'grey',
          elevation: 10,
          marginTop: 10,
        }}
      />
      <Text
        style={{
          color: '#E74DAC',
          fontSize: 12,
          marginTop: 5,
        }}>
        We will not make your last name public
      </Text>
      <Text
        style={{
          color: 'grey',
          fontSize: 12,
          marginTop: 30,
        }}>
        What my friends call me
      </Text>
      <TextInput
        placeholder="Last Name"
        style={{
          backgroundColor: 'white',
          borderRadius: 100,
          paddingHorizontal: 20,
          borderWidth: 1,
          borderColor: 'grey',
          elevation: 10,
          marginTop: 10,
        }}
      />
      <Text
        style={{
          color: '#E74DAC',
          fontSize: 12,
          marginTop: 5,
        }}>
        Optional
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Gender')}
        activeOpacity={1}
        style={{
          width: (width / 100) * 75,
          height: 55,
          borderRadius: 100,
          overflow: 'hidden',
          marginTop: 'auto',
          marginBottom: 30,
          alignSelf: 'center',
        }}>
        <LinearGradient
          colors={['#DE2767', '#F79637']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Continue
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalDetails;
