import ChecklistItem from "@/components/checklistitem";
import AddCheckList from "@/components/checklistitem/AddCheckList";
import TopHeader from "@/components/Expenses/TopHeader";
import { useTheme } from "@/components/providers/ThemeContext";
import { ChecklistModel } from "@/database/models/checklist";
import { RootStackParamList } from "@/navigation/MainNavigation";
import { ITabNavigation } from "@/navigation/TabNavigation";
import { checkCondition } from "@/toastConfig";
import { Checklist } from "@/types/checklist";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

type Props = {};

type ExpensesScreenRouteProp = RouteProp<ITabNavigation, "Expenses">;
type ExpensesScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "NewExpense"
>;

const CheckList = (props: Props) => {
  const { navigate, goBack } = useNavigation<ExpensesScreenNavigationProp>();
  const { t } = useTranslation();
  const { trip_id } = useRoute<ExpensesScreenRouteProp>().params;
  const { theme } = useTheme();
  const [checkListItem, setCheckListItem] = useState("");
  const [checkList, setCheckList] = useState<Checklist[]>([]);

  const handleAddCheckList = async () => {
    if (checkCondition(checkListItem === "", t("errors.name"))) return;
    await ChecklistModel.create({
      name: checkListItem,
      trip_id: +trip_id,
      is_selected: false,
    });
    fetchCheckList();
  };

  const handleUpdateChecklistSelectd = async (
    id: number,
    is_selected: boolean
  ) => {
    console.log(is_selected);
    await ChecklistModel.updateSelected(id, is_selected);
    fetchCheckList();
  };

  const handleDeleteChecklist = async (id: number) => {
    await ChecklistModel.delete(id);
    fetchCheckList();
  };

  const fetchCheckList = async () => {
    const checkList: Checklist[] = await ChecklistModel.getByTripId(+trip_id);
    if (checkList) setCheckList(checkList);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchCheckList();
    }, [])
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <TopHeader
        showChartButton
        showMapButton
        onClickShowChartButton={() => navigate("Chart", { tripId: trip_id })}
        onBack={() => navigate("Trips")}
      />
      <View style={styles.content}>
        <FlatList
          data={[...checkList]}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
          renderItem={({ item, index }) => {
            return (
              <ChecklistItem
                key={item.id}
                isSlected={item.is_selected}
                label={item.name}
                onDelete={handleDeleteChecklist}
                onSelect={() =>
                  handleUpdateChecklistSelectd(item.id, !item.is_selected)
                }
                id={item.id}
              />
            );
          }}
          ListFooterComponent={
            <AddCheckList
              addCheckListItem={handleAddCheckList}
              checkListItem={checkListItem}
              setCheckListItem={setCheckListItem}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
