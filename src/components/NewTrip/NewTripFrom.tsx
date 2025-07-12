import React, { FC, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DateRangeCalendar from "../calendar/";
import { Button, Input } from "../common";

interface TripInfo {
  name: string;
  budget: number;
}

interface DateRange {
  startDate: string;
  endDate: string;
}

interface NewTripFormProps {
  isUpdate: boolean;
  onPress(): void;
  tripInfo: TripInfo;
  selectedRange: DateRange;
  onTripInfoChange: (tripInfo: TripInfo) => void;
  onSelectedRangeChange: (range: DateRange) => void;
}

const isValidBudgetInput = (input: string): boolean => /^\d*$/.test(input);

const NewTripForm: FC<NewTripFormProps> = ({
  onSelectedRangeChange,
  onTripInfoChange,
  selectedRange,
  tripInfo,
  isUpdate,
  onPress,
}) => {
  const [focusedInput, setFocusedInput] = useState<number>(-1);
  const { t } = useTranslation();

  // Create refs for input fields
  const nameInputRef = useRef<any>(null);
  const budgetInputRef = useRef<any>(null);

  const handleTripNameChange = useCallback(
    (name: string) => onTripInfoChange({ ...tripInfo, name }),
    [onTripInfoChange, tripInfo]
  );

  const handleBudgetChange = useCallback(
    (budget: string) => {
      if (isValidBudgetInput(budget)) {
        onTripInfoChange({ ...tripInfo, budget: Number(budget) });
      }
    },
    [onTripInfoChange, tripInfo]
  );

  const handleNameSubmit = useCallback(() => {
    setFocusedInput(1);
    budgetInputRef.current?.focus();
  }, []);

  const handleBudgetSubmit = useCallback(() => {
    setFocusedInput(-1);
    Keyboard.dismiss();
  }, []);

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Input
              ref={nameInputRef}
              placeholder={t("generale.name")}
              value={tripInfo.name}
              onChangeText={handleTripNameChange}
              onSubmitEditing={handleNameSubmit}
              onFocus={() => handleInputFocus(0)}
              onBlur={handleInputBlur}
              returnKeyType="next"
              blurOnSubmit={false}
              style={[styles.input]}
            />
            <Input
              ref={budgetInputRef}
              keyboardType="number-pad"
              placeholder={t("generale.budget") || "Budget"}
              value={tripInfo.budget.toString()}
              onChangeText={handleBudgetChange}
              onSubmitEditing={handleBudgetSubmit}
              onFocus={() => handleInputFocus(1)}
              onBlur={handleInputBlur}
              returnKeyType="done"
              style={[styles.input]}
            />
            <DateRangeCalendar
              selectedRange={selectedRange}
              onSelectedRangeChange={onSelectedRangeChange}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={isUpdate ? "Update" : "Add Trip"}
              onPress={onPress}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewTripForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
    gap: 30,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  input: {
    // Add any base input styles here
  },
});
