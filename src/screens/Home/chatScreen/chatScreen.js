import {Icon} from '@rneui/base';
import React, {useState} from 'react';
import {View, Image, Text, TextInput} from 'react-native';
import Theme from '../../../Theme/Theme';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {useSelector} from 'react-redux';
const ChatApp = () => {
  const [micColor, setMicColor] = useState(false);
  const {userData} = useSelector(state => state.auth);
  const record = async () => {
    setMicColor(!micColor);
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };

    AudioRecord.init(options);

    micColor ? AudioRecord.stop() : AudioRecord.start();

    // or to get the wav file path
    const audioFile = await AudioRecord.stop();

    AudioRecord.on('data', data => {
      // base64-encoded audio data chunks
      console.log(data);
    });
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          alignSelf: 'center',
          height: 40,
          width: '100%',
          borderBottomWidth: 0.5,
          borderColor: Theme.colors.gray,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../../assets/images/1.jpg')}
            style={{width: 30, height: 30, borderRadius: 100}}
          />
          <Text
            style={{
              fontFamily: Theme.fontFamily.Poppins_Bold,
              fontSize: 20,
              marginLeft: 10,
            }}>
            {userData.first_name}
          </Text>
        </View>

        <View>
          <Icon />
        </View>
      </View>

      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 5,
        }}>
        <View
          style={{backgroundColor: '#EAEEF1', padding: 7, borderRadius: 100}}>
          <Icon name="camera" type="entypo" color={'#646B75'} size={17} />
        </View>
        <View
          style={{
            backgroundColor: '#EAEEF1',
            padding: 7,
            borderRadius: 100,
            width: '65%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <TextInput
            style={{width: '90%'}}
            placeholder="Send a Chat"></TextInput>
          <Icon
            name={'microphone'}
            type="font-awesome"
            color={micColor ? Theme.colors.gradient[1] : '#646B75'}
            size={17}
            onPress={() => {
              record();
            }}
          />
        </View>
        <Icon name="emoji-happy" type="entypo" color={'#646B75'} size={17} />
        <Icon name="images" type="entypo" color={'#646B75'} size={17} />
      </View>
    </View>
  );
};

export default ChatApp;
