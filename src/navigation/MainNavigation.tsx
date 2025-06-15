import Chart from "@/screens/Chart";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, Pressable } from "react-native";
import { useTheme } from "../components/providers/ThemeContext";
import { FONTS, ICONS } from "../constant";
import Expenses from "../screens/Expenses";
import NewExpense from "../screens/NewExpense";
import NewTrip from "../screens/NewTrip";
import Settings from "../screens/Settings";
import Trips from "../screens/Trips";

type Props = {};
export type RootStackParamList = {
  Trips: undefined;
  AddTrip: { tripId: string };
  Chart: { tripId: string };
  NewExpense: { tripId: string; expenseId: string };
  Expenses: { tripId: string };
  Entername: undefined;
  Settings: undefined;
};

const Main = createStackNavigator<RootStackParamList>();
const MainNavigation = (props: Props) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Main.Navigator>
      <Main.Screen
        options={{ headerShown: false }}
        name="Trips"
        component={Trips}
      />
      <Main.Screen
        options={{ headerShown: false }}
        name="Chart"
        component={Chart}
      />
      <Main.Screen
        name="Expenses"
        component={Expenses}
        options={{ headerShown: false }}
      />
      <Main.Screen
        options={({ navigation }) => ({
          headerTitle: "New Expense",
          headerTitleAlign: "center",
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FONTS.ClashDisplay.Bold,
            fontSize: 16,
          },
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} style={{}}>
              <Image source={ICONS.x} style={{ width: 10, height: 10 }} />
            </Pressable>
          ),
        })}
        name="NewExpense"
        component={NewExpense}
      />
      <Main.Screen
        name="AddTrip"
        component={NewTrip}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: FONTS.ClashDisplay.Bold,
            fontSize: 16,
          },
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerShown: false,
        })}
      />
      <Main.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Main.Navigator>
  );
};

export default MainNavigation;
