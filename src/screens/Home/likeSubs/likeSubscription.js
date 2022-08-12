import {fonts} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import Theme from '../../../Theme/Theme';
import styles from './styles';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useDispatch} from 'react-redux';
import {getLikePakages} from '../../../redux/actions/auth';

const data = [
  {
    key: 1,
    name: 'Gold',
    period: '3 months',
    percent: '20% off',
    rupeeOff: 'Rs:3,720',
    rupee: 'Rs:3,720',
    rupeePerMonth: 'Rs:1,240 per month',
    contact: '75',
    checkColor: 'transparent',
  },
  {
    key: 2,
    name: 'Gold Plus',
    period: '3 months',
    percent: '30% off',
    rupeeOff: 'Rs:3,720',
    rupee: 'Rs:4,095',
    rupeePerMonth: 'Rs:1,365 per month',
    contact: '150',
    checkColor: 'transparent',
  },
  {
    key: 3,
    name: 'Diamond',
    period: '3 months',
    percent: '30% off',
    rupeeOff: 'Rs:6,950',
    rupee: 'Rs:4,865',
    rupeePerMonth: 'Rs:811 per month',
    contact: '150',
    checkColor: 'transparent',
  },
  {
    key: 4,
    name: 'Diamond Plus',
    period: '3 months',
    percent: '40% off',
    rupeeOff: 'Rs:8,850',
    rupee: 'Rs:5,310',
    rupeePerMonth: 'Rs:885 per month',
    contact: '300',
    checkColor: 'green',
  },
  {
    key: 5,
    name: 'Platinum Plus',
    period: '3 months',
    percent: '50% off',
    rupeeOff: 'Rs:14,650',
    rupee: 'Rs:7,325',
    rupeePerMonth: 'Rs:610 per month',
    contact: '600',
    checkColor: 'green',
  },
];

const LikeSubscribtion = ({navigation}) => {
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
    dispatch(getLikePakages(formdata, success, error));
  };

  const success = val => {
    setShowActivity(false);
    console.log(val);
    setData1(val.all_likes_packages);
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
        <View style={styles.percentCont}>
          <Text style={styles.twenety}>{item.description} % off</Text>
          <Text style={styles.rupee}>{item.rupeeOff}</Text>
        </View>
        <Text style={styles.mainRupee}>
          {'Rs:'} {item.price}
        </Text>
        <Text style={{color: Theme.colors.gray, fontSize: 18}}>
          {item.rupeePerMonth}
        </Text>
        <TouchableOpacity style={styles.button}>
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
export default LikeSubscribtion;
