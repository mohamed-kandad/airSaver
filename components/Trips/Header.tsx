import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS} from '../../constant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/MainNavigation';
import {useTheme} from '../providers/ThemeContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import i18Next from '../../languages';
import {getFlexDirectionStyle} from '../../languages/styles';
import {setLang} from '../../store/langSlice';

type HeaderNavigationProp = NavigationProp<RootStackParamList, 'Trips'>;

const Header = () => {
  const {navigate} = useNavigation<HeaderNavigationProp>();
  const namedata = useSelector((stat: RootState) => stat.name);
  const {theme, isDark, toggleTheme} = useTheme();
  const lang = useSelector((state: RootState) => state.lang);
  const dispatch: AppDispatch = useDispatch();

  const toggleLang = () => {
    i18Next.changeLanguage(i18Next.language === 'en' ? 'ar' : 'en');
    dispatch(setLang(i18Next.language === 'en' ? 'ar' : 'en'));
  };

  return (
    <View
      style={[
        styles.headerContainer,

        {flexDirection: getFlexDirectionStyle(lang.lang)},
        // {flexDirection: 'row-reverse'},
      ]}>
      {/* <View style={styles.headerWelcome}>
        <Text style={[styles.welcomeText, {color: theme.TEXT}]}>Welcome</Text>
        <Text style={[styles.nameText, {color: theme.TEXT1}]}>
          {namedata.name.length > 10
            ? namedata.name.slice(0, 10)
            : namedata.name}
        </Text>
      </View> */}
      <Pressable
        style={[
          styles.addTripButton,
          {borderColor: theme.button_border, backgroundColor: '#ff5a5f'},
        ]}
        onPress={toggleLang}
        // onPress={() => navigate('AddTrip', {tripId: ''})}
      >
        <FontAwesomeIcon icon={faPlus} color={theme.button_border} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  // addTripButton: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   borderRadius: 50,
  //   paddingHorizontal: 18,
  //   paddingVertical: 14,
  //   shadowOffset: {width: 0, height: 5},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4,

  //   borderWidth: 1,
  //   // Android shadow property
  //   elevation: 10,
  // },
  addTripButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerWelcome: {},
  welcomeText: {
    fontSize: 12,
    fontFamily: 'Figtree-Regular',
  },
  nameText: {
    fontSize: 18,
    fontFamily: 'DelaRegular',
    color: COLORS.light.PRIMARY,
  },
});
