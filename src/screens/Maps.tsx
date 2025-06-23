import TopHeader from "@/components/Expenses/TopHeader";
import { useTheme } from "@/components/providers/ThemeContext";
import { ExpenseModel } from "@/database/models/expense";
import { RootStackParamList } from "@/navigation/MainNavigation";
import { ITabNavigation } from "@/navigation/TabNavigation";
import { Expense } from "@/types/expense";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {};
type ExpensesScreenRouteProp = RouteProp<ITabNavigation, "Expenses">;
type ExpensesScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "NewExpense"
>;
const Maps = (props: Props) => {
  const { navigate, goBack } = useNavigation<ExpensesScreenNavigationProp>();
  const { t } = useTranslation();
  const { trip_id } = useRoute<ExpensesScreenRouteProp>().params;
  const { theme } = useTheme();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    (async () => {
      const tripExpenses = await ExpenseModel.getByTripId(+trip_id);
      if (tripExpenses) setExpenses(tripExpenses);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 5,
          //   right: 10,
          zIndex: 1,
          width: "100%",
        }}
      >
        <TopHeader
          showChartButton
          showMapButton
          onClickShowChartButton={() => navigate("Chart", { tripId: trip_id })}
          onBack={() => navigate("Trips")}
          isTransparent
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // provider={PROVIDER_GOOGLE}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          />
        )}

        {expenses &&
          expenses.map((expense) => (
            <Marker
              key={expense.id}
              coordinate={{
                latitude: expense.latitude,
                longitude: expense.longitude,
              }}
              title={expense.desc}
              description={`Expense: ${expense.desc} MAD`}
            />
          ))}
      </MapView>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
