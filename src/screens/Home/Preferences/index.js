import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Icon} from '@rneui/base';
import {moderateScale} from '../../../Theme/Dimensions';
import Theme from '../../../Theme/Theme';
import {Header} from '../../../assets/Components/Header';

const Preferences = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        rightOPacity={0}
        title={'Preferences'}
        leftOnpress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(30),
        }}>
        <View style={Styles.tabCont}>
          <Text
            style={{
              fontSize: Theme.fontSize.title,
              fontFamily: Theme.fontFamily.Poppins_Regular,
              color: 'black',
            }}>
            Basic Preference
          </Text>
        </View>

        <TouchableOpacity style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/age.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>Age Range</Text>
            <Text style={Styles.des}>18 - 27 Years Old</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/locationn.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Location & Distance'}</Text>
            <Text style={Styles.des}>Current Location - National</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/locationn.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Location & Distance'}</Text>
            <Text style={Styles.des}>Current Location - National</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/religion.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Religion'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/cast.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Cast'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </TouchableOpacity>

        <View style={Styles.tabCont}>
          <Text style={{fontSize: Theme.fontSize.title, color: 'black'}}>
            Premium Preference
          </Text>
        </View>

        <View style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/family.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Family Origin'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </View>
        <View style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/education.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Education'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </View>
        <View style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/height.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Height'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </View>
        <View style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/chatt.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Language'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </View>
        <View style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/child.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Has Children'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </View>
        <View style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/married.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Previously Married'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </View>
        <View style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/relocate.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Willing To Relocate'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </View>
        <View style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/smoking.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Smoking'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </View>
        <View style={Styles.tabCont}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../../assets/images/drinking.png')}
          />
          <View style={Styles.middleCont}>
            <Text style={Styles.tabTitle}>{'Drinking'}</Text>
            <Text style={Styles.des}>Open to all</Text>
          </View>
          <Icon name="chevron-right" type="feather" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tabCont: {
    backgroundColor: Theme.colors.swiper,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
    height: moderateScale(55),
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  middleCont: {
    width: '65%',
  },
  tabTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: Theme.fontFamily.Poppins_Regular,
    top: moderateScale(3),
  },
  des: {
    color: Theme.colors.title,
    fontSize: 13,
    fontFamily: Theme.fontFamily.Poppins_Regular,
    bottom: moderateScale(3),
  },
});

export default Preferences;
