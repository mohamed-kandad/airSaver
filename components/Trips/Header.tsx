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
  const {theme, toggleTheme} = useTheme();
  const lang = useSelector((state: RootState) => state.lang);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigation<HeaderNavigationProp>();

  const toggleLang = () => {
    i18Next.changeLanguage(i18Next.language === 'en' ? 'ar' : 'en');
    dispatch(setLang(i18Next.language === 'en' ? 'ar' : 'en'));
  };

  return (
    <View
      style={[
        styles.headerContainer,

        {flexDirection: lang.lang == 'ar' ? 'row-reverse' : 'row'},
      ]}>
      <Pressable
        style={[
          styles.addTripButton,
          {borderColor: theme.button_border, backgroundColor: '#ff5a5f'},
        ]}
        onPress={() => navigate.navigate('AddTrip', {tripId: ''})}>
        <FontAwesomeIcon icon={faPlus} color={theme.button_border} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
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
