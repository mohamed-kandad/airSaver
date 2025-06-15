import { FONTS } from "@/constant";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../providers/ThemeContext";

type Props = {
  text: string;
};

const NotFound = ({ text }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={{ width: "100%", minHeight: 100 }}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: FONTS.ClashDisplay.Bold,
          color: theme.PRIMARY,
          fontSize: 20,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({});
