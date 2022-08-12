import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import {moderateScale} from '../../../Theme/Dimensions';
import Theme from '../../../Theme/Theme';
import {Icon} from '@rneui/base';
import {useFocusEffect} from '@react-navigation/native';
import {CustomActivity} from '../../../assets/Components/CustomActivity';
import {useSelector, useDispatch} from 'react-redux';
import {
  savedata,
  userGetProfile,
  userUpdateProfile,
} from '../../../redux/actions/auth';
import ModalDropdown from 'react-native-modal-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {
  asAData,
  communityData,
  heightData,
  hobbiesData,
  qualificationData,
} from '../../Auth/DropDonwValues';

const {width} = Dimensions.get('window');

const CustomDropDown = ({open, setOpen, data, setData, show, multiple}) => {
  return (
    <View
      style={[
        styles.dropDownContainer,
        open && {
          borderRadius: 0,
        },
      ]}>
      {multiple ? (
        <ModalDropdown
          options={data}
          onDropdownWillShow={() => setOpen(true)}
          onDropdownWillHide={() => setOpen(false)}
          multipleSelect={true}
          renderRow={option => {
            let temp = show.filter(f => f === option);
            return (
              <View
                style={{
                  width: (((width / 100) * 90) / 100) * 90,
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
          onSelect={index => {
            let temporay = show.filter(f => f === data[index]);
            if (temporay.length !== 0) {
              setData(show.filter(f => f !== data[index]));
            } else {
              let temp = show.push(data[index]);
            }
          }}
          dropdownStyle={{
            width: (((width / 100) * 90) / 100) * 90,
          }}
          style={{
            wid: '100%',
            height: '100%',
          }}>
          <View style={styles.dropDownContainerWrapper}>
            <Text style={[styles.dropDownText]}>
              {multiple !== true ? show : 'Hobbies'}
            </Text>
            <AntDesign name={open ? 'caretup' : 'caretdown'} />
          </View>
        </ModalDropdown>
      ) : (
        <ModalDropdown
          options={data}
          onDropdownWillShow={() => setOpen(true)}
          onDropdownWillHide={() => setOpen(false)}
          onSelect={index => {
            setData(data[index]);
          }}
          dropdownStyle={{
            width: (((width / 100) * 90) / 100) * 90,
          }}
          style={{
            wid: '100%',
            height: '100%',
          }}>
          <View style={styles.dropDownContainerWrapper}>
            <Text style={[styles.dropDownText]}>
              {show === 'null' ? '' : show}
            </Text>
            <AntDesign name={open ? 'caretup' : 'caretdown'} />
          </View>
        </ModalDropdown>
      )}
    </View>
  );
};

const CardContainer = ({heading, component}) => {
  return (
    <View
      style={{
        borderWidth: 0.5,
        paddingBottom: moderateScale(20),
        borderRadius: moderateScale(10),
        borderColor: Theme.colors.orange,
        width: (width / 100) * 90,
        marginTop: moderateScale(20),
      }}>
      <Text
        style={[
          {
            color: 'white',
            backgroundColor: Theme.colors.orange,
            textAlign: 'center',
            fontSize: Theme.fontSize.title,
            fontFamily: Theme.fontFamily.Poppins_Bold,
            borderTopLeftRadius: moderateScale(10),
            borderTopRightRadius: moderateScale(10),
            height: moderateScale(45),
            textAlignVertical: 'center',
          },
        ]}>
        {heading}
      </Text>
      {component()}
    </View>
  );
};

const RowButton = ({
  value,
  setValue,
  firstPossible,
  secPossible,
  FirstTag,
  SecTag,
}) => {
  return (
    <View style={styles.genderButtonCont}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.genderButton,
          {
            backgroundColor:
              value === firstPossible ? Theme.colors.orange : '#dedbd9',
          },
        ]}
        onPress={() => {
          setValue(firstPossible);
        }}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            color: value === firstPossible ? 'white' : 'grey',
          }}>
          {FirstTag}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.genderButton,
          {
            backgroundColor:
              value === secPossible ? Theme.colors.orange : '#dedbd9',
          },
        ]}
        onPress={() => {
          setValue(secPossible);
        }}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.Poppins_Regular,
            color: value === secPossible ? 'white' : 'grey',
          }}>
          {SecTag}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const getAge = dob => {
  var date_of_birth = new Date(dob);
  //calculate month difference from current date in time
  var month_diff = Date.now() - date_of_birth.getTime();

  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);

  //extract year from date
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  var age = Math.abs(year - 1970);

  return age;
};

