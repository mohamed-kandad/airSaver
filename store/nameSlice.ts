import {createSlice} from '@reduxjs/toolkit';

const nameSlice = createSlice({
  name: 'name',
  initialState: {name: ''},
  reducers: {
    setName: (state, action) => {
      // addName(action.payload);
      state.name = action.payload;
    },
    getName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export default nameSlice.reducer;
export const {setName, getName} = nameSlice.actions;
