import {moderateScale} from './Dimensions';
import {Dimensions, Platform} from 'react-native';

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
    gray: '#7A797F',
    swiper: '#E7E8EA',
    primary: '#C2272D',
    darkgray: '#464648',
    yellow: '#E7BB40',
    orangeGradient: ['#FC9200', '#DA5B06'],
    blueGradient: ['#61DBC3', '#2EB3BE'],
  },
  fontFamily: {
    Poppins_Bold: 'Metropolis-Medium',
    Poppins_Medium: 'Minion Condensed',
    Poppins_Regular: 'Minion Pro Cond Caption',
    comics: Platform.OS === 'ios' ? 'LeadingRoleDemoRegular' : 'COMIC',
  },
  fontSize: {
    title: moderateScale(18),
    regular: moderateScale(12),
  },
  size: {
    width: width / 1.1,
    button: width / 1.5,
    height: height,
  },
};
