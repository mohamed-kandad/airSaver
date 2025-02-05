import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTS, ICONS, IMAGES} from '../../constant';
import {deleteTrip, Trip} from '../../store/tripSlice';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/MainNavigation';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import ContextMenu from 'react-native-context-menu-view';
import {useTheme} from '../providers/ThemeContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {BlurView} from '@react-native-community/blur';

type TripItemScreenNavigationProp = NavigationProp<RootStackParamList, 'Trips'>;
const TripItem: FC<Trip> = ({budget, endDate, id, name, startDate}) => {
  const {isDark, theme, toggleTheme} = useTheme();
  const navigation = useNavigation<TripItemScreenNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const handleDeleteTrip = () => {
    console.log(id);
    dispatch(deleteTrip(id));
  };

  return (
    <View style={[styles.tripItem]}>
      <Image source={IMAGES.back1} style={styles.tripItemImage} />
      <Pressable
        style={styles.tripItemDetails}
        onPress={() => navigation.navigate('Expenses', {tripId: id})}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 4,
          }}>
          <Text style={[styles.tripItemBudget]}>{budget} MAD </Text>
          <View style={{gap: 5, flexDirection: 'row'}}>
            <Pressable
              style={{
                backgroundColor: 'rgba(14, 63, 45, .7)',
                paddingHorizontal: 10,
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('AddTrip', {tripId: id})}>
              <Text style={{fontSize: 12, color: 'white'}}>Edit</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: 'rgba(231, 77, 77, 0.7)',
                paddingHorizontal: 10,
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleDeleteTrip}>
              <Text style={{fontSize: 12, color: 'white'}}>Delete</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={[styles.tripItemName]} numberOfLines={2}>
            {name.length > 25 ? `${name.slice(0, 35)}...` : name}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            <FontAwesomeIcon icon={faCalendarAlt} color="white" />
            <Text style={[styles.tripItemDate]}>
              {moment(startDate).format('MMMM D, YYYY')} /{' '}
              {moment(endDate).format('MMMM D, YYYY')}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default TripItem;

const styles = StyleSheet.create({
  tripItem: {
    // backgroundColor: 'red',
    height: 170,
    width: '100%',
    borderRadius: 30,

    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  tripItemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    marginRight: 10,
  },
  tripItemDetails: {
    paddingVertical: 15,
    paddingBottom: 30,
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    justifyContent: 'space-between',
  },
  tripItemName: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'DelaRegular',
    color: '#F5EADD',
    marginBottom: 10,
  },
  tripItemDate: {
    fontSize: 10,
    fontFamily: FONTS.REGULAR,
    width: '70%',
    color: 'white',
  },
  tripItemBudget: {
    fontSize: 13,
    color: 'white',
    fontFamily: FONTS.LIGHT,
    backgroundColor: 'rgba(214, 162, 102, 0.7)',
    padding: 5,
    borderRadius: 6,
  },
  // addTripButtonIconContainer: {
  //   borderWidth: 1,
  //   borderColor: COLORS.GRAY[200],
  //   backgroundColor: 'white',
  //   padding: 7,
  //   borderRadius: 50,
  //   position: 'absolute',
  //   left: 10,
  //   top: 10,
  // },
  // addTripButtonIcon: {width: 10, height: 10},
});
