import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const Gender = ({}) => {
  const [selected, setSelected] = useState('');
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
        My Gender is
      </Text>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelected('lady')}
        style={{
          width: (width / 100) * 90,
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: selected === 'lady' ? '#DE2767' : 'white',
          elevation: 10,
          borderRadius: 100,
          borderWidth: selected !== 'lady' ? 1 : 0,
          borderColor: 'grey',
          marginTop: 40,
        }}>
        <Text
          style={{
            color: selected === 'lady' ? 'white' : 'black',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Lady
        </Text>
        <Text
          style={{
            color: selected === 'lady' ? 'white' : 'grey',
            fontSize: 12,
            fontWeight: 'normal',
          }}>
          Women
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelected('man')}
        style={{
          width: (width / 100) * 90,
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: selected === 'man' ? '#DE2767' : 'white',
          elevation: 10,
          borderRadius: 100,
          borderWidth: selected !== 'man' ? 1 : 0,
          borderColor: 'grey',
          marginTop: 10,
        }}>
        <Text
          style={{
            color: selected === 'man' ? 'white' : 'black',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Gentlemen
        </Text>
        <Text
          style={{
            color: selected === 'man' ? 'white' : 'grey',
            fontSize: 12,
            fontWeight: 'normal',
          }}>
          Man
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
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

export default Gender;
