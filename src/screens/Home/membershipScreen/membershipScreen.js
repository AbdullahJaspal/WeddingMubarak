import {fonts} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import Theme from '../../../Theme/Theme';
import styles from './styles';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useDispatch} from 'react-redux';
import {getPremiumPakages} from '../../../redux/actions/auth';
import {CustomActivity} from '../../../assets/Components/CustomActivity';

const MembershipScreen = ({navigation}) => {
  const [data1, setData1] = useState([]);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    getInfo();
  }, []);

  const dispatch = useDispatch();

  const getInfo = () => {
    setShowActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    dispatch(getPremiumPakages(formdata, success, error));
  };

  const success = val => {
    console.log(val);
    setShowActivity(false);
    setData1(val.all_premium_packages);
  };

  const error = val => {
    setShowActivity(false);
    console.log(val);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.cardCont}>
        {item.key === 4 && (
          <Text
            style={[
              styles.goldtext,
              {color: '#E85833', fontFamily: Theme.fontFamily.Poppins_Bold},
            ]}>
            {'Best Value'}
          </Text>
        )}
        {item.key === 5 && (
          <Text
            style={[
              styles.goldtext,
              {color: '#E85833', fontFamily: Theme.fontFamily.Poppins_Bold},
            ]}>
            {'Top Seller'}
          </Text>
        )}
        <Text style={styles.goldtext}>{item.title}</Text>
        <Text style={styles.monthText}>{item.validity} Days</Text>
        <View style={{height: 40}}></View>
        <View style={[styles.percentCont]}>
          <Text style={styles.twenety}>{item.discount} % off</Text>
          <Text style={styles.rupee}>
            {'$'}
            {item.price}
          </Text>
        </View>
        <Text style={styles.mainRupee}>
          {'$'} {Math.round(item.price - (item.discount / 100) * item.price)}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('StripeScreen', {
              item: item,
              pricee: Math.round(
                item.price - (item.discount / 100) * item.price,
              ),
              screen: 'premium',
            });
          }}>
          <Text
            style={{
              color: Theme.colors.gray,
              fontFamily: Theme.fontFamily.Poppins_Regular,
              fontSize: 18,
            }}>
            Continue
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: Theme.size.width / 1.1,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text style={styles.facilities}>
            ✓{' '}
            <Text style={{color: Theme.colors.gray}}>
              Send unlimited messages
            </Text>
          </Text>
          <Text style={styles.facilities}>
            ✓{' '}
            <Text style={{color: Theme.colors.gray}}>
              View upto{' '}
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Bold,
                  color: 'black',
                }}>
                {item.views}
              </Text>{' '}
              contact numbers
            </Text>
          </Text>
          <Text style={[styles.facilities, {color: item.checkColor}]}>
            ✓{' '}
            <Text
              style={{
                color: Theme.colors.gray,
                textDecorationLine:
                  item.checkColor === 'transparent' ? 'line-through' : 'none',
              }}>
              Standout from other profile
            </Text>
          </Text>
          <Text style={[styles.facilities, {color: item.checkColor}]}>
            ✓{' '}
            <Text
              style={{
                color: Theme.colors.gray,
                textDecorationLine:
                  item.checkColor === 'transparent' ? 'line-through' : 'none',
              }}>
              Lets Matches contact you
            </Text>
          </Text>
          {item.key === 4 && (
            <Text style={styles.bottomText}>EMI at Rs192 per month</Text>
          )}
          {item.key === 5 && (
            <Text style={styles.bottomText}>EMI at Rs192 per month</Text>
          )}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeHeader
        showCrown={true}
        Heading="Premium Memberships"
        showLeftIcon
        leftPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <SwiperFlatList
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data={data1}
          renderItem={renderItem}
        />
      </ScrollView>
      <CustomActivity show={showActivity} />
    </SafeAreaView>
  );
};
export default MembershipScreen;
