import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from './MainNavigation';
import EnterName from '../screens/EnterName';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import i18next from 'i18next';

const Stack = createStackNavigator();
const index = () => {
  const namedata = useSelector((stat: RootState) => stat.name);
  const lang = useSelector((stat: RootState) => stat.lang);
  console.log('🚀 ~ index ~ lang:', lang);

  useEffect(() => {
    i18next.changeLanguage(lang.lang);
  }, []);

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
