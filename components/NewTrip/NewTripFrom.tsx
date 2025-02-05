import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {Button, CardItem, Input} from '../common';
import {COLORS, FONTS} from '../../constant';
import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useTheme} from '../providers/ThemeContext';

type NewTripFormProps = {
  isUpdate: boolean;
  onPress(): void;
  tripInfo: {
    name: string;
    budget: number;
  };
  selectedRange: {
    startDate: string;
    endDate: string | null;
  };
  onTripInfoChange: ({name, budget}: {name: string; budget: number}) => void;
  onSelectedRangeChange: (range: {
    startDate: string;
    endDate: string | null;
  }) => void;
};

const NewTripFrom: FC<NewTripFormProps> = ({
  onSelectedRangeChange,
  onTripInfoChange,
  selectedRange,
  tripInfo,
  isUpdate,
  onPress,
}) => {
  const [isOpen, setIsOpen] = useState(-1);
  const {theme, isDark, toggleTheme} = useTheme();

  const onDayPress = (day: {dateString: string}) => {
    const {startDate, endDate} = selectedRange;

    if (!startDate || (startDate && endDate)) {
      // Start a new range when there's no start date or both start and end exist
      onSelectedRangeChange({startDate: day.dateString, endDate: null});
    } else if (!endDate) {
      setIsOpen(2);
      // Update only the end date when selecting a second date
      const isAfterStartDate = day.dateString > startDate; // Ensure end date is after start date
      if (isAfterStartDate) {
        onSelectedRangeChange({startDate, endDate: day.dateString});
      } else {
        // If the selected end date is before the start date, reset the range
        onSelectedRangeChange({startDate: day.dateString, endDate: null});
      }
    }
  };

  const getMarkedDates = () => {
    const {startDate, endDate} = selectedRange;
    const markedDates: Record<string, any> = {};

    if (startDate) {
      markedDates[startDate] = {
        startingDay: true,
        color: theme.PRIMARY,
        textColor: 'white',

        customStyles: {
          container: {backgroundColor: theme.PRIMARY, borderRadius: 50},
          text: {color: 'white', fontWeight: 'bold'},
        },
      };

      if (endDate) {
        let currentDate = new Date(
          new Date(startDate).setDate(new Date(startDate).getDate() + 1),
        )
          .toISOString()
          .split('T')[0];
        while (currentDate < endDate) {
          markedDates[currentDate] = {
            color: theme.PRIMARY,
            customStyles: {
              container: {backgroundColor: '#EEEEEE'},
              text: {color: 'black', fontWeight: 'bold'},
            },
            textColor: '#000',
          };
          currentDate = new Date(
            new Date(currentDate).setDate(new Date(currentDate).getDate() + 1),
          )
            .toISOString()
            .split('T')[0];
        }

        markedDates[endDate] = {
          endingDay: true,
          color: theme.PRIMARY,
          textColor: 'white',
          customStyles: {
            container: {backgroundColor: theme.PRIMARY, borderRadius: 50},
            text: {color: 'white', fontWeight: 'bold'},
          },
        };
      }
    }

    return markedDates;
  };
  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          gap: 30,
          flex: 1,
          marginTop: 30,
          marginBottom: 20,
        }}>
        <Input
          onSubmitEditing={() => setIsOpen(1)}
          label="Email"
          placeholder="Enter your trip name"
          value={tripInfo.name}
          onChangeText={(name: string) => {
            onTripInfoChange({...tripInfo, name});
          }}
        />
        <Input
          label=""
          placeholder="How much is your budget?"
          keyboardType="number-pad"
          value={tripInfo.budget.toString()}
          onChangeText={(budget: string) => {
            if (/^\d*$/.test(budget)) {
              onTripInfoChange({...tripInfo, budget: +budget});
            }
          }}
        />
        <Calendar
          markingType="custom"
          markedDates={getMarkedDates()}
          onDayPress={onDayPress}
          minDate={moment().format('YYYY-MM-DD')}
          theme={{
            backgroundColor: 'red',
            calendarBackground: 'trasparent',
            textSectionTitleColor: '#F5EADD',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#70d7c7',
            selectedDayTextColor: theme.PRIMARY,
            todayTextColor: theme.PRIMARY,
            dayTextColor: COLORS.light.PRIMARY,
            textDisabledColor: '#d3d3d3',
            dotColor: 'blue',
            selectedDotColor: 'gray',
            arrowColor: 'white',
            disabledArrowColor: 'black',
            monthTextColor: COLORS.light.PRIMARY,

            indicatorColor: '#70d7c7',

            textDayFontFamily: FONTS.REGULAR, // Replace with your custom font
            textDayFontWeight: '700', // Replace with your custom font
            textMonthFontFamily: 'DelaRegular', // Replace with your custom font
            textDayHeaderFontFamily: FONTS.REGULAR,
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>

      <Button title={isUpdate ? 'Update' : 'Add Trip'} onPress={onPress} />
    </ScrollView>
  );
};

export default NewTripFrom;

const styles = StyleSheet.create({});
