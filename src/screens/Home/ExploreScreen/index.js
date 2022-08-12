import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../../assets/Components/Header';
import {moderateScale} from '../../../Theme/Dimensions';
import Theme from '../../../Theme/Theme';

const {width, height} = Dimensions.get('window');

const ExploreScreen = ({navigation}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.mainContainer}
      source={require('../../../assets/images/exploreBG.jpeg')}>
      <Header leftOPacity={0} />
      <Text style={styles.topText}>Let's Explore</Text>
      <View
        style={{
          marginTop: moderateScale(80),
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ExtendedExplore', {type: 'Liked me'})
          }
          style={styles.ButtonContaier}
          activeOpacity={1}>
          <Image
            source={require('../../../assets/images/heart.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonTag}>Liked Me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ExtendedExplore', {type: 'I Liked'})
          }
          style={styles.ButtonContaier}
          activeOpacity={1}>
          <Image
            source={require('../../../assets/images/thumbsup.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonTag}>I Liked</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ExtendedExplore', {type: 'I Passed'})
          }
          style={styles.ButtonContaier}
          activeOpacity={1}>
          <Image
            source={require('../../../assets/images/cross.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonTag}>I Passed</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topText: {
    color: 'black',
    fontSize: moderateScale(22),
    // fontWeight: 'bold',
    marginLeft: (width / 100) * 5,
    marginTop: moderateScale(20),
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  ButtonContaier: {
    width: (width / 100) * 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: moderateScale(20),
    borderRadius: moderateScale(10),
    elevation: moderateScale(10),
    marginVertical: moderateScale(5),
    height: moderateScale(80),
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  buttonImage: {
    resizeMode: 'contain',
    width: moderateScale(45),
  },
  buttonTag: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: moderateScale(20),
    marginLeft: moderateScale(10),
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
});

export default ExploreScreen;
