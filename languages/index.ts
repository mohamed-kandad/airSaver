import {initReactI18next} from 'react-i18next';
import i18next from 'i18next';

import ar from './locals/ar.json';
import en from './locals/en.json';
import {I18nManager} from 'react-native';

const resources = {
  en: {translation: en},
  ar: {translation: ar},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'en',
});

export default i18next;

export const calendarAR = {
  monthNames: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  monthNamesShort: [
    'ينا.',
    'فبر.',
    'مار.',
    'أبر.',
    'ماي.',
    'يون.',
    'يول.',
    'أغس.',
    'سبت.',
    'أكت.',
    'نوف.',
    'ديس.',
  ],
  dayNames: [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
  dayNamesShort: ['أحد', 'اثن', 'ثلث', 'أرب', 'خمي', 'جمع', 'سبت'],
  today: 'اليوم',
};

export const calendarEN = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};
