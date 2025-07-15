import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur"; // ✅ updated import
import React, { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../../constant";
import { getFlexDirectionStyle } from "../../languages/styles";
import { RootStackParamList } from "../../navigation/MainNavigation";
import { RootState } from "../../store";
import { useTheme } from "../providers/ThemeContext";

type HeaderNavigationProp = NavigationProp<RootStackParamList, "Trips">;

type HeaderProps = {
  scrollY?: Animated.Value;
  isTransparent?: boolean;
};

const Header = ({ scrollY, isTransparent = false }: HeaderProps) => {
  const { theme } = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const navigate = useNavigation<HeaderNavigationProp>();
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    if (scrollY) {
      const listener = scrollY.addListener(({ value }) => {
        setIsBlurred(value > 10);
      });
      return () => {
        scrollY.removeListener(listener);
      };
    }
  }, [scrollY]);

  return (
    <View
      style={[
        styles.headerContainer,
        getFlexDirectionStyle(lang),
        { backgroundColor: "transparent" },
      ]}
    >
      {(isBlurred || isTransparent) && (
        <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
      )}

      {!isBlurred && !isTransparent && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: theme.background },
          ]}
        />
      )}

      <View style={styles.iconContainer}>
        <Pressable
          onPress={() => navigate.navigate("Settings")}
          style={[styles.iconButton, { borderColor: theme.PRIMARY }]}
        >
          <FontAwesomeIcon icon={faGear} size={23} color={theme.PRIMARY} />
        </Pressable>
      </View>

      <Pressable
        style={[
          styles.addTripButton,
          { borderColor: theme.button_border, backgroundColor: "#ff5a5f" },
        ]}
        onPress={() => navigate.navigate("AddTrip", { tripId: "" })}
      >
        <FontAwesomeIcon icon={faPlus} color={theme.button_border} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  addTripButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    paddingTop: 45,
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 5,
  },
  headerWelcome: {},
  welcomeText: {
    fontSize: 12,
    fontFamily: "Figtree-Regular",
  },
  nameText: {
    fontSize: 18,
    fontFamily: "DelaRegular",
    color: COLORS.light.PRIMARY,
  },
  iconContainer: {},
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
});
