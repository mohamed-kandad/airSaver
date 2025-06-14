import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {useTheme} from '../providers/ThemeContext';
import {calculateTripBudget} from '../../helpers/utils';
import {useTranslation} from 'react-i18next';
import {getFlexDirectionStyle} from '../../languages/styles';
import {FONTS} from '../../constant';
import {Expense} from '../../types/expense';

type Props = {
  expenses: Expense[];
  budget: number;
};

const Header: FC<Props> = ({budget, expenses}) => {
  const {t} = useTranslation();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const tripBudget = calculateTripBudget(expenses, budget);
  const {theme} = useTheme();

  return (
    <View style={[styles.headerContainer, getFlexDirectionStyle(lang)]}>
      <View
        style={[
          styles.card,
          {
            borderColor: theme.PRIMARY,
            backgroundColor: theme.PRIMARY,
          },
        ]}>
        <Text style={[styles.headerTitle, {color: theme.background}]}>
          {t('expenses.total.expenses')}
        </Text>
        <Text
          style={[styles.headerDetailsItemValue, {color: theme.background}]}>
          {tripBudget.totalExpenses} MAD
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            borderColor: theme.PRIMARY,
            backgroundColor: theme.background,
          },
        ]}>
        <Text style={[styles.headerTitle, {color: theme.TEXT1}]}>
          {t('budget.still.available')}
        </Text>
        <Text style={[styles.headerDetailsItemValue, {color: theme.TEXT}]}>
          {tripBudget.remainingBalance} MAD
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 170,
    width: '100%',
    marginBottom: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    borderWidth: 1,
    height: 110,
    width: '43%',
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: FONTS.LotaGrotesque.Regular,
    fontSize: FONTS.SIZES.SMALL,
  },
  headerDetailsItemValue: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'left',
    fontFamily: FONTS.ClashDisplay.Semibold,
    fontWeight: '600',
  },
});
