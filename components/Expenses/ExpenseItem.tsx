import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTS, ICONS} from '../../constant';
import {deleteExpenseFromTrip} from '../../store/tripSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ContextMenu from 'react-native-context-menu-view';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/MainNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {useTheme} from '../providers/ThemeContext';
import moment from 'moment';
import {categories} from '../../helpers/utils';
import {getFlexDirectionStyle, getTextStyle} from '../../languages/styles';

type Props = {
  id: string;
  category: string;
  name: string;
  date: string;
  amount: number;
};
type ExpenseItemProps = NavigationProp<RootStackParamList, 'Expenses'>;
type ExpenseRouteItemProps = RouteProp<RootStackParamList, 'Expenses'>;

const ExpenseItem: FC<Props> = ({name, amount, id, category, date}) => {
  const navigation = useNavigation<ExpenseItemProps>();
  const {tripId} = useRoute<ExpenseRouteItemProps>().params;
  const dispatch: AppDispatch = useDispatch();
  const {isDark, theme, toggleTheme} = useTheme();

  const lang = useSelector((state: RootState) => state.lang.lang);

  const Icon = categories.filter(cat => cat.id === category)[0].icon;

  return (
    <ContextMenu
      actions={[{title: 'Edit'}, {title: 'Delete'}]}
      onPress={event => {
        const {index, indexPath, name} = event.nativeEvent;
        if (index == 0) {
          // The first item is nested in a submenu
          navigation.navigate('NewExpense', {tripId, expenseId: id});
        } else if (index == 1) {
          dispatch(deleteExpenseFromTrip({tripId, expenseId: id}));
          // handleDeleteTrip();
        }
      }}>
      <View style={[styles.expenseItem, getFlexDirectionStyle(lang)]}>
        <View
          style={{
            display: 'flex',
            ...getFlexDirectionStyle(lang),
            alignItems: 'center',
          }}>
          <View
            style={[styles.IconContainer, {backgroundColor: theme.PRIMARY}]}>
            <FontAwesomeIcon
              icon={Icon}
              style={styles.expenseItemIcon}
              size={18}
              color={theme.background}
            />
          </View>
          <View style={{marginHorizontal: 15}}>
            <Text style={[styles.expenseItemTitle, {color: theme.PRIMARY}]}>
              {name.length > 30 ? name.slice(0, 30) : name}
            </Text>
            <Text
              style={[
                styles.expenseItemDate,
                {
                  color: theme.PRIMARY,
                  ...getTextStyle(lang),
                },
              ]}>
              {moment(date).format('HH:mm')}
            </Text>
          </View>
        </View>
        <Text style={[styles.expenseItemAmount, {color: theme.PRIMARY}]}>
          {amount} MAD
        </Text>
      </View>
    </ContextMenu>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  expenseItemIcon: {
    width: 30,
    height: 30,
    tintColor: 'rgba(0, 0, 0, 0.5)',
  },
  expenseItemTitle: {
    fontSize: 14,
    fontFamily: FONTS.LotaGrotesque.Regular,
    fontWeight: '700',
    marginBottom: 5,
  },
  expenseItemDate: {
    fontSize: 10,
  },
  expenseItemAmount: {
    fontWeight: '600',
    fontSize: 18,
    fontFamily: FONTS.ClashDisplay.Bold,
  },
  IconContainer: {
    padding: 6,
    borderRadius: 100,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
