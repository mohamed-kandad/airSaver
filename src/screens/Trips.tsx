import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, View } from "react-native";
import Header from "../components/Trips/Header";
import TripItem from "../components/Trips/TripItem";
import NotFound from "../components/common/NotFound";
import { useTheme } from "../components/providers/ThemeContext";
import { TripModel } from "../database/models/trips";
import { Trip } from "../types/trip";

const Trips = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [trips, setTrips] = useState<Trip[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchTrips = async () => {
        try {
          const trips = await TripModel.getAll();
          if (isActive) {
            setTrips(trips);
          }
        } catch (e) {
          console.error(e);
        }
      };
      fetchTrips();
      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* ✅ Header is fixed and outside FlatList */}
      <Header scrollY={scrollY} />

      {/* ✅ Scrollable content passes under Header */}
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        data={trips}
        renderItem={({ item }) => <TripItem {...item} />}
        contentContainerStyle={styles.flatListContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <NotFound text={t("trips.no.trips.found")} />
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
};

export default Trips;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 0,
  },
  flatListContent: {
    gap: 25,
    paddingBottom: 20,
  },
  list: {
    flex: 1,
    paddingTop: 100, // match Header height
    paddingHorizontal: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
  },
});