const EditProfile = ({navigation}) => {
  const {userData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lookingFor, setLookingFor] = useState(userData.lookingFor);
  const [gender, setGender] = useState(userData.gender);
  const [dob, setDob] = useState(userData.date_of_birth);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [diet, setDiet] = useState('');
  const [height, setHeight] = useState(userData.height);
  const [state, setState] = useState('');
  const [city, setCity] = useState(userData.city);
  const [country, setCountry] = useState('');
  const [community, setCommunity] = useState(userData.community);
  const [religon, setReligon] = useState('');
  const [language, setLanguage] = useState('');
  const [pray, setPray] = useState('');
  const [hobbies, setHobbies] = useState(
    userData.hobbies === 'none'
      ? []
      : JSON.parse(typeof userData.hobbies === 'string'),
  );
  const [education, setEducation] = useState(userData.qualification);
  const [workWith, setWorkWith] = useState(userData.work_with);
  const [workAs, setWorkAs] = useState(userData.work_as);
  const [bio, setBio] = useState(userData.bio);
  const [smoking, setSmoking] = useState(userData.smoke);
  const [drinking, setDrinking] = useState(userData.drink);
  const [relocate, setRelocate] = useState(userData.relocate === null && 'No');
  const [disable, setDisable] = useState(false);
  const [family, setFamily] = useState('');
  const [showActivity, setShowActivity] = useState(false);
  const [selfie, setSelfie] = useState(userData.selfie);

  const [images, setImages] = useState(userData.images || []);
  const [response, setResponse] = useState({});
  const [heightOpen, setHeightOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [communityOpen, setCommunityOPen] = useState(false);
  const [hobbiesOpen, setHobbiesOPen] = useState(false);
  const [relocateOpen, setRelocateOpen] = useState(false);
  const [worksAsOpen, setWorksAsOpen] = useState(false);
  const [lookingForOPen, setLookingForOpen] = useState(false);
  const datePIckerOpen = useRef();
  const [date, setDate] = useState(new Date());
  const camera = useRef();
  const [selectedImage, setSelectedImage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, []),
  );

  const getProfile = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    console.log(formdata);
    setShowActivity(true);
    dispatch(userGetProfile(formdata, onSuccessProfile, onErrorProfile));
  };
  const onSuccessProfile = res => {
    setResponse(res);
    dispatch(savedata(res));
    setShowActivity(false);
  };

  const onErrorProfile = err => {
    setShowActivity(false);
    console.log(err);
  };

  const hobbiesRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setHobbies(hobbies.filter((f, findex) => findex !== index));
        }}
        style={styles.row}>
        <View style={styles.rowR} />
        <Text numberOfLines={1} style={styles.firstBox}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

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
        setSelfie(data);
        break;
      }
      case 11: {
        let temp = images.map((k, kindex) => {
          if (kindex === 0) {
            return data;
          } else return k;
        });
        setImages(temp);
        break;
      }
      case 22: {
        let temp = images.map((k, kindex) => {
          if (kindex === 1) {
            return data;
          } else return k;
        });
        setImages(temp);
        break;
      }
      case 33: {
        let temp = images.map((k, kindex) => {
          if (kindex === 2) {
            return data;
          } else return k;
        });
        setImages(temp);
        break;
      }
      case 44: {
        let temp = images.map((k, kindex) => {
          if (kindex === 3) {
            return data;
          } else return k;
        });
        setImages(temp);
        break;
      }
      case 55: {
        let temp = images.map((k, kindex) => {
          if (kindex === 4) {
            return data;
          } else return k;
        });
        setImages(temp);
        break;
      }
      case 66: {
        let temp = images.map((k, kindex) => {
          if (kindex === 5) {
            return data;
          } else return k;
        });
        setImages(temp);
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

  const handleSave = () => {
    setShowActivity(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'multipart/encrypted');

    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('user_uid', userData.uid);
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastName);
    formdata.append(
      'looking_for',
      lookingFor === 'My Better Half'
        ? 'HALF'
        : lookingFor === 'Friends'
        ? 'FRIENDS'
        : 'SOCIALIZING',
    );
    formdata.append('gender', gender);
    formdata.append('dob', dob);
    formdata.append('height', height);
    formdata.append('about', bio);
    formdata.append('hobbies', JSON.stringify(hobbies));
    formdata.append('qualification', education);
    formdata.append('smoke', smoking);
    formdata.append('drink', drinking);
    formdata.append('relocate', relocate);
    formdata.append(
      'selfie',
      selfie?.uri
        ? selfie
        : {
            uri: selfie,
            name: selfie?.replace(/^.*[\\\/]/, ''),
            type: `image/${selfie.replace(/^.*[\\\/]/, '').split('.')[1]}`,
          },
    );
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
    } else {
      formdata.append('images[]', []);
    }
    console.log(formdata);
    setShowActivity(true);
    dispatch(
      userUpdateProfile(formdata, myHeaders, onSuccessUpdate, onErrorUpdate),
    );
  };

  const onSuccessUpdate = res => {
    setShowActivity(false);
    getProfile();
  };

  const onErrorUpdate = err => {
    setShowActivity(false);
  };

  // const check = () => {
  //   if (
  //     response.first_name !== firstName ||
  //     response.last_name !== lastName ||
  //     response.looking_for !== lookingFor ||
  //     response.gender !== gender ||
  //     response.date_of_birth !== dob ||
  //     response.height !== height ||
  //     response.bio !== bio ||
  //     JSON.parse(response.hobbies) !== hobbies ||
  //     response.qualification !== education ||
  //     response.smoke !== smoking ||
  //     response.drink !== drinking ||
  //     response.relocate !== relocate ||
  //     response.selfie !== selfie ||
  //     response.images !== images
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/backKey.png')}
            resizeMode="contain"
            style={{
              height: moderateScale(30),
              width: moderateScale(30),
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <Text
          onPress={() => {
            handleSave();
          }}
          style={[
            {
              fontFamily: Theme.fontFamily.Poppins_Regular,
              color: Theme.colors.orange,
            },
          ]}>
          Save
        </Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: moderateScale(100)}}>
        <View style={styles.photoTab}>
          <Text style={styles.photoTitle}>My Photos</Text>
          <View style={styles.photoCont}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedImage(0);
                camera.current.open();
              }}
              style={styles.bigTab}>
              <Image
                defaultSource={require('../../../assets/images/loadingimage.gif')}
                source={{
                  uri:
                    typeof selfie === 'string'
                      ? selfie
                      : selfie.url || selfie.path || selfie.uri,
                }}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <View style={styles.smallTabsCont}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedImage(images[0] ? 11 : 1);
                  camera.current.open();
                }}
                style={styles.smallTabs}>
                {images[0] ? (
                  <Image
                    defaultSource={require('../../../assets/images/loadingimage.gif')}
                    source={{uri: images[0]?.uri ? images[0].uri : images[0]}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Icon name={'add'} size={30} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedImage(images[1] ? 22 : 2);
                  camera.current.open();
                }}
                style={styles.smallTabs}>
                {images[1] ? (
                  <Image
                    defaultSource={require('../../../assets/images/loadingimage.gif')}
                    source={{uri: images[1]?.uri ? images[1].uri : images[1]}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Icon name={'add'} size={30} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageBottomTabs}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedImage(images[2] ? 33 : 3);
                camera.current.open();
              }}
              style={[styles.smallTabs, {height: '100%', width: '24%'}]}>
              {images[2] ? (
                <Image
                  defaultSource={require('../../../assets/images/loadingimage.gif')}
                  source={{uri: images[2]?.uri ? images[2].uri : images[2]}}
                  style={styles.imageStyle}
                />
              ) : (
                <Icon name={'add'} size={30} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedImage(images[3] ? 44 : 4);
                camera.current.open();
              }}
              style={[styles.smallTabs, {height: '100%', width: '24%'}]}>
              {images[3] ? (
                <Image
                  defaultSource={require('../../../assets/images/loadingimage.gif')}
                  source={{uri: images[3]?.uri ? images[3].uri : images[3]}}
                  style={styles.imageStyle}
                />
              ) : (
                <Icon name={'add'} size={30} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedImage(images[4] ? 55 : 5);
                camera.current.open();
              }}
              style={[styles.smallTabs, {height: '100%', width: '24%'}]}>
              {images[4] ? (
                <Image
                  defaultSource={require('../../../assets/images/loadingimage.gif')}
                  source={{uri: images[4]?.uri ? images[4].uri : images[4]}}
                  style={styles.imageStyle}
                />
              ) : (
                <Icon name={'add'} size={30} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedImage(images[5] ? 66 : 6);
                camera.current.open();
              }}
              style={[styles.smallTabs, {height: '100%', width: '24%'}]}>
              {images[5] ? (
                <Image
                  loadingIndicatorSource={require('../../../assets/images/loadingimage.gif')}
                  source={{uri: images[5]?.uri ? images[5].uri : images[5]}}
                  style={styles.imageStyle}
                />
              ) : (
                <Icon name={'add'} size={30} />
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.redText,
              {
                textAlign: 'right',
              },
            ]}>
            Pick some photos that show the real you.
          </Text>
        </View>
        <View style={{width: Theme.size.width, alignSelf: 'center'}}>
          <Text
            style={[
              styles.photoTitle,
              {
                marginTop: moderateScale(10),
              },
            ]}>
            {firstName} {lastName},Age {getAge(dob)} years
            {'\n'}
            {city}
          </Text>
          <CardContainer
            heading={'About Me'}
            component={() => {
              return (
                <>
                  <Text style={styles.inputTitle}>First Name</Text>
                  <TextInput
                    style={styles.inputText}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                  <Text style={styles.inputTitle}>Last Name</Text>
                  <TextInput
                    style={styles.inputText}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                  {/* <Text style={styles.inputTitle}>Nick Name</Text>
                  <TextInput
                    style={styles.inputText}
                    value={nickName}
                    onChangeText={setNickName}
                  /> */}
                  <Text style={styles.redText}>
                    Last name will not be visible on your profie to other people
                  </Text>
                  <Text style={styles.inputTitle}>Birthday</Text>
                  <Text
                    onPress={() => datePIckerOpen.current.open()}
                    style={[
                      styles.inputText,
                      {
                        textAlignVertical: 'center',
                      },
                    ]}>
                    {dob}
                  </Text>
                  <Text style={styles.inputTitle}>Height</Text>
                  <CustomDropDown
                    data={heightData}
                    open={heightOpen}
                    setOpen={setHeightOpen}
                    show={height}
                    setData={setHeight}
                  />
                  <Text style={styles.inputTitle}>Gender</Text>
                  <RowButton
                    value={gender}
                    setValue={setGender}
                    firstPossible="man"
                    secPossible="lady"
                    FirstTag="Male"
                    SecTag="Female"
                  />

                  <Text style={styles.inputTitle}>Hobbies</Text>
                  <CustomDropDown
                    data={hobbiesData}
                    open={hobbiesOpen}
                    setOpen={setHobbiesOPen}
                    show={hobbies}
                    setData={setHobbies}
                    multiple={true}
                  />
                  <FlatList
                    numColumns={3}
                    data={hobbies}
                    renderItem={hobbiesRenderItem}
                    columnWrapperStyle={{
                      paddingLeft: '5%',
                    }}
                  />
                  <Text style={styles.inputTitle}>Looking For</Text>
                  <CustomDropDown
                    data={['My Better Half', 'Friends', 'Socializing']}
                    open={lookingForOPen}
                    setOpen={setLookingForOpen}
                    show={
                      lookingFor === 'HALF'
                        ? 'My Better Half'
                        : lookingFor === 'FRIENDS'
                        ? 'Friends'
                        : 'Socializing'
                    }
                    setData={setLookingFor}
                  />
                  <Text style={styles.inputTitle}>You Bio</Text>
                  <TextInput
                    style={[styles.inputText, styles.bioInputCont]}
                    multiline={true}
                    placeholder="Write more about yourslef,family and partner ...."
                    placeholderTextColor={Theme.colors.gray}
                    value={bio}
                    onChangeText={setBio}
                  />
                </>
              );
            }}
          />

          <CardContainer
            heading={'Education and career'}
            component={() => {
              return (
                <>
                  <Text style={styles.inputTitle}>Qualification</Text>
                  <CustomDropDown
                    data={qualificationData}
                    open={educationOpen}
                    setOpen={setEducationOpen}
                    show={education}
                    setData={setEducation}
                  />
                  <Text style={styles.inputTitle}>Family Origin</Text>
                  <CustomDropDown
                    data={communityData}
                    open={communityOpen}
                    setOpen={setCommunityOPen}
                    show={community}
                    setData={setCommunity}
                  />
                  <Text style={styles.inputTitle}>Works At</Text>
                  <TextInput
                    style={styles.inputText}
                    value={workWith}
                    onChangeText={setWorkWith}
                  />
                  <Text style={styles.inputTitle}>Work As</Text>
                  <CustomDropDown
                    data={asAData}
                    open={worksAsOpen}
                    setOpen={setWorksAsOpen}
                    show={workAs}
                    setData={setWorkAs}
                  />
                </>
              );
            }}
          />

          <CardContainer
            heading={'Life Style'}
            component={() => {
              return (
                <>
                  <Text style={[styles.inputTitle, {color: 'black'}]}>
                    Do you Smoke?{'\t'}
                    <Text style={styles.redText}>(Optional)</Text>
                  </Text>
                  <RowButton
                    value={smoking}
                    setValue={setSmoking}
                    firstPossible={true}
                    secPossible={false}
                    FirstTag="Yes"
                    SecTag="No"
                  />
                  <Text style={[styles.inputTitle, {color: 'black'}]}>
                    Do you Drink?{'\t'}
                    <Text style={styles.redText}>(Optional)</Text>
                  </Text>
                  <RowButton
                    value={drinking}
                    setValue={setDrinking}
                    firstPossible={true}
                    secPossible={false}
                    FirstTag="Yes"
                    SecTag="No"
                  />
                </>
              );
            }}
          />

          <CardContainer
            heading={'Others'}
            component={() => {
              return (
                <>
                  <Text style={[styles.inputTitle, {color: 'black'}]}>
                    Are you willing to relocate{'\t'}
                    <Text style={styles.redText}>(Optional)</Text>
                  </Text>
                  <CustomDropDown
                    data={[
                      'Yes Anywhere',
                      'No',
                      'Yes,Only Nationally',
                      'Rather Not Stay',
                    ]}
                    setData={setRelocate}
                    show={relocate}
                    open={relocateOpen}
                    setOpen={setRelocateOpen}
                  />
                  <Text style={[styles.inputTitle, {color: 'black'}]}>
                    Any Disability?
                  </Text>
                  <RowButton
                    value={disable}
                    setValue={setDisable}
                    firstPossible={true}
                    secPossible={false}
                    FirstTag="Yes"
                    SecTag="No"
                  />
                </>
              );
            }}
          />
        </View>
        <RBSheet
          ref={datePIckerOpen}
          height={moderateScale(500)}
          customStyles={styles.dateStyles}>
          <View style={styles.datePickerWrapper}>
            <DatePicker
              mode="date"
              date={date}
              textColor="black"
              maximumDate={new Date()}
              onDateChange={date => {
                setDate(date);
              }}
              style={styles.datePIckerStyles}
            />
          </View>
          <Text
            onPress={() => {
              setDob(date.toISOString().split('T')[0]);
              datePIckerOpen.current.close();
            }}
            style={styles.datePIckerButton}>
            CONTINUE
          </Text>
        </RBSheet>
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
      </ScrollView>
      <CustomActivity show={showActivity} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScale(60),
    paddingHorizontal: moderateScale(10),
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontFamily: Theme.fontFamily.Poppins_Bold,
    color: 'black',
    width: '45%',
    textAlign: 'center',
  },
  photoTab: {
    width: Theme.size.width,
    alignSelf: 'center',
    marginTop: 10,
  },
  photoTitle: {
    fontSize: Theme.fontSize.title,
    fontFamily: Theme.fontFamily.Poppins_Bold,
    color: 'black',
  },
  photoCont: {
    width: Theme.size.width,
    height: 155,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigTab: {
    width: '68%',
    height: '100%',
    backgroundColor: Theme.colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  smallTabsCont: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  smallTabs: {
    width: width / 3.9,
    height: '48%',
    backgroundColor: Theme.colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageBottomTabs: {
    width: Theme.size.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: width / 4.5,
    marginTop: 10,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputTitle: {
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: Theme.colors.orange,
    marginTop: moderateScale(10),
    marginLeft: '5%',
    fontSize: moderateScale(12),
  },
  inputText: {
    width: '90%',
    color: 'black',
    backgroundColor: '#dedbd9',
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    height: moderateScale(45),
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  genderButtonCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  genderButton: {
    width: '42.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.orange,
    height: 40,
    borderRadius: 100,
  },
  bioInputCont: {
    height: moderateScale(100),
    textAlignVertical: 'top',
  },
  relocateOptionCont: {
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    marginTop: 5,
  },
  dropDownContainer: {
    width: '90%',
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#dedbd9',
  },
  dropDownContainerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    width: '100%',
    height: '100%',
  },
  dropDownText: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
  },
  redText: {
    color: Theme.colors.reverseGradient[0],
    fontSize: moderateScale(9),
    marginTop: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_MediumItalic,
    paddingHorizontal: '5%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '29%',
    height: moderateScale(35),
    justifyContent: 'flex-start',
    borderRadius: 100,
    paddingLeft: moderateScale(10),
    backgroundColor: '#dedbd9',
    elevation: moderateScale(2),
    marginVertical: moderateScale(3),
    marginRight: moderateScale(10),
  },
  rowR: {
    width: moderateScale(15),
    height: moderateScale(15),
    borderRadius: 100,
    marginRight: moderateScale(10),
    backgroundColor: Theme.colors.orange,
  },
  firstBox: {
    color: 'black',
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    width: '60%',
  },
  bottomSheetButton: {
    height: moderateScale(50),
    width: '90%',
    borderColor: Theme.colors.orange,
    borderWidth: 1,
    paddingLeft: moderateScale(30),
    textAlignVertical: 'center',
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    color: Theme.colors.orange,
    fontFamily: Theme.fontFamily.Poppins_Bold,
    fontSize: moderateScale(16),
  },
  dateStyles: {
    container: {
      backgroundColor: 'transparent',
    },
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
  bottomBottomButton: {
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  datePickerWrapper: {
    backgroundColor: 'white',
    marginTop: 'auto',
    width: '95%',
    alignSelf: 'center',
    borderRadius: moderateScale(10),
  },
  datePIckerStyles: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(30),
    alignSelf: 'center',
    width: (width / 100) * 90,
  },
  datePIckerButton: {
    width: '95%',
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    backgroundColor: Theme.colors.orange,
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: moderateScale(15),
    alignSelf: 'center',
    marginBottom: moderateScale(20),
    marginTop: moderateScale(10),
  },
});

export default EditProfile;
