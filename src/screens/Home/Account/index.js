import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {moderateScale} from '../../../Theme/Dimensions';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import Flag from 'react-native-flags';
import MaterailCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {CustomButton} from '../../../assets/Components/CustomButton';
import Theme from '../../../Theme/Theme';
import {Header} from '../../../assets/Components/Header';
import {Icon} from '@rneui/themed';
import {useSelector, useDispatch} from 'react-redux';
import {handleLogOUt} from '../../../redux/actions/auth';

const {width, height} = Dimensions.get('window');

const Account = ({navigation}) => {
  const {userData} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <Header
        Heading={'Account'}
        title={'Account'}
        leftOnpress={() => navigation.goBack()}
      />
      <View style={styles.top}></View>

      <View style={styles.tabCont}>
        <View style={styles.tab}>
          <View>
            <Text style={styles.tabTitle}>App Language</Text>
            <Text style={{fontSize: Theme.fontSize.regular}}>English</Text>
          </View>
          <Icon name="caretright" type="ant-design" size={18} />
        </View>
      </View>
      <View style={styles.tabCont}>
        <View style={styles.tab}>
          <View>
            <Text style={styles.tabTitle}>Phone Number</Text>
            <Text style={{fontSize: Theme.fontSize.regular}}>
              {userData.phone}
            </Text>
          </View>
          <Icon name="caretright" type="ant-design" size={18} />
        </View>
      </View>
      <View style={styles.tabCont}>
        <View style={styles.tab}>
          <View>
            <Text style={styles.tabTitle}>Go Premium Now</Text>
            <Text style={{fontSize: Theme.fontSize.regular}}>View Plans</Text>
          </View>
          <Icon name="caretright" type="ant-design" size={18} />
        </View>
      </View>
      <View style={styles.tabCont}>
        <View style={styles.tab}>
          <View>
            <Text style={styles.tabTitle}>Reset my History</Text>
            <Text style={{fontSize: Theme.fontSize.regular}}>View Plans</Text>
          </View>
          <Icon name="caretright" type="ant-design" size={18} />
        </View>
      </View>
      <View style={styles.top}></View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          dispatch(handleLogOUt());
          navigation.replace('SplashScreen');
        }}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            color: 'black',
          }}>
          Signout
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            color: 'black',
          }}>
          Deactivate Account,
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            color: 'black',
          }}>
          Delete Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  top: {
    height: moderateScale(50),
  },
  tabCont: {borderBottomWidth: 0.5, borderColor: Theme.colors.border},
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Theme.size.width,
    alignSelf: 'center',
    paddingBottom: moderateScale(5),
    alignItems: 'center',
  },
  tabTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  button: {
    width: width / 2,
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: Theme.colors.border,
    alignItems: 'center',
    height: moderateScale(45),
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Account;
