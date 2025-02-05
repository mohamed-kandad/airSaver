import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS} from '../../constant';
import {useTheme} from '../providers/ThemeContext';

type Props = {};

const Header = (props: Props) => {
  const {theme, isDark, toggleTheme} = useTheme();

  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          styles.addTripButtonIconContainer,
          {borderColor: theme.GRAY[200]},
        ]}>
        <Image source={ICONS.x} style={styles.addTripButtonIcon} />
      </View>
      <Text style={styles.headerTitle}>Add Trip</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    position: 'relative',
  },
  headerTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: 'black',
  },
  addTripButtonIconContainer: {
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 50,
    position: 'absolute',
    left: 10,
    top: 13,
  },
  addTripButtonIcon: {width: 12, height: 13},
});
