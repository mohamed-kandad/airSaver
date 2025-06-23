import CustomTabBar from "@/components/customTabBar";
import Chart from "@/screens/Chart";
import CheckList from "@/screens/CheckList";
import Expenses from "@/screens/Expenses";
import Maps from "@/screens/Maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "./MainNavigation";

type Props = {};

export type ITabNavigation = {
  Map: { trip_id: string };
  Expenses: { trip_id: string };
  Checklist: { trip_id: string };
  Chart: { trip_id: string };
};
const Tab = createBottomTabNavigator<ITabNavigation>();
type tabRoute = RouteProp<RootStackParamList, "Tab">;

const TabNavigation = (props: Props) => {
  const { params } = useRoute<tabRoute>();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="Expenses"
    >
      <Tab.Screen
        name="Map"
        component={Maps}
        initialParams={{ trip_id: params.tripId }}
      />
      <Tab.Screen
        name="Expenses"
        component={Expenses}
        initialParams={{ trip_id: params.tripId }}
      />
      <Tab.Screen
        name="Chart"
        component={Chart}
        initialParams={{ trip_id: params.tripId }}
      />
      <Tab.Screen
        name="Checklist"
        component={CheckList}
        initialParams={{ trip_id: params.tripId }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
