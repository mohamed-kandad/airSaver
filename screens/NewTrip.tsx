import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import NewTripFrom from '../components/NewTrip/NewTripFrom';
import {useDispatch, useSelector} from 'react-redux';
import {createTrip, updateTrip} from '../store/tripSlice';
import {AppDispatch, RootState} from '../store';
import {RootStackParamList} from '../navigation/MainNavigation';
import {useTheme} from '../components/providers/ThemeContext';
import {COLORS} from '../constant';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {getFlexDirectionStyle, getTextStyle} from '../languages/styles';
import {TripModel} from '../database/models/trips';

type Props = {};
type TripNavigationProps = NavigationProp<RootStackParamList, 'AddTrip'>;
type TripRouteProps = RouteProp<RootStackParamList, 'AddTrip'>;

const NewTrip = (props: Props) => {
  const navigation = useNavigation<TripNavigationProps>();
  const {tripId} = useRoute<TripRouteProps>().params;
  const tripData = useSelector((state: RootState) => state.trips);
  const lang = useSelector((state: RootState) => state.lang.lang);
  const {theme} = useTheme();
  const {t} = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [tripInfo, setTripInfo] = useState({
    name: '',
    budget: 0,
  });
  const [selectedRange, setSelectedRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (tripId != '') {
      // const tripExists = tripData.trips.filter(trip => trip.id == tripId);
      // setSelectedRange({
      //   endDate: tripExists[0].endDate,
      //   startDate: tripExists[0].startDate,
      // });
      // setTripInfo({
      //   name: tripExists[0].name,
      //   budget: tripExists[0].budget,
      // });
    }
  }, [tripId]);

  const handlePress = async () => {
    const isValid =
      tripInfo.name &&
      tripInfo.budget &&
      selectedRange.startDate &&
      selectedRange.endDate;

    if (!isValid) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all fields before submitting.',
        position: 'top',
      });
      return;
    }

    if (tripId === '') {
      await TripModel.create({
        name: tripInfo.name,
        start_date: selectedRange.startDate,
        end_date: selectedRange.endDate!,
        budget: tripInfo.budget,
      });
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
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        <View style={[styles.backButtonContainer, getFlexDirectionStyle(lang)]}>
          <Pressable
            style={[
              styles.backButton,
              {
                backgroundColor: theme.orange,
                borderColor: theme.PRIMARY,
              },
            ]}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={lang === 'ar' ? faArrowRight : faArrowLeft}
              color={COLORS.light.PRIMARY}
              size={21}
            />
          </Pressable>
        </View>
        <Text
          style={[styles.heading, {color: theme.PRIMARY}, getTextStyle(lang)]}>
          {tripId === '' ? t('trips.add.heading') : t('trips.update.heading')}
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
    </SafeAreaView>
  );
};

export default NewTrip;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButtonContainer: {
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  heading: {
    marginTop: 20,
    fontSize: 35,
    fontFamily: 'ClashDisplay-SemiBold',
    fontWeight: 'bold',
  },
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
