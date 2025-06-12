import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Navigation from './navigation';
import {Provider} from 'react-redux';
import store, {persistor} from './store';
import BootSplash from 'react-native-bootsplash';
import {ThemeProvider, useTheme} from './components/providers/ThemeContext';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import {I18nextProvider} from 'react-i18next';
import i18next from './languages';
import {initializeDataBase} from './database';

import {Button} from './components/common';
import PushNotification from 'react-native-push-notification';
import pushNotificationService from './services/LocalNotificationService';

type Props = {};

const App = (props: Props) => {
  const {isDark} = useTheme();

  const [notificationTitle, setNotificationTitle] =
    useState('Test Notification');
  const [notificationMessage, setNotificationMessage] = useState(
    'This is a test message',
  );
  const [scheduleDate, setScheduleDate] = useState(
    new Date(Date.now() + 60000),
  ); // 1 minute from now
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [scheduledNotifications, setScheduledNotifications] = useState([]);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('🚀 ~ requestNotificationPermission ~ granted:', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Notification permission denied');
        Linking.openSettings();
      }
    }
  };

  useEffect(() => {
    (async () => {
      await initializeDataBase();
    })();
    const init = async () => {
      // …do multiple sync or async tasks
    };

    requestNotificationPermission();

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  useEffect(() => {
    // Initialize push notifications
    // Service is already initialized when imported
    // Check permissions on app start
    // LocalNotificationService.checkPermissions(permissions => {
    //   console.log('Permissions:', permissions);
    // });

    PushNotification.createChannel({
      channelId: 'custom-channel',
      channelName: 'Custom Channel',
      channelDescription: 'Custom notifications',
      playSound: true,
      soundName: 'custom_sound.mp3',
      importance: 4,
      vibrate: true,
      vibration: 300,
    });
  }, []);

  const showLocalNotification = () => {
    pushNotificationService.showLocalNotification(
      'Local Notification',
      'This is a local notification!',
    );
  };

  const scheduleNotification = () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 10); // 10 seconds from now

    pushNotificationService.scheduleLocalNotification(
      'Scheduled Notification',
      'This notification was scheduled!',
      date,
    );
  };

  const cancelNotifications = () => {
    pushNotificationService.cancelAllLocalNotifications();
  };
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <I18nextProvider i18n={i18next}>
              <Navigation />
              <Toast />
              <Button title="Toggle Theme" onPress={showLocalNotification} />
            </I18nextProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
