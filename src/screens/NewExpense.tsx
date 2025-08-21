import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    images: [] as string[],
  });
  const [focusedInput, setFocusedInput] = useState<number>(-1);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const [trip, setTrip] = useState<Trip>();

  const amountInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const getExpensesData = async () => {
    const tripData = await TripModel.getById(+tripId);
    if (tripData) setTrip(tripData);
    if (expenseId) {
      const expense: Expense | null = await ExpenseModel.getById(+expenseId);
      if (expense)
        setExpenseInfo((prev) => ({
          ...prev,
          id: expense.id.toString(),
          name: expense.desc,
          amount: expense.amount,
          category: expense.categorie_id.toString(),
          date: expense.date,
          images: expense.images || [],
        }));
    }
  };

  useEffect(() => {
    getExpensesData();
  }, [expenseId, tripId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setExpenseInfo((prev) => ({
        ...prev,
        images: [...prev.images, ...uris],
      }));
    }
  };

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
      images: expenseInfo.images,
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
      // pushNotificationService.triggerBudgetPushNotification(percentageSpent);
    }
    navigation.goBack();
  };

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
    setFocusedInput(-1);
  }, []);

  const handleInputFocus = useCallback((inputIndex: number) => {
    setFocusedInput(inputIndex);
  }, []);

  const handleInputBlur = useCallback(() => {
    setFocusedInput(-1);
  }, []);

  const handleAmountSubmit = useCallback(() => {
    setFocusedInput(1);
    descriptionInputRef.current?.focus();
  }, []);

  const handleDescriptionSubmit = useCallback(() => {
    setFocusedInput(-1);
    Keyboard.dismiss();
  }, []);

  const handleAmountChange = useCallback((text: string) => {
    if (/^\d*$/.test(text)) {
      setExpenseInfo((prev) => ({ ...prev, amount: +text }));
    }
  }, []);

  const handleNameChange = useCallback((text: string) => {
    setExpenseInfo((prev) => ({ ...prev, name: text }));
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <TopHeader showBack onBack={() => navigation.goBack()} />
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View
              style={[
                styles.formContainer,
                { backgroundColor: theme.background },
              ]}
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

                {/* Categories */}
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

                {/* Inputs */}
                <View style={styles.inputGroup}>
                  <Input
                    ref={amountInputRef}
                    placeholder="Enter budget"
                    value={expenseInfo.amount.toString()}
                    keyboardType="numeric"
                    onChangeText={handleAmountChange}
                    onFocus={() => handleInputFocus(0)}
                    onBlur={handleInputBlur}
                    onSubmitEditing={handleAmountSubmit}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    style={[focusedInput === 0 && styles.inputFocused]}
                  />
                  <Input
                    ref={descriptionInputRef}
                    placeholder={t("expenses.new.desc")}
                    onChangeText={handleNameChange}
                    value={expenseInfo.name}
                    numberOfLines={10}
                    style={[
                      styles.descriptionInput,
                      focusedInput === 1 && styles.inputFocused,
                    ]}
                    textAlignVertical="top"
                    multiline={true}
                    onFocus={() => handleInputFocus(1)}
                    onBlur={handleInputBlur}
                    onSubmitEditing={handleDescriptionSubmit}
                    returnKeyType="done"
                  />
                </View>
                {/* Images */}
                <View style={styles.imagesWrapper}>
                  {[...expenseInfo.images, "add"].map((item, index) =>
                    item === "add" ? (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.imageBox,
                          {
                            borderColor: theme.PRIMARY,
                            borderWidth: 1,
                            borderStyle: "dashed",
                          },
                        ]}
                        onPress={pickImage}
                      >
                        <FontAwesomeIcon
                          icon={faImage}
                          size={24}
                          color={theme.PRIMARY}
                        />
                      </TouchableOpacity>
                    ) : (
                      <Image
                        key={index}
                        source={{ uri: item }}
                        style={styles.imageBox}
                        resizeMode="cover"
                      />
                    )
                  )}
                </View>
              </View>

              <Button
                title={
                  expenseId
                    ? t("expenses.update.button")
                    : t("expenses.new.button")
                }
                onPress={handleAddExpense}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewExpense;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  keyboardAvoidingView: { flex: 1 },
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
  categoryList: { gap: 20, height: 40, marginTop: 20 },
  categoryButton: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  imagesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 10,
  },
  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputGroup: { marginTop: 20, gap: 20 },
  inputFocused: { borderWidth: 2, borderColor: "#007AFF" },
  descriptionInput: { height: 200, paddingVertical: 20 },
});
