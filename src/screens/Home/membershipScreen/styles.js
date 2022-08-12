import React from 'react';
import {StyleSheet} from 'react-native';
import Theme from '../../../Theme/Theme';

const styles = StyleSheet.create({
  cardCont: {
    width: Theme.size.width,
    elevation: 5,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  goldtext: {
    fontFamily: Theme.fontFamily.Poppins_Medium,
    alignSelf: 'center',
    color: 'black',
    fontSize: 25,
  },
  monthText: {
    fontFamily: Theme.fontFamily.Poppins_Regular,
    backgroundColor: '#60166C',
    color: 'white',
    width: '100%',
    textAlign: 'center',
    height: 40,
    textAlignVertical: 'center',
    fontSize: 18,
  },
  percentCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  twenety: {
    fontFamily: Theme.fontFamily.Poppins_Bold,
    color: '#60166C',
  },
  rupee: {
    color: Theme.colors.gray,
    textDecorationLine: 'line-through',
  },
  mainRupee: {
    color: 'black',
    fontSize: 35,
    fontFamily: Theme.fontFamily.Poppins_Bold,
    borderBottomWidth: 1,
    borderColor: Theme.colors.gray,
  },
  button: {
    borderWidth: 0.5,
    borderColor: Theme.colors.gray,
    height: 45,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginVertical: 10,
  },
  facilities: {
    color: 'green',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: 18,
  },
  bottomText: {
    color: 'black',
    borderTopWidth: 0.5,
    borderColor: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Theme.fontFamily.Poppins_Medium,
    marginTop: 5,
    paddingTop: 5,
  },
});

export default styles;
