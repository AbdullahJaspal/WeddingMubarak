/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
  FlatList,
  Switch,
} from 'react-native';
import {moderateScale} from '../../Theme/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from '../../assets/Components/Header';
import ModalDropdown from 'react-native-modal-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RNCamera} from 'react-native-camera';
import {CustomButton} from '../../assets/Components/CustomButton';
import Theme from '../../Theme/Theme';
import * as Animatable from 'react-native-animatable';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import PhoneInput from 'react-native-phone-number-input';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {
  asAData,
  cityData,
  communityData,
  countryData,
  dietData,
  heightData,
  hobbiesData,
  maritalStatusData,
  oftenPrayData,
  qualificationData,
  religionData,
  stateData,
} from './DropDonwValues';
import {getHomeScreen, userRegistration} from '../../redux/actions/auth';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import Options from '../../assets/Components/optionRender';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Customback from '../../assets/Components/CustomBack';
import {getAge} from '../Home/EditProfile/EditProfile';
import moment from 'moment';

const {width, heightt} = Dimensions.get('window');

const Auth = ({navigation, route}) => {
  const {field, data} = route.params;
  const dispatch = useDispatch();
  //For styling variables
  const [no, setNO] = useState(-1);
  const [maritalStatusOpen, setMaritalStatusOpen] = useState(false);
  const [dietStatusOpen, setDietStatusOPen] = useState(false);
  const [heightStatusOpen, setHeightStatusOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [communityOPen, setCOmmunityOpen] = useState(false);
  const [religionOpen, setReligionOpen] = useState(false);
  const [languageoPen, setLanguageOpen] = useState(false);
  const [prayOpen, setPrayOpne] = useState(false);
  const [qualificationOPen, setQualificationOPen] = useState(false);
  const [fatherStatusOPen, setFatherStatusOpen] = useState(false);
  const [motherStatusOPen, setMotherStatusOpen] = useState(false);
  const [siblingsOpen, setSiblingsOpen] = useState(false);
  const [asAopen, setAsAOPen] = useState(false);
  const [hobbiesOpen, setHobbiesOPen] = useState(false);
  const cameraRef = useRef(null);
  const inputPhone = useRef();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  // data variables
  const [email, setEmail] = useState(data);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profileFor, setProfileFor] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [dynamicField, setDynamicField] = useState('');
  const [nickName, setNickName] = useState('');
  const [selected, setSelected] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('Select');
  const [diet, setDiet] = useState('Select');
  const [height, setHeight] = useState('Select');
  const [state, setState] = useState('Select');
  const [city, setCity] = useState('Select');
  const [community, setCommunity] = useState('Community');
  const [Religion, setReligion] = useState('Religion');
  const [language, setLanguage] = useState('Language');
  const [oftnePray, setOftenPray] = useState('How Often you Pray');
  const [Hobbie, setHobbie] = useState('Hobbies');
  const [qualification, setQualification] = useState('Qualification');
  const [images, setImages] = useState([]);
  const [company, setCompany] = useState('');
  const [asA, setAsa] = useState('As a');
  const [country, setCountry] = useState('Country');
  const [fatherStatus, setfatherStatus] = useState(`Father's Status`);
  const [motherStatus, setMotherStatus] = useState(`Mother's Status`);
  const [siblings, setSiblings] = useState(`Total Siblings?`);
  const [aboutYourSelf, setAboutYourSelf] = useState('');
  const [date, setDate] = useState(new Date());
  const [selfie, setSelfie] = useState({
    uri: '',
    name: '',
    type: '',
    base64: '',
  });
  const [image, setImage] = useState([]);
  const [image1, setImage1] = useState([]);
  const [image2, setImage2] = useState([]);
  const [image3, setImage3] = useState([]);
  const [image4, setImage4] = useState([]);
  const [image5, setImage5] = useState([]);
  const [hobbyData, setHobbyData] = useState([]);
  const [data1, setData1] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const camera = useRef();

  console.log(data1);
  const register = () => {
    setShowActivity(true);
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('profile_for', profileFor);
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastname);
    formdata.append('nick_name', nickName);
    formdata.append('email', email);
    formdata.append('phone', phone);
    formdata.append('looking_for', lookingFor);
    formdata.append('gender', selected);
    formdata.append('dob', date.toISOString().split('T')[0]);
    formdata.append('martial_status', maritalStatus);
    formdata.append('diet', diet);
    formdata.append('height', parseInt(height));
    formdata.append('state', state);
    formdata.append('city', city);
    formdata.append('country', country);
    formdata.append('password', password);
    formdata.append('community', community);
    formdata.append('religion', Religion);
    formdata.append('language', language);
    formdata.append('pray', oftnePray);
    formdata.append('qualification', qualification);
    formdata.append('work_with', company);
    formdata.append('work_as', asA);
    formdata.append('about', aboutYourSelf);
    formdata.append('father_status', fatherStatus);
    formdata.append('mother_status', motherStatus);
    formdata.append('total_siblings', siblings);
    formdata.append('hobbies', JSON.stringify(hobbyData));
    formdata.append('selfie', {
      uri: selfie.uri,
      name: selfie.name,
      type: selfie.type,
    });
    if (images.length !== 0) {
      for (let i = 0; i < images.length; i++) {
        if (images[i]?.uri) {
          formdata.append('images[]', {
            uri: images[i].uri,
            name: images[i].name,
            type: images[i].type,
          });
        } else {
          formdata.append('images[]', {
            uri: images[i],
            name: images[i].replace(/^.*[\\\/]/, ''),
            type: `image/${images[i].replace(/^.*[\\\/]/, '').split('.')[1]}`,
          });
        }
      }
    }

    // setShowActivity(true);
    console.log(formdata);
    dispatch(
      userRegistration(formdata, onSuccessRegistration, onErrorRegistration),
    );
  };

  const onSuccessRegistration = res => {
    setShowActivity(false);
    navigation.replace(res);
  };

  const onErrorRegistration = err => {
    setShowActivity(false);
    ShowSnackBar(`Entered ${field} already exists...`, 'red');
    setNO(4);
    if (field === 'email') {
      setDynamicField('');
    }
  };

  //get Data
  const handleGetData = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('looking_for', lookingFor);
    console.log(formdata);

    dispatch(getHomeScreen(formdata, onSuccess, onError));
  };

  const onSuccess = res => {
    setShowActivity(false);
    console.log('res............');
    console.log(res);
    setData1(res);
  };

  const onError = err => {
    setShowActivity(false);
  };

  // styles for rededers

  const zero = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            navigation.navigate('Intro');
          }}
        />
        <Image
          style={{width: 100, height: 100}}
          resizeMode={'contain'}
          source={require('../../assets/images/squareLogo.png')}
        />
        <Text style={[styles.topHeading, {marginTop: 10}]}>
          Enter your email
        </Text>
        <TextInput
          style={[
            styles.inputFieldText,
            {
              borderWidth: 1,
              width: (width / 100) * 85,
              borderRadius: 10,
              height: moderateScale(40),
              padding: 0,
              paddingHorizontal: 10,
              fontSize: moderateScale(16),
            },
          ]}
          placeholder="Email"
          placeholderTextColor={'#7E7F82'}
          keyboardType={'email-address'}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={[styles.topHeading, {marginTop: 20}]}>
          Set up a password
        </Text>
        <TextInput
          style={[
            styles.inputFieldText,
            {
              borderWidth: 1,
              width: (width / 100) * 85,
              borderRadius: 10,
              height: moderateScale(40),
              padding: 0,
              paddingHorizontal: 10,
              fontSize: moderateScale(16),
            },
          ]}
          placeholder="Enter the password"
          placeholderTextColor={'#7E7F82'}
          onChangeText={setPassword}
          keyboardType="default"
          value={password}
          multiline={false}
          secureTextEntry={true}
        />
      </View>
    );
  };

  const first = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(-1);
          }}
        />
        <Image
          style={{width: 100, height: 100}}
          resizeMode={'contain'}
          source={require('../../assets/images/squareLogo.png')}
        />
        <Text style={[styles.topHeading, {marginTop: 10}]}>
          Hello please help us here{' '}
        </Text>
        <Text style={styles.topDescription}>
          So we can find a perfect match for you
        </Text>
        <Text style={[styles.topHeading, {marginTop: 30}]}>
          This Profile is for?{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Options
            title="Myself"
            onPress={() => {
              setProfileFor('Myself');
            }}
            color={profileFor === 'Myself' ? 'green' : '#4D4D4D'}
          />
          <Options
            title="My Friend"
            onPress={() => {
              setProfileFor('My Friend');
            }}
            color={profileFor === 'My Friend' ? 'green' : '#4D4D4D'}
          />
          <Options
            title="My Son"
            onPress={() => {
              setProfileFor('My Son');
            }}
            color={profileFor === 'My Son' ? 'green' : '#4D4D4D'}
          />
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
          <Options
            title="My Daughter"
            onPress={() => {
              setProfileFor('My Daughter');
            }}
            color={profileFor === 'My Daughter' ? 'green' : '#4D4D4D'}
          />
          <Options
            title="My Relatives"
            onPress={() => {
              setProfileFor('My Relatives');
            }}
            color={profileFor === 'My Relatives' ? 'green' : '#4D4D4D'}
          />
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '75%'}}>
          <Options
            title="My Brother"
            onPress={() => {
              setProfileFor('My Brother');
            }}
            color={profileFor === 'My Brother' ? 'green' : '#4D4D4D'}
          />
          <Options
            title="My Sister"
            onPress={() => {
              setProfileFor('My Sister');
            }}
            color={profileFor === 'My Sister' ? 'green' : '#4D4D4D'}
          />
        </View>

        <TextInput
          style={{
            width: '100%',
            marginTop: 90,
            borderRadius: 50,
            borderWidth: 1,
            padding: 5,
            paddingHorizontal: 10,
            fontFamily: Theme.fontFamily.Poppins_Regular,
          }}
          placeholder={'Please add referal code'}
        />
      </View>
    );
  };

  const second = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(0);
          }}
        />
        <Image
          style={{width: 60, height: 60}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <Text style={[styles.topHeading, {marginTop: 10}]}>
          Hey, let’s get started. Which best describes you??
        </Text>
        <View style={{marginTop: 140}}>
          <TouchableOpacity
            style={[
              styles.manButton,
              {
                backgroundColor:
                  selected === 'man' ? Theme.colors.primary : 'transparent',
                borderWidth: selected === 'man' ? 0 : 1,
              },
            ]}
            onPress={() => setSelected('man')}>
            <Text
              style={{
                fontFamily: Theme.fontFamily.Poppins_Regular,
                fontSize: 22,
                color: selected === 'man' ? 'white' : 'black',
              }}>
              I'm a man
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.manButton,
              {
                borderWidth: selected === 'woman' ? 0 : 1,
                backgroundColor:
                  selected === 'woman' ? Theme.colors.primary : 'transparent',
              },
            ]}
            onPress={() => setSelected('woman')}>
            <Text
              style={{
                fontFamily: Theme.fontFamily.Poppins_Regular,
                fontSize: 22,
                color: selected === 'woman' ? 'white' : 'black',
              }}>
              I'm a woman
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const third = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(1);
          }}
        />
        <Image
          style={{width: 60, height: 60}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <Text style={[styles.topHeading, {marginTop: 10}]}>
          Who can we help you meet?
        </Text>
        <View style={{marginTop: 140}}>
          {selected !== 'man' ? (
            <TouchableOpacity
              style={[
                styles.manButton,
                {
                  borderWidth: selected === 'men' ? 0 : 1,
                  backgroundColor:
                    lookingFor === 'men' ? Theme.colors.primary : 'transparent',
                },
              ]}
              onPress={() => setLookingFor('men')}>
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Regular,
                  fontSize: 22,
                  color: lookingFor === 'men' ? 'white' : 'black',
                }}>
                Men
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.manButton,
                {
                  borderWidth: lookingFor === 'women' ? 0 : 1,
                  backgroundColor:
                    lookingFor === 'women'
                      ? Theme.colors.primary
                      : 'transparent',
                },
              ]}
              onPress={() => setLookingFor('women')}>
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Regular,
                  fontSize: 22,
                  color: lookingFor === 'women' ? 'white' : 'black',
                }}>
                Women
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.manButton,
              {
                borderWidth: lookingFor === 'everyone' ? 0 : 1,
                backgroundColor:
                  lookingFor === 'everyone'
                    ? Theme.colors.primary
                    : 'transparent',
              },
            ]}
            onPress={() => setLookingFor('everyone')}>
            <Text
              style={{
                fontFamily: Theme.fontFamily.Poppins_Regular,
                fontSize: 22,
                color: lookingFor === 'everyone' ? 'white' : 'black',
              }}>
              Everyone
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const fourth = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(2);
          }}
        />
        <Image
          style={{width: 60, height: 60, marginBottom: 5}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <Text style={styles.topHeading}>
          Got it!{'\n'}When's your birthday?
        </Text>

        <DatePicker
          mode="date"
          date={date}
          textColor="black"
          maximumDate={new Date()}
          onDateChange={date => {
            console.log(date);
            setDate(date);
          }}
          style={{
            marginTop: moderateScale(60),
            alignSelf: 'center',
            backgroundColor: 'white',
            width: width,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: Theme.colors.primary,
            alignSelf: 'flex-end',
            borderRadius: 50,
            padding: 6,
            paddingHorizontal: 10,
            marginVertical: 10,
            marginTop: 20,
          }}
          onPress={() => {
            handleFourthButtonPress();
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: Theme.fontFamily.Poppins_Regular,
              fontSize: 22,
            }}>
            That's it
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const fifth = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(3);
          }}
        />
        <Image
          style={{width: 60, height: 60, marginBottom: 20}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <Text style={styles.topHeading}>My Personal Details</Text>

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={'grey'}
          style={styles.inputFieldText}
          onChangeText={setPhone}
          value={phone}
          keyboardType={'number-pad'}
          multiline={false}
        />
        <TextInput
          placeholder="First Name?"
          placeholderTextColor={'grey'}
          style={styles.inputFieldText}
          onChangeText={setFirstName}
          multiline={false}
          value={firstName}
        />
        <TextInput
          placeholder="Last Name?"
          placeholderTextColor={'grey'}
          style={styles.inputFieldText}
          onChangeText={setLastName}
          multiline={false}
          value={lastname}
        />
        <Text style={styles.redText}>
          We will not make your last name public
        </Text>
        <Text
          style={[
            styles.topHeading,
            {
              marginTop: moderateScale(30),
            },
          ]}>
          What my friends call me
        </Text>
        <TextInput
          placeholder="Nick Name"
          placeholderTextColor={'grey'}
          style={styles.inputFieldText}
          onChangeText={setNickName}
          multiline={false}
          value={nickName}
        />
        <Text style={styles.redText}>Optional</Text>
      </View>
    );
  };

  const sixth = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(4);
          }}
        />
        <Image
          style={{width: 60, height: 60, marginBottom: 20}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <Text
          style={[
            styles.fourthHeading,
            {
              marginTop: moderateScale(30),
            },
          ]}>
          What martial Status?
        </Text>
        <View
          style={[
            styles.dropDownContainer,
            maritalStatusOpen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={maritalStatusData}
            onDropdownWillShow={() => setMaritalStatusOpen(true)}
            onDropdownWillHide={() => setMaritalStatusOpen(false)}
            onSelect={index => {
              setMaritalStatus(maritalStatusData[index]);
            }}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  maritalStatus !== 'Select' && {
                    color: 'black',
                  },
                ]}>
                {maritalStatus}
              </Text>
              <AntDesign name={maritalStatusOpen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <Text style={styles.fourthHeading}>Your Diet</Text>
        <View
          style={[
            styles.dropDownContainer,
            dietStatusOpen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={dietData}
            onDropdownWillShow={() => setDietStatusOPen(true)}
            onDropdownWillHide={() => setDietStatusOPen(false)}
            onSelect={index => {
              setDiet(dietData[index]);
            }}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  diet !== 'Select' && {
                    color: 'black',
                  },
                ]}>
                {diet}
              </Text>
              <AntDesign name={dietStatusOpen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <Text style={styles.fourthHeading}>Your Height</Text>
        <View
          style={[
            styles.dropDownContainer,
            heightStatusOpen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={heightData}
            onDropdownWillShow={() => setHeightStatusOpen(true)}
            onDropdownWillHide={() => setHeightStatusOpen(false)}
            onSelect={index => {
              setHeight(heightData[index]);
            }}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  height !== 'Select' && {color: 'black'},
                ]}>
                {height}
              </Text>
              <AntDesign name={heightStatusOpen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <Text style={styles.fourthHeading}>Your Live in</Text>
        <View
          style={[
            styles.dropDownContainer,
            stateOpen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={stateData}
            onSelect={index => {
              setState(stateData[index]);
            }}
            onDropdownWillShow={() => setStateOpen(true)}
            onDropdownWillHide={() => setStateOpen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  state !== 'Select' && {
                    color: 'black',
                  },
                ]}>
                {state}
              </Text>
              <AntDesign name={stateOpen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <View
          style={[
            styles.dropDownContainer,
            {
              marginTop: moderateScale(10),
            },
            cityOpen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            onSelect={index => {
              setCity(cityData[index]);
            }}
            options={cityData}
            onDropdownWillShow={() => setCityOpen(true)}
            onDropdownWillHide={() => setCityOpen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  city !== 'Select' && {
                    color: 'black',
                  },
                ]}>
                {city}
              </Text>
              <AntDesign name={cityOpen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <Text style={styles.redText}>All fields are mandatory*</Text>
      </View>
    );
  };

  const hobbiesRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setHobbyData(hobbyData.filter((f, findex) => findex !== index));
        }}
        style={[
          styles.row,
          {
            width: (width / 100) * 33 - (width / 100) * 5,
            height: moderateScale(30),
            justifyContent: 'flex-start',
            borderRadius: 100,
            alignItems: 'center',
            paddingLeft: moderateScale(10),
            borderWidth: 0.5,
            borderColor: 'grey',
            backgroundColor: 'transparent',
            marginVertical: moderateScale(3),
            marginRight: moderateScale(10),
            marginTop: moderateScale(10),
          },
        ]}>
        <View style={styles.rowR}></View>
        <Text
          numberOfLines={1}
          style={[
            styles.firstBox,
            {
              fontFamily: Theme.fontFamily.Poppins_Regular,
              width: '65%',
            },
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const seventh = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(5);
          }}
        />
        <Image
          style={{width: 60, height: 60, marginBottom: 20}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <Text
          style={[
            styles.fourthHeading,
            {
              marginTop: moderateScale(30),
            },
          ]}>
          Select an Option
        </Text>
        <View
          style={[
            styles.dropDownContainer,
            {
              marginTop: 10,
            },
            communityOPen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={communityData}
            onSelect={index => {
              setCommunity(communityData[index]);
            }}
            onDropdownWillShow={() => setCOmmunityOpen(true)}
            onDropdownWillHide={() => setCOmmunityOpen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  community !== 'Community' && {
                    color: 'black',
                  },
                ]}>
                {community}
              </Text>
              <AntDesign name={communityOPen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>

        <View
          style={[
            styles.dropDownContainer,
            {
              marginTop: 10,
            },
            languageoPen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={communityData}
            onSelect={index => {
              setLanguage(communityData[index]);
            }}
            onDropdownWillShow={() => setLanguageOpen(true)}
            onDropdownWillHide={() => setLanguageOpen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  language !== 'Language' && {
                    color: 'black',
                  },
                ]}>
                {language}
              </Text>
              <AntDesign name={languageoPen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <View
          style={[
            styles.dropDownContainer,
            {
              marginTop: 10,
            },
            religionOpen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={religionData}
            onSelect={index => {
              setReligion(religionData[index]);
            }}
            onDropdownWillShow={() => setReligionOpen(true)}
            onDropdownWillHide={() => setReligionOpen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  Religion !== 'Religion' && {
                    color: 'black',
                  },
                ]}>
                {Religion}
              </Text>
              <AntDesign name={religionOpen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>

        <View
          style={[
            styles.dropDownContainer,
            {
              marginTop: 10,
            },
            hobbiesOpen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={hobbiesData}
            multipleSelect={true}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            onSelect={index => {
              let temporay = hobbyData.filter(f => f === hobbiesData[index]);
              if (temporay.length !== 0) {
                setHobbyData(hobbyData.filter(f => f !== hobbiesData[index]));
              } else {
                let temp = hobbyData.push(hobbiesData[index]);
              }
            }}
            renderRow={(option, index, isSelected) => {
              let temp = hobbyData.filter(f => f === option);
              return (
                <View
                  style={{
                    width: (width / 100) * 85,
                    height: moderateScale(35),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: moderateScale(10),
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      color: temp.length !== 0 ? 'black' : 'grey',
                      fontFamily: Theme.fontFamily.Poppins_Regular,
                      fontSize: moderateScale(14),
                      backgroundColor: 'transparent',
                      borderRadius: 20,
                      textAlign: 'center',
                    }}>
                    {option}
                  </Text>
                  <Text
                    style={{
                      color:
                        temp.length !== 0
                          ? Theme.colors.primary
                          : 'transparent',
                    }}>
                    ✓
                  </Text>
                </View>
              );
            }}
            onDropdownWillShow={() => setHobbiesOPen(true)}
            onDropdownWillHide={() => setHobbiesOPen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  Hobbie !== 'Hobbies' && {
                    color: 'black',
                  },
                ]}>
                {Hobbie}
              </Text>
              <AntDesign name={hobbiesOpen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <FlatList
          numColumns={3}
          data={hobbyData}
          renderItem={hobbiesRenderItem}
        />
        <View
          style={[
            styles.dropDownContainer,
            {
              marginTop: 10,
            },
            prayOpen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={oftenPrayData}
            onDropdownWillShow={() => setPrayOpne(true)}
            onDropdownWillHide={() => setPrayOpne(false)}
            onSelect={index => {
              setOftenPray(oftenPrayData[index]);
            }}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  oftnePray !== 'How Often you Pray' && {
                    color: 'black',
                  },
                ]}>
                {oftnePray}
              </Text>
              <AntDesign name={prayOpen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>

        <Text style={[styles.redText]}>All fields are mandatory*</Text>
      </View>
    );
  };

  const eighth = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(6);
          }}
        />
        <Image
          style={{width: 60, height: 60, marginBottom: 20}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <View style={{}}>
          <Text
            style={[
              styles.topHeading,
              {
                marginTop: moderateScale(30),
              },
            ]}>
            Don't worry Just a{'\n'}few more steps!{'\n'}
            <Text
              style={{
                fontSize: moderateScale(14),
                marginTop: 5,
              }}>
              So we can find perfect match for you!
            </Text>
          </Text>
          <Text
            style={[
              styles.topHeading,
              {
                marginTop: moderateScale(10),
              },
            ]}>
            Please add your{'\n'}education
            {'\n'}and your career details
          </Text>
        </View>

        <View
          style={[
            styles.dropDownContainer,
            qualificationOPen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={qualificationData}
            onSelect={index => {
              setQualification(qualificationData[index]);
            }}
            onDropdownWillShow={() => setQualificationOPen(true)}
            onDropdownWillHide={() => setQualificationOPen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  qualification !== 'Qualification' && {
                    color: 'black',
                  },
                ]}>
                {qualification}
              </Text>
              <AntDesign name={qualificationOPen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <TextInput
          style={[
            styles.inputFieldText,
            {
              borderWidth: 1,
              width: (width / 100) * 85,
              borderRadius: 10,
              height: moderateScale(40),
              padding: 0,
              paddingHorizontal: 30,
              fontSize: moderateScale(16),
            },
          ]}
          placeholder="You work with"
          placeholderTextColor={'#7E7F82'}
          onChangeText={setCompany}
          value={company}
        />
        <View
          style={[
            styles.dropDownContainer,
            asAopen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={asAData}
            onSelect={index => {
              setAsa(asAData[index]);
            }}
            onDropdownWillShow={() => setAsAOPen(true)}
            onDropdownWillHide={() => setAsAOPen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  asA !== 'As a' && {
                    color: 'black',
                  },
                ]}>
                {asA}
              </Text>
              <AntDesign name={asAopen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
      </View>
    );
  };

  const ninth = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(7);
          }}
        />
        <Image
          style={{width: 60, height: 60, marginBottom: 20}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <Text style={[styles.topHeading, {marginTop: 10}]}>
          Thats Great you are almost done!
        </Text>
        <Text
          style={[
            styles.fourthHeading,
            {
              marginTop: moderateScale(20),
            },
          ]}>
          About your self
        </Text>
        <TextInput
          multiline
          value={aboutYourSelf}
          onChangeText={setAboutYourSelf}
          style={{
            paddingHorizontal: moderateScale(20),
            color: 'black',
            fontSize: moderateScale(16),
            fontFamily: Theme.fontFamily.Poppins_Regular,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: moderateScale(10),
            height: moderateScale(150),
            marginTop: 10,
            textAlignVertical: 'top',
          }}
          placeholder="Start typing here"
          placeholderTextColor={'#7E7F82'}
        />
      </View>
    );
  };
  const tenth = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(8);
          }}
        />
        <Image
          style={{width: 60, height: 60, marginBottom: 20}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <Text style={[styles.topHeading, {marginTop: 10}]}>
          So now we need some information about your family so we can improve
          your profile quality...
        </Text>
        <View
          style={[
            styles.dropDownContainer,

            {
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            qualificationOPen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={['Alive', 'Dead']}
            onSelect={index => {
              setfatherStatus(index === 0 ? 'Alive' : 'Dead');
            }}
            onDropdownWillShow={() => setFatherStatusOpen(true)}
            onDropdownWillHide={() => setFatherStatusOpen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View
              style={[
                styles.dropDownContainerWrapper,
                {
                  paddingHorizontal: moderateScale(5),
                },
              ]}>
              <Text
                style={[
                  styles.dropDownText,
                  qualification !== 'Qualification' && {
                    color: 'black',
                  },
                ]}>
                {fatherStatus}
              </Text>
              <AntDesign name={fatherStatusOPen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <View
          style={[
            styles.dropDownContainer,

            {
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            qualificationOPen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={['Alive', 'Dead']}
            onSelect={index => {
              setMotherStatus(index === 0 ? 'Alive' : 'Dead');
            }}
            onDropdownWillShow={() => setMotherStatusOpen(true)}
            onDropdownWillHide={() => setMotherStatusOpen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View
              style={[
                styles.dropDownContainerWrapper,
                {
                  paddingHorizontal: moderateScale(5),
                },
              ]}>
              <Text
                style={[
                  styles.dropDownText,
                  qualification !== 'Qualification' && {
                    color: 'black',
                  },
                ]}>
                {motherStatus}
              </Text>
              <AntDesign name={motherStatusOPen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <View
          style={[
            styles.dropDownContainer,

            {
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            qualificationOPen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            onSelect={index => {
              setSiblings(index + 1);
            }}
            onDropdownWillShow={() => setSiblingsOpen(true)}
            onDropdownWillHide={() => setSiblingsOpen(false)}
            dropdownStyle={{
              width: (width / 100) * 85,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            dropdownTextStyle={{
              backgroundColor: 'transparent',
              borderRadius: 20,
              textAlign: 'center',
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View
              style={[
                styles.dropDownContainerWrapper,
                {
                  paddingHorizontal: moderateScale(5),
                },
              ]}>
              <Text
                style={[
                  styles.dropDownText,
                  qualification !== 'Qualification' && {
                    color: 'black',
                  },
                ]}>
                {siblings}
              </Text>
              <AntDesign name={siblingsOpen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
      </View>
    );
  };
  const elevth = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(9);
          }}
        />
        <Image
          style={{width: 60, height: 60, marginBottom: 20}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            width: (width / 100) * 90,
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Text style={styles.topHeading}>Selfie Verification</Text>
          <Text style={styles.topDescription}>
            We use selfies to verify that this profile is yours to keep our
            community safe and authentic
          </Text>
          <View
            style={{
              width: (width / 100) * 85,
              height: (width / 100) * 90,
              borderRadius: moderateScale(20),
              marginTop: moderateScale(20),
              overflow: 'hidden',
            }}>
            {selfie.base64 === '' ? (
              <RNCamera
                ref={cameraRef}
                style={{
                  width: (width / 100) * 80,
                  height: (width / 100) * 90,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
                captureAudio={false}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.on}>
                <Image
                  source={require('../../assets/images/user.png')}
                  resizeMode={'contain'}
                  style={{
                    width: '100%',
                    height: '95%',
                  }}
                />
              </RNCamera>
            ) : (
              <ImageBackground
                source={{uri: `data:image/png;base64,${selfie.base64}`}}
                style={{
                  width: (width / 100) * 85,
                  height: (width / 100) * 90,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  onPress={() => {
                    setSelfie({
                      uri: '',
                      name: '',
                      type: '',
                      base64: '',
                    });
                  }}
                  style={{
                    width: '60%',
                    height: moderateScale(40),
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontFamily: Theme.fontFamily.Poppins_Regular,
                    fontSize: moderateScale(14),
                    color: Theme.colors.reverseGradient[0],
                    backgroundColor: 'white',
                    borderRadius: moderateScale(10),
                    marginBottom: moderateScale(20),
                    borderWidth: moderateScale(1),
                    borderColor: Theme.colors.reverseGradient[0],
                  }}>
                  Capture Again?
                </Text>
              </ImageBackground>
            )}
          </View>
          <Text
            style={[
              styles.redText,
              {
                color: 'red',
              },
            ]}>
            We will not make this public. It's kept PRIVATE😊.
          </Text>
        </View>
      </View>
    );
  };
  const twelve = () => {
    return (
      <View style={styles.innerViewCont}>
        <Customback
          onPress={() => {
            setNO(10);
          }}
        />
        <View style={styles.photoTab}>
          <Text style={styles.photoTitle}>Upload your Pictures</Text>
          <Text
            style={{
              fontFamily: Theme.fontFamily.Poppins_Regular,
              color: 'black',
              marginBottom: 10,
            }}>
            Please share your recent pictures for a perfect match
          </Text>
          <View style={styles.photoCont}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedImage(0);
                camera.current.open();
              }}
              style={styles.bigTab}>
              {image.length !== 0 ? (
                <Image source={{uri: image?.uri}} style={styles.imageStyle} />
              ) : (
                <Image
                  source={require('../../assets/images/placeholderImage.png')}
                  style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    marginLeft: 20,
                  }}
                  resizeMode={'contain'}
                />
              )}
            </TouchableOpacity>
            <View style={styles.smallTabsCont}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedImage(image1 ? 11 : 1);
                  camera.current.open();
                }}
                style={styles.smallTabs}>
                {image1.length !== 0 ? (
                  <Image
                    source={{uri: image1?.uri}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/placeholderImage.png')}
                    style={{
                      width: 80,
                      height: 80,
                      alignSelf: 'center',
                      marginLeft: 10,
                    }}
                    resizeMode={'contain'}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedImage(images ? 22 : 2);
                  camera.current.open();
                }}
                style={styles.smallTabs}>
                {image2.length !== 0 ? (
                  <Image
                    source={{uri: image2?.uri}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/placeholderImage.png')}
                    style={{
                      width: 80,
                      height: 80,
                      alignSelf: 'center',
                      marginLeft: 10,
                    }}
                    resizeMode={'contain'}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageBottomTabs}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedImage(image3 ? 33 : 3);
                camera.current.open();
              }}
              style={[styles.smallTabs, {height: '100%', width: '32%'}]}>
              {image3.length !== 0 ? (
                <Image source={{uri: image3?.uri}} style={styles.imageStyle} />
              ) : (
                <Image
                  source={require('../../assets/images/placeholderImage.png')}
                  style={{
                    width: 80,
                    height: 80,
                    alignSelf: 'center',
                    marginLeft: 10,
                  }}
                  resizeMode={'contain'}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedImage(image4 ? 44 : 4);
                camera.current.open();
              }}
              style={[styles.smallTabs, {height: '100%', width: '32%'}]}>
              {image4.length !== 0 ? (
                <Image source={{uri: image4?.uri}} style={styles.imageStyle} />
              ) : (
                <Image
                  source={require('../../assets/images/placeholderImage.png')}
                  style={{
                    width: 80,
                    height: 80,
                    alignSelf: 'center',
                    marginLeft: 10,
                  }}
                  resizeMode={'contain'}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedImage(image5 ? 55 : 5);
                camera.current.open();
              }}
              style={[styles.smallTabs, {height: '100%', width: '32%'}]}>
              {image5.length !== 0 ? (
                <Image
                  loadingIndicatorSource={require('../../assets/images/loadingimage.gif')}
                  source={{uri: image5?.uri}}
                  style={styles.imageStyle}
                />
              ) : (
                <Image
                  source={require('../../assets/images/placeholderImage.png')}
                  style={{
                    width: 80,
                    height: 80,
                    alignSelf: 'center',
                    marginLeft: 10,
                  }}
                  resizeMode={'contain'}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{width: '70%'}}>
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Regular,
                  color: 'black',
                  fontSize: 20,
                }}>
                Blur my photo
              </Text>
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Regular,
                  color: Theme.colors.primary,
                  fontSize: 12,
                }}>
                Are you sure?{' '}
                <Text style={{color: 'black'}}>
                  Profiles with visible photos get 300% more matches
                </Text>
              </Text>
            </View>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? Theme.colors.primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsEnabled}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    );
  };
  const thirteen = () => {
    return (
      <View style={styles.innerViewCont}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Customback
            onPress={() => {
              setNO(9);
            }}
            marginBottom={0}
          />
          <Text
            style={{
              fontFamily: Theme.fontFamily.Poppins_Regular,
              color: 'black',
              marginTop: 15,
              borderRadius: 50,
              borderWidth: 0.5,
              paddingHorizontal: 10,
              paddingVertical: 3,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}
            onPress={() => {
              setNO(13);
            }}>
            Skip
          </Text>
        </View>
        <Image
          style={{width: 60, height: 60, marginVertical: 30}}
          resizeMode={'contain'}
          source={require('../../assets/images/circleLogo.png')}
        />
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            fontSize: 12,
            color: 'black',
          }}>
          Wanna speed up your partner search experience
        </Text>
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            fontSize: 24,
            color: 'black',
          }}>
          Upgade to Premium!
        </Text>
        <Image
          style={{height: Dimensions.get('screen').height / 2, width: '100%'}}
          source={require('../../assets/images/planss.png')}
          resizeMode={'contain'}
        />
      </View>
    );
  };
  const forteen = () => {
    return (
      <View style={styles.innerViewCont}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Customback
            onPress={() => {
              setNO(13);
            }}
            marginBottom={0}
          />
          <Text
            style={{
              fontFamily: Theme.fontFamily.Poppins_Regular,
              color: 'black',
              marginTop: 15,
              borderRadius: 50,
              borderWidth: 0.5,
              paddingHorizontal: 10,
              paddingVertical: 3,
            }}
            onPress={() => {
              register();
            }}>
            Skip
          </Text>
        </View>
        <Text style={styles.topText}>
          We have some Matches for you let's get started by connecting with few
          of your Matches.
        </Text>

        {/* <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
          <Text
            style={{
              color: 'black',
              fontFamily: Theme.fontFamily.Poppins_Regular,
            }}>
            Select All{'  '}
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
              paddingHorizontal: 5,
            }}
            onPress={() => {
              setSelectAll(!selectAll);
            }}>
            <Text
              style={{
                fontSize: 10,
                padding: 0,
                color: selectAll ? 'black' : 'transparent',
              }}>
              ✓
            </Text>
          </TouchableOpacity>
        </View> */}
        <View>
          <FlatList renderItem={renderRecommed} data={data1} />
        </View>
      </View>
    );
  };

  const renderRecommed = ({item}) => {
    return (
      <View style={styles.renderRecommendation}>
        <Image
          style={styles.recommendationImage}
          source={{uri: item.profile_picture}}
        />
        <View style={{marginVertical: 5, width: '60%'}}>
          <Text style={styles.recommndationName}>{item.full_name}</Text>
          <Text style={styles.recommendDes}>
            Age: {getAge(moment(item.age).format('l'))} yrs
          </Text>
          <Text style={styles.recommendDes}>{item.profession}</Text>
          <Text style={styles.recommendDes}>{item.religion}</Text>
          <Text style={styles.recommendDes}>Lives in {item.address}</Text>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 5,
            paddingHorizontal: 5,
            height: 20,
            marginTop: 10,
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setSelectAll(!selectAll);
          }}>
          <Text
            style={{
              fontSize: 10,
              padding: 0,
              color: 'transparent',
            }}>
            ✓
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const takePicture = async () => {
    // if (cameraRef) {
    const options = {quality: 0.5, base64: true};
    const data = await cameraRef.current.takePictureAsync(options);
    if (data) {
      console.log(data);
      var filename = data.uri.replace(/^.*[\\\/]/, '');
      setSelfie({
        uri: data.uri,
        type: 'image/jpg',
        name: filename,
        base64: data.base64,
      });
    }
    // }
  };
  // button handler

  const handleButtonPress = () => {
    switch (no) {
      case -1: {
        handleZeroButtonPress();
        break;
      }
      case 0: {
        handleFirstButtonPress();
        break;
      }
      case 1: {
        handleSecondButtonPress();
        break;
      }
      case 2: {
        handleThirdButtonPress();
        break;
      }
      case 3: {
        handleFourthButtonPress();
        break;
      }
      case 4: {
        handleFifthButtonPress();
        break;
      }
      case 5: {
        handleSixthButtonPress();
        break;
      }
      case 6: {
        handleSeventhButtonPress();
        break;
      }
      case 7: {
        handleEighthButtonPress();
        break;
      }
      case 8: {
        handleNinthButtonPress();
        break;
      }
      case 9: {
        handleTenthButtonPress();
        break;
      }
      case 10: {
        handleEleventhButtonPress();
        break;
      }
      case 11: {
        handleTwelthButtonPress();
        break;
      }
      case 12: {
        handleThirteenButtonPress();
        break;
      }
      case 13: {
        handleForteeneenButtonPress();
        break;
      }

      default: {
        break;
      }
    }
  };

  const handleZeroButtonPress = () => {
    if (email === '' || email === undefined) {
      ShowSnackBar('Please enter the email', 'red');
    } else if (password === '') {
      ShowSnackBar('Please enter the password', 'red');
    } else {
      setNO(0);
    }
  };

  const handleFirstButtonPress = () => {
    if (profileFor === '') {
      ShowSnackBar('Please choose one option...', 'red');
    } else {
      setNO(1);
    }
  };

  const handleSecondButtonPress = () => {
    if (selected === '') {
      ShowSnackBar('Please Specify your Gender...', 'red');
    } else {
      setNO(2);
    }
  };

  const handleThirdButtonPress = () => {
    if (lookingFor === '') {
      ShowSnackBar('Please Specify what you are looking for...', 'red');
    } else {
      setNO(3);
      handleGetData();
    }
  };

  const handleFourthButtonPress = () => {
    setNO(4);
  };

  const handleFifthButtonPress = () => {
    if (firstName.length === 0 || lastname.length === 0) {
      ShowSnackBar('Please Fill all Fields...', 'red');
    } else {
      setNO(5);
    }
  };

  const handleSixthButtonPress = () => {
    if (
      maritalStatus === 'Select' ||
      diet === 'Select' ||
      height === 'Select' ||
      state === 'Select' ||
      city === 'Select'
    ) {
      ShowSnackBar('Please select the mendatory options...', 'red');
    } else {
      setNO(6);
    }
  };

  const handleSeventhButtonPress = () => {
    if (
      community === 'Community' ||
      Religion === 'Religion' ||
      language === 'Language' ||
      oftnePray === 'How Often you Pray' ||
      hobbyData.length === 0
    ) {
      ShowSnackBar('Please select the mendatory options...', 'red');
    } else {
      setNO(7);
    }
  };

  const handleEighthButtonPress = () => {
    if (qualification === 'Qualification' || company === '' || asA === 'As a') {
      ShowSnackBar('Please Fill all fields...', 'red');
    } else {
      setNO(8);
    }
  };

  const handleNinthButtonPress = () => {
    if (aboutYourSelf === '') {
      ShowSnackBar('Please Fill all fields...', 'red');
    } else {
      setNO(9);
    }
  };
  const handleTenthButtonPress = () => {
    if (fatherStatus === '' || motherStatus === '' || siblings === '') {
      ShowSnackBar('Please Fill all fields...', 'red');
    } else {
      setNO(10);
    }
  };
  const handleEleventhButtonPress = () => {
    if (selfie.uri === '') {
      takePicture();
    } else {
      setNO(11);
    }
  };
  const handleTwelthButtonPress = () => {
    if (image.length === 0) {
      ShowSnackBar('Pick atleast one picture...', 'red');
    } else {
      setNO(12);
    }
  };
  const handleThirteenButtonPress = () => {
    navigation.navigate('MembershipScreen');
  };

  const handleForteeneenButtonPress = () => {
    register();
    // handleGetData();
  };

  // pictures fuctions
  const handleCamera = async () => {
    camera.current.close();
    ImagePicker.openCamera({
      mediaType: 'photo',
    }).then(image => {
      console.log(image);
      var filename = image.path.replace(/^.*[\\\/]/, '');
      const data = {type: image.mime, uri: image.path, name: filename};
      handleImage(data);
    });
  };
  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      var filename = image.path.replace(/^.*[\\\/]/, '');
      const data = {
        type: image.mime,
        uri: Platform.OS === 'ios' ? image.sourceURL : image.path,
        name: filename,
      };
      handleImage(data);
      camera.current.close();
    });
  };
  const handleImage = data => {
    switch (selectedImage) {
      case 0: {
        setImage(data);
        const img = images;
        img.push(data);
        setImages(img);
        break;
      }
      case 11: {
        setImage1(data);
        const img = images;
        img.push(data);
        setImages(img);
        break;
      }
      case 22: {
        setImage2(data);
        const img = images;
        img.push(data);
        setImages(img);
        break;
      }
      case 33: {
        setImage3(data);
        const img = images;
        img.push(data);
        setImages(img);
        break;
      }
      case 44: {
        setImage4(data);
        const img = images;
        img.push(data);
        setImages(img);
        break;
      }
      case 55: {
        setImage5(data);
        const img = images;
        img.push(data);
        setImages(img);
        break;
      }
      default: {
        let temp = images;
        temp.splice(images.length + 1, 0, data);
        setImages(temp);
        setSelectedImage('');
        break;
      }
    }
    console.log(images);
  };

  return (
    <LinearGradient
      colors={no === 13 ? ['white', 'white'] : ['#F5F5EB', '#DB9391']}
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(100),
        }}
        scrollEnabled={true}>
        {no === -1
          ? zero()
          : no === 0
          ? first()
          : no === 1
          ? second()
          : no === 2
          ? third()
          : no === 3
          ? fourth()
          : no === 4
          ? fifth()
          : no === 5
          ? sixth()
          : no === 6
          ? seventh()
          : no === 7
          ? eighth()
          : no === 8
          ? ninth()
          : no === 9
          ? tenth()
          : no === 10
          ? elevth()
          : no === 11
          ? twelve()
          : no === 12
          ? thirteen()
          : no === 13 && forteen()}
        <View
          style={{
            marginVertical: moderateScale(30),
          }}></View>
      </ScrollView>
      {no !== 3 && (
        <CustomButton
          tag={
            no === 6
              ? 'Confirm'
              : no === 10
              ? selfie.uri === ''
                ? 'Click'
                : 'Continue'
              : no === 12
              ? 'View Plans'
              : no === 13
              ? `Let's get Connected`
              : 'Continue'
          }
          radius={50}
          stylees={{position: 'absolute', bottom: 10}}
          onPress={() => handleButtonPress()}
        />
      )}
      <RBSheet
        ref={camera}
        height={moderateScale(150)}
        customStyles={styles.cameraStyles}>
        <Text onPress={() => handleCamera()} style={styles.bottomSheetButton}>
          Open Camera
        </Text>
        <Text
          onPress={() => handleGallery()}
          style={[styles.bottomSheetButton, styles.bottomBottomButton]}>
          Open Gallery
        </Text>
      </RBSheet>
      <CustomActivity show={showActivity} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  topHeading: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(30),
  },
  topDescription: {
    color: 'grey',
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  redText: {
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: 'black',
  },
  inputFieldText: {
    backgroundColor: 'transparent',
    paddingHorizontal: moderateScale(5),
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginTop: 10,
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(22),
    height: moderateScale(50),
    alignItems: 'flex-start',
    width: '50%',
  },
  firstBox: {
    color: 'black',
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  firstBoxSecondText: {
    color: 'grey',
    fontSize: moderateScale(13),
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  firstBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(10),
    marginTop: 20,
    elevation: 10,
    backgroundColor: 'white',
  },
  fourthHeading: {
    color: 'black',
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    marginTop: moderateScale(10),
  },
  dropDownText: {
    color: 'grey',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
  },
  dropDownContainer: {
    width: (width / 100) * 85,
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden',
    marginTop: moderateScale(5),
  },
  dropDownContainerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(30),
    width: '100%',
    height: '100%',
  },
  containerStyle: {
    // backfaceVisibility: 'red',
    width: (width / 100) * 85,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    borderWidth: 1,
    borderColor: 'grey',
    elevation: 10,
  },
  textContainerStyle: {
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowR: {
    borderWidth: 1,
    width: moderateScale(15),
    height: moderateScale(15),
    borderRadius: 100,
    borderColor: '#D2D2D4',
    padding: moderateScale(1),
    marginRight: moderateScale(10),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
  },
  firstImage: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  manButton: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 6,
    alignSelf: 'flex-end',
    paddingHorizontal: 13,
    marginTop: 10,
  },
  innerViewCont: {
    paddingHorizontal: (width / 100) * 8,
  },
  photoTab: {
    width: Theme.size.width,
    alignSelf: 'center',
    marginTop: 10,
  },
  photoTitle: {
    fontSize: 25,
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: 'black',
  },
  photoCont: {
    width: Theme.size.width,
    height: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigTab: {
    width: '62%',
    height: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
  smallTabsCont: {
    width: '35%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  smallTabs: {
    width: width / 3.3,
    height: '48%',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageBottomTabs: {
    width: Theme.size.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: width / 3.5,
    marginTop: 10,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomSheetButton: {
    height: moderateScale(50),
    width: '90%',
    borderColor: Theme.colors.orange,
    borderWidth: 1,
    paddingLeft: moderateScale(30),
    textAlignVertical: 'center',
    borderRadius: moderateScale(10),
    color: Theme.colors.orange,
    fontFamily: Theme.fontFamily.Poppins_Bold,
    fontSize: moderateScale(16),
    marginVertical: 5,
  },
  cameraStyles: {
    container: {
      backgroundColor: 'white',
      borderTopLeftRadius: moderateScale(20),
      borderTopRightRadius: moderateScale(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  topText: {
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  renderRecommendation: {
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommndationName: {
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: 'black',
    fontSize: 18,
  },
  recommendationImage: {
    height: '100%',
    width: '25%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  recommendDes: {
    fontFamily: Theme.fontFamily.comics,
    color: Theme.colors.gray,
    fontSize: 10,
  },
});

export default Auth;
