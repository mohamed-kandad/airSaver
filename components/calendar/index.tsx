import React, {FC, useMemo, useCallback} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useTheme} from '../providers/ThemeContext';
import {FONTS} from '../../constant';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {calendarAR, calendarEN} from '../../languages';

interface DateRange {
  startDate: string;
  endDate: string | null;
}

interface DateRangeCalendarProps {
  selectedRange: DateRange;
  onSelectedRangeChange: (range: DateRange) => void;
}

const generateDatesBetween = (startDate: string, endDate: string): string[] => {
  const dates: string[] = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  currentDate.setDate(currentDate.getDate() + 1);

  while (currentDate < end) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

LocaleConfig.locales['en'] = calendarEN;
LocaleConfig.locales['ar'] = calendarAR;

const DateRangeCalendar: FC<DateRangeCalendarProps> = ({
  selectedRange,
  onSelectedRangeChange,
}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const lang = useSelector((state: RootState) => state.lang.lang);

  const calendarTheme = useMemo(
    () => ({
      backgroundColor: 'transparent',
      calendarBackground: 'transparent',
      textSectionTitleColor: theme.PRIMARY,
      textSectionTitleDisabledColor: 'gray',
      selectedDayBackgroundColor: theme.PRIMARY,
      selectedDayTextColor: 'white',
      todayTextColor: theme.PRIMARY,
      dayTextColor: theme.PRIMARY,
      textDisabledColor: 'gray',
      dotColor: theme.PRIMARY,
      selectedDotColor: 'gray',
      arrowColor: theme.PRIMARY,
      disabledArrowColor: 'gray',
      monthTextColor: theme.PRIMARY,
      indicatorColor: theme.PRIMARY,
      textDayFontFamily: 'LotaGrotesque-Regular',
      textDayFontWeight: '700',
      textMonthFontFamily: 'LotaGrotesque-Regular',
      textDayHeaderFontFamily: 'LotaGrotesque-Regular',
      textDayFontSize: 16,
      textMonthFontSize: 18,
      textDayHeaderFontSize: 14,
    }),
    [theme],
  );

  const handleDayPress = useCallback(
    (day: {dateString: string}) => {
      const {startDate, endDate} = selectedRange;
      const selectedDate = day.dateString;

      if (!startDate || (startDate && endDate)) {
        onSelectedRangeChange({startDate: selectedDate, endDate: null});
        return;
      }

      if (!endDate) {
        if (selectedDate > startDate) {
          onSelectedRangeChange({startDate, endDate: selectedDate});
        } else {
          onSelectedRangeChange({startDate: selectedDate, endDate: null});
        }
      }
    },
    [selectedRange, onSelectedRangeChange],
  );

  const markedDates = useMemo(() => {
    const {startDate, endDate} = selectedRange;
    const marked: Record<string, any> = {};

    if (!startDate) return marked;

    marked[startDate] = {
      startingDay: true,
      color: theme.background,
      textColor: 'red',
      customStyles: {
        container: {
          backgroundColor: '#ff5a5f',
          borderRadius: 50,
          borderWidth: 2,
          borderColor: theme.PRIMARY,
        },
        text: {color: theme.background, fontWeight: 'bold'},
      },
    };

    if (endDate) {
      const datesBetween = generateDatesBetween(startDate, endDate);
      datesBetween.forEach(date => {
        marked[date] = {
          color: '#2e2e2e',
          textColor: 'white',
          customStyles: {
            container: {backgroundColor: theme.PRIMARY},
            text: {color: theme.background, fontWeight: 'bold'},
          },
        };
      });

      marked[endDate] = {
        endingDay: true,
        color: theme.PRIMARY,
        textColor: 'white',
        customStyles: {
          container: {
            backgroundColor: '#ff5a5f',
            borderRadius: 50,
            borderWidth: 2,
            borderColor: theme.PRIMARY,
          },
          text: {color: theme.background, fontWeight: 'bold'},
        },
      };
    }

    return marked;
  }, [selectedRange, theme]);

  const minDate = useMemo(() => moment().format('YYYY-MM-DD'), []);

  return (
    <Calendar
      key={`${lang}-${theme.PRIMARY}`}
      markingType="custom"
      markedDates={markedDates}
      onDayPress={handleDayPress}
      minDate={minDate}
      theme={calendarTheme}
      // style={{direction: lang === 'ar' ? 'rtl' : 'ltr'}}
    />
  );
};

export default DateRangeCalendar;
