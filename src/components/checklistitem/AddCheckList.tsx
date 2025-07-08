import { getFlexDirectionStyle, getTextStyle } from "@/languages/styles";
import { RootState } from "@/store";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "../providers/ThemeContext";

type AddCheckListProps = {
  checkListItem: string;
  addCheckListItem: () => void;
  setCheckListItem: (item: string) => void;
};

const AddCheckList: FC<AddCheckListProps> = ({
  addCheckListItem,
  checkListItem,
  setCheckListItem,
}) => {
  const { theme } = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.itemRow,
        { borderColor: theme.PRIMARY, ...getFlexDirectionStyle(lang) },
      ]}
    >
      <TouchableOpacity onPress={addCheckListItem}>
        <FontAwesomeIcon icon={faPlus} size={18} color={theme.PRIMARY} />
      </TouchableOpacity>
      <TextInput
        value={checkListItem}
        onChangeText={setCheckListItem}
        placeholder={t("checklist.item.name")}
        placeholderTextColor={theme.PRIMARY}
        style={[
          styles.input,
          { flex: 1, color: theme.PRIMARY, ...getTextStyle(lang) },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    gap: 10,
  },
  input: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "transparent",
  },
});

export default AddCheckList;
