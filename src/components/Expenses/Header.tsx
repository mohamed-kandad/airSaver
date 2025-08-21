import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { FONTS } from "../../constant";
import { calculateTripBudget } from "../../helpers/utils";
import { RootState } from "../../store";
import { Expense } from "../../types/expense";
import { useTheme } from "../providers/ThemeContext";

import { PieChart } from "react-native-chart-kit";

type Props = {
  expenses: Expense[];
  budget: number;
};

const Header: FC<Props> = ({ budget, expenses }) => {
  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const tripBudget = calculateTripBudget(expenses, budget);
  console.log("🚀 ~ Header ~ tripBudget:", tripBudget);
  const { theme } = useTheme();

  const screenWidth = Dimensions.get("window").width;
  const data = [
    {
      name: "Income",
      amount: tripBudget.remainingBalance,
      color: "#FF6B6B",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Spent",
      amount: tripBudget.totalExpenses,
      color: "#FF8787",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={[styles.summary, { borderColor: theme.PRIMARY }]}>
      <View style={styles.row}>
        {/* LEFT SIDE - INFO */}
        <View style={styles.infoContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <View
                style={[styles.colorDot, { backgroundColor: item.color }]}
              />
              <View>
                <Text style={[styles.infoTitle, { color: theme.PRIMARY }]}>
                  {item.name}
                </Text>
                <Text style={[styles.infoValue, { color: theme.PRIMARY }]}>
                  {item.amount}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* RIGHT SIDE - PIE CHART */}
        <PieChart
          data={data}
          width={screenWidth / 2} // half screen for chart
          height={180}
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "transparent",
            backgroundGradientTo: "transparent",

            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          center={[0, 0]}
          paddingLeft="60"
          hasLegend={false}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  summary: {
    padding: 20,
    paddingVertical: 0,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  infoTitle: {
    fontFamily: FONTS.LotaGrotesque.Regular,
    fontSize: 14,
    color: "#333",
  },
  infoValue: {
    fontSize: 18,
    fontFamily: FONTS.ClashDisplay.Semibold,
    color: "#000",
  },
});
