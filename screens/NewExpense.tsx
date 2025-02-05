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
import {
  addExpenseToTrip,
  categories,
  updateExpenseInTrip,
} from '../store/tripSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainNavigation';
import {RootState} from '../store';
import {useTheme} from '../components/providers/ThemeContext';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-toast-message';
import TextAnimated from '../components/common/TextAnimated';

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
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.light.PRIMARY,
        paddingTop: 30,
      }}>
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
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              color={COLORS.light.PRIMARY}
              size={25}
            />
          </Pressable>
          <Text
            style={{
              color: COLORS.light.PRIMARY,
              marginTop: 20,
              fontSize: 35,
              fontFamily: 'DelaRegular',
            }}>
            Let's expand your expense!
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
                      ? COLORS.light.PRIMARY
                      : 'transparent',
                  padding: 5,
                  borderRadius: 50,
                  width: 40,
                  height: 40,
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
              placeholder="Description"
              onChangeText={text =>
                setExpenseInfo({...expenseInfo, name: text})
              }
              value={expenseInfo.name}
              numberOfLines={10}
              style={{height: 200}}
              textAlignVertical="top"
              multiline={true}
            />
          </View>
        </View>

        <Button
          title={expenseId ? 'Update' : 'Add Expense'}
          onPress={handleAddExpense}
        />
      </View>
    </View>
  );
};

export default NewExpense;

const styles = StyleSheet.create({});
