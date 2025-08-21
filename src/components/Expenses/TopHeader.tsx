import {
  faArrowLeft,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFlexDirectionStyle } from "../../languages/styles";
import { AppDispatch, RootState } from "../../store";
import { useTheme } from "../providers/ThemeContext";
import ButtonRounded from "../ui/ButtonRounded";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  showAdd?: boolean;
  onBack?: () => void;
  onAdd?: () => void;
  showClose?: boolean;
  showChartButton?: boolean;
  isTransparent?: boolean;
  onClickShowChartButton?: () => void;
  showMapButton?: boolean;
  onClickMapButton?: () => void;
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
  onClickMapButton,
  showMapButton,
  isTransparent,
}: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const dispatch: AppDispatch = useDispatch();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isTransparent ? "transparent" : theme.background,
          ...getFlexDirectionStyle(lang),
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <ButtonRounded
          icon={lang === "ar" ? faArrowRight : faArrowLeft}
          onPress={onBack}
        />
      </View>

      <View
        style={[
          styles.iconContainer,
          styles.alignEnd,
          getFlexDirectionStyle(lang),
        ]}
      >
        {showAdd && onAdd && (
          <ButtonRounded icon={faPlus} onPress={onAdd} variant="filled" />
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
