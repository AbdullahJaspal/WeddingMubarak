import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {moderateScale} from '../../../Theme/Dimensions';
import Theme from '../../../Theme/Theme';
import {Header} from '../../../assets/Components/Header';
import {Icon} from '@rneui/themed';
import {useSelector, useDispatch} from 'react-redux';
import {handleLogOut} from '../../../redux/actions/auth';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import {Image} from 'react-native';

const {width, height} = Dimensions.get('window');

const Account = ({navigation}) => {
  const {userData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(userData);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Icon
            name="caretleft"
            type="ant-design"
            size={20}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={{fontSize: 24, fontFamily: Theme.fontFamily.Poppins_Medium}}>
            Accounts
          </Text>
        </View>
        <Image
          style={{height: 30, width: '25%', marginBottom: 5}}
          source={require('../../../assets/images/homeLogo.png')}
          resizeMode={'contain'}
        />
      </View>

      <View style={styles.tabCont}>
        <View style={styles.tab}>
          <View>
            <Text style={styles.tabTitle}>App Language</Text>
            <Text style={{fontSize: Theme.fontSize.regular, color: 'black'}}>
              English
            </Text>
          </View>
          <Icon
            name="caretright"
            type="ant-design"
            size={18}
            color="transparent"
          />
        </View>
      </View>
      <View style={styles.tabCont}>
        <View style={styles.tab}>
          <View>
            <Text style={styles.tabTitle}>Phone Number</Text>
            <Text style={{fontSize: Theme.fontSize.regular, color: 'black'}}>
              {userData.phone}
            </Text>
          </View>
          <Icon
            name="caretright"
            type="ant-design"
            size={18}
            color="transparent"
          />
        </View>
      </View>
      <View style={styles.tabCont}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            navigation.navigate('MembershipScreen');
          }}>
          <View>
            <Text style={styles.tabTitle}>Go Premium Now</Text>
            <Text
              onPress={() => {
                navigation.navigate('MembershipScreen');
              }}
              style={{fontSize: Theme.fontSize.regular, color: 'black'}}>
              View Plans
            </Text>
          </View>
          <Icon
            name="caretright"
            type="ant-design"
            size={18}
            color="transparent"
          />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.tabCont}>
        <View style={styles.tab}>
          <View>
            <Text style={styles.tabTitle}>Reset my History</Text>
            <Text style={{fontSize: Theme.fontSize.regular}}>View Plans</Text>
          </View>
          <Icon name="caretright" type="ant-design" size={18} />
        </View>
      </View> */}
      <View style={styles.top}></View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          dispatch(handleLogOut());
          navigation.replace('SplashScreen');
        }}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            color: 'white',
          }}>
          Signout
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            color: 'black',
          }}>
          Deactivate Account
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(handleLogOut());
          navigation.replace('SplashScreen');
        }}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            color: 'white',
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
  header: {
    height: moderateScale(45),
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  top: {
    height: moderateScale(50),
  },
  tabCont: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: Theme.colors.border,
    padding: 5,
    width: width,
  },
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
    borderColor: Theme.colors.border,
    alignItems: 'center',
    height: moderateScale(45),
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: Theme.colors.primary,
  },
});

export default Account;
