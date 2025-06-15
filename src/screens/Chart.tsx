import CircularSegmentedChart from "@/components/chart/CircularSegmentedChart";
import TopHeader from "@/components/Expenses/TopHeader";
import { useTheme } from "@/components/providers/ThemeContext";
import { FONTS } from "@/constant";
import { ExpenseModel } from "@/database/models/expense";
import { TripModel } from "@/database/models/trips";
import {
  groupExpensesForChart,
  OutputItem,
  prepareChartData,
} from "@/helpers/chart";
import { getJustifyStyle } from "@/languages/styles";
import { RootStackParamList } from "@/navigation/MainNavigation";
import { RootState } from "@/store";
import { Expense } from "@/types/expense";
import { Trip } from "@/types/trip";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {};
type ChartScreenRouteProp = RouteProp<RootStackParamList, "Chart">;
type ChartScreenNavigationProp = NavigationProp<RootStackParamList, "Chart">;

const Chart = (props: Props) => {
  const { tripId } = useRoute<ChartScreenRouteProp>().params;
  const navigation = useNavigation<ChartScreenNavigationProp>();
  const lang = useSelector((state: RootState) => state.lang.lang);

  const [tripInfo, setTripInfo] = useState<Trip>();
  const [tripExpenses, setTripExpenses] = useState<Expense[]>();

  const { theme } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const getTripInfo = async () => {
        if (tripId) {
          const trip: Trip | null = await TripModel.getById(+tripId);
          if (trip) setTripInfo(trip);

          const expenses: Expense[] | null = await ExpenseModel.getByTripId(
            +tripId
          );
          if (expenses) setTripExpenses(expenses);
        }
      };
      getTripInfo();
    }, [tripId])
  );

  const chartSegments = groupExpensesForChart(tripExpenses || []);
  const chartCategoriesData: OutputItem[] = prepareChartData(
    tripExpenses || []
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <TopHeader onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <CircularSegmentedChart
          trip_budget={tripInfo?.budget || 0}
          trip_name={tripInfo?.name || ""}
          segments={chartSegments}
        />
        <View
          style={{
            flexDirection: "row",
            ...getJustifyStyle(lang),
            gap: 10,
            flexWrap: "wrap",
            marginTop: 30,
          }}
        >
          {chartCategoriesData.map((item: OutputItem, index) => (
            <View
              style={{
                backgroundColor: `#${item.color}`,
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Text
                style={{
                  color: `white`,
                  fontFamily: FONTS.LotaGrotesque.Bold,
                }}
              >
                {item.category_name}
              </Text>
              <Text
                style={{
                  color: `white`,
                  fontFamily: FONTS.LotaGrotesque.Bold,
                }}
              >
                {item.totalExpense}DH
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chart;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
