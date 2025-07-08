import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { Button, Input } from "../components/common";
import TopHeader from "../components/Expenses/TopHeader";
import { useTheme } from "../components/providers/ThemeContext";
import { ExpenseModel } from "../database/models/expense";
import { TripModel } from "../database/models/trips";
import { calculateTripBudget, categories } from "../helpers/utils";
import { getTextStyle } from "../languages/styles";
import { RootStackParamList } from "../navigation/MainNavigation";
import pushNotificationService from "../services/LocalNotificationService";
import { RootState } from "../store";
import { Expense, IExpense } from "../types/expense";
import { Trip } from "../types/trip";

type NewExpenseRouteProp = RouteProp<RootStackParamList, "NewExpense">;

const NewExpense = () => {
  const navigation = useNavigation();
  const { tripId, expenseId } = useRoute<NewExpenseRouteProp>().params;
  const [expenseInfo, setExpenseInfo] = useState({
    id: Date.now().toString(),
    name: "",
    amount: 0,
    category: "",
    date: Date().toString(),
  });
  const { t } = useTranslation();

  const { theme } = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const [trip, setTrip] = useState<Trip>();

  const getExpensesData = async () => {
    const tripData = await TripModel.getById(+tripId);
    if (tripData) setTrip(tripData);

    if (expenseId) {
      const expense: Expense | null = await ExpenseModel.getById(+expenseId);
      if (expense)
        setExpenseInfo({
          id: expense.id.toString(),
          name: expense.desc,
          amount: expense.amount,
          category: expense.categorie_id.toString(),
          date: expense.date,
        });
    }
  };
  useEffect(() => {
    getExpensesData();
  }, [expenseId, tripId]);

  const handleAddExpense = async () => {
    if (!expenseInfo.name && !expenseInfo.amount && !expenseInfo.category) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all fields before submitting.",
        position: "top",
      });
      return;
    }

    const payload: IExpense = {
      amount: expenseInfo.amount,
      categorie_id: +expenseInfo.category,
      trip_id: +tripId,
      desc: expenseInfo.name,
      date: Date().toString(),
    };
    if (expenseId) {
      await ExpenseModel.update(+expenseId, payload);
    } else {
      await ExpenseModel.create(payload);
    }

    const updatedExpenses: Expense[] | null = await ExpenseModel.getByTripId(
      +tripId
    );

    if (updatedExpenses) {
      const updatedTripBudget = calculateTripBudget(
        updatedExpenses,
        trip?.budget || 0
      );

      const percentageSpent =
        (updatedTripBudget.totalExpenses / (trip?.budget || 1)) * 100;
      pushNotificationService.triggerBudgetPushNotification(percentageSpent);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <TopHeader showBack onBack={() => navigation.goBack()} />
      <View
        style={[styles.formContainer, { backgroundColor: theme.background }]}
      >
        <View>
          <Text
            style={[
              styles.heading,
              getTextStyle(lang),
              { color: theme.PRIMARY },
            ]}
          >
            {t("expenses.new.heading")}
          </Text>

          <FlatList
            data={categories}
            renderItem={({ item }) => {
              const isSelected = item.id === expenseInfo.category;
              return (
                <Pressable
                  style={[
                    styles.categoryButton,
                    isSelected && {
                      backgroundColor: theme.orange,
                      borderWidth: 2,
                      borderColor: theme.PRIMARY,
                    },
                  ]}
                  onPress={() =>
                    setExpenseInfo({ ...expenseInfo, category: item.id })
                  }
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    size={20}
                    color={isSelected ? "white" : theme.TEXT1}
                  />
                </Pressable>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />

          <View style={styles.inputGroup}>
            <Input
              placeholder="Enter budget"
              value={expenseInfo.amount.toString()}
              keyboardType="numeric"
              onChangeText={(text) => {
                if (/^\d*$/.test(text))
                  setExpenseInfo({ ...expenseInfo, amount: +text });
              }}
            />
            <Input
              placeholder={t("expenses.new.desc")}
              onChangeText={(text) =>
                setExpenseInfo({ ...expenseInfo, name: text })
              }
              value={expenseInfo.name}
              numberOfLines={10}
              style={styles.descriptionInput}
              textAlignVertical="top"
              multiline={true}
            />
          </View>
        </View>

        <Button
          title={
            expenseId ? t("expenses.update.button") : t("expenses.new.button")
          }
          onPress={handleAddExpense}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewExpense;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  formContainer: {
    minHeight: "88%",
    width: "100%",
    borderRadius: 23,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  heading: {
    marginTop: 20,
    fontSize: 35,
    fontFamily: "ClashDisplay-Bold",
  },
  categoryList: {
    gap: 20,
    height: 40,
    marginTop: 20,
  },
  categoryButton: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  inputGroup: {
    marginTop: 40,
    gap: 20,
  },
  descriptionInput: {
    height: 200,
    paddingVertical: 20,
  },
});
