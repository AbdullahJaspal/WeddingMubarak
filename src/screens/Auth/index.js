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
import {userRegistration} from '../../redux/actions/auth';
import {CustomActivity} from '../../assets/Components/CustomActivity';

const {width, height} = Dimensions.get('window');

const Auth = ({navigation, route}) => {
  const {field, data} = route.params;
  const dispatch = useDispatch();
  //For styling variables
  const [no, setNO] = useState(0);
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
  const [asAopen, setAsAOPen] = useState(false);
  const [hobbiesOpen, setHobbiesOPen] = useState(false);
  const cameraRef = useRef(null);
  const inputPhone = useRef();
  const [showActivity, setShowActivity] = useState(false);

  // data variables
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
  const [company, setCompany] = useState('');
  const [asA, setAsa] = useState('As a');
  const [country, setCountry] = useState('Country');
  const [aboutYourSelf, setAboutYourSelf] = useState('');
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState({
    uri: '',
    name: '',
    type: '',
    base64: '',
  });
  const [hobbyData, setHobbyData] = useState([]);

  const register = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastname);
    formdata.append('nick_name', nickName);
    formdata.append(field === 'Email' ? 'phone' : 'email', data);
    formdata.append(field === 'Phone' ? 'phone' : 'email', dynamicField);
    formdata.append(
      'looking_for',
      lookingFor === 'My Better Half'
        ? 'HALF'
        : lookingFor === 'Friends'
        ? 'FRIENDS'
        : 'SOCIALIZING',
    );
    formdata.append('gender', selected === 'lady' ? 'LADY' : 'MAN');
    formdata.append('dob', date.toISOString().split('T')[0]);
    formdata.append('martial_status', maritalStatus);
    formdata.append('diet', diet);
    formdata.append('height', height);
    formdata.append('state', state);
    formdata.append('city', city);
    formdata.append('country', country);
    formdata.append('community', community);
    formdata.append('religion', Religion);
    formdata.append('language', language);
    formdata.append('pray', oftnePray);
    formdata.append('qualification', qualification);
    formdata.append('work_with', company);
    formdata.append('work_as', asA);
    formdata.append('about', aboutYourSelf);
    formdata.append('hobbies', JSON.stringify(hobbyData));
    formdata.append('selfie', {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });
    setShowActivity(true);
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
    setNO(1);
    if (field === 'email') {
      setDynamicField('');
    }
  };

  const FrstScrnBtn = ({firstText, secText, image}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setLookingFor(firstText);
        }}
        style={[
          styles.firstBoxContainer,
          lookingFor === firstText && {
            borderColor: Theme.colors.reverseGradient[0],
          },
        ]}>
        <View style={styles.row}>
          <View style={styles.rowR}>
            <View
              style={[
                lookingFor === firstText && {
                  flex: 1,
                  backgroundColor: Theme.colors.reverseGradient[0],
                  borderRadius: 100,
                },
              ]}
            />
          </View>
          <Text style={styles.firstBox}>
            {firstText}
            {'\n'}
            <Text style={styles.firstBoxSecondText}>{secText}</Text>
          </Text>
        </View>
        <Image source={image} style={styles.firstImage} />
      </TouchableOpacity>
    );
  };

  const first = () => {
    return (
      <View
        style={{
          paddingHorizontal: (width / 100) * 5,
        }}>
        <Text style={styles.topHeading}>I'm Looking For</Text>
        <Text style={styles.topDescription}>
          Just select one of the option this selection can be changed later.
        </Text>
        <FrstScrnBtn
          firstText={'My Better Half'}
          secText={'to become my life partner'}
          image={require('../../assets/images/doves.png')}
        />
        <FrstScrnBtn
          firstText={'Friends'}
          secText={'of the same gender'}
          image={require('../../assets/images/make-friends.png')}
        />
        <FrstScrnBtn
          firstText={'Socializing'}
          secText={'Surfing the internet'}
          image={require('../../assets/images/worldwide.png')}
        />
      </View>
    );
  };

  const second = () => {
    return (
      <View
        style={{
          paddingHorizontal: (width / 100) * 5,
        }}>
        <Text style={styles.topHeading}>My Personal Details</Text>

        <TextInput
          placeholder="First Name"
          placeholderTextColor={'grey'}
          style={styles.inputFieldText}
          onChangeText={setFirstName}
          value={firstName}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor={'grey'}
          style={styles.inputFieldText}
          onChangeText={setLastName}
          value={lastname}
        />
        <Text style={styles.redText}>
          We will not make your last name public
        </Text>
        {field === 'Phone' ? (
          <PhoneInput
            containerStyle={styles.containerStyle}
            textContainerStyle={styles.textContainerStyle}
            textInputStyle={{
              height: moderateScale(50),
            }}
            codeTextStyle={{
              height: moderateScale(50),
              textAlignVertical: 'center',
            }}
            ref={inputPhone}
            defaultValue={dynamicField}
            defaultCode="PK"
            layout="first"
            onChangeFormattedText={text => {
              setDynamicField(text);
            }}
          />
        ) : (
          <TextInput
            placeholder={field}
            placeholderTextColor={'grey'}
            style={styles.inputFieldText}
            onChangeText={setDynamicField}
          />
        )}

        <Text
          style={[
            styles.topDescription,
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
          value={nickName}
        />
        <Text style={styles.redText}>Optional</Text>
      </View>
    );
  };

  const third = () => {
    return (
      <View
        style={{
          paddingHorizontal: (width / 100) * 5,
        }}>
        <Text style={styles.topHeading}>My Gender is</Text>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelected('lady')}
          style={{
            width: (width / 100) * 90,
            height: 55,
            backgroundColor: selected === 'lady' ? '#E056A3' : 'white',
            elevation: 10,
            borderRadius: moderateScale(10),
            borderWidth: selected !== 'lady' ? 1 : 0,
            borderColor: 'grey',
            marginTop: moderateScale(10),
            overflow: 'hidden',
          }}>
          <LinearGradient
            colors={
              selected === 'lady'
                ? Theme.colors.reverseGradient
                : ['white', 'white']
            }
            start={{
              x: 0,
              y: 0,
            }}
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: selected === 'lady' ? 'white' : 'black',
                fontSize: moderateScale(15),
                fontFamily: Theme.fontFamily.Poppins_SemiBold,
              }}>
              Women
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelected('man')}
          style={{
            width: (width / 100) * 90,
            height: 55,

            backgroundColor:
              selected === 'man' ? Theme.colors.gradient[0] : 'white',
            elevation: 10,
            borderRadius: moderateScale(10),
            borderWidth: selected !== 'man' ? 1 : 0,
            borderColor: 'grey',
            marginTop: 10,
            overflow: 'hidden',
          }}>
          <LinearGradient
            colors={
              selected === 'man'
                ? Theme.colors.reverseGradient
                : ['white', 'white']
            }
            start={{
              x: 0,
              y: 0,
            }}
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: selected === 'man' ? 'white' : 'black',
                fontSize: moderateScale(15),
                fontFamily: Theme.fontFamily.Poppins_SemiBold,
              }}>
              Man
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  const fourth = () => {
    return (
      <View
        style={{
          paddingHorizontal: (width / 100) * 5,
        }}>
        <Text style={styles.topHeading}>Your Date of Birth</Text>
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
            marginTop: moderateScale(10),
            marginBottom: moderateScale(30),
            alignSelf: 'center',
          }}
        />
      </View>
    );
  };

  const fifth = () => {
    return (
      <View
        style={{
          paddingHorizontal: (width / 100) * 5,
        }}>
        <Text
          style={[
            styles.fourthHeading,
            {
              marginTop: moderateScale(30),
            },
          ]}>
          Your Marital Status
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
              width: (width / 100) * 90,
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
              width: (width / 100) * 90,
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
              width: (width / 100) * 90,
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
              width: (width / 100) * 90,
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
              width: (width / 100) * 90,
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

  const sixth = () => {
    return (
      <View
        style={{
          paddingHorizontal: (width / 100) * 5,
        }}>
        <View
          style={[
            styles.dropDownContainer,
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
              width: (width / 100) * 90,
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
              width: (width / 100) * 90,
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
              width: (width / 100) * 90,
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
              width: (width / 100) * 90,
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
        <View
          style={[
            styles.dropDownContainer,
            hobbiesOpen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={hobbiesData}
            multipleSelect={true}
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
                    width: (width / 100) * 90,
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
                    }}>
                    {option}
                  </Text>
                  <Text
                    style={{
                      color:
                        temp.length !== 0
                          ? Theme.colors.reverseGradient[0]
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
              width: (width / 100) * 90,
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

        <Text style={[styles.redText]}>All fields are mandatory*</Text>
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
            height: moderateScale(40),
            justifyContent: 'flex-start',
            borderRadius: 100,
            alignItems: 'center',
            paddingLeft: moderateScale(10),
            borderWidth: 0.5,
            borderColor: 'grey',
            backgroundColor: 'white',
            elevation: moderateScale(2),
            marginVertical: moderateScale(3),
            marginRight: moderateScale(10),
          },
        ]}>
        <View style={styles.rowR}>
          <View
            style={[
              {
                flex: 1,
                backgroundColor: Theme.colors.reverseGradient[0],
                borderRadius: 100,
              },
            ]}
          />
        </View>
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
      <View
        style={{
          paddingHorizontal: (width / 100) * 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              // fontWeight: '600',
              fontSize: moderateScale(18),
              color: 'black',
              fontFamily: Theme.fontFamily.Poppins_SemiBold,
            }}>
            We know you are{'\n'}
            <Text
              style={{
                fontSize: moderateScale(14),
              }}>
              getting annoyed now!
            </Text>
          </Text>
          <Animatable.Image
            animation="tada"
            easing="ease-out"
            iterationCount={3}
            iterationDelay={1000}
            source={require('../../assets/images/annyoed.png')}
            resizeMode="contain"
            style={{
              width: moderateScale(80),
              height: moderateScale(80),
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            elevation: moderateScale(10),
            borderRadius: moderateScale(15),
            alignItems: 'center',
            justifyContent: 'center',
            width: (width / 100) * 85,
            alignSelf: 'center',
            paddingVertical: moderateScale(10),
            marginTop: moderateScale(20),
          }}>
          <Text
            style={{
              // fontWeight: 'bold',
              fontSize: moderateScale(22),
              color: 'black',
              fontFamily: Theme.fontFamily.Poppins_Bold,
            }}>
            Just a few more steps!
          </Text>
          <Text
            style={{
              // fontWeight: '600',
              fontSize: moderateScale(14),
              color: 'black',
              fontFamily: Theme.fontFamily.Poppins_Medium,
            }}>
            so we can find perfect match for you!
          </Text>
        </View>
        <Text
          style={[
            styles.topDescription,
            {
              textAlign: 'center',
              marginTop: moderateScale(20),
            },
          ]}>
          Please add your education and career details
        </Text>
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
              width: (width / 100) * 90,
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
          style={styles.inputFieldText}
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
              width: (width / 100) * 90,
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

  const eighth = () => {
    return (
      <View
        style={{
          paddingHorizontal: (width / 100) * 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.topHeading,
              {
                fontSize: moderateScale(22),
              },
            ]}>
            Great Job!
          </Text>
          <Animatable.Image
            animation="wobble"
            easing="ease-out"
            iterationCount={3}
            iterationDelay={1000}
            source={require('../../assets/images/greatJob.png')}
            resizeMode="contain"
            style={{
              width: moderateScale(55),
              height: moderateScale(55),
              bottom: moderateScale(10),
            }}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            // fontWeight: '500',
            fontSize: moderateScale(14),
            fontFamily: Theme.fontFamily.Poppins_Medium,
          }}>
          You are almost done just one last step!
        </Text>
        <Text
          style={[
            styles.topDescription,
            {
              marginTop: moderateScale(10),
            },
          ]}>
          Hey! Now we need some basic details about you
        </Text>
        <View
          style={[
            styles.dropDownContainer,
            qualificationOPen && {
              borderRadius: 0,
            },
          ]}>
          <ModalDropdown
            options={countryData}
            onDropdownWillShow={() => setQualificationOPen(true)}
            onDropdownWillHide={() => setQualificationOPen(false)}
            onSelect={index => {
              setCountry(countryData[index]);
            }}
            dropdownStyle={{
              width: (width / 100) * 90,
            }}
            style={{
              wid: '100%',
              height: '100%',
            }}>
            <View style={styles.dropDownContainerWrapper}>
              <Text
                style={[
                  styles.dropDownText,
                  country !== 'Country' && {
                    color: 'black',
                  },
                ]}>
                {country}
              </Text>
              <AntDesign name={qualificationOPen ? 'caretup' : 'caretdown'} />
            </View>
          </ModalDropdown>
        </View>
        <Text
          style={[
            styles.topHeading,
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
            borderWidth: 0.5,
            borderColor: 'grey',
            borderRadius: moderateScale(10),
            height: moderateScale(100),
            textAlignVertical: 'top',
          }}
          placeholder="Start typing here"
          placeholderTextColor={'#7E7F82'}
        />
        <Text
          style={{
            textAlign: 'center',
            marginTop: moderateScale(100),
            color: '#6D6E72',
            fontSize: moderateScale(14),
            fontFamily: Theme.fontFamily.Poppins_Regular,
          }}>
          By creating account, you agree to our{'\n'}
          <Text
            style={{
              color: '#EB1B7B',
              fontFamily: Theme.fontFamily.Poppins_Italic,
            }}>
            Privacy Policy
          </Text>{' '}
          and{' '}
          <Text
            style={{
              color: '#EB1B7B',
              fontFamily: Theme.fontFamily.Poppins_Italic,
            }}>
            T&C
          </Text>
        </Text>
      </View>
    );
  };

  const ninth = () => {
    return (
      <View
        style={{
          paddingHorizontal: (width / 100) * 5,
        }}>
        <Text style={styles.topHeading}>Selfie Verification</Text>
        <Text style={styles.topDescription}>
          we use selfies for to verify that this profile is yours to keep our
          community safe and authentic.
        </Text>
        <View
          style={{
            width: (width / 100) * 90,
            height: (width / 100) * 90,
            borderRadius: moderateScale(20),
            marginTop: moderateScale(20),
            overflow: 'hidden',
          }}>
          {image.base64 === '' ? (
            <RNCamera
              ref={cameraRef}
              style={{
                width: (width / 100) * 90,
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
              source={{uri: `data:image/png;base64,${image.base64}`}}
              style={{
                width: (width / 100) * 90,
                height: (width / 100) * 90,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text
                onPress={() => {
                  setImage({
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
        <Text style={styles.redText}>
          We will not make this public. It's kept PRIVATE😊.
        </Text>
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
      setImage({
        uri: data.uri,
        type: 'image/jpg',
        name: filename,
        base64: data.base64,
      });
    }
    // }
  };

  const handleButtonPress = () => {
    switch (no) {
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
      default: {
        break;
      }
    }
  };

  const handleFirstButtonPress = () => {
    if (lookingFor === '') {
      ShowSnackBar('Please choose one option...', 'red');
    } else {
      setNO(1);
    }
  };

  const handleSecondButtonPress = () => {
    if (
      firstName.length === 0 ||
      lastname.length === 0 ||
      dynamicField.length === 0
    ) {
      ShowSnackBar('Please Fill all Fields...', 'red');
    } else {
      if (field === 'Email') {
        const emailFormat =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (dynamicField.match(emailFormat)) {
          setNO(2);
        } else {
          ShowSnackBar('Entered email is not valid...', 'red');
        }
      } else {
        if (inputPhone.current?.isValidNumber(dynamicField) === true) {
          setNO(2);
        } else {
          ShowSnackBar('Entered number is not valid...', 'red');
        }
      }
    }
  };

  const handleThirdButtonPress = () => {
    if (selected === '') {
      ShowSnackBar('Please Specify your Gender...', 'red');
    } else {
      setNO(3);
    }
  };

  const handleFourthButtonPress = () => {
    setNO(4);
  };

  const handleFifthButtonPress = () => {
    if (
      maritalStatus === 'Select' ||
      diet === 'Select' ||
      height === 'Select' ||
      state === 'Select' ||
      city === 'Select'
    ) {
      ShowSnackBar('Please select the mendatory options...', 'red');
    } else {
      setNO(5);
    }
  };

  const handleSixthButtonPress = () => {
    if (
      community === 'Community' ||
      Religion === 'Religion' ||
      language === 'Language' ||
      oftnePray === 'How Often you Pray' ||
      hobbyData.length === 0
    ) {
      ShowSnackBar('Please select the mendatory options...', 'red');
    } else {
      setNO(6);
    }
  };

  const handleSeventhButtonPress = () => {
    if (qualification === 'Qualification' || company === '' || asA === 'As a') {
      ShowSnackBar('Please Fill all fields...', 'red');
    } else {
      setNO(7);
    }
  };

  const handleEighthButtonPress = () => {
    if (country === 'Country' || aboutYourSelf === '') {
      ShowSnackBar('Please Fill all fields...', 'red');
    } else {
      setNO(8);
    }
  };

  const handleNinthButtonPress = () => {
    if (image.uri === '') {
      takePicture();
    } else {
      register();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(100),
        }}>
        <Header
          leftOPacity={no === 0 ? 0 : 1}
          leftOnpress={() => {
            if (no !== 0) {
              setNO(no - 1);
            }
          }}
        />
        <View
          style={{
            width: (width / 100) * 80,
            backgroundColor: '#D2D2D4',
            height: moderateScale(4),
            borderRadius: 100,
            overflow: 'visible',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center',
            marginVertical: moderateScale(30),
          }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k, kindex) => {
            return kindex <= no ? (
              <LinearGradient
                colors={['#DF569E', '#3D1E57']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  width: moderateScale(20),
                  height: moderateScale(20),
                  borderWidth: moderateScale(2),
                  borderColor: '#E7E8EA',
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            ) : (
              <View
                style={{
                  width: moderateScale(20),
                  height: moderateScale(20),
                  borderWidth: moderateScale(2),
                  borderColor: '#E7E8EA',
                  borderRadius: 100,
                  backgroundColor: '#E7E8EA',
                }}
              />
            );
          })}
        </View>

        {no === 0
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
          : no === 8 && ninth()}
        <View
          style={{
            marginVertical: moderateScale(30),
          }}>
          <CustomButton
            tag={
              no === 6
                ? 'Create Account'
                : no === 7
                ? image.uri === ''
                  ? 'Click'
                  : 'Continue'
                : 'Continue'
            }
            onPress={() => handleButtonPress()}
          />
        </View>
      </ScrollView>
      <CustomActivity show={showActivity} />
    </View>
  );
};

const styles = StyleSheet.create({
  topHeading: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Bold,
    fontSize: moderateScale(20),
  },
  topDescription: {
    color: 'grey',
    fontSize: moderateScale(12),
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  redText: {
    color: '#E74DAC',
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_MediumItalic,
  },
  inputFieldText: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(30),
    borderWidth: 1,
    borderColor: 'grey',
    elevation: 10,
    marginTop: 10,
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
    height: moderateScale(50),
  },
  firstBox: {
    color: 'black',
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
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
    fontSize: moderateScale(14),
    fontFamily: Theme.fontFamily.Poppins_Medium,
    marginTop: moderateScale(10),
  },
  dropDownText: {
    color: 'grey',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
  },
  dropDownContainer: {
    width: (width / 100) * 90,
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    elevation: moderateScale(10),
    borderWidth: 0.5,
    borderColor: 'grey',
    overflow: 'hidden',
    marginTop: moderateScale(10),
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
    width: (width / 100) * 90,
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
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: 100,
    borderColor: '#D2D2D4',
    overflow: 'hidden',
    padding: moderateScale(1),
    marginRight: moderateScale(10),
  },
  firstImage: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});

export default Auth;
