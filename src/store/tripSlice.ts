import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
    },
    deleteTrip(state, action: PayloadAction<string>) {
      state.trips = state.trips.filter(trip => trip.id !== action.payload);
    },
    updateTrip(state, action: PayloadAction<Trip>) {
      const index = state.trips.findIndex(
        trip => trip.id === action.payload.id,
      );
      if (index !== -1) {
        state.trips[index] = action.payload;
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
        // saveTripsToStorage(state.trips);
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
          // saveTripsToStorage(state.trips);
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
        // saveTripsToStorage(state.trips);
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

// export const initializeTrips = () => async (dispatch: any) => {
//   const trips = await loadTripsFromStorage();
//   dispatch(loadTrips(trips));
// };

export default tripSlice.reducer;
