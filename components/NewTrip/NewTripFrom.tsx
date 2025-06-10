import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState, useCallback} from 'react';
import {Button, CardItem, Input} from '../common';
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
  endDate: string | null;
}

interface NewTripFormProps {
  isUpdate: boolean;
  onPress(): void;
  tripInfo: TripInfo;
  selectedRange: DateRange;
  onTripInfoChange: (tripInfo: TripInfo) => void;
  onSelectedRangeChange: (range: DateRange) => void;
}

const INPUT_LABELS = {
  TRIP_NAME: 'Trip Name',
  BUDGET: 'Budget',
} as const;

const PLACEHOLDERS = {
  TRIP_NAME: 'Enter your trip name',
  BUDGET: 'How much is your budget?',
} as const;

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
  const {theme, toggleTheme} = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();
  const lang = useSelector((state: RootState) => state.lang.lang);

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

  const toggleLang = () => {
    i18next.changeLanguage(i18next.language === 'en' ? 'ar' : 'en');
    dispatch(setLang(i18next.language === 'en' ? 'ar' : 'en'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          style={{textAlign: lang == 'ar' ? 'right' : 'left'}}
          label={INPUT_LABELS.TRIP_NAME}
          placeholder={t('generale.name')}
          value={tripInfo.name}
          onChangeText={handleTripNameChange}
          onSubmitEditing={() => setFocusedInput(1)}
        />

        <Input
          style={{textAlign: lang == 'ar' ? 'right' : 'left'}}
          label={INPUT_LABELS.BUDGET}
          placeholder={PLACEHOLDERS.BUDGET}
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
