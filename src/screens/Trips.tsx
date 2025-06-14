import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
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
          // handle error if needed
          console.error(e);
        }
      };

      fetchTrips();

      return () => {
        isActive = false; // cleanup to prevent setting state after unmount
      };
    }, [])
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.listWrapper}>
          <FlatList
            data={trips}
            renderItem={({ item }) => <TripItem {...item} />}
            contentContainerStyle={styles.flatListContent}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <NotFound text={t("trips.no.trips.found")} />
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Trips;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  listWrapper: {
    marginTop: 35,
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  flatListContent: {
    gap: 25,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
