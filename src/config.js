import {Platform} from 'react-native';
import ENV from 'react-native-config';

// Address to stripe server running on local machine
export const LOCAL_URL =
  Platform.OS === 'android'
    ? 'https://api.WeddingMubarik.com/gateway/stripe.php'
    : 'https://api.WeddingMubarik.com/gateway/stripe.php';

export const API_URL = ENV.API_URL ? ENV.API_URL : LOCAL_URL;
