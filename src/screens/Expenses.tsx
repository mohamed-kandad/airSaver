import { RootStackParamList } from "@/navigation/MainNavigation";
import { ITabNavigation } from "@/navigation/TabNavigation";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import NotFound from "../components/common/NotFound";
import ExpenseItem from "../components/Expenses/ExpenseItem";
import Header from "../components/Expenses/Header";
import TopHeader from "../components/Expenses/TopHeader";
import { useTheme } from "../components/providers/ThemeContext";
import { FONTS } from "../constant";
import { ExpenseModel } from "../database/models/expense";
import { TripModel } from "../database/models/trips";
import { getFlexDirectionStyle } from "../languages/styles";
import { RootState } from "../store";
import { Expense } from "../types/expense";

type GroupedExpense = {
  date: string;
  expenses: Expense[];
  total: number;
};

type ExpensesScreenRouteProp = RouteProp<ITabNavigation, "Expenses">;
type ExpensesScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "NewExpense"
>;

const Expenses = () => {
  const { navigate, goBack } = useNavigation<ExpensesScreenNavigationProp>();
  const { t } = useTranslation();
  const { trip_id } = useRoute<ExpensesScreenRouteProp>().params;

  const { theme } = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<number>(0);

  const transformExpenses = (expenses: Expense[]): GroupedExpense[] => {
    const grouped = expenses.reduce((acc, expense) => {
      const dateKey = moment(expense.date).format("YYYY-MM-DD");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(expense);
      return acc;
    }, {} as Record<string, Expense[]>);

    return Object.keys(grouped).map((date) => {
      const dailyExpenses = grouped[date];
      const total = dailyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      return {
        date,
        expenses: dailyExpenses,
        total,
      };
    });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchExpenses = async () => {
        const expenses = await ExpenseModel.getByTripId(+trip_id);
        console.log("🚀 ~ fetchExpenses ~ expenses:", expenses);
        if (expenses) setExpenses(expenses);

        const trip = await TripModel.getById(+trip_id);
        if (trip) setBudget(trip.budget);
      };

      fetchExpenses();
    }, [trip_id])
  );

  const renderDateHeader = (
    isToday: boolean,
    tripDate: string,
    total: number
  ) => (
    <View style={[styles.dateHeader, getFlexDirectionStyle(lang)]}>
      <Text style={[styles.dateText, { color: theme.PRIMARY }]}>
        {isToday
          ? t("expenses.date.today")
          : moment(tripDate).format("YYYY-MM-DD")}
      </Text>
      <Text style={[styles.totalText, { color: theme.PRIMARY }]}>
        {total}DH
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <TopHeader
        showChartButton
        showMapButton
        onClickShowChartButton={() => navigate("Chart", { tripId: trip_id })}
        onBack={() => navigate("Trips")}
        onAdd={() => navigate("NewExpense", { tripId: trip_id, expenseId: "" })}
      />
      <ScrollView style={styles.content}>
        <Header expenses={expenses} budget={budget} />
        {expenses && expenses.length ? (
          transformExpenses(expenses).map((trip) => {
            const isToday = moment(trip.date).isSame(moment(), "day");

            return (
              <View key={trip.date} style={{ marginBottom: 20 }}>
                {renderDateHeader(isToday, trip.date, trip.total)}
                <View style={styles.expenseGroup}>
                  {trip.expenses.map((t: Expense) => (
                    <ExpenseItem
                      date={t.date}
                      key={t.id}
                      name={t.desc}
                      amount={t.amount}
                      id={t.id.toString()}
                      category={t.categorie_id.toString()}
                    />
                  ))}
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.notFoundWrapper}>
            <NotFound text="No Expense Found" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dateHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dateText: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontFamily: FONTS.ClashDisplay.Regular,
  },
  totalText: {
    fontSize: FONTS.SIZES.SMALL,
    fontFamily: FONTS.LotaGrotesque.Regular,
  },
  expenseGroup: {
    gap: 10,
  },
  notFoundWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
