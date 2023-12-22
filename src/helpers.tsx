import {Alert} from 'react-native';
import {API_URL} from './config';

export async function fetchPublishableKey(
  paymentMethod?: string,
): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}`);

    const {publishableKey} = await response.json();

    return publishableKey;
  } catch (e) {
    console.warn('Unable to fetch publishable key. Is your server running?');
    Alert.alert(
      'Error',
      'Unable to fetch publishable key. Is your server running?',
    );
    return null;
  }
}
