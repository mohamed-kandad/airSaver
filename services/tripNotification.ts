import PushNotification from 'react-native-push-notification';
import BackgroundFetch from 'react-native-background-fetch';

import {ITrip, Trip} from '../types/trip';
import {TripModel} from '../database/models/trips';
import {ExpenseModel} from '../database/models/expense';
import moment from 'moment';

class TripNotificationService {
  scheduleTripStartReminder = (trip: ITrip) => {
    const startDate = new Date(trip.start_date);
    const reminderDate = new Date(startDate.getTime() - 24 * 60 * 60 * 1000); // 1 day before

    if (reminderDate <= new Date()) {
      console.log('Reminder time already passed. Skipping...');
      return;
    }

    PushNotification.localNotificationSchedule({
      channelId: 'expense-reminders',
      title: 'Your trip starts tomorrow!',
      message: `Your trip to ${trip.name || 'your destination'} starts soon.`,
      date: reminderDate,
      allowWhileIdle: true,
    });

    console.log(`Scheduled trip reminder for: ${reminderDate}`);
  };
}

const tripNotificationService = new TripNotificationService();
export {tripNotificationService};
export default tripNotificationService;
