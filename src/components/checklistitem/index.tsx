import { FONTS } from "@/constant";
import { getFlexDirectionStyle } from "@/languages/styles";
import { RootState } from "@/store";
import {
  faSquare,
  faSquareCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "../providers/ThemeContext";

type ChecklistItemProps = {
  label: string;
  onDelete: (id: number) => void;
  isSlected: boolean;
  onSelect: () => void;
  id: number;
};

const ChecklistItem: FC<ChecklistItemProps> = ({
  isSlected,
  label,
  onDelete,
  onSelect,
  id,
}) => {
  const { theme } = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);

  return (
    <View
      style={[
        styles.container,
        getFlexDirectionStyle(lang),
        { borderColor: theme.PRIMARY },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          ...getFlexDirectionStyle(lang),
        }}
      >
        <TouchableOpacity onPress={onSelect}>
          <FontAwesomeIcon
            icon={isSlected ? faSquareCheck : faSquare}
            size={20}
            color={isSlected ? theme.orange : "#ccc"}
          />
        </TouchableOpacity>

        <Text style={[styles.label, { color: theme.PRIMARY }]}>{label}</Text>
      </View>

      <TouchableOpacity onPress={() => onDelete(id)}>
        <FontAwesomeIcon icon={faTrash} size={18} color="#d11a2a" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    paddingVertical: 15,
    marginVertical: 5,
    justifyContent: "space-between",
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontFamily: FONTS.ClashDisplay.Semibold,
  },
});

export default ChecklistItem;
