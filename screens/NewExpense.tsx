import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Input} from '../components/common';
import {addExpenseToTrip, updateExpenseInTrip} from '../store/tripSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainNavigation';
import {RootState} from '../store';
import {useTheme} from '../components/providers/ThemeContext';
import Toast from 'react-native-toast-message';
import {categories} from '../helpers/utils';
import TopHeader from '../components/Expenses/TopHeader';
import {useTranslation} from 'react-i18next';

type NewExpenseRouteProp = RouteProp<RootStackParamList, 'NewExpense'>;

const NewExpense = () => {
  const {tripId, expenseId} = useRoute<NewExpenseRouteProp>().params;
  const {theme} = useTheme();
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
        .find(trip => trip.id === tripId)
        ?.expenses?.find(exp => exp.id === expenseId);
      if (expense) {
        setExpenseInfo({
          id: expense.id,
          name: expense.name,
          amount: expense.amount,
          category: expense.category,
          date: expense.date,
        });
      }
    }
  }, [expenseId, tripId]);

  const handleAddExpense = () => {
    if (expenseInfo.name && expenseInfo.amount && expenseInfo.category) {
      const payload = {...expenseInfo, date: Date().toString()};
      if (expenseId) {
        dispatch(updateExpenseInTrip({tripId, expense: expenseInfo}));
      } else {
        dispatch(addExpenseToTrip({tripId, expense: payload}));
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
      style={[styles.safeArea, {backgroundColor: theme.background}]}>
      <TopHeader showBack />
      <View style={[styles.formContainer, {backgroundColor: theme.background}]}>
        <View>
          <Text style={[styles.heading, {color: theme.PRIMARY}]}>
            {t('expenses.new.heading')}
          </Text>

          <FlatList
            data={categories}
            renderItem={({item}) => {
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
                    setExpenseInfo({...expenseInfo, category: item.id})
                  }>
                  <FontAwesomeIcon
                    icon={item.icon}
                    size={20}
                    color={isSelected ? 'white' : theme.TEXT1}
                  />
                </Pressable>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />

          <View style={styles.inputGroup}>
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
              style={styles.descriptionInput}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  formContainer: {
    minHeight: '88%',
    width: '100%',
    borderRadius: 23,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  heading: {
    marginTop: 20,
    fontSize: 35,
    fontFamily: 'ClashDisplay-Bold',
  },
  categoryList: {
    gap: 20,
    height: 40,
    marginTop: 20,
  },
  categoryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    padding: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  inputGroup: {
    marginTop: 40,
    gap: 20,
  },
  descriptionInput: {
    height: 200,
    paddingVertical: 20,
  },
});
