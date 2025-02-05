import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const addName = async (name: string) => {
  await AsyncStorage.setItem('@name', name);
};
export const getFromStorageName = async () => {
  const storedName = await AsyncStorage.getItem('@name');
  return storedName;
};
const nameSlice = createSlice({
  name: 'name',
  initialState: {name: ''},
  reducers: {
    setName: (state, action) => {
      addName(action.payload);
      state.name = action.payload;
    },
    getName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export default nameSlice.reducer;
export const {setName, getName} = nameSlice.actions;
