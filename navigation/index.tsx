import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from './MainNavigation';
import EnterName from '../screens/EnterName';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {getFromStorageName, getName} from '../store/nameSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const index = () => {
  const namedata = useSelector((stat: RootState) => stat.name);
  const dispatch: AppDispatch = useDispatch();
  console.log('🚀 ~ index ~ namedata:', namedata);

  useEffect(() => {
    const fetchNameFromStorage = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@name');
        const name = storedName ?? ''; // Fallback to an empty string if null
        dispatch(getName(name));
      } catch (error) {
        console.error('Failed to fetch name from storage:', error);
        dispatch(getName('')); // Fallback to an empty string in case of error
      }
    };

    fetchNameFromStorage();
  }, [dispatch]);

  return (
    <Stack.Navigator>
      {namedata.name === '' ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="Entername"
          component={EnterName}
        />
      ) : (
        <Stack.Screen
          name="main"
          component={MainNavigation}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default index;
