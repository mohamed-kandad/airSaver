import * as Notifications from "expo-notifications";

import { ITrip } from "../types/trip";

class TripNotificationService {
  scheduleTripStartReminder = (trip: ITrip) => {
    const startDate = new Date(trip.start_date);
    const reminderDate = new Date(startDate.getTime() - 24 * 60 * 60 * 1000); // 1 day before

    if (reminderDate <= new Date()) {
      console.log("Reminder time already passed. Skipping...");
      return;
    }

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Your trip starts tomorrow!",
        body: `Your trip to ${trip.name || "your destination"} starts soon.`,
      },
      trigger: {
        type: "calendar",
        year: reminderDate.getFullYear(),
        month: reminderDate.getMonth() + 1, // months are 1-based here
        day: reminderDate.getDate(),
        hour: reminderDate.getHours(),
        minute: reminderDate.getMinutes(),
        second: reminderDate.getSeconds(),
        repeats: false,
      },
    });

    console.log(`Scheduled trip reminder for: ${reminderDate}`);
  };
}

const tripNotificationService = new TripNotificationService();
export { tripNotificationService };
export default tripNotificationService;
