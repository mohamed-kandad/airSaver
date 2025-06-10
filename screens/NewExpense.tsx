import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS} from '../constant';
import {Button, Input} from '../components/common';
import {addExpenseToTrip, updateExpenseInTrip} from '../store/tripSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainNavigation';
import {RootState} from '../store';
import {useTheme} from '../components/providers/ThemeContext';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-toast-message';
import TextAnimated from '../components/common/TextAnimated';
import {categories} from '../helpers/utils';
import TopHeader from '../components/Expenses/TopHeader';
import {useTranslation} from 'react-i18next';

type Props = {};
type NewExpenseRouteProp = RouteProp<RootStackParamList, 'NewExpense'>;

const NewExpense = () => {
  const {tripId, expenseId} = useRoute<NewExpenseRouteProp>().params;
  const {theme, isDark, toggleTheme} = useTheme();
  const navigation = useNavigation();
  const tripData = useSelector((state: RootState) => state.trips);
  const dispatch = useDispatch();
  const [expenseInfo, setExpenseInfo] = useState({
    id: Date.now().toString(),
    name: '',
    amount: 0,
    category: '',
    date: Date().toString(),
  });
  const {t} = useTranslation();

  useEffect(() => {
    if (expenseId) {
      const expense = tripData.trips
        .filter((trip: any) => trip.id === tripId)[0]
        .expenses?.filter((expense: any) => expense.id === expenseId)[0];
      if (expense) {
        setExpenseInfo({
          id: expense.id,
          name: expense?.name,
          amount: expense?.amount,
          category: expense?.category,
          date: expense?.date,
        });
      }
    }
  }, [expenseId, tripId]);

  const handleAddExpense = () => {
    if (expenseInfo.name && expenseInfo.amount && expenseInfo.category) {
      if (expenseId) {
        dispatch(
          updateExpenseInTrip({
            tripId,
            expense: {...expenseInfo},
          }),
        );
      } else {
        dispatch(
          addExpenseToTrip({
            tripId,
            expense: {...expenseInfo, date: Date().toString()},
          }),
        );
      }
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all fields before submitting.',
        position: 'top',
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}>
      <TopHeader showBack />
      <View
        style={{
          backgroundColor: theme.background,
          minHeight: '88%',
          width: '100%',
          borderRadius: 23,
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: theme.PRIMARY,
              marginTop: 20,
              fontSize: 35,
              fontFamily: 'ClashDisplay-Bold',
            }}>
            {t('expenses.new.heading')}
          </Text>
          <FlatList
            data={categories}
            renderItem={({item}) => (
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor:
                    item.id === expenseInfo.category
                      ? '#ff5a5f'
                      : 'transparent',
                  padding: 5,
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  borderWidth: item.id === expenseInfo.category ? 2 : 0,
                  borderColor: theme.PRIMARY,
                }}
                onPress={() =>
                  setExpenseInfo({...expenseInfo, category: item.id})
                }>
                <FontAwesomeIcon
                  icon={item.icon}
                  size={20}
                  color={
                    item.id === expenseInfo.category ? 'white' : theme.TEXT1
                  }
                />
              </Pressable>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 20,
              height: 40,
              marginTop: 20,
            }}
          />
          <View style={{marginTop: 40, gap: 20}}>
            <Input
              placeholder="Enter budget"
              value={expenseInfo.amount.toString()}
              keyboardType="numeric"
              onChangeText={text => {
                if (/^\d*$/.test(text))
                  setExpenseInfo({...expenseInfo, amount: +text});
              }}
            />
            <Input
              placeholder={t('expenses.new.desc')}
              onChangeText={text =>
                setExpenseInfo({...expenseInfo, name: text})
              }
              value={expenseInfo.name}
              numberOfLines={10}
              style={{height: 200, paddingVertical: 20}}
              textAlignVertical="top"
              multiline={true}
            />
          </View>
        </View>

        <Button
          title={
            expenseId ? t('expenses.update.button') : t('expenses.new.button')
          }
          onPress={handleAddExpense}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewExpense;

const styles = StyleSheet.create({});
