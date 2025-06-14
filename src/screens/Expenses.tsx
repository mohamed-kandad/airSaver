import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import { RootStackParamList } from "../navigation/MainNavigation";
import { RootState } from "../store";
import { Expense } from "../types/expense";

type GroupedExpense = {
  date: string;
  expenses: Expense[];
  total: number;
};

type ExpensesScreenRouteProp = RouteProp<RootStackParamList, "Expenses">;
type ExpensesScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "Expenses"
>;

const Expenses = () => {
  const { navigate, goBack } = useNavigation<ExpensesScreenNavigationProp>();
  const { t } = useTranslation();
  const { tripId } = useRoute<ExpensesScreenRouteProp>().params;

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
        const expenses = await ExpenseModel.getByTripId(+tripId);
        if (expenses) setExpenses(expenses);

        const trip = await TripModel.getById(+tripId);
        if (trip) setBudget(trip.budget);
      };

      fetchExpenses();
    }, [tripId])
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
        onClickShowChartButton={() => navigate("Chart", { tripId })}
        onBack={() => goBack()}
        onAdd={() => navigate("NewExpense", { tripId, expenseId: "" })}
      />
      <View style={styles.content}>
        <Header expenses={expenses} budget={budget} />
        {expenses && expenses.length ? (
          transformExpenses(expenses).map((trip) => {
            const isToday = moment(trip.date).isSame(moment(), "day");

            return (
              <View key={trip.date}>
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
      </View>
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
    paddingHorizontal: 20,
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
