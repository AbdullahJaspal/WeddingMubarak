import {Icon} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomActivity} from '../../../assets/Components/CustomActivity';
import {CustomButton} from '../../../assets/Components/CustomButton';
import {Header} from '../../../assets/Components/Header';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import {
  getAcceptedRequests,
  getConversation,
} from '../../../redux/actions/auth';
import {moderateScale} from '../../../Theme/Dimensions';
import Theme from '../../../Theme/Theme';

const {width, height} = Dimensions.get('window');
const bottomData = [
  {imagePath: require('../../../assets/images/girl.jpeg')},
  {imagePath: require('../../../assets/images/girl3.jpeg')},
  {imagePath: require('../../../assets/images/girl2.jpeg')},
];
const Chat = ({navigation}) => {
  const [tab, setTab] = useState('Recent');
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.auth);
  const [topData, setTopData] = useState([]);
  const [bottomData, setBottomData] = useState([]);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setShowActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    dispatch(getAcceptedRequests(formdata, successAccept, errorAccept));
    dispatch(getConversation(formdata, successConvo, errorConvo));
  };
  const successAccept = val => {
    setShowActivity(false);

    console.log(val);
    setTopData(val.all_liking);
  };
  const successConvo = val => {
    setShowActivity(false);
    setBottomData(val.conversations);
  };

  const errorAccept = val => {
    setShowActivity(false);
    console.log(val);
  };
  const errorConvo = val => {
    setShowActivity(false);
    console.log(val);
  };

  const renderTopRecent = ({item}) => {
    return (
      <View style={styles.topCont}>
        <ImageBackground
          source={{uri: item.profile_picture}}
          style={{width: 55, height: 55}}
          imageStyle={{borderRadius: 100, zIndex: 0}}>
          <Icon
            name="dot-single"
            type="entypo"
            style={styles.onlineIcon}
            size={50}
            color={Theme.colors.green}
          />
        </ImageBackground>
        <Text style={styles.topName}>{item.full_name}</Text>
      </View>
    );
  };
  const renderBottom = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.bottomCont}
        onPress={() => {
          navigation.navigate('ChatApp', {
            item: item,
          });
        }}>
        <Image
          source={{uri: item.avatar}}
          style={{width: 60, height: 60, borderRadius: 100}}></Image>
        <View style={styles.bottomNameCont}>
          <View style={{marginLeft: 10}}>
            <Text style={styles.bottomName}>{item.name}</Text>
            <Text style={styles.bottomDes}>
              {item.conversations.length === 0
                ? 'No Message'
                : item.conversations[item.conversations.length - 1].message}
            </Text>
          </View>
          <Text style={styles.bottomDes}></Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      // resizeMode="cover"
      style={styles.mainContainer}
      // source={require('../../../assets/images/exploreBG.jpeg')}
    >
      <HomeHeader navigation={navigation} optionFalse={false} search={false} />
      <View style={styles.tabCont}>
        <TouchableOpacity
          style={[
            styles.tagsCont,
            {
              backgroundColor:
                tab === 'Recent' ? Theme.colors.primary : 'transparent',
            },
          ]}
          onPress={() => {
            setTab('Recent');
          }}>
          <Text
            style={{
              fontSize: 12,
              color: tab === 'Recent' ? 'white' : '#6C6C6C',
              fontFamily: Theme.fontFamily.comics,
            }}>
            {'Recent'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tagsCont,
            {
              backgroundColor:
                tab === 'Active' ? Theme.colors.primary : 'transparent',
            },
          ]}
          onPress={() => {
            setTab('Active');
          }}>
          <Text
            style={{
              fontSize: 12,
              color: tab === 'Active' ? 'white' : '#6C6C6C',
              fontFamily: Theme.fontFamily.comics,
            }}>
            {'Active'}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: (width / 100) * 95,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.comics,
            color: Theme.colors.gray,
            marginVertical: 10,
          }}>
          My Match
        </Text>
        <FlatList
          renderItem={renderTopRecent}
          data={topData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: Theme.colors.gray,
          marginTop: 10,
        }}
      />

      <FlatList
        renderItem={renderBottom}
        data={bottomData}
        keyExtractor={item => item.index}
        ListFooterComponent={
          <View style={{marginTop: moderateScale(20)}}>
            <CustomButton
              tag={'View my matches'}
              fontFamily={Theme.fontFamily.comics}
              width={'60%'}
              radius={100}
            />
          </View>
        }
      />
      <CustomActivity show={showActivity} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabCont: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(5),
  },
  tagsCont: {
    borderRadius: 5,
    borderWidth: 1,
    height: 35,
    marginRight: 10,
    padding: 3,
    paddingHorizontal: 5,
    borderColor: '#CACACA',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCont: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    marginRight: 12,
  },
  onlineIcon: {
    alignSelf: 'flex-end',
    zIndex: 100,
    marginRight: -18,
    marginTop: -18,
  },
  topName: {
    fontFamily: Theme.fontFamily.comics,
    color: Theme.colors.gray,
    fontSize: 12,
    zIndex: 0,
  },
  bottomCont: {
    alignItems: 'baseline',
    zIndex: 0,
    marginRight: 12,
    flexDirection: 'row',
    width: (width / 100) * 90,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  bottomNameCont: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    borderBottomColor: Theme.colors.gray,
    borderBottomWidth: 0.5,
    paddingBottom: 6,
    alignItems: 'center',
  },
  bottomName: {
    fontFamily: Theme.fontFamily.comics,
    color: Theme.colors.gray,
    fontSize: 18,
    zIndex: 0,
  },
  bottomDes: {
    fontFamily: Theme.fontFamily.comics,
    color: Theme.colors.gray,
    fontSize: 12,
    zIndex: 0,
  },
});

export default Chat;
