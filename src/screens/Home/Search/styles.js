import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from '../../../Theme/Dimensions';
const {width, heightt} = Dimensions.get('window');

const Styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  leftButton: {
    width: '50%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 0.5,
    borderRightColor: 'black',
    borderBottomColor: Theme.colors.gray,
  },
  rightButton: {
    width: '50%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderBottomWidth: 0.5,
    borderLeftColor: 'black',
    borderBottomColor: Theme.colors.gray,
  },
  dropDownText: {
    color: 'grey',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
  },
  dropDownContainer: {
    width: (width / 100) * 95,
    height: moderateScale(40),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden',
    marginTop: moderateScale(5),
    alignSelf: 'center',
  },
  dropDownContainerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(30),
    width: '100%',
    height: '100%',
  },
});

export default Styles;
