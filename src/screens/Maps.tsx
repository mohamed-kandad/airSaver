import TopHeader from "@/components/Expenses/TopHeader";
import { useTheme } from "@/components/providers/ThemeContext";
import { RootStackParamList } from "@/navigation/MainNavigation";
import { ITabNavigation } from "@/navigation/TabNavigation";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

type Props = {};
type ExpensesScreenRouteProp = RouteProp<ITabNavigation, "Expenses">;
type ExpensesScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "NewExpense"
>;
const Maps = (props: Props) => {
  const { navigate, goBack } = useNavigation<ExpensesScreenNavigationProp>();
  const { t } = useTranslation();
  const { trip_id } = useRoute<ExpensesScreenRouteProp>().params;
  const { theme } = useTheme();

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 5,
          //   right: 10,
          zIndex: 1,
          width: "100%",
        }}
      >
        <TopHeader
          showChartButton
          showMapButton
          onClickShowChartButton={() => navigate("Chart", { tripId: trip_id })}
          onBack={() => navigate("Trips")}
          isTransparent
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // provider={PROVIDER_GOOGLE}
      />
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
