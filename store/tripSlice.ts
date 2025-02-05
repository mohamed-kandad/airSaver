import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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

const saveTripsToStorage = async (trips: Trip[]) => {
  try {
    await AsyncStorage.setItem('@trips', JSON.stringify(trips));
  } catch (e) {
    console.error('Error saving trips to AsyncStorage', e);
  }
};

const loadTripsFromStorage = async () => {
  try {
    const trips = await AsyncStorage.getItem('@trips');
    return trips ? JSON.parse(trips) : [];
  } catch (e) {
    console.error('Error loading trips from AsyncStorage', e);
    return [];
  }
};

export const calculateTripBudget = (trip: Trip) => {
  if (!trip.expenses) return {totalExpenses: 0, remainingBalance: trip.budget};
  const totalExpenses = trip.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const remainingBalance = trip.budget - totalExpenses;

  return {
    totalExpenses,
    remainingBalance,
  };
};

export interface Expense {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
}

export interface Trip {
  expenses?: Expense[];
  id: string;
  name: string;
  budget: number;
  startDate: string;
  endDate: string | null;
}

interface TripsState {
  trips: Trip[];
}

const initialState: TripsState = {
  trips: [],
};

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    createTrip(state, action: PayloadAction<Trip>) {
      state.trips.unshift(action.payload);
      saveTripsToStorage(state.trips);
    },
    deleteTrip(state, action: PayloadAction<string>) {
      state.trips = state.trips.filter(trip => trip.id !== action.payload);
      saveTripsToStorage(state.trips);
    },
    updateTrip(state, action: PayloadAction<Trip>) {
      const index = state.trips.findIndex(
        trip => trip.id === action.payload.id,
      );
      if (index !== -1) {
        state.trips[index] = action.payload;
        saveTripsToStorage(state.trips);
      }
    },

    addExpenseToTrip(
      state,
      action: PayloadAction<{tripId: string; expense: Expense}>,
    ) {
      const {tripId, expense} = action.payload;
      const trip = state.trips.find(trip => trip.id === tripId);
      if (trip) {
        trip.expenses = trip.expenses || []; // Ensure expenses is initialized
        trip.expenses.unshift(expense);
        saveTripsToStorage(state.trips);
      }
    },
    updateExpenseInTrip(
      state,
      action: PayloadAction<{tripId: string; expense: Expense}>,
    ) {
      const {tripId, expense} = action.payload;
      const trip = state.trips.find(trip => trip.id === tripId);
      if (trip && trip.expenses) {
        const expenseIndex = trip.expenses.findIndex(
          exp => exp.id === expense.id,
        );
        if (expenseIndex !== -1) {
          trip.expenses[expenseIndex] = expense;
          saveTripsToStorage(state.trips);
        }
      }
    },

    deleteExpenseFromTrip(
      state,
      action: PayloadAction<{tripId: string; expenseId: string}>,
    ) {
      const {tripId, expenseId} = action.payload;
      const trip = state.trips.find(trip => trip.id === tripId);
      if (trip && trip.expenses) {
        trip.expenses = trip.expenses.filter(exp => exp.id !== expenseId);
        saveTripsToStorage(state.trips);
      }
    },
    loadTrips(state, action: PayloadAction<Trip[]>) {
      state.trips = action.payload;
    },
  },
});

export const {
  createTrip,
  deleteTrip,
  updateTrip,
  loadTrips,
  addExpenseToTrip,
  updateExpenseInTrip,
  deleteExpenseFromTrip,
} = tripSlice.actions;

export const initializeTrips = () => async (dispatch: any) => {
  const trips = await loadTripsFromStorage();
  dispatch(loadTrips(trips));
};

export default tripSlice.reducer;
