import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  faUtensils,
  faBus,
  faBed,
  faFilm,
  faShoppingBag,
  faHeartbeat,
  faBiking,
  faEllipsisH,
  faGasPump,
  faMoneyBillAlt,
} from '@fortawesome/free-solid-svg-icons';
import {Expense} from '../types/expense';

export const calculateTripBudget = (
  expenses: Expense[] | undefined,
  budget: number,
) => {
  if (!expenses) return {totalExpenses: 0, remainingBalance: budget};
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const remainingBalance = budget - totalExpenses;

  return {
    totalExpenses,
    remainingBalance,
  };
};

export const calculatePercentage = (
  budget: number,
  expenses: number,
): number => {
  const b = budget;
  const e = expenses;
  if (b > 0 && e >= 0) {
    return +((e / b) * 100).toFixed(2);
  }
  return 0;
};

export const categories = [
  {id: '1', name: 'Food', icon: faUtensils},
  {id: '2', name: 'Transport', icon: faBus},
  {id: '3', name: 'Accommodation', icon: faBed},
  {id: '4', name: 'Entertainment', icon: faFilm},
  {id: '5', name: 'Shopping', icon: faShoppingBag},
  {id: '6', name: 'Health', icon: faHeartbeat},
  {id: '7', name: 'Activities', icon: faBiking},
  {id: '8', name: 'Miscellaneous', icon: faEllipsisH},
  {id: '9', name: 'Fuel', icon: faGasPump},
  {id: '10', name: 'Tips', icon: faMoneyBillAlt},
];

// مفاتيح التخزين
export const STORAGE_KEY = '@notified_thresholds';

export const saveNotifiedThresholds = async (thresholds: number[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(thresholds));
  } catch (e) {
    console.log('Error saving notified thresholds', e);
  }
};

export const loadNotifiedThresholds = async (): Promise<
  {trip_id: number; threshold: number[]}[]
> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.log('Error loading notified thresholds', e);
    return [];
  }
};
