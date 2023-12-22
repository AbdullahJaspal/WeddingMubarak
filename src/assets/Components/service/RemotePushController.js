import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const RemotePushController = () => {
  useFocusEffect(
    React.useCallback(() => {
      requestUserPermission();
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);

          // process the notification

          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          console.log('ACTION:', notification.action);
          console.log('NOTIFICATION:', notification);

          // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
          console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        senderID: '98152326268',

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
      });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });

      return unsubscribe;
    }, []),
  );
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  return null;
};

export default RemotePushController;
