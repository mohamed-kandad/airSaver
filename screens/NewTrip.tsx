import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BlurView} from '@react-native-community/blur';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Header from '../components/NewTrip/Header';
import Footer from '../components/NewTrip/Footer';
import NewTripFrom from '../components/NewTrip/NewTripFrom';
import {useDispatch, useSelector} from 'react-redux';
import {createTrip, updateTrip} from '../store/tripSlice';
import {AppDispatch, RootState} from '../store';
import {RootStackParamList} from '../navigation/MainNavigation';
import {useTheme} from '../components/providers/ThemeContext';
import {COLORS} from '../constant';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-toast-message';

type Props = {};
type TripNavigationProps = NavigationProp<RootStackParamList, 'AddTrip'>;
type TripRouteProps = RouteProp<RootStackParamList, 'AddTrip'>;

const NewTrip = (props: Props) => {
  const navigation = useNavigation<TripNavigationProps>();
  const {tripId} = useRoute<TripRouteProps>().params;
  const tripData = useSelector((state: RootState) => state.trips);
  const {theme, isDark, toggleTheme} = useTheme();

  useEffect(() => {
    if (tripId != '') {
      const tripExists = tripData.trips.filter(trip => trip.id == tripId);
      setSelectedRange({
        endDate: tripExists[0].endDate,
        startDate: tripExists[0].startDate,
      });
      setTripInfo({
        name: tripExists[0].name,
        budget: tripExists[0].budget,
      });
    }
  }, [tripId]);

  const dispatch: AppDispatch = useDispatch();
  const [tripInfo, setTripInfo] = useState({
    name: '',
    budget: 0,
  });
  const [selectedRange, setSelectedRange] = useState<{
    startDate: string;
    endDate: string | null;
  }>({
    startDate: '',
    endDate: null,
  });

  const handlePress = () => {
    if (
      tripInfo.name ||
      tripInfo.budget ||
      selectedRange.startDate ||
      selectedRange.endDate
    ) {
      if (tripId === '') {
        dispatch(
          createTrip({
            ...tripInfo,
            ...selectedRange,
            id: Date.now().toString(),
            expenses: [],
          }),
        );
      } else {
        dispatch(
          updateTrip({
            ...tripInfo,
            ...selectedRange,
            id: tripId,
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
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.light.PRIMARY,
          paddingTop: 30,
        }}>
        <View
          style={{
            backgroundColor: isDark
              ? COLORS.light.SECONDARY
              : COLORS.light.background,
            height: '88%',
            width: '100%',
            borderRadius: 23,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
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
            {tripId === '' ? 'Let`s add your trip!' : 'Let`s update your trip!'}
          </Text>
          <NewTripFrom
            onSelectedRangeChange={setSelectedRange}
            onTripInfoChange={setTripInfo}
            selectedRange={selectedRange}
            tripInfo={tripInfo}
            isUpdate={tripId !== ''}
            onPress={handlePress}
          />
        </View>
        {/* <Footer onPress={handlePress} isUpdate={tripId !== ''} /> */}
      </View>
    </>
  );
};

export default NewTrip;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: 100,
  },
});
