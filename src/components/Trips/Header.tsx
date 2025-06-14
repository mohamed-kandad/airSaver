import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS} from '../../constant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/MainNavigation';
import {useTheme} from '../providers/ThemeContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGear, faPlus, faSadCry} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {getFlexDirectionStyle} from '../../languages/styles';

type HeaderNavigationProp = NavigationProp<RootStackParamList, 'Trips'>;

const Header = () => {
  const {theme} = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const navigate = useNavigation<HeaderNavigationProp>();

  return (
    <View style={[styles.headerContainer, getFlexDirectionStyle(lang)]}>
      <View style={styles.iconContainer}>
        <Pressable
          onPress={() => navigate.navigate('Settings')}
          style={[styles.iconButton, {borderColor: theme.PRIMARY}]}>
          <FontAwesomeIcon icon={faGear} size={23} color={theme.PRIMARY} />
        </Pressable>
      </View>

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
    justifyContent: 'space-between',
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

  iconContainer: {
    width: 50,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
