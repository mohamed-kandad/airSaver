import {SafeAreaView, StyleSheet, Text, View, Switch} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopHeader from '../components/Expenses/TopHeader';
import {useTheme} from '../components/providers/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {AppDispatch, RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import i18next from 'i18next';
import {setLang} from '../store/langSlice';
import {FONTS} from '../constant';
import {getFlexDirectionStyle} from '../languages/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGlobe, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';

type Props = {};

const Settings = (props: Props) => {
  const {theme, toggleTheme, isDark} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const lang = useSelector((state: RootState) => state.lang.lang);
  const dispatch: AppDispatch = useDispatch();

  const [isDarkMode, setIsDarkMode] = useState(isDark);
  const [isArabic, setIsArabic] = useState(i18next.language === 'ar');

  useEffect(() => {
    setIsDarkMode(isDark);
  }, [isDark]);

  useEffect(() => {
    setIsArabic(i18next.language === 'ar');
  }, [i18next.language]);

  const onToggleDarkMode = (value: boolean) => {
    setIsDarkMode(value);
    // toggleTheme switches theme between dark/light
    toggleTheme();
  };

  const onToggleLanguage = (value: boolean) => {
    setIsArabic(value);
    const newLang = value ? 'ar' : 'en';
    i18next.changeLanguage(newLang);
    dispatch(setLang(newLang));
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.background}]}>
      <TopHeader showBack onBack={() => navigation.goBack()} />

      <View style={[styles.container]}>
        <View
          style={[
            styles.row,
            {
              borderColor: theme.PRIMARY,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
            },
            getFlexDirectionStyle(lang),
          ]}>
          <View style={[styles.row, getFlexDirectionStyle(lang)]}>
            <FontAwesomeIcon
              icon={!isDarkMode ? faSun : faMoon}
              size={23}
              color={theme.PRIMARY}
            />
            <Text
              style={[
                styles.label,
                {color: theme.PRIMARY, marginHorizontal: 10},
              ]}>
              {t('settings.dark.mode')}
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={onToggleDarkMode}
            trackColor={{false: 'red', true: theme.orange}}
            thumbColor={isDarkMode ? 'black' : '#f4f3f4'}
          />
        </View>

        <View
          style={[
            styles.row,
            {
              marginTop: 24,

              borderColor: theme.PRIMARY,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
              ...getFlexDirectionStyle(lang),
            },
          ]}>
          <View style={[styles.row, getFlexDirectionStyle(lang)]}>
            <FontAwesomeIcon icon={faGlobe} size={23} color={theme.PRIMARY} />
            <Text
              style={[
                styles.label,
                {color: theme.PRIMARY, marginHorizontal: 10},
              ]}>
              {t('settings.arabic.language')}
            </Text>
          </View>
          <Switch
            value={isArabic}
            onValueChange={onToggleLanguage}
            trackColor={{false: 'red', true: theme.orange}}
            thumbColor={isArabic ? 'black' : '#f4f3f4'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: FONTS.ClashDisplay.Semibold,
  },
});
