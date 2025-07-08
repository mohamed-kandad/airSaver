// toastConfig.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { useTheme } from "./components/providers/ThemeContext";
import { FONTS } from "./constant";
import { getFlexDirectionStyle } from "./languages/styles";
import { RootState } from "./store";

const baseStyle = {
  padding: 14,
  paddingVertical: 20,
  borderRadius: 12,
  marginTop: 10,
  marginHorizontal: 12,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  flex: 1,
  width: "80%",
  borderWidth: 2,
};

export const toastConfig = {
  success: ({ text1 }: any) => {
    const { theme } = useTheme();
    const lang = useSelector((state: RootState) => state.lang.lang);

    return (
      <View
        style={[
          baseStyle,
          { backgroundColor: theme.background, borderColor: theme.PRIMARY },
        ]}
      >
        <View style={[styles.row, getFlexDirectionStyle(lang)]}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#22c55e" />
          <Text style={[styles.text, { color: theme.PRIMARY }]}>{text1}</Text>
        </View>
      </View>
    );
  },

  error: ({ text1 }: any) => {
    const { theme } = useTheme();
    const lang = useSelector((state: RootState) => state.lang.lang);

    return (
      <View
        style={[
          baseStyle,
          { backgroundColor: theme.background, borderColor: theme.PRIMARY },
        ]}
      >
        <View style={[styles.row, getFlexDirectionStyle(lang)]}>
          <Ionicons name="alert-circle-outline" size={20} color="#ef4444" />
          <Text style={[styles.text, , { color: theme.PRIMARY }]}>{text1}</Text>
        </View>
      </View>
    );
  },

  info: ({ text1, text2, onPress }: any) => {
    const { theme } = useTheme();
    const lang = useSelector((state: RootState) => state.lang.lang);

    return (
      <View
        style={[
          baseStyle,
          { backgroundColor: theme.background, borderColor: theme.PRIMARY },
        ]}
      >
        <View style={[styles.row, getFlexDirectionStyle(lang)]}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#3b82f6"
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { color: theme.PRIMARY }]}>{text1}</Text>
            {text2 && (
              <Text style={[styles.subText, { color: theme.PRIMARY }]}>
                {text2}
              </Text>
            )}
          </View>
          {onPress && (
            <Pressable onPress={onPress}>
              <Text style={[styles.actionText, { color: "#3b82f6" }]}>
                Retry
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8, width: "100%" },
  text: {
    fontSize: 15,
    fontFamily: FONTS.ClashDisplay.Medium,
  },
  subText: { fontSize: 13, marginTop: 4 },
  actionText: { marginLeft: 10 },

  light: { backgroundColor: "#fff" },
  dark: { backgroundColor: "#1f2937" },

  lightText: { color: "#111827" },
  darkText: { color: "#f9fafb" },

  lightSubText: { color: "#6b7280" },
  darkSubText: { color: "#9ca3af" },
});

export const checkCondition = (condition: boolean, message: string) => {
  if (condition) {
    Toast.show({
      type: "error",
      text1: message,
      text2: "This is some something 👋",
    });
    return true;
  }
  return false;
};
