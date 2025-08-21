import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../providers/ThemeContext";

type Variant = "outline" | "filled";

type ButtonRoundedProps = {
  icon: IconDefinition;
  size?: number; // icon size
  color?: string; // icon color
  borderColor?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  variant?: Variant;
};

const ButtonRounded = ({
  icon,
  size = 20,
  color = "#000",
  borderColor = "#000",
  onPress,
  style,
  containerStyle,
  variant = "outline",
}: ButtonRoundedProps) => {
  const { theme } = useTheme();

  return (
    <View style={containerStyle}>
      <Pressable
        onPress={onPress}
        style={[
          styles.base,
          variant === "outline" && {
            borderWidth: 1,
            borderColor: theme.PRIMARY,
            backgroundColor: "transparent",
          },
          variant === "filled" && {
            borderWidth: 1,
            borderColor: theme.PRIMARY,
            backgroundColor: "#ff5a5f", // ✅ orange by default
          },
          style,
        ]}
      >
        <FontAwesomeIcon icon={icon} size={size} color={theme.PRIMARY} />
      </Pressable>
    </View>
  );
};

export default ButtonRounded;

const styles = StyleSheet.create({
  base: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
