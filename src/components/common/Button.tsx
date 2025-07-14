import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { FONTS } from "../../constant";
import { useTheme } from "../providers/ThemeContext";

export enum ButtonTypes {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  TERTIARY = "TERTIARY",
}

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  type?: ButtonTypes;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  type = ButtonTypes.PRIMARY,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        {
          backgroundColor:
            type === ButtonTypes.PRIMARY ? theme.PRIMARY : theme.orange,
          borderWidth: 2,
          borderColor:
            type === ButtonTypes.PRIMARY ? theme.PRIMARY : theme.button_border,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle, { color: theme.background }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FONTS.LotaGrotesque.Regular,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: FONTS.ClashDisplay.Medium,
  },
});

export default Button;
