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
