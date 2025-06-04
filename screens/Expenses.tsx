import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Expenses/Header';
import ExpenseItem from '../components/Expenses/ExpenseItem';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainNavigation';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSadTear} from '@fortawesome/free-solid-svg-icons';
import {HoldItem} from 'react-native-cli-hold-menu';
import moment from 'moment';
import {COLORS, FONTS} from '../constant';
import {Expense} from '../store/tripSlice';
import {useTheme} from '../components/providers/ThemeContext';
import NotFound from '../components/common/NotFound';

type GroupedExpense = {
  date: string;
  expenses: Expense[];
  total: number;
};

type ExpensesScreenRouteProp = RouteProp<RootStackParamList, 'Expenses'>;

const Expenses = () => {
  const {isDark, theme, toggleTheme} = useTheme();

  const {tripId} = useRoute<ExpensesScreenRouteProp>().params;
  const tripsData = useSelector((state: RootState) => state.trips).trips.filter(
    trip => trip.id === tripId,
  );
  const transformExpenses = (expenses: Expense[]): GroupedExpense[] => {
    // Group expenses by date
    const grouped = expenses.reduce((acc, expense) => {
      const dateKey = moment(expense.date).format('YYYY-MM-DD'); // Format date
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(expense);
      return acc;
    }, {} as Record<string, Expense[]>);

    // Transform grouped data into the desired format
    return Object.keys(grouped).map(date => {
      const dailyExpenses = grouped[date];
      const total = dailyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      return {
        date,
        expenses: dailyExpenses,
        total,
      };
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.background, flex: 1}}>
      <Header tripId={tripId} />
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 40,
        }}>
        {/* <FlatList
          data={tripsData[0].expenses}
          renderItem={({item}) => <ExpenseItem {...item} />}
          contentContainerStyle={{gap: 15, marginTop: 40}}
        /> */}
        {tripsData[0].expenses && tripsData[0].expenses.length ? (
          transformExpenses(tripsData[0].expenses).map(trip => {
            const isToday = moment(trip.date).isSame(moment(), 'day');

            return (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'DelaRegular',
                      color: theme.TEXT1,
                    }}>
                    {' '}
                    {isToday ? 'Today' : moment(trip.date).format('YYYY-MM-DD')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.REGULAR,
                      color: isDark ? theme.TEXT1 : 'black',
                    }}>
                    {trip.total}DH
                  </Text>
                </View>
                <View style={{gap: 10}}>
                  {trip.expenses &&
                    trip.expenses.map((t: any) => (
                      <ExpenseItem
                        date={t.date}
                        key={t.id}
                        name={t.name}
                        amount={t.amount}
                        id={t.id}
                        category={t.category}
                      />
                    ))}
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <NotFound text="No Expense Found" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Expenses;

const styles = StyleSheet.create({});
