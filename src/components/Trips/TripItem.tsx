import {
  faCalendarDays,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { FC, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";

import { FONTS } from "../../constant";
import { ExpenseModel } from "../../database/models/expense";
import { calculatePercentage, calculateTripBudget } from "../../helpers/utils";
import { getFlexDirectionStyle } from "../../languages/styles";
import { RootStackParamList } from "../../navigation/MainNavigation";
import { RootState } from "../../store";
import { Expense } from "../../types/expense";
import { Trip } from "../../types/trip";
import { useTheme } from "../providers/ThemeContext";

type TripItemScreenNavigationProp = NavigationProp<RootStackParamList, "Trips">;

const TripItem: FC<Trip> = ({ budget, end_date, id, name, start_date }) => {
  const { theme } = useTheme();
  const navigation = useNavigation<TripItemScreenNavigationProp>();
  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // const handleDeleteTrip = () => {
  //   dispatch(deleteTrip(id));
  // };

  useLayoutEffect(() => {
    (async () => {
      if (id) {
        const expenses = await ExpenseModel.getByTripId(id);
        if (expenses) setExpenses(expenses);
      }
    })();
  }, []);

  const totalExpenses = calculateTripBudget(expenses, budget).totalExpenses;
  const totalExpensesPercent = calculatePercentage(budget, totalExpenses) / 100;

  const isTripStart = moment(start_date).isBefore(moment());

  return (
    <View style={[styles.tripItem, { borderColor: theme.PRIMARY }]}>
      <Pressable
        style={styles.tripItemDetails}
        onPress={() =>
          isTripStart &&
          navigation.navigate("Expenses", { tripId: id.toString() })
        }
      >
        <View style={[styles.header, getFlexDirectionStyle(lang)]}>
          <Text style={[styles.tripItemBudget, { color: theme.PRIMARY }]}>
            {name.length > 25 ? `${name.slice(0, 35)}...` : name}
          </Text>
          <View
            style={{
              gap: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              ...getFlexDirectionStyle(lang),
            }}
          >
            {!isTripStart && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.orange,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.ClashDisplay.Medium,
                    fontSize: 10,
                    color: theme.PRIMARY,
                  }}
                >
                  {t("trips.not.start.yet")}
                </Text>
              </View>
            )}
            <Pressable>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                color={theme.PRIMARY}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.body}>
          <View style={[styles.expenseRow, getFlexDirectionStyle(lang)]}>
            <Text style={[styles.expenseAmount, { color: theme.PRIMARY }]}>
              {totalExpenses} MAD
            </Text>
            <Text
              style={[
                styles.expenseLabel,
                {
                  color: theme.PRIMARY,
                },
              ]}
            >
              {t("generale.spent.from")} {budget} MAD
            </Text>
          </View>

          <Progress.Bar
            progress={totalExpensesPercent}
            width={300}
            color={theme.PRIMARY}
            borderColor={theme.PRIMARY}
            borderRadius={20}
            height={13}
            style={styles.progressBar}
            unfilledColor={"transparent"}
          />

          <View style={[styles.dateRow, getFlexDirectionStyle(lang)]}>
            <FontAwesomeIcon icon={faCalendarDays} color={theme.PRIMARY} />
            <View
              style={[
                getFlexDirectionStyle(lang),
                {
                  flex: 1,
                  gap: 5,
                  justifyContent: "flex-start",
                },
              ]}
            >
              <Text style={[styles.tripItemDate, { color: theme.PRIMARY }]}>
                {moment(start_date).format("DD-MM-YYYY")}
              </Text>
              <Text style={[styles.tripItemDate, { color: theme.PRIMARY }]}>
                {t("generale.to")}
              </Text>
              <Text style={[styles.tripItemDate, { color: theme.PRIMARY }]}>
                {moment(end_date).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default TripItem;

const styles = StyleSheet.create({
  tripItem: {
    height: 170,
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
  },
  tripItemDetails: {
    paddingVertical: 15,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 13,
    width: "100%",
    height: "100%",
  },
  tripItemBudget: {
    fontSize: 16,
    fontFamily: FONTS.ClashDisplay.Bold,
    borderRadius: 6,
  },
  tripItemDate: {
    fontSize: 13,
    fontFamily: FONTS.LotaGrotesque.Regular,
  },
  header: {
    borderColor: "gray",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  body: {
    paddingVertical: 10,
  },
  expenseRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  expenseAmount: {
    fontSize: 16,
    fontFamily: FONTS.ClashDisplay.Bold,
  },
  expenseLabel: {
    fontSize: 14,
    fontFamily: FONTS.LotaGrotesque.Regular,
  },
  progressBar: {
    marginBottom: 20,
  },
  dateRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
