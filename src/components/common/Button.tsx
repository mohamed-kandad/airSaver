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

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        {
          backgroundColor: theme.PRIMARY,
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
  },
});

export default Button;
