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
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {useTheme} from '../providers/ThemeContext';
import moment from 'moment';
import {categories} from '../../helpers/utils';

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
      <View style={[styles.expenseItem, {borderColor: theme.TEXT1}]}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.IconContainer, {backgroundColor: theme.TEXT1}]}>
            <FontAwesomeIcon
              icon={Icon}
              style={styles.expenseItemIcon}
              size={18}
              color={isDark ? theme.PRIMARY : 'white'}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={[styles.expenseItemTitle, {color: theme.TEXT1}]}>
              {name.length > 30 ? name.slice(0, 30) : name}
            </Text>
            <Text style={[styles.expenseItemDate, {color: theme.TEXT}]}>
              {moment(date).format('HH:mm')}
            </Text>
          </View>
        </View>
        <Text style={[styles.expenseItemAmount, {color: theme.TEXT1}]}>
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
    paddingHorizontal: 10,
    borderColor: COLORS.light.PRIMARY,
    borderWidth: 1,
    borderRadius: 10,
  },
  expenseItemIcon: {
    width: 30,
    height: 30,
    tintColor: 'rgba(0, 0, 0, 0.5)',
  },
  expenseItemTitle: {
    fontSize: 14,
    fontFamily: '',
    fontWeight: '700',
  },
  expenseItemDate: {
    fontSize: 10,
  },
  expenseItemAmount: {
    fontWeight: '600',
  },
  IconContainer: {
    padding: 6,
    borderRadius: 100,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
