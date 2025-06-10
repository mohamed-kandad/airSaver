import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarDays,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import * as Progress from 'react-native-progress';
import {useTranslation} from 'react-i18next';

import {FONTS} from '../../constant';
import {deleteTrip, Trip} from '../../store/tripSlice';
import {RootStackParamList} from '../../navigation/MainNavigation';
import {AppDispatch, RootState} from '../../store';
import {useTheme} from '../providers/ThemeContext';
import {calculatePercentage, calculateTripBudget} from '../../helpers/utils';
import {getFlexDirectionStyle} from '../../languages/styles';

type TripItemScreenNavigationProp = NavigationProp<RootStackParamList, 'Trips'>;

const TripItem: FC<Trip> = ({
  budget,
  endDate,
  id,
  name,
  startDate,
  expenses,
}) => {
  const {theme} = useTheme();
  const navigation = useNavigation<TripItemScreenNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();
  const lang = useSelector((state: RootState) => state.lang.lang);

  const handleDeleteTrip = () => {
    dispatch(deleteTrip(id));
  };

  const totalExpenses = calculateTripBudget(expenses, budget).totalExpenses;
  const totalExpensesPercent = calculatePercentage(budget, totalExpenses) / 100;

  return (
    <View style={[styles.tripItem, {borderColor: theme.PRIMARY}]}>
      <Pressable
        style={styles.tripItemDetails}
        onPress={() => navigation.navigate('Expenses', {tripId: id})}>
        <View style={[styles.header, getFlexDirectionStyle(lang)]}>
          <Text style={[styles.tripItemBudget, {color: theme.PRIMARY}]}>
            {name.length > 25 ? `${name.slice(0, 35)}...` : name}
          </Text>
          <Pressable>
            <FontAwesomeIcon icon={faEllipsisVertical} color={theme.PRIMARY} />
          </Pressable>
        </View>

        <View style={styles.body}>
          <View style={[styles.expenseRow, getFlexDirectionStyle(lang)]}>
            <Text style={[styles.expenseAmount, {color: theme.PRIMARY}]}>
              {totalExpenses} MAD
            </Text>
            <Text
              style={[
                styles.expenseLabel,
                {
                  color: theme.PRIMARY,
                },
              ]}>
              {t('generale.spent.from')} {budget} MAD
            </Text>
          </View>

          <Progress.Bar
            progress={totalExpensesPercent}
            width={300}
            color={theme.PRIMARY}
            borderColor={theme.PRIMARY}
            borderRadius={20}
            height={13}
            style={styles.progressBar}
            unfilledColor={'transparent'}
          />

          <View style={[styles.dateRow, getFlexDirectionStyle(lang)]}>
            <FontAwesomeIcon icon={faCalendarDays} color={theme.PRIMARY} />
            <View
              style={[
                getFlexDirectionStyle(lang),
                {
                  flex: 1,
                  gap: 5,
                  justifyContent: 'flex-start',
                },
              ]}>
              <Text style={[styles.tripItemDate, {color: theme.PRIMARY}]}>
                {moment(startDate).format('DD-MM-YYYY')}
              </Text>
              <Text style={[styles.tripItemDate, {color: theme.PRIMARY}]}>
                {t('generale.to')}
              </Text>
              <Text style={[styles.tripItemDate, {color: theme.PRIMARY}]}>
                {moment(endDate).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default TripItem;

const styles = StyleSheet.create({
  tripItem: {
    height: 170,
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
  },
  tripItemDetails: {
    paddingVertical: 15,
    paddingBottom: 30,
    paddingHorizontal: 13,
    width: '100%',
    height: '100%',
  },
  tripItemBudget: {
    fontSize: 16,
    fontFamily: FONTS.ClashDisplay.Bold,
    fontWeight: 'bold',
    borderRadius: 6,
    paddingBottom: 10,
  },
  tripItemDate: {
    fontSize: 13,
    fontFamily: FONTS.LotaGrotesque.Regular,
  },
  header: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  body: {
    paddingVertical: 10,
  },
  expenseRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  expenseAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: FONTS.ClashDisplay.Bold,
  },
  expenseLabel: {
    fontSize: 14,
    fontFamily: FONTS.LotaGrotesque.Regular,
  },
  progressBar: {
    marginBottom: 20,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});
