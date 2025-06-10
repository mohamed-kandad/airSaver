import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTS, IMAGES} from '../../constant';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {useTheme} from '../providers/ThemeContext';
import {calculateTripBudget} from '../../helpers/utils';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';

type Props = {
  tripId: string;
};

const Header: FC<Props> = ({tripId}) => {
  const {t} = useTranslation();
  const tripsData = useSelector((state: RootState) => state.trips).trips.filter(
    trip => trip.id === tripId,
  );

  const lang = useSelector((state: RootState) => state.lang.lang);

  const budget = calculateTripBudget(
    tripsData[0].expenses,
    tripsData[0].budget,
  );
  const {isDark, theme, toggleTheme} = useTheme();

  return (
    <View
      style={[
        styles.headerContainer,
        {flexDirection: lang === 'ar' ? 'row-reverse' : 'row'},
      ]}>
      <View
        style={{
          borderWidth: 1,
          height: 110,
          width: '43%',
          paddingHorizontal: 10,
          borderRadius: 20,
          marginBottom: 20,
          paddingVertical: 10,
          borderColor: theme.PRIMARY,
          backgroundColor: theme.PRIMARY,
        }}>
        <Text style={[styles.headerTitle, {color: theme.background}]}>
          {t('expenses.total.expenses')}
        </Text>

        <Text
          style={[styles.headerDetailsItemValue, {color: theme.background}]}>
          {budget.totalExpenses} MAD
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          height: 110,
          width: '43%',
          paddingHorizontal: 10,
          borderRadius: 20,
          marginBottom: 20,
          paddingVertical: 14,
          borderColor: theme.PRIMARY,
        }}>
        <Text style={[styles.headerTitle, {color: theme.TEXT1}]}>
          {t('budget.still.available')}
        </Text>

        <Text style={[styles.headerDetailsItemValue, {color: theme.TEXT}]}>
          {budget.remainingBalance} MAD
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: 'green',
    height: 170,
    width: '100%',
    marginBottom: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'LotaGrotesque-Regular',
    fontSize: 18,
  },
  headerImage: {
    width: '100%',
    height: 340,
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // paddingVertical: 30,
  },
  headerDetailsItem: {
    borderBottomWidth: 1,
    paddingVertical: 20,
    flex: 1,
  },
  headerDetailsItemTitle: {
    fontSize: 14,
    color: 'black',
    fontFamily: FONTS.LIGHT,
    marginBottom: 10,
  },
  headerDetailsItemValue: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'left',
    fontFamily: 'ClashDisplay-SemiBold',
    fontWeight: '600',
  },
});
