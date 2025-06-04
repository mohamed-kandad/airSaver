import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTS, ICONS, IMAGES} from '../../constant';
import {deleteTrip, Trip} from '../../store/tripSlice';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/MainNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import ContextMenu from 'react-native-context-menu-view';
import {useTheme} from '../providers/ThemeContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendar,
  faCalendarAlt,
  faEllipsis,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import {BlurView} from '@react-native-community/blur';
import * as Progress from 'react-native-progress';
import {calculatePercentage, calculateTripBudget} from '../../helpers/utils';
import {useTranslation} from 'react-i18next';
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
  console.log('🚀 ~ expenses:', expenses);
  const {isDark, theme, toggleTheme} = useTheme();
  const navigation = useNavigation<TripItemScreenNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();
  const lang = useSelector((state: RootState) => state.lang);

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
        <View
          style={{
            borderColor: 'gray',
            borderBottomWidth: 1,
            justifyContent: 'space-between',
            flexDirection: lang.lang !== 'ar' ? 'row-reverse' : 'row',
          }}>
          <Text style={[styles.tripItemBudget, {color: theme.PRIMARY}]}>
            {name.length > 25 ? `${name.slice(0, 35)}...` : name}
          </Text>
          <Pressable>
            <FontAwesomeIcon icon={faEllipsisVertical} color={theme.PRIMARY} />
          </Pressable>
        </View>
        <View style={{paddingVertical: 10}}>
          <View
            style={{
              display: 'flex',
              flexDirection: lang.lang !== 'ar' ? 'row-reverse' : 'row',
              gap: 5,
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={{color: theme.PRIMARY, fontWeight: 'bold', fontSize: 16}}>
              {totalExpenses}
            </Text>
            <Text style={{color: theme.PRIMARY, fontSize: 14}}>
              {t('generale.spent.from')} {budget}
            </Text>
          </View>
          <Progress.Bar
            progress={totalExpensesPercent}
            width={300}
            color="#ff5a5f"
            borderColor="black"
            borderRadius={20}
            height={13}
            style={{marginBottom: 20}}
            unfilledColor={theme.PRIMARY}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <FontAwesomeIcon icon={faCalendar} color={theme.PRIMARY} />
            <Text style={[styles.tripItemDate, {color: theme.PRIMARY}]}>
              {moment(startDate).format('MMMM D, YYYY')} /{' '}
              {moment(endDate).format('MMMM D, YYYY')}
            </Text>
          </View>
          {/* <Pressable
                style={{
                  backgroundColor: 'rgba(14, 63, 45, .7)',
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('AddTrip', {tripId: id})}>
                <Text style={{fontSize: 12, color: 'white'}}>Edit</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: 'rgba(231, 77, 77, 0.7)',
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleDeleteTrip}>
                <Text style={{fontSize: 12, color: 'white'}}>Delete</Text>
              </Pressable> */}
        </View>
      </Pressable>
    </View>
  );
};

export default TripItem;

const styles = StyleSheet.create({
  tripItem: {
    // backgroundColor: 'red',
    height: 170,
    width: '100%',
    borderRadius: 20,
    borderWidth: 2,
  },
  tripItemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    marginRight: 10,
  },
  tripItemDetails: {
    paddingVertical: 15,
    paddingBottom: 30,
    paddingHorizontal: 13,
    width: '100%',
    height: '100%',
  },
  tripItemName: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'DelaRegular',
    color: '#F5EADD',
    marginBottom: 10,
  },
  tripItemDate: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    width: '70%',
  },
  tripItemBudget: {
    fontSize: 16,
    color: 'white',
    fontFamily: FONTS.LIGHT,
    fontWeight: 'bold',
    // backgroundColor: 'rgba(214, 162, 102, 0.7)',
    // padding: 5,
    borderRadius: 6,
    paddingBottom: 10,
  },
  // addTripButtonIconContainer: {
  //   borderWidth: 1,
  //   borderColor: COLORS.GRAY[200],
  //   backgroundColor: 'white',
  //   padding: 7,
  //   borderRadius: 50,
  //   position: 'absolute',
  //   left: 10,
  //   top: 10,
  // },
  // addTripButtonIcon: {width: 10, height: 10},
});
