import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import moment from 'moment';

class PushNotificationService {
  constructor() {
    this.configure();
    this.createDefaultChannels();
  }

  configure = () => {
    PushNotification.configure({
      // Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
        // Send token to your server
      },

      // Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // Process the notification here
        if (notification.userInteraction) {
          // User tapped on notification
          console.log('User tapped notification');
        }

        // Required on iOS only
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      // Called when the user fails to register for remote notifications
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY: executed when permissions are granted
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      popInitialNotification: true,

      // Should we request permissions on iOS
      requestPermissions: Platform.OS === 'ios',
    });
  };

  createDefaultChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default channel',
        channelDescription: 'A default channel for notifications',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  };

  // Show local notification
  showLocalNotification = (title, message) => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: title,
      message: message,
      playSound: true,
      soundName: 'default',
      actions: ['Yes', 'No'],
    });
  };

  // Schedule local notification
  scheduleLocalNotification = (title, message, date) => {
    PushNotification.localNotificationSchedule({
      channelId: 'default-channel-id',
      title: title,
      message: message,
      date: date,
      playSound: true,
      soundName: 'default',
    });
  };

  // Cancel all local notifications
  cancelAllLocalNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  // Get all scheduled local notifications
  getScheduledLocalNotifications = callback => {
    PushNotification.getScheduledLocalNotifications(callback);
  };

  // Check permissions
  checkPermissions = callback => {
    PushNotification.checkPermissions(callback);
  };

  // Request permissions (iOS)
  requestPermissions = () => {
    PushNotification.requestPermissions();
  };

  // Abandon permissions (iOS)
  abandonPermissions = () => {
    PushNotification.abandonPermissions();
  };

  scheduleTripNotifications(startDate: string, endDate: string) {
    const start = moment(startDate).startOf('day');
    const end = moment(endDate).startOf('day');
    const days = end.diff(start, 'days') + 1;

    for (let i = 0; i < days; i++) {
      const day = moment(start).add(i, 'days');

      // Morning reminder (9:00 AM)
      PushNotification.localNotificationSchedule({
        id: `${day.format('YYYYMMDD')}AM`,
        message: 'Don’t forget to log your expenses for today!',
        date: day.clone().hour(9).minute(0).second(0).toDate(),
        allowWhileIdle: true,
      });

      // Night reminder (9:00 PM)
      PushNotification.localNotificationSchedule({
        id: `${day.format('YYYYMMDD')}PM`,
        message: 'You still have $X remaining today.', // replace X dynamically if needed
        date: day.clone().hour(21).minute(0).second(0).toDate(),
        allowWhileIdle: true,
      });
    }
  }

  triggerBudgetPushNotification(percentage: number) {
    let message = '';

    if (percentage >= 90) {
      message = '🚨 لقد تجاوزت 90% من ميزانية رحلتك!';
    } else if (percentage >= 75) {
      message = '⚠️ لقد أنفقت 75% من ميزانية رحلتك.';
    } else if (percentage >= 50) {
      message = '🔔 وصلت إلى 50% من ميزانية الرحلة.';
    }

    if (message) {
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: 'تنبيه الميزانية',
        message: message,
        playSound: true,
        soundName: 'default',
      });
    }
  }
}

const pushNotificationService = new PushNotificationService();

export {pushNotificationService};
export default pushNotificationService;
