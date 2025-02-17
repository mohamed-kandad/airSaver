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

type HeaderNavigationProp = NavigationProp<RootStackParamList, 'Trips'>;

const Header = () => {
  const {navigate} = useNavigation<HeaderNavigationProp>();
  const namedata = useSelector((stat: RootState) => stat.name);
  console.log('🚀 ~ Header ~ namedata:', namedata.name);
  const {theme, isDark, toggleTheme} = useTheme();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerWelcome}>
        <Text style={[styles.welcomeText, {color: theme.TEXT}]}>Welcome</Text>
        <Text style={[styles.nameText, {color: theme.TEXT1}]}>
          {namedata.name.length > 10
            ? namedata.name.slice(0, 10)
            : namedata.name}
        </Text>
      </View>
      <Pressable
        style={[styles.addTripButton, {backgroundColor: theme.BUTTON_HEADER}]}
        onPress={() => navigate('AddTrip', {tripId: ''})}>
        <FontAwesomeIcon
          icon={faPlus}
          color={isDark ? theme.PRIMARY : 'white'}
        />
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
    width: 35,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
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
});
