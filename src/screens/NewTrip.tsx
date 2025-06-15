import { FONTS } from "@/constant";
import { checkCondition } from "@/toastConfig";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NewTripFrom from "../components/NewTrip/NewTripFrom";
import { useTheme } from "../components/providers/ThemeContext";
import { TripModel } from "../database/models/trips";
import { getFlexDirectionStyle, getTextStyle } from "../languages/styles";
import { RootStackParamList } from "../navigation/MainNavigation";
import tripNotificationService from "../services/tripNotification";
import { AppDispatch, RootState } from "../store";
import { ITrip } from "../types/trip";

type Props = {};
type TripNavigationProps = NavigationProp<RootStackParamList, "AddTrip">;
type TripRouteProps = RouteProp<RootStackParamList, "AddTrip">;

const NewTrip = (props: Props) => {
  const navigation = useNavigation<TripNavigationProps>();
  const { tripId } = useRoute<TripRouteProps>().params;
  const lang = useSelector((state: RootState) => state.lang.lang);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [tripInfo, setTripInfo] = useState({
    name: "",
    budget: 0,
  });
  const [selectedRange, setSelectedRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (tripId != "") {
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
    if (
      checkCondition(tripInfo.name === "", t("errors.name")) ||
      checkCondition(tripInfo.budget <= 0, t("errors.budget")) ||
      checkCondition(selectedRange.startDate === "", t("errors.startDate")) ||
      checkCondition(selectedRange.endDate === "", t("errors.endDate"))
    )
      return;

    if (tripId === "") {
      const tripData: ITrip = {
        name: tripInfo.name,
        start_date: selectedRange.startDate,
        end_date: selectedRange.endDate!,
        budget: tripInfo.budget,
      };
      await TripModel.create(tripData);

      tripNotificationService.scheduleTripStartReminder(tripData);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
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
            onPress={() => navigation.goBack()}
          >
            <FontAwesomeIcon
              icon={lang === "ar" ? faArrowRight : faArrowLeft}
              color={theme.PRIMARY}
              size={21}
            />
          </Pressable>
        </View>
        <Text
          style={[styles.heading, { color: theme.PRIMARY }, getTextStyle(lang)]}
        >
          {tripId === "" ? t("trips.add.heading") : t("trips.update.heading")}
        </Text>
        <NewTripFrom
          onSelectedRangeChange={setSelectedRange}
          onTripInfoChange={setTripInfo}
          selectedRange={selectedRange}
          tripInfo={tripInfo}
          isUpdate={tripId !== ""}
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
    justifyContent: "flex-start",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  heading: {
    marginTop: 20,
    fontSize: 35,
    fontFamily: FONTS.ClashDisplay.Bold,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    paddingTop: 100,
  },
});
