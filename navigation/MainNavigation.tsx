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

type Props = {};
export type RootStackParamList = {
  Trips: undefined;
  AddTrip: {tripId: string};
  NewExpense: {tripId: string; expenseId: string};
  Expenses: {tripId: string};
  Entername: undefined;
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
        options={({navigation, route}) => {
          const tripId = route.params?.tripId;
          return {
            headerTransparent: true,
            headerRightContainerStyle: {paddingHorizontal: 10},
            headerLeftContainerStyle: {paddingHorizontal: 10},
            headerTitle: '',
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  color={theme.TEXT1}
                  size={25}
                />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={() =>
                  navigation.navigate('NewExpense', {tripId, expenseId: ''})
                }
                style={{
                  backgroundColor: theme.BUTTON_HEADER,
                  padding: 8,
                  borderRadius: 12,
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon
                  icon={faPlus}
                  color={isDark ? theme.PRIMARY : 'white'}
                />
              </Pressable>
            ),
          };
        }}
      />
      <Main.Screen
        options={({navigation}) => ({
          presentation: 'modal',
          headerTransparent: true,
          headerTitle: 'New Expense',
          headerTitleAlign: 'center',
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FONTS.REGULAR,
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
          presentation: 'transparentModal',
          headerTransparent: true,
          // headerTitle: 'Add Trip',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FONTS.BOLD,
            fontWeight: '700',
            fontSize: 16,
            // color: theme.TEXT_DARK,
          },
          headerLeftContainerStyle: {paddingLeft: 10},
          headerShown: false,
          // headerLeft: () => (
          //   <Pressable
          //     onPress={() => navigation.goBack()}
          //     style={{
          //       borderWidth: 1,
          //       // borderColor: theme.GRAY[200],
          //       // backgroundColor: !isDark ? '#21242D' : theme.TEXT_DARK,
          //       padding: 8,
          //       borderRadius: 50,
          //     }}>
          //     <Image
          //       source={ICONS.x}
          //       style={{width: 10, height: 10}}
          //       tintColor={!isDark ? 'white' : 'black'}
          //     />
          //   </Pressable>
          // ),
        })}
      />
    </Main.Navigator>
  );
};

export default MainNavigation;
