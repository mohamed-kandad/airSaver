import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState, useCallback} from 'react';
import {Button, Input} from '../common';
import {COLORS, FONTS} from '../../constant';
import {useTheme} from '../providers/ThemeContext';
import DateRangeCalendar from '../calendar/';
import i18next from 'i18next';
import {setLang} from '../../store/langSlice';
import {AppDispatch, RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();

  const handleTripNameChange = useCallback(
    (name: string) => onTripInfoChange({...tripInfo, name}),
    [onTripInfoChange, tripInfo],
  );

  const handleBudgetChange = useCallback(
    (budget: string) => {
      if (isValidBudgetInput(budget)) {
        onTripInfoChange({...tripInfo, budget: Number(budget)});
      }
    },
    [onTripInfoChange, tripInfo],
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          placeholder={t('generale.name')}
          value={tripInfo.name}
          onChangeText={handleTripNameChange}
          onSubmitEditing={() => setFocusedInput(1)}
        />

        <Input
          keyboardType="number-pad"
          value={tripInfo.budget.toString()}
          onChangeText={handleBudgetChange}
        />

        <DateRangeCalendar
          selectedRange={selectedRange}
          onSelectedRangeChange={onSelectedRangeChange}
        />
      </View>

      <Button title={isUpdate ? 'Update' : 'Add Trip'} onPress={onPress} />
    </View>
  );
};

export default NewTripForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
    gap: 30,
  },
});
