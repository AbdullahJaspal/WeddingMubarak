import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNav from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persister} from './src/redux/store';
import {SafeAreaView, Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = () => {
  useEffect(() => {
    firebase.messaging().onMessage(response => {
      if (Platform.OS !== 'ios') {
        showNotification(response.notification);
        return;
      }
      PushNotificationIOS.requestPermissions().then(() =>
        showNotification(response.notification),
      );
    });
  }, []);
  const showNotification = notification => {
    PushNotification.localNotification({
      channelId: 'fcm_fallback_notification_channel',
      title: notification.title,
      message: notification.body,
    });
  };
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1}}>
            <MainNav />
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
