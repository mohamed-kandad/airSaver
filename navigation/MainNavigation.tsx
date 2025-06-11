import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Trips from '../screens/Trips';
import NewTrip from '../screens/NewTrip';
import {COLORS, FONTS, ICONS, IMAGES} from '../constant';
import {useNavigation} from '@react-navigation/native';
import Expenses from '../screens/Expenses';
import NewExpense from '../screens/NewExpense';
import {useTheme} from '../components/providers/ThemeContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faPlus} from '@fortawesome/free-solid-svg-icons';
import Settings from '../screens/Settings';

type Props = {};
export type RootStackParamList = {
  Trips: undefined;
  AddTrip: {tripId: string};
  NewExpense: {tripId: string; expenseId: string};
  Expenses: {tripId: string};
  Entername: undefined;
  Settings: undefined;
};

const Main = createStackNavigator<RootStackParamList>();
const MainNavigation = (props: Props) => {
  const {theme, isDark, toggleTheme} = useTheme();

  return (
    <Main.Navigator>
      <Main.Screen
        options={{headerShown: false}}
        name="Trips"
        component={Trips}
      />
      <Main.Screen
        name="Expenses"
        component={Expenses}
        options={{headerShown: false}}
      />
      <Main.Screen
        options={({navigation}) => ({
          headerTitle: 'New Expense',
          headerTitleAlign: 'center',
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FONTS.ClashDisplay.Bold,
            fontWeight: '700',
            fontSize: 16,
          },
          headerLeftContainerStyle: {paddingLeft: 20},
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} style={{}}>
              <Image source={ICONS.x} style={{width: 10, height: 10}} />
            </Pressable>
          ),
        })}
        name="NewExpense"
        component={NewExpense}
      />
      <Main.Screen
        name="AddTrip"
        component={NewTrip}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FONTS.ClashDisplay.Bold,
            fontWeight: '700',
            fontSize: 16,
          },
          headerLeftContainerStyle: {paddingLeft: 10},
          headerShown: false,
        })}
      />
      <Main.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Main.Navigator>
  );
};

export default MainNavigation;
