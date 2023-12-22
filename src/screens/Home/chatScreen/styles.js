import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  renderCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    alignSelf: 'center',
    height: 50,
    width: width,
    borderBottomWidth: 0.5,
    borderColor: Theme.colors.gray,
  },
  topName: {
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
  },
  online: {
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: 12,
    marginLeft: 10,
    color: Theme.colors.gray,
  },
  topLeftCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageAndNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftConvo: {
    backgroundColor: '#E3E3E3',
    marginLeft: 10,
    marginTop: 20,
    padding: 12,
    borderRadius: 15,
  },
  rightConvo: {
    backgroundColor: Theme.colors.gradient[1],
    marginRight: 10,
    marginTop: 20,
    padding: 12,
    borderRadius: 15,
  },
  bottomCont: {
    width: '100%',
    alignItems: 'center',
    height: 45,
    justifyContent: 'space-between',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
  },
  messageInputCont: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 40,
    marginBottom: 5,
  },
  inputCont: {
    backgroundColor: '#EAEEF1',
    padding: 7,
    borderRadius: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});
export default styles;
