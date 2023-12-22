import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import {HomeHeader} from '../../../assets/Components/HomeHeader';
import Theme from '../../../Theme/Theme';
import {Slider} from '@miblanchard/react-native-slider';
import Styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {Slider}* as Slide from '@rneui/base';
import {Icon} from '@rneui/base';
import {moderateScale} from '../../../Theme/Dimensions';
import {communityData, countryData} from '../../Auth/DropDonwValues';
import {CustomButton} from '../../../assets/Components/CustomButton';
import {useDispatch} from 'react-redux';
import {setFilters} from '../../../redux/actions/auth';
const Search = ({navigation}) => {
  const [value, setValue] = useState(0.2);
  const [tab, setTab] = useState('search');
  const [distance, setDistance] = useState(30);
  const [low, setLow] = useState(10);
  const [lowHeight, setLowHeight] = useState(10);
  const [high, setHigh] = useState(100);
  const [highHeight, setHighHeight] = useState(100);
  const [martialStatusOpen, setMartialStatusOpen] = useState(false);
  const [religionStatusOpen, setReligionStatusOpen] = useState(false);
  const [communnityOpen, setCommunityOpen] = useState(false);
  const [motherToungeOpen, setMotherToungeOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [martialStatus, setMartialStatus] = useState(`Select option`);
  const [religionStatus, setReligionStatus] = useState(`Select option`);
  const [communnity, setCommunity] = useState(`Select option`);
  const [country, setCountry] = useState(`Select option`);
  const [motherTounge, setMotherTounge] = useState(`Select option`);

  const {width, heightt} = Dimensions.get('window');
  const dispatch = useDispatch();
  const religion = [
    'Muslim',
    'Ateist',
    'Buddhist',
    'Christian',
    'Hindu',
    'Jewish',
    'Other',
  ];
  return (
    <View style={Styles.mainCont}>
      <HomeHeader />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={Styles.leftButton}
          onPress={() => {
            setTab('search');
          }}>
          <Text
            style={{
              fontFamily: Theme.fontFamily.Poppins_Regular,
              fontSize: 20,
              color: tab === 'search' ? Theme.colors.primary : 'black',
            }}>
            Search Option
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.rightButton}
          onPress={() => {
            setTab('profileId');
          }}>
          <Text
            style={{
              fontFamily: Theme.fontFamily.Poppins_Regular,
              fontSize: 20,
              color: tab === 'profileId' ? Theme.colors.primary : 'black',
            }}>
            Profile ID Search
          </Text>
        </TouchableOpacity>
      </View>
      {tab === 'search' ? (
        <ScrollView>
          <View style={{width: '95%', alignSelf: 'center'}}>
            <Text style={{fontFamily: Theme.fontFamily.comics}}>Age</Text>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{fontFamily: Theme.fontFamily.comics}}>
                Minimum age {low}
              </Text>
              <Text style={{fontFamily: Theme.fontFamily.comics}}>
                Maximum age {distance}
              </Text>
            </View>
          </View>

          <View style={{width: '95%', alignSelf: 'center'}}>
            {/* <Slider
              value={value}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={Theme.colors.primary}
              maximumTrackTintColor={Theme.colors.gray}
              onValueChange={() => {}}
              thumbTintColor={Theme.colors.primary}
              trackStyle={{backgroundColor: Theme.colors.gray}}
            /> */}
            <Slider
              value={distance}
              minimumValue={10}
              maximumValue={25}
              minimumTrackTintColor={Theme.colors.primary}
              maximumTrackTintColor={Theme.colors.gray}
              thumbTintColor={Theme.colors.primary}
              trackStyle={{backgroundColor: Theme.colors.gray}}
              onValueChange={value => {
                setDistance(parseInt(value));
              }}
            />
          </View>
          <View style={{width: '95%', alignSelf: 'center'}}>
            <Text style={{fontFamily: Theme.fontFamily.comics}}>Height</Text>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{fontFamily: Theme.fontFamily.comics}}>
                Minimum {'134cm'}
              </Text>
              <Text style={{fontFamily: Theme.fontFamily.comics}}>
                Maximum {highHeight}cm
              </Text>
            </View>
          </View>

          <View style={{width: '95%', alignSelf: 'center'}}>
            {/* <Slider
              value={value}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={Theme.colors.primary}
              maximumTrackTintColor={Theme.colors.gray}
              onValueChange={() => {}}
              thumbTintColor={Theme.colors.primary}
              trackStyle={{backgroundColor: Theme.colors.gray}}
            /> */}
            <Slider
              value={highHeight}
              minimumValue={134}
              maximumValue={213}
              minimumTrackTintColor={Theme.colors.primary}
              maximumTrackTintColor={Theme.colors.gray}
              thumbTintColor={Theme.colors.primary}
              trackStyle={{backgroundColor: Theme.colors.gray}}
              onValueChange={value => {
                setHighHeight(parseInt(value));
              }}
            />
          </View>
          {/* <View style={{width: '95%', alignSelf: 'center'}}>
            <Text style={{fontFamily: Theme.fontFamily.comics}}>Hieght</Text>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{fontFamily: Theme.fontFamily.comics}}>
                Minimum Hieght {lowHeight}
              </Text>
              <Text style={{fontFamily: Theme.fontFamily.comics}}>
                Maximum Hieght {highHeight}
              </Text>
            </View>
          </View>

          <View style={{width: '95%', alignSelf: 'center'}}>
            <Slider
              minimumTrackTintColor={Theme.colors.primary}
              maximumTrackTintColor={Theme.colors.gray}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor={Theme.colors.primary}
              trackStyle={{backgroundColor: Theme.colors.gray}}
              value={[lowHeight, highHeight]}
              onValueChange={([lowHeight, highHeight]) => {
                console.log(parseInt(lowHeight), parseInt(highHeight));
                setLowHeight(parseInt(lowHeight));
                setHighHeight(parseInt(highHeight));
              }}
            />
          </View> */}
          <Text
            style={{
              fontFamily: Theme.fontFamily.comics,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Martial Status
          </Text>

          <View
            style={[
              Styles.dropDownContainer,

              {
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              martialStatusOpen && {
                borderRadius: 0,
              },
            ]}>
            <ModalDropdown
              options={['Married', 'Single', 'Divorced']}
              onSelect={(index, value) => {
                console.log(value);
                console.log(index);
                setMartialStatus(value);
                const params = {
                  martial_status:
                    martialStatus === 'Select option' ? 'empty' : value,
                  religion:
                    religionStatus === 'Select option'
                      ? 'empty'
                      : religionStatus,
                  community:
                    communnity === 'Select option' ? 'empty' : communnity,
                  language:
                    motherTounge === 'Select option' ? 'empty' : motherTounge,
                };
                dispatch(setFilters(params));
              }}
              onDropdownWillShow={() => setMartialStatusOpen(true)}
              onDropdownWillHide={() => setMartialStatusOpen(false)}
              dropdownStyle={{
                width: (width / 100) * 95,
              }}
              style={{
                wid: '100%',
                height: '100%',
              }}>
              <View
                style={[
                  Styles.dropDownContainerWrapper,
                  {
                    paddingHorizontal: moderateScale(5),
                  },
                ]}>
                <Text
                  style={[
                    Styles.dropDownText,
                    martialStatus !== 'Qualification' && {
                      color: 'black',
                    },
                  ]}>
                  {martialStatus}
                </Text>
                <AntDesign name={martialStatusOpen ? 'caretup' : 'caretdown'} />
              </View>
            </ModalDropdown>
          </View>
          <Text
            style={{
              fontFamily: Theme.fontFamily.comics,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Religion
          </Text>

          <View
            style={[
              Styles.dropDownContainer,

              {
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              martialStatusOpen && {
                borderRadius: 0,
              },
            ]}>
            <ModalDropdown
              options={religion}
              onSelect={(index, value) => {
                setReligionStatus(value);
                const params = {
                  martial_status:
                    martialStatus === 'Select option' ? 'empty' : martialStatus,
                  religion:
                    religionStatus === 'Select option' ? 'empty' : value,
                  community:
                    communnity === 'Select option' ? 'empty' : communnity,
                  language:
                    motherTounge === 'Select option' ? 'empty' : motherTounge,
                };
                dispatch(setFilters(params));
              }}
              onDropdownWillShow={() => setReligionStatusOpen(true)}
              onDropdownWillHide={() => setReligionStatusOpen(false)}
              dropdownStyle={{
                width: (width / 100) * 95,
              }}
              style={{
                wid: '100%',
                height: '100%',
              }}>
              <View
                style={[
                  Styles.dropDownContainerWrapper,
                  {
                    paddingHorizontal: moderateScale(5),
                  },
                ]}>
                <Text
                  style={[
                    Styles.dropDownText,
                    religionStatus !== 'Qualification' && {
                      color: 'black',
                    },
                  ]}>
                  {religionStatus}
                </Text>
                <AntDesign
                  name={religionStatusOpen ? 'caretup' : 'caretdown'}
                />
              </View>
            </ModalDropdown>
          </View>

          <Text
            style={{
              fontFamily: Theme.fontFamily.comics,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Community
          </Text>

          <View
            style={[
              Styles.dropDownContainer,

              {
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              communnityOpen && {
                borderRadius: 0,
              },
            ]}>
            <ModalDropdown
              options={communityData}
              onSelect={(index, value) => {
                setCommunity(value);
                const params = {
                  martial_status:
                    martialStatus === 'Select option' ? 'empty' : martialStatus,
                  religion:
                    religionStatus === 'Select option'
                      ? 'empty'
                      : religionStatus,
                  community: communnity === 'Select option' ? 'empty' : value,
                  language:
                    motherTounge === 'Select option' ? 'empty' : motherTounge,
                };
                dispatch(setFilters(params));
              }}
              onDropdownWillShow={() => setCommunityOpen(true)}
              onDropdownWillHide={() => setCommunityOpen(false)}
              dropdownStyle={{
                width: (width / 100) * 95,
              }}
              style={{
                wid: '100%',
                height: '100%',
              }}>
              <View
                style={[
                  Styles.dropDownContainerWrapper,
                  {
                    paddingHorizontal: moderateScale(5),
                  },
                ]}>
                <Text
                  style={[
                    Styles.dropDownText,
                    {
                      color: 'black',
                    },
                  ]}>
                  {communnity}
                </Text>
                <AntDesign name={communnityOpen ? 'caretup' : 'caretdown'} />
              </View>
            </ModalDropdown>
          </View>

          <Text
            style={{
              fontFamily: Theme.fontFamily.comics,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Language
          </Text>

          <View
            style={[
              Styles.dropDownContainer,

              {
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              countryOpen && {
                borderRadius: 0,
              },
            ]}>
            <ModalDropdown
              options={communityData}
              onSelect={(index, value) => {
                setMotherTounge(value);
                const params = {
                  martial_status:
                    martialStatus === 'Select option' ? 'empty' : martialStatus,
                  religion:
                    religionStatus === 'Select option'
                      ? 'empty'
                      : religionStatus,
                  community:
                    communnity === 'Select option' ? 'empty' : communnity,
                  language: motherTounge === 'Select option' ? 'empty' : value,
                };
                dispatch(setFilters(params));
              }}
              onDropdownWillShow={() => setMotherToungeOpen(true)}
              onDropdownWillHide={() => setMotherToungeOpen(false)}
              dropdownStyle={{
                width: (width / 100) * 95,
              }}
              style={{
                wid: '100%',
                height: '100%',
              }}>
              <View
                style={[
                  Styles.dropDownContainerWrapper,
                  {
                    paddingHorizontal: moderateScale(5),
                  },
                ]}>
                <Text
                  style={[
                    Styles.dropDownText,
                    {
                      color: 'black',
                    },
                  ]}>
                  {motherTounge}
                </Text>
                <AntDesign name={motherToungeOpen ? 'caretup' : 'caretdown'} />
              </View>
            </ModalDropdown>
          </View>
          {/* 
          <Text
            style={{
              fontFamily: Theme.fontFamily.comics,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Mother Tounge
          </Text>

          <View
            style={[
              Styles.dropDownContainer,

              {
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              countryOpen && {
                borderRadius: 0,
              },
            ]}>
            <ModalDropdown
              options={['Punjabi', 'Urdu', 'English']}
              onSelect={(index, value) => {
                setMotherTounge(value);
              }}
              onDropdownWillShow={() => setMotherToungeOpen(true)}
              onDropdownWillHide={() => setMotherToungeOpen(false)}
              dropdownStyle={{
                width: (width / 100) * 95,
              }}
              style={{
                wid: '100%',
                height: '100%',
              }}>
              <View
                style={[
                  Styles.dropDownContainerWrapper,
                  {
                    paddingHorizontal: moderateScale(5),
                  },
                ]}>
                <Text
                  style={[
                    Styles.dropDownText,
                    {
                      color: 'black',
                    },
                  ]}>
                  {motherTounge}
                </Text>
                <AntDesign name={motherToungeOpen ? 'caretup' : 'caretdown'} />
              </View>
            </ModalDropdown>
          </View> */}
        </ScrollView>
      ) : (
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: Theme.fontFamily.comics,
              marginTop: 10,
              width: '95%',
              alignSelf: 'center',
            }}>
            Profile id search
          </Text>
          <TextInput
            placeholder="Enter Id like (42323423423)"
            style={{
              borderBottomWidth: 1,
              borderColor: Theme.colors.primary,
              width: '95%',
              alignSelf: 'center',
            }}
          />
        </View>
      )}
      <CustomButton
        tag={'Search Now'}
        onPress={async () => {
          const params = {
            martial_status:
              martialStatus === 'Select option' ? 'empty' : martialStatus,
            religion:
              religionStatus === 'Select option' ? 'empty' : religionStatus,
            community: communnity === 'Select option' ? 'empty' : communnity,
            language: motherTounge === 'Select option' ? 'empty' : motherTounge,
          };
          await dispatch(setFilters(params));
          tab === 'search' && navigation.navigate('HomeScreen');
        }}
      />
      <View style={{height: 10}} />
    </View>
  );
};
export default Search;
