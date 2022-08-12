import React, {useState} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
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

const data = [{key: 1}, {key: 1}, {key: 1}, {key: 1}];
const {width, height} = Dimensions.get('window');

const Matches = ({navigation}) => {
  const [plan, setPlan] = useState(false);

  const renderItem = () => {
    return (
      <View style={{alignItems: 'center', marginRight: moderateScale(10)}}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/1.jpg')}></Image>
        <CustomButton
          height={28}
          tag={'View profile'}
          fontFamily={Theme.fontFamily.Poppins_Regular}
          textSize={12}
          padding={20}
          radius={7}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Matches" leftOPacity={0} />
      {plan ? (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: moderateScale(100),
          }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.noMatchCont}>
            <Text style={styles.noMatchText}>No Matches Yet</Text>
            <Text style={{textAlign: 'center'}}>
              After you like someone and they like you back, you match and can
              chat here
            </Text>
            <Icon
              style={{marginTop: 10}}
              name="refresh"
              type="font-awesome"
              size={40}
            />
          </View>
          <View style={styles.optionCont}>
            <View style={styles.options}>
              <Text style={styles.optionText}>Todays{'\n'}Match</Text>
            </View>
            <View style={styles.options}>
              <Text style={styles.optionText}>Nearby</Text>
            </View>
          </View>
          <View style={styles.optionCont}>
            <View style={styles.options}>
              <Text style={styles.optionText}>Local</Text>
            </View>
            <View style={styles.options}>
              <Text style={styles.optionText}>Foreigners</Text>
            </View>
          </View>
          <View style={{height: 20}}></View>
          <HomeHeader
            Heading={'Premium Matches'}
            SubHeading={'Recently upgraded premium member'}
            showCrown
          />
          <FlatList
            style={{width: width / 1.05, alignSelf: 'flex-end', marginTop: 10}}
            renderItem={renderItem}
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.viewAllButton}>
            <Text style={{fontFamily: Theme.fontFamily.Poppins_Regular}}>
              View all
            </Text>
          </View>
          <View style={{height: 20}}></View>

          <HomeHeader
            Heading={'Recent Viewers'}
            SubHeading={'Members who recently visit your profile'}
            showCrown
          />
          <FlatList
            style={{
              width: width / 1.05,
              alignSelf: 'flex-end',
              marginTop: 10,
            }}
            renderItem={renderItem}
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.viewAllButton}>
            <Text style={{fontFamily: Theme.fontFamily.Poppins_Regular}}>
              View all
            </Text>
          </View>
          <View style={{height: 50}}></View>
        </ScrollView>
      ) : (
        <View style={styles.planTab}>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              alignItems: 'flex-start',
              marginTop: 5,
            }}>
            <Icon
              name={'close'}
              onPress={() => {
                setPlan(true);
              }}
            />
          </View>
          <Image
            resizeMode="cover"
            style={{width: '90%', height: '40%'}}
            source={require('../../../assets/images/together.png')}
          />
          <CustomButton
            tag={'View Plans'}
            onPress={() => {
              setPlan(true);
              navigation.navigate('MembershipScreen');
            }}
          />
          <View style={[styles.noMatchCont, {width: Theme.size.width}]}>
            <Text style={styles.noMatchText}>We're in this together</Text>
            <Text style={{textAlign: 'center', paddingHorizontal: 5}}>
              Our premium plans allow you to contact your matched directly and
              letting you know your life partner better
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  optionCont: {
    width: Theme.size.width,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  options: {
    width: '45%',
    alignItems: 'center',
    height: moderateScale(150),
    borderRadius: moderateScale(10),
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  optionText: {
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: 17,
  },
  noMatchText: {
    fontSize: Theme.fontSize.title,
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    color: 'black',
    textAlign: 'center',
  },
  noMatchCont: {
    alignSelf: 'center',
    width: '65%',
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  image: {
    width: moderateScale(120),
    height: moderateScale(150),
    marginBottom: 10,
    borderRadius: 10,
  },
  viewAllButton: {
    width: Theme.size.width,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  planTab: {
    width: Theme.size.width,
    height: Theme.size.width,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: moderateScale(50),
  },
});

export default Matches;
