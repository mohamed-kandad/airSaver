import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTS, IMAGES} from '../../constant';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {calculateTripBudget} from '../../store/tripSlice';
import {useTheme} from '../providers/ThemeContext';

type Props = {
  tripId: string;
};

const Header: FC<Props> = ({tripId}) => {
  const tripsData = useSelector((state: RootState) => state.trips).trips.filter(
    trip => trip.id === tripId,
  );
  const budget = calculateTripBudget(tripsData[0]);
  const {isDark, theme, toggleTheme} = useTheme();

  return (
    <View style={styles.headerContainer}>
      {/* <Image source={IMAGES.default} style={styles.headerImage} /> */}
      <Text style={[styles.headerTitle, {color: theme.TEXT1}]}>
        Available Budget
      </Text>

      <Text style={[styles.headerDetailsItemValue, {color: theme.TEXT}]}>
        {budget.remainingBalance} MAD
      </Text>

      <Pressable
        style={{
          backgroundColor: 'pink',
          paddingHorizontal: 10,
          borderRadius: 10,
          padding: 4,
          borderColor: 'red',
          borderWidth: 1,
          alignSelf: 'flex-start',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 12, color: theme.PRIMARY}}>
          {budget.totalExpenses} MAD
        </Text>
      </Pressable>
      {/* <View style={styles.headerDetails}>
        <View style={[styles.headerDetailsItem, {borderColor: 'red'}]}>
          <Text style={styles.headerDetailsItemTitle}>Available Budget</Text>
          <Text style={[styles.headerDetailsItemValue, {color: 'green'}]}>
            Mad {budget.remainingBalance}
          </Text>
        </View>
        <View style={styles.headerDetailsItem}>
          <Text style={styles.headerDetailsItemTitle}>Total Spendings</Text>
          <Text style={[styles.headerDetailsItemValue, {color: 'red'}]}>
            Mad {budget.totalExpenses}
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: 'green',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: 'DelaRegular',
    fontSize: 24,
  },
  headerImage: {
    width: '100%',
    height: 340,
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // paddingVertical: 30,
  },
  headerDetailsItem: {
    borderBottomWidth: 1,
    paddingVertical: 20,
    flex: 1,
  },
  headerDetailsItemTitle: {
    fontSize: 14,
    color: 'black',
    fontFamily: FONTS.LIGHT,
    marginBottom: 10,
  },
  headerDetailsItemValue: {
    fontSize: 40,
    marginTop: 10,
    textAlign: 'left',
    fontFamily: FONTS.BOLD,
    fontWeight: '600',
  },
});
