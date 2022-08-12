import {moderateScale} from './Dimensions';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default Theme = {
  colors: {
    gradient: ['#1D164C', '#E056A3'],
    reverseGradient: ['#E056A3', '#1D164C'],
    darkgreen: '#0B6839',
    green: '#30B87B',
    title: '#8C8889',
    border: '#7C7893',
    orange: '#FA9D27',
    gray: '#98A1B3',
    swiper: '#E7E8EA',
  },
  fontFamily: {
    Poppins_Bold: 'Poppins-Bold',
    Poppins_SemiBold: 'Poppins-SemiBold',
    Poppins_Medium: 'Poppins-Medium',
    Poppins_Regular: 'Poppins-Regular',
    Poppins_Italic: 'Poppins-Italic',
    Poppins_MediumItalic: 'Poppins-MediumItalic',
    Poppins_BoldItalic: 'Poppins-BoldItalic',
    Poppins_MediumItalic: 'Poppins-MediumItalic',
  },
  fontSize: {
    title: moderateScale(20),
    regular: moderateScale(12),
  },
  size: {
    width: width / 1.1,
    button: width / 1.5,
    height: height,
  },
};
