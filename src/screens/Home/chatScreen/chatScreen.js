import {Icon} from '@rneui/base';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import Theme from '../../../Theme/Theme';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';

import {useDispatch, useSelector} from 'react-redux';
import {getMessages, sendMessages} from '../../../redux/actions/auth';
import {CustomActivity} from '../../../assets/Components/CustomActivity';
import styles from './styles';
import ShowSnackBar from '../../../assets/Components/ShowSnackBar';

const {width, height} = Dimensions.get('screen');
const ChatApp = ({navigation, route}) => {
  const {item} = route.params;

  const [emoji, setEmoji] = useState(false);
  const [micColor, setMicColor] = useState(false);
  const [messageFocus, setMessageFocus] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [blur, setBlur] = useState(false);
  const [message, setMessage] = useState('');
  const [convo, setConvo] = useState([]);
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
  useEffect(() => {
    setShowActivity(true);
    fetchMessages();
  }, []);

  console.log(convo[0]?.conversations);
  const dispatch = useDispatch();
  const fetchMessages = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    formdata.append('receiver_uid', item.uid);
    console.log(formdata);
    dispatch(getMessages(formdata, success, error));
  };
  const success = val => {
    setShowActivity(false);
    setConvo(val.conversation);
  };
  const error = val => {
    setShowActivity(false);
    console.log(val);
  };

  const sendMessage = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('sender_uid', userData.uid);
    formdata.append('receiver_uid', item.uid);
    formdata.append('message', message);
    console.log(formdata);
    dispatch(sendMessages(formdata, msgSuccess, msgError));
  };
  const msgSuccess = val => {
    console.log(val);
    setShowActivity(false);
    setMessage('');
    setEmoji(false);
    fetchMessages();
    setBlur(false);
  };
  const msgError = val => {
    setShowActivity(false);
    setBlur(false);
    console.log(val);
  };
  const scrollViewRef = useRef();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.renderCont}>
        <View style={styles.topLeftCont}>
          <View style={styles.imageAndNameCont}>
            <Icon
              name="chevron-left"
              type="wnntypo"
              color={Theme.colors.gradient[1]}
              onPress={() => {
                navigation.goBack();
              }}
              size={29}
            />
            <Image
              source={{uri: item.avatar}}
              style={{width: 30, height: 30, borderRadius: 100}}
            />
            <View>
              <Text style={styles.topName}>{item.name}</Text>
              <Text style={styles.online}>{'Online'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            {/* <Icon name="phone" type="entypo" color={'#3AACF7'} /> */}
            <Icon
              name="dots-three-vertical"
              type="entypo"
              color={Theme.colors.gray}
            />
          </View>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {convo[0]?.conversations.map(item => {
          return item.sender_uid !== userData.uid ? (
            <View style={{width: '60%'}}>
              <View style={styles.leftConvo}>
                <Text style={{color: 'black'}}>{item.message}</Text>
              </View>
              <Text style={{alignSelf: 'flex-end', fontSize: 10, marginTop: 5}}>
                {item.time}
              </Text>
            </View>
          ) : (
            <View style={{width: '60%', alignSelf: 'flex-end'}}>
              <View style={styles.rightConvo}>
                <Text style={{color: 'white'}}>{item.message}</Text>
              </View>
              <Text
                style={{alignSelf: 'flex-start', fontSize: 10, marginTop: 5}}>
                {item.time}
              </Text>
            </View>
          );
        })}
        <View style={{height: 50}}></View>
      </ScrollView>
      <View style={styles.bottomCont}>
        <View style={styles.messageInputCont}>
          <View style={styles.inputCont}>
            <TextInput
              style={{width: '90%', padding: 0, color: 'black'}}
              placeholder="Send a Chat"
              onFocus={() => {
                setMessageFocus(true);
              }}
              placeholderTextColor={Theme.colors.gray}
              onChangeText={val => {
                setMessage(val);
              }}
              value={message}
            />
            <Icon
              name="send"
              type="material-icons"
              color={blur ? Theme.colors.gray : Theme.colors.gradient[1]}
              size={17}
              onPress={() => {
                message !== ''
                  ? (setBlur(true), sendMessage())
                  : ShowSnackBar(`Can't send empty message.`, 'red');
              }}
              disabled={blur}
            />
          </View>
        </View>
      </View>
      <CustomActivity show={showActivity} />
    </View>
  );
};

export default ChatApp;
