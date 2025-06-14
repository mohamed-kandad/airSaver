import {
  faArrowLeft,
  faArrowRight,
  faPieChart,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFlexDirectionStyle } from "../../languages/styles";
import { AppDispatch, RootState } from "../../store";
import { useTheme } from "../providers/ThemeContext";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  showAdd?: boolean;
  onBack?: () => void;
  onAdd?: () => void;
  showClose?: boolean;
  showChartButton?: boolean;
  onClickShowChartButton?: () => void;
  onClose?: () => void;
};

const TopHeader = ({
  title = "",
  showBack = false,
  showAdd = true,
  onBack,
  onAdd,
  showClose = false,
  onClose,
  onClickShowChartButton,
  showChartButton,
}: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const dispatch: AppDispatch = useDispatch();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, ...getFlexDirectionStyle(lang) },
      ]}
    >
      <View style={styles.iconContainer}>
        <Pressable
          onPress={onBack}
          style={[styles.iconButton, { borderColor: theme.PRIMARY }]}
        >
          <FontAwesomeIcon
            icon={lang === "en" ? faArrowLeft : faArrowRight}
            size={23}
            color={theme.PRIMARY}
          />
        </Pressable>
      </View>

      <View
        style={[
          styles.iconContainer,
          styles.alignEnd,
          getFlexDirectionStyle(lang),
        ]}
      >
        {showChartButton && (
          <Pressable
            onPress={onClickShowChartButton}
            style={[styles.addButton, { borderColor: theme.PRIMARY }]}
          >
            <FontAwesomeIcon
              icon={faPieChart}
              size={23}
              color={theme.PRIMARY}
            />
          </Pressable>
        )}
        {showAdd && onAdd && (
          <Pressable
            onPress={onAdd}
            style={[styles.addButton, { borderColor: theme.PRIMARY }]}
          >
            <FontAwesomeIcon icon={faPlus} color={theme.PRIMARY} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  iconContainer: {
    // width: 50,
    flexDirection: "row",
    gap: 10,
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  iconButton: {
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5a5f",
    borderWidth: 1,
  },
});
