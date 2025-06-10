import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS} from '../../constant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/MainNavigation';
import {useTheme} from '../providers/ThemeContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
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
